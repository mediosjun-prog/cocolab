// app/api/kokosuki/ai/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { negatives, customNegative } = await request.json();

    const allNegatives = [...(negatives || []), customNegative].filter(Boolean).join('、');

    if (!allNegatives) {
      return NextResponse.json({ message: '変換する内容が選択または入力されていません。' }, { status: 400 });
    }

    const prompt = `
あなたはユーザーの心に寄り添う温かいカウンセラーです。
ユーザーが「自分の欠点だと思っていること（ネガティブな要素）」を伝えてくれます。
それを心理学や愛着理論、リフレーミングの視点を用いて、徹底的にポジティブに解釈し直し、ユーザーの気分が明るくなり、自分のことが好きになれるような愛情深い誉め言葉・メッセージを作成してください。

【ユーザーの気になっているところ】
${allNegatives}

【出力の条件】
- 共感から始め、それぞれの要素が実は素晴らしい長所や個性、才能の裏返しであることを伝えること。
- 読んだあとに心が軽く、温かくなるような優しい口調にすること。
- マークダウンなどを適度に使って読みやすく出力すること。
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash', // ← ここを gemini-3.6-flash に変更
      contents: prompt,
    });

    return NextResponse.json({ message: response.text });
  } catch (error: any) {
    console.error('Kokosuki AI Error:', error);
    return NextResponse.json({ message: `AIからのメッセージ生成中にエラーが発生しました: ${error.message}` }, { status: 500 });
  }
}