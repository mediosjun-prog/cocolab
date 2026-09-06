import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 使用するモデル名（必要に応じてここだけ変更してください）
const MODEL_NAME = 'gemini-3.1-flash-lite';

export async function POST(req: Request) {
  try {
    const { messages, systemPrompt } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY が環境変数に設定されていません' },
        { status: 500 }
      );
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'messages が空です' },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1]?.text || '';
    const previousMessages = messages.slice(0, -1);

    const firstUserIndex = previousMessages.findIndex((msg: any) => msg.sender === 'user');
    const history = (firstUserIndex !== -1 ? previousMessages.slice(firstUserIndex) : []).map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: systemPrompt,
    });

    const maxRetries = 3;
    let responseText = '';

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const chat = model.startChat({ history });
        const result = await chat.sendMessage(lastMessage);
        responseText = result.response.text();
        break;
      } catch (err: any) {
        const message: string = err?.message || '';
        const status: number | undefined = err?.status;

        // 1日あたりのクォータ超過 → リトライしても無意味なので即座に諦める
        const isDailyQuotaExceeded =
          message.includes('GenerateRequestsPerDayPerProjectPerModel') ||
          message.includes('generate_content_free_tier_requests');

        if (isDailyQuotaExceeded) {
          console.warn('Gemini API: 本日のクォータを使い切りました。', message);
          return NextResponse.json(
            {
              error:
                '本日のAI利用回数の上限に達しました。しばらくしてから、または翌日以降に再度お試しください。',
              code: 'DAILY_QUOTA_EXCEEDED',
            },
            { status: 429 }
          );
        }

        // 一時的なレート制限・過負荷（503, 一般的な429など）はリトライ対象
        const isTemporaryError =
          status === 503 ||
          status === 429 ||
          message.includes('503') ||
          message.includes('429');

        if (isTemporaryError && attempt < maxRetries - 1) {
          const waitMs = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
          console.warn(
            `Gemini API: 一時的なエラーのため ${waitMs / 1000}秒後に再試行 (${attempt + 1}/${maxRetries})`,
            message
          );
          await delay(waitMs);
          continue;
        }

        // 一時的なエラーだがリトライ上限に達した場合
        if (isTemporaryError) {
          return NextResponse.json(
            {
              error: 'ただいまアクセスが集中しています。しばらくしてから再度お試しください。',
              code: 'RATE_LIMITED',
            },
            { status: 429 }
          );
        }

        // それ以外の予期しないエラーはそのまま投げて外側のcatchで処理
        throw err;
      }
    }

    if (!responseText) {
      return NextResponse.json(
        { error: 'AIからの応答が空でした。もう一度お試しください。' },
        { status: 500 }
      );
    }

    return NextResponse.json({ text: responseText });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: error.message || 'AIの応答取得に失敗しました。' },
      { status: 500 }
    );
  }
}