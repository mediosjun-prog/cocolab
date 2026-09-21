import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const { step, title, summary } = await request.json();

    if (!summary) {
      return NextResponse.json(
        { error: "ワークの内容が見つかりません。" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "サーバー側のAPIキー設定が不足しています。" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `
あなたは温容で受容的な愛着障害・心理カウンセラーです。
ユーザーが愛着トレーニングのワークシートに入力した内容を受け取ります。

【カウンセリングの方針】
1. 否定やジャッジを絶対にせず、まずは日頃の努力や内省を深くねぎらい、共感してください。
2. 心理学（愛着理論、セルフ・コンパッションなど）の観点から、その思考や感情の背景にある仕組みを優しく解説してください。
3. 明日から無理なく試せる小さなセルフケアのヒントや問いかけを1〜2個添えてください。
4. 丁寧で温かみのある日本語（です・ます調）で、300〜400文字程度で回答してください。
    `;

    const userPrompt = `
以下のワーク記録についてカウンセリングとアドバイスをお願いします。

- 対象ステップ: ${step || "不明"}
- テーマ/タイトル: ${title || "不明"}
- ワーク内容・振り返り:
${summary}
    `;

    // 503エラー（混雑）対策のリトライロジック
    let response;
    let retries = 3;
    let delay = 2000; // 2秒

    for (let i = 0; i < retries; i++) {
      try {
        response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: userPrompt,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
          },
        });
        break; // 成功したらループを抜ける
      } catch (err: any) {
        // 503エラーや一時的な過負荷エラーの場合、リトライする
        if (i < retries - 1 && (err.status === 503 || err.message?.includes("503") || err.message?.includes("overloaded"))) {
          console.warn(`モデルが混雑しています。${delay / 1000}秒後に再試行します... (${i + 1}/${retries})`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2; // 待ち時間を倍増させる（2秒 -> 4秒）
        } else {
          throw err; // その他のエラーはそのまま投げる
        }
      }
    }

    const advice = response?.text || "アドバイスの生成に失敗しました。";

    return NextResponse.json({ advice });
  } catch (error: any) {
    console.error("AI Counseling API Error Detail:", error);
    return NextResponse.json(
      { error: `AIカウンセリング処理エラー: ${error.message || "不明なエラー"}` },
      { status: 500 }
    );
  }
}