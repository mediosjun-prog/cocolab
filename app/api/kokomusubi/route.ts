import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const MAX_INPUT_LENGTH = 2000;
const MAX_BODY_SIZE = 20 * 1024;

export async function POST(req: Request) {
  try {
    if (!ai) {
      return NextResponse.json(
        { message: '現在、AI機能を利用できません。時間を置いて再度お試しください。' },
        { status: 503 }
      );
    }

    // JSON形式のリクエストのみ受け付ける
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { message: 'リクエストの形式が正しくありません。' },
        { status: 415 }
      );
    }

    // Content-Length が明示されている場合のサイズ確認
    const contentLength = Number(req.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_SIZE) {
      return NextResponse.json(
        { message: '入力内容が大きすぎます。文章を短くしてお試しください。' },
        { status: 413 }
      );
    }

    const body: unknown = await req.json();

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { message: '入力内容が正しくありません。' },
        { status: 400 }
      );
    }

    const {
      attachmentIssues,
      parentDynamic,
      currentChallenge,
    } = body as {
      attachmentIssues?: unknown;
      parentDynamic?: unknown;
      currentChallenge?: unknown;
    };

    const fields = [
      { name: 'attachmentIssues', value: attachmentIssues },
      { name: 'parentDynamic', value: parentDynamic },
      { name: 'currentChallenge', value: currentChallenge },
    ];

    for (const field of fields) {
      if (
        field.value !== undefined &&
        (typeof field.value !== 'string' ||
          field.value.length > MAX_INPUT_LENGTH)
      ) {
        return NextResponse.json(
          { message: '入力内容が長すぎるか、形式が正しくありません。' },
          { status: 400 }
        );
      }
    }

    const attachmentText =
      typeof attachmentIssues === 'string' && attachmentIssues.trim()
        ? attachmentIssues.trim()
        : '未選択';

    const parentText =
      typeof parentDynamic === 'string' && parentDynamic.trim()
        ? parentDynamic.trim()
        : '未記入';

    const challengeText =
      typeof currentChallenge === 'string' && currentChallenge.trim()
        ? currentChallenge.trim()
        : '未記入';

    const prompt = `
あなたは、心の悩みを抱える人に温かく寄り添うAIサポーターです。
愛着や親子関係について、決めつけず、本人の気持ちとペースを尊重した支援を行ってください。
あなたは医療専門家本人ではありません。診断を断定せず、必要に応じて専門家への相談も勧めてください。

【ユーザーの入力情報】
- 愛着のパターン・傾向: ${attachmentText}
- 子ども時代の親との関係・環境: ${parentText}
- 現在の対人関係や生きづらさの悩み: ${challengeText}

以下の3つの観点から、受容と温かさに満ちた、心理学的に実践しやすいアドバイスをJSON形式で出力してください。

1. attachmentAnalysis: 愛着の傾向について断定を避けた説明と、これまでの経験への受容。
2. safeBaseWork: 無理なく試せるセルフケアのワーク。
3. boundaryGuide: 人間関係で自分を守る境界線の引き方。

出力は次の3つの文字列プロパティを持つJSONオブジェクトだけにしてください。
{
  "attachmentAnalysis": "文章",
  "safeBaseWork": "文章",
  "boundaryGuide": "文章"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    const text = response.text?.trim() || '';

    // JSON部分を取り出して解析する
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { message: 'AIの回答を正しく処理できませんでした。もう一度お試しください。' },
        { status: 502 }
      );
    }

    const data: unknown = JSON.parse(jsonMatch[0]);

    if (
      !data ||
      typeof data !== 'object' ||
      !('attachmentAnalysis' in data) ||
      !('safeBaseWork' in data) ||
      !('boundaryGuide' in data) ||
      typeof data.attachmentAnalysis !== 'string' ||
      typeof data.safeBaseWork !== 'string' ||
      typeof data.boundaryGuide !== 'string'
    ) {
      return NextResponse.json(
        { message: 'AIの回答形式が正しくありません。もう一度お試しください。' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      attachmentAnalysis: data.attachmentAnalysis,
      safeBaseWork: data.safeBaseWork,
      boundaryGuide: data.boundaryGuide,
    });
  } catch {
    // 利用者の入力内容や詳細なエラーをレスポンスに含めない
    console.error('Kokomusubi API request failed.');

    return NextResponse.json(
      { message: 'AIの処理中にエラーが発生しました。時間を置いて再度お試しください。' },
      { status: 500 }
    );
  }
}
