// app/api/iko/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI();

export async function POST(req: Request) {
  try {
    const { messages, config, action } = await req.json();

    if (action === 'evaluate') {
      const prompt = `
あなたは愛着障害克服プログラムの専門カウンセラーおよびシミュレーション審判です。
以下の対話履歴とシチュエーションを分析し、ユーザーのコミュニケーションを採点・総評してください。

【設定】
- 自分の性別・年代: ${config.myGender} (${config.myAge})
- 相手の性別・年代: ${config.targetGender} (${config.targetAge})
- 関係性: ${config.relation}
- シチュエーション: ${config.situation}

【対話履歴】
${messages.map((m: any) => `${m.role === 'user' ? 'ユーザー' : '相手'}: ${m.content}`).join('\n')}

以下のJSON形式のみで出力してください（マークダウンのバッククォート等は含めない）。
{
  "score": 85,
  "totalEvaluation": "ここに採点の総評や、相手の受け止め方、より良くするための優しいアドバイスを詳しく記述してください。"
}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash', // ← ここを更新
        contents: prompt,
      });

      const text = response.text || '';
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const result = JSON.parse(cleaned);

      return NextResponse.json(result);
    }

    const userMessage = messages[messages.length - 1].content;

    const prompt = `
あなたは愛着障害克服プログラムの仮想シミュレーション相手です。
以下の設定に忠実になりきって、ユーザーのメッセージに対する返答を生成してください。

【設定】
- あなたの立場（相手）: ${config.targetGender} (${config.targetAge})、関係性: ${config.relation}
- シチュエーション: ${config.situation}
- ユーザー: ${config.myGender} (${config.myAge})

【重要ルール・強制終了判定】
ユーザーの発言に、暴言、過度に攻撃的な言葉、セクハラ、またはプログラムの趣旨を著しく逸脱した不適切な内容が含まれている場合、返答の冒頭に必ず "[FORCED_TERMINATION]" というキーワードを含め、相手として拒絶または戸惑う反応を示してください。
不適切な内容でなければ、通常通り関係性にふさわしい自然な返答をしてください。

【これまでの対話】
${messages.slice(0, -1).map((m: any) => `${m.role === 'user' ? 'ユーザー' : '相手'}: ${m.content}`).join('\n')}

【最新のユーザーのメッセージ】
${userMessage}

返答テキストのみを出力してください（強制終了の場合は冒頭に [FORCED_TERMINATION] をつけること）。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash', // ← ここも更新
      contents: prompt,
    });

    const replyText = response.text || '...';
    const isForcedTerminated = replyText.includes('[FORCED_TERMINATION]');
    const cleanReply = replyText.replace('[FORCED_TERMINATION]', '').trim();

    return NextResponse.json({
      reply: cleanReply,
      isForcedTerminated,
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message || 'エラーが発生しました' }, { status: 500 });
  }
}