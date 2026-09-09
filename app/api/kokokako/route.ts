import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { pastParentEmotion, currentParentEmotion, parentRelation, siblingEmotion, traumaEvent, hurtWords, happyWords } = await req.json();

    const prompt = `
あなたは優れた臨床心理士・AIカウンセラーです。
ユーザーが過去の記憶や感情を整理し、内的ワーキングモデルの更新と新しい意味づけ（リフレーミング）を見出すためのサポートを行ってください。

【ユーザーの入力情報】
- 両親に対しての過去の感情: ${pastParentEmotion || '未選択'}
- 両親に対しての今の感情: ${currentParentEmotion || '未選択'}
- 両親との今の関係性: ${parentRelation || '未記入'}
- 兄弟への感情: ${siblingEmotion || '未選択'}
- トラウマになっている出来事: ${traumaEvent || '未記入'}
- ダメージを受けた言葉: ${hurtWords || '未記入'}
- 嬉しかった言葉: ${happyWords || '未記入'}

以下の3つの観点から、受容と温かさに満ちたトーンで、かつ心理学的に実践的なアドバイスをJSON形式で出力してください。

1. reframingAnalysis: 当時の体験の受容と客観視、当時そのように感じるのは自然であったことの労い。
2. newMeaning: 過去の出来事に対する新しい意味づけ（リフレーミング）。
3. actionStep: 今の自分へ贈る言葉や、心を癒やすための小さなアクション。

※出力は必ず以下のJSONフォーマットのみ（Markdownのバッククォート等を含めない純粋なJSON）で行ってください。

{
  "reframingAnalysis": "ここに当時の体験の受容と客観視の文章",
  "newMeaning": "ここに新しい意味づけの文章",
  "actionStep": "ここに今の自分への言葉・アクションの文章"
}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    // textを関数ではなくプロパティ（またはresponse.textの値）として安全に取得
    const text = typeof response.text === 'function' ? response.text() : (response.text || '');
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : text;
    const data = JSON.parse(jsonString);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Kokokako API Error:', error);
    return NextResponse.json(
      { message: 'AIの処理中にエラーが発生しました。時間を置いて再度お試しください。' },
      { status: 500 }
    );
  }
}