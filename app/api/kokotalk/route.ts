import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, config } = await req.json();

    const styleInstructions = config.styles
      .map((style: string) => `- ${style}`)
      .join('\n');

    const systemPrompt = `
あなたは以下の設定に従って会話するAIキャラクターです。
【キャラクター設定】
- 性別: ${config.gender}
- 年代: ${config.age}
- 職業: ${config.occupation}
- 性格: ${config.personality}

【対話スタイル・対応ルール】
${styleInstructions}

ユーザーのメッセージに対して、上記の設定とルールを守って自然に日本語で返答してください。返答はテキストのみを出力してください。
    `.trim();

    const apiKey = process.env.GEMINI_API_KEY;

    // 過去のメッセージをGeminiの形式に変換
    const contents = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }]
      },
      ...messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }))
    ];

    const aiResponse = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents })
      }
    );

    const aiData = await aiResponse.json();
    
    // デバッグ用にコンソールにレスポンスを出力
    console.log('Gemini API Response:', JSON.stringify(aiData, null, 2));

    // 安全にテキストを取り出す
    const replyText = 
      aiData.candidates?.[0]?.content?.parts?.[0]?.text || 
      aiData.error?.message || 
      'うまくお返事ができませんでした。';

    // VOICEVOX音声合成（起動中の場合）
    let base64Audio = null;
    const voicevoxHost = process.env.VOICEVOX_HOST || 'http://127.0.0.1:50021';

    try {
      const queryRes = await fetch(`${voicevoxHost}/audio_query?text=${encodeURIComponent(replyText)}&speaker=${config.voiceId}`, {
        method: 'POST',
      });
      if (queryRes.ok) {
        const queryData = await queryRes.json();
        const synthRes = await fetch(`${voicevoxHost}/synthesis?speaker=${config.voiceId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(queryData),
        });
        if (synthRes.ok) {
          const audioBuffer = await synthRes.arrayBuffer();
          base64Audio = Buffer.from(audioBuffer).toString('base64');
        }
      }
    } catch (voiceError) {
      // VOICEVOX未起動時はスキップ
    }

    return NextResponse.json({
      reply: replyText,
      audio: base64Audio,
    });

  } catch (error: any) {
    console.error('詳細なAPIエラー:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}