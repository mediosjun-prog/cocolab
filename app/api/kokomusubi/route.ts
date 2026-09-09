import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { attachmentIssues, parentDynamic, currentChallenge } = await req.json();

    const prompt = `
あなたは優れた臨床心理士・トラウマ専門のAIカウンセラーです。
ユーザーが抱える愛着障害の傾向や親子関係のトラウマを癒やし、内なる安全基地を築くためのサポート（ここむすびプログラム）を行ってください。

【ユーザーの入力情報】
- 愛着のパターン・傾向: ${attachmentIssues || '未選択'}
- 子ども時代の親との関係・環境: ${parentDynamic || '未記入'}
- 現在の対人関係や生きづらさの悩み: ${currentChallenge || '未記入'}

以下の3つの観点から、受容と温かさに満ちたトーンで、かつ心理学的に実践的なアドバイスをJSON形式で出力してください。

1. attachmentAnalysis: 愛着スタイルの見立てと、当時そのように適応するしかなかったことへの深い受容・労い。
2. safeBaseWork: 心の中に「内なる安全基地（セルフ・ケア）」を育むための具体的で優しいワーク。
3. boundaryGuide: 今の人間関係において、自分を守るための境界線（バウンダリー）の引き方や考え方のヒント。

※出力は必ず以下のJSONフォーマットのみ（Markdownのバッククォート等を含めない純粋なJSON）で行ってください。

{
  "attachmentAnalysis": "ここに愛着スタイルの分析と受容の文章",
  "safeBaseWork": "ここに安全基地を育むワークの文章",
  "boundaryGuide": "ここに境界線のヒントの文章"
}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    const text = response.text || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : text;
    const data = JSON.parse(jsonString);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Kokomusubi API Error:', error);
    return NextResponse.json(
      { message: 'AIの処理中にエラーが発生しました。時間を置いて再度お試しください。' },
      { status: 500 }
    );
  }
}