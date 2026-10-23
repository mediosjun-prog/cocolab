import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'nodejs';

const MAX_REQUEST_BYTES = 100_000;
const MAX_MESSAGES = 40;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_TOTAL_LENGTH = 20_000;
const MAX_SYSTEM_PROMPT_LENGTH = 5000;
const MAX_REPLY_LENGTH = 10_000;

const MODEL_NAME = 'gemini-3.1-flash-lite';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown, maxLength: number): value is string {
  return (
    typeof value === 'string' &&
    value.trim().length > 0 &&
    value.length <= maxLength
  );
}

function errorResponse(message: string, status: number, code?: string) {
  return NextResponse.json(
    code ? { error: message, code } : { error: message },
    { status },
  );
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';

    if (!contentType.toLowerCase().includes('application/json')) {
      return errorResponse('JSON形式のリクエストが必要です。', 415);
    }

    const contentLength = req.headers.get('content-length');

    if (contentLength !== null) {
      const size = Number(contentLength);

      if (!Number.isFinite(size) || size < 0 || size > MAX_REQUEST_BYTES) {
        return errorResponse('リクエストのサイズが上限を超えています。', 413);
      }
    }

    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return errorResponse('リクエストのデータ形式が正しくありません。', 400);
    }

    if (!isRecord(body)) {
      return errorResponse('リクエストの形式が正しくありません。', 400);
    }

    const { messages, systemPrompt } = body;

    if (
      !Array.isArray(messages) ||
      messages.length === 0 ||
      messages.length > MAX_MESSAGES
    ) {
      return errorResponse('会話履歴の形式を確認してください。', 400);
    }

    if (
      typeof systemPrompt !== 'string' ||
      systemPrompt.length > MAX_SYSTEM_PROMPT_LENGTH
    ) {
      return errorResponse('システム設定の形式を確認してください。', 400);
    }

    let totalLength = systemPrompt.length;
    const safeMessages: { sender: 'user' | 'model'; text: string }[] = [];

    for (const item of messages) {
      if (
        !isRecord(item) ||
        (item.sender !== 'user' && item.sender !== 'model' && item.sender !== 'assistant') ||
        !isNonEmptyString(item.text, MAX_MESSAGE_LENGTH)
      ) {
        return errorResponse('会話履歴の形式を確認してください。', 400);
      }

      totalLength += item.text.length;

      if (totalLength > MAX_TOTAL_LENGTH) {
        return errorResponse('会話履歴が長すぎます。', 413);
      }

      safeMessages.push({
        sender: item.sender === 'user' ? 'user' : 'model',
        text: item.text,
      });
    }

    const lastMessage = safeMessages[safeMessages.length - 1];

    if (!lastMessage || lastMessage.sender !== 'user') {
      return errorResponse('最後のメッセージはユーザーの発言である必要があります。', 400);
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY is not configured.');
      return errorResponse(
        '現在サービスを利用できません。時間をおいて再度お試しください。',
        503,
      );
    }

    const previousMessages = safeMessages.slice(0, -1);
    const firstUserIndex = previousMessages.findIndex(
      (message) => message.sender === 'user',
    );

    const history = (
      firstUserIndex !== -1
        ? previousMessages.slice(firstUserIndex)
        : []
    ).map((message) => ({
      role: message.sender,
      parts: [{ text: message.text }],
    }));

    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: systemPrompt,
    });

    const maxRetries = 3;
    let responseText = '';

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const chat = model.startChat({ history });
        const result = await chat.sendMessage(lastMessage.text);
        responseText = result.response.text().trim();
        break;
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        const message = error.message || '';
        const status = isRecord(err) && typeof err.status === 'number'
          ? err.status
          : undefined;

        const isDailyQuotaExceeded =
          message.includes('GenerateRequestsPerDayPerProjectPerModel') ||
          message.includes('generate_content_free_tier_requests');

        if (isDailyQuotaExceeded) {
          console.warn('Gemini API daily quota exceeded.');

          return errorResponse(
            '本日のAI利用回数の上限に達しました。しばらくしてから、または翌日以降に再度お試しください。',
            429,
            'DAILY_QUOTA_EXCEEDED',
          );
        }

        const isTemporaryError =
          status === 503 ||
          status === 429 ||
          message.includes('503') ||
          message.includes('429');

        if (isTemporaryError && attempt < maxRetries - 1) {
          const waitMs = 1000 * 2 ** attempt;
          console.warn(
            `Gemini temporary error; retry ${attempt + 1}/${maxRetries}.`,
          );
          await new Promise((resolve) => setTimeout(resolve, waitMs));
          continue;
        }

        if (isTemporaryError) {
          return errorResponse(
            'ただいまアクセスが集中しています。しばらくしてから再度お試しください。',
            429,
            'RATE_LIMITED',
          );
        }

        console.error('Gemini request failed:', error.message);
        return errorResponse(
          'AIの応答取得に失敗しました。時間をおいて再度お試しください。',
          502,
        );
      }
    }

    if (!responseText || responseText.length > MAX_REPLY_LENGTH) {
      return errorResponse(
        'AIからの応答を正しく取得できませんでした。もう一度お試しください。',
        502,
      );
    }

    return NextResponse.json({ text: responseText });
  } catch (error: unknown) {
    console.error(
      'Session API error:',
      error instanceof Error ? error.message : 'Unknown error',
    );

    return errorResponse(
      '処理中にエラーが発生しました。時間をおいて再度お試しください。',
      500,
    );
  }
}
