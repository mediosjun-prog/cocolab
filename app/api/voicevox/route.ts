import { NextResponse } from 'next/server';

// ローカルで起動している VOICEVOX サーバーのアドレス
const VOICEVOX_BASE_URL = process.env.VOICEVOX_URL || 'http://127.0.0.1:50021';

export async function POST(req: Request) {
  try {
    const { text, speaker = 3 } = await req.json(); // speaker=3: ずんだもん(ノーマル)など

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // 1. VOICEVOX で audio_query を作成
    const queryUrl = `${VOICEVOX_BASE_URL}/audio_query?text=${encodeURIComponent(text)}&speaker=${speaker}`;
    const queryRes = await fetch(queryUrl, { method: 'POST' });

    if (!queryRes.ok) {
      throw new Error(`VOICEVOX audio_query failed with status ${queryRes.status}`);
    }

    const queryData = await queryRes.json();

    // 2. VOICEVOX で音声データ (synthesis) を生成
    const synthUrl = `${VOICEVOX_BASE_URL}/synthesis?speaker=${speaker}`;
    const synthRes = await fetch(synthUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(queryData),
    });

    if (!synthRes.ok) {
      throw new Error(`VOICEVOX synthesis failed with status ${synthRes.status}`);
    }

    // 3. 音声バッファ（audio/wav）を取得してフロントエンドに返す
    const audioBuffer = await synthRes.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    });
  } catch (error: any) {
    console.error('VOICEVOX API Error:', error.message);
    return NextResponse.json(
      { error: error.message || 'Failed to generate VOICEVOX audio' },
      { status: 500 }
    );
  }
}