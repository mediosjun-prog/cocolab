import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { situationType, userChoice, relationshipContext } = await req.json();

    const prompt = `
あなたは優れた臨床心理士・トラウマ専門のAIカウンセラーです。
ユーザーが日々の人間関係やシチュエーションにおいて、無意識に「回避・恐れ回避」に陥っていないかを振り返り、現在の心の回復度をチェックするためのサポートを行ってください。

【ユーザーの入力情報】
- 場面・関係性: ${situationType || '未選択'}
- 直面している状況や選んだ行動・迷い: ${userChoice || '未記入'}
- 相手との関係性の背景: ${relationshipContext || '未記入'}

以下の3つの観点から、受容と温かさに満ちたトーンで、かつ心理学的に実践的なアドバイスと回復度の評価をJSON形式で出力してください。

1. avoidanceAnalysis: 今回のシチュエーションにおける「回避・恐れ回避」の傾向の分析。当時なぜそのように感じたかの受容。
2. assertiveAlternative: 相手との境界線を守りつつ、自分も大切にするアサーティブな選択・関わり方の提案。
3. recoveryScoreAndMessage: 現在の回復度のステータス（例：「回復のステップ進行中」「安心感の土台固め期」など）と、今のご自身を労うメッセージ。

※出力は必ず以下のJSONフォーマットのみ（Markdownのバッククォート等を含めない純粋なJSON）で行ってください。

{
  "avoidanceAnalysis": "ここに回避傾向の分析と受容の文章",
  "assertiveAlternative": "ここにアサーティブな選択の提案文章",
  "recoveryScoreAndMessage": "ここに回復度のステータスと労いのメッセージ"
}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    const text = typeof response.text === 'function' ? response.text() : (response.text || '');
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : text;
    const data = JSON.parse(jsonString);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Kokocheck API Error:', error);
    return NextResponse.json(
      { message: 'AIの処理中にエラーが発生しました。時間を置いて再度お試しください。' },
      { status: 500 }
    );
  }
}