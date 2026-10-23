import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_TEXT_LENGTH = 200;
const MAX_REQUEST_BYTES = 10_000;
const MAX_AUDIO_BYTES = 5_000_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';

    if (!contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json(
        { error: 'JSON形式のリクエストが必要です。' },
        { status: 415 },
      );
    }

    const contentLength = req.headers.get('content-length');

    if (contentLength !== null) {
      const size = Number(contentLength);

      if (!Number.isFinite(size) || size < 0 || size > MAX_REQUEST_BYTES) {
        return NextResponse.json(
          { error: 'リクエストのサイズが上限を超えています。' },
          { status: 413 },
        );
      }
    }

    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'リクエストの形式が正しくありません。' },
        { status: 400 },
      );
    }

    if (!isRecord(body)) {
      return NextResponse.json(
        { error: 'リクエストの形式が正しくありません。' },
        { status: 400 },
      );
    }

    const { text, speaker = 3 } = body;

    if (
      typeof text !== 'string' ||
      text.trim().length === 0 ||
      text.length > MAX_TEXT_LENGTH
    ) {
      return NextResponse.json(
        { error: 'テキストは1〜200文字で入力してください。' },
        { status: 400 },
      );
    }

    if (
      typeof speaker !== 'number' ||
      !Number.isInteger(speaker) ||
      speaker < 0 ||
      speaker > 1000
    ) {
      return NextResponse.json(
        { error: '音声設定が正しくありません。' },
        { status: 400 },
      );
    }

    const configuredUrl =
      process.env.VOICEVOX_URL || 'http://127.0.0.1:50021';

    let baseUrl: URL;

    try {
      baseUrl = new URL(configuredUrl);
    } catch {
      console.error('VOICEVOX_URL is invalid.');
      return NextResponse.json(
        { error: '音声サービスを現在利用できません。' },
        { status: 503 },
      );
    }

    if (
      baseUrl.protocol !== 'http:' &&
      baseUrl.protocol !== 'https:'
    ) {
      return NextResponse.json(
        { error: '音声サービスの接続設定が正しくありません。' },
        { status: 503 },
      );
    }

    // audio_query
    const queryUrl = new URL('/audio_query', baseUrl);
    queryUrl.searchParams.set('text', text.trim());
    queryUrl.searchParams.set('speaker', String(speaker));

    let queryRes: Response;

    try {
      queryRes = await fetch(queryUrl, {
        method: 'POST',
        signal: AbortSignal.timeout(10_000),
        cache: 'no-store',
      });
    } catch {
      console.error('VOICEVOX audio_query request failed.');
      return NextResponse.json(
        { error: '音声サービスに接続できませんでした。' },
        { status: 502 },
      );
    }

    if (!queryRes.ok) {
      console.error('VOICEVOX audio_query failed:', queryRes.status);
      return NextResponse.json(
        { error: '音声の準備に失敗しました。' },
        { status: 502 },
      );
    }

    const queryData: unknown = await queryRes.json();

    if (!isRecord(queryData)) {
      return NextResponse.json(
        { error: '音声サービスから不正な応答がありました。' },
        { status: 502 },
      );
    }

    // synthesis
    const synthUrl = new URL('/synthesis', baseUrl);
    synthUrl.searchParams.set('speaker', String(speaker));

    let synthRes: Response;

    try {
      synthRes = await fetch(synthUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryData),
        signal: AbortSignal.timeout(15_000),
        cache: 'no-store',
      });
    } catch {
      console.error('VOICEVOX synthesis request failed.');
      return NextResponse.json(
        { error: '音声の生成に失敗しました。' },
        { status: 502 },
      );
    }

    if (!synthRes.ok) {
      console.error('VOICEVOX synthesis failed:', synthRes.status);
      return NextResponse.json(
        { error: '音声の生成に失敗しました。' },
        { status: 502 },
      );
    }

    const audioBuffer = await synthRes.arrayBuffer();

    if (audioBuffer.byteLength === 0) {
      return NextResponse.json(
        { error: '音声データが空でした。' },
        { status: 502 },
      );
    }

    if (audioBuffer.byteLength > MAX_AUDIO_BYTES) {
      return NextResponse.json(
        { error: '生成された音声データが大きすぎます。' },
        { status: 502 },
      );
    }

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': String(audioBuffer.byteLength),
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error: unknown) {
    console.error(
      'VOICEVOX API error:',
      error instanceof Error ? error.message : 'Unknown error',
    );

    return NextResponse.json(
      { error: '処理中にエラーが発生しました。時間をおいて再度お試しください。' },
      { status: 500 },
    );
  }
}
