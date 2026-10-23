import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const MAX_QUESTION_LENGTH = 1000;
const MAX_CHOICE_LENGTH = 500;
const MAX_BODY_SIZE = 20 * 1024;

export async function POST(request: Request) {
  try {
    if (!ai) {
      return NextResponse.json(
        { message: '現在、AI機能を利用できません。時間を置いて再度お試しください。' },
        { status: 503 }
      );
    }

    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { message: 'リクエストの形式が正しくありません。' },
        { status: 415 }
      );
    }

    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_SIZE) {
      return NextResponse.json(
        { message: '入力内容が大きすぎます。' },
        { status: 413 }
      );
    }

    const body: unknown = await request.json();

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { message: '入力内容が正しくありません。' },
        { status: 400 }
      );
    }

    const { question, choice } = body as {
      question?: unknown;
      choice?: unknown;
    };

    if (
      typeof question !== 'string' ||
      typeof choice !== 'string' ||
      !question.trim() ||
      !choice.trim()
    ) {
      return NextResponse.json(
        { message: '問いと選択内容を入力してください。' },
        { status: 400 }
      );
    }

    if (
      question.length > MAX_QUESTION_LENGTH ||
      choice.length > MAX_CHOICE_LENGTH
    ) {
      return NextResponse.json(
        { message: '入力内容が長すぎます。短くして再度お試しください。' },
        { status: 400 }
      );
    }

    const prompt = `
あなたは温かく寄り添う心理サポーターです。
ユーザーが以下の問いに対して直感で選びました。

【問い】
${question.trim()}

【ユーザーの選択】
${choice.trim()}

この選択だけで潜在意識や心理状態を断定せず、自己理解のための一つの視点として、
前向きで癒やされるメッセージを日本語で作成してください。
300文字程度で、押し付けがましくなく、そっと背中を押すトーンにしてください。
医療上の診断は行わないでください。
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    const message = response.text?.trim();

    if (!message) {
      return NextResponse.json(
        { message: 'AIから回答を取得できませんでした。もう一度お試しください。' },
        { status: 502 }
      );
    }

    return NextResponse.json({ message });
  } catch {
    console.error('Kokomie AI request failed.');

    return NextResponse.json(
      { message: 'AIの処理中にエラーが発生しました。時間を置いて再度お試しください。' },
      { status: 500 }
    );
  }
}
