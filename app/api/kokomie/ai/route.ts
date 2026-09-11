import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI();

export async function POST(request: Request) {
  try {
    const { question, choice } = await request.json();

    if (!question || !choice) {
      return NextResponse.json({ message: 'データが不足しています。' }, { status: 400 });
    }

    const prompt = `
あなたは温かく寄り添う心理カウンセラーやヒーラーのような存在です。
ユーザーが以下の問いに対して直感で選びました。

【問い】
${question}

【ユーザーの選択】
${choice}

この選択から読み取れるユーザーの現在の潜在意識の状態や心の傾向を優しく紐解き、前向きで癒やされるメッセージ（300文字程度）を日本語で作成してください。押し付けがましくなく、そっと背中を押すようなトーンでお願いします。
`.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    const message = response.text;

    if (!message) {
      throw new Error('メッセージの生成に失敗しました。');
    }

    return NextResponse.json({ message });
  } catch (error: any) {
    console.error('Kokomie AI Error:', error);
    const status = error.status === 503 ? 503 : 500;
    return NextResponse.json(
      { message: error.message || 'AIからのメッセージ生成中にエラーが発生しました。' },
      { status }
    );
  }
}