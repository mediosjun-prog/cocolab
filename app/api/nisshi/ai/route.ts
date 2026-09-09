import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. リクエストボディの安全なパース
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json(
        { message: 'リクエストのデータ形式が正しくありません。' },
        { status: 400 }
      );
    }

    const { character, weather, color, animal, note } = body;

    // 2. APIキーの確認
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { message: 'サーバー側の設定エラー: GEMINI_API_KEY が設定されていません。' },
        { status: 500 }
      );
    }

    // 3. Gemini APIの呼び出し
    const ai = new GoogleGenAI({ apiKey });

    let personaPrompt = '';
    let counselorName = '';

    if (character === 'counselor1') {
      personaPrompt = 'あなたは上品で落ち着いた「癒し系カウンセラー」です。';
      counselorName = '癒し系カウンセラー';
    } else {
      personaPrompt = 'あなたは親しみやすくフランクな「ほのぼのカウンセラー」です。';
      counselorName = 'ほのぼのカウンセラー';
    }

    const prompt = `
      ${personaPrompt}
      
      ユーザーが今日の日記として以下の状態を選びました。
      - 天気: ${weather}
      - 心の色: ${color}
      - 気分（動物）: ${animal}
      - ひとことメモ: ${note || 'なし'}

      この状態を察知し、ユーザーがホッとしたり前向きになれたりする心のこもった短いメッセージを150文字程度で返してください。
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
      contents: prompt,
    });

    const message = response.text || '今日も一日お疲れ様でした。ゆっくり休んでくださいね。';

    // 4. 必ずJSONとして返す
    return NextResponse.json({ message });

  } catch (error: any) {
    console.error('API Route Error:', error);
    // どんな予期せぬエラーでも必ずJSONで返す
    return NextResponse.json(
      { message: `AI処理エラー: ${error.message || '不明なエラーが発生しました'}` },
      { status: 500 }
    );
  }
}