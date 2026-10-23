import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const MAX_FIELD_LENGTH = 2000;
const MAX_BODY_SIZE = 20 * 1024;

export async function POST(req: Request) {
  try {
    // APIキーが設定されているか確認
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

    // リクエストサイズを確認（Content-Lengthがある場合）
    const contentLength = Number(req.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_SIZE) {
      return NextResponse.json(
        { message: '入力内容が大きすぎます。文章を短くしてお試しください。' },
        { status: 413 }
      );
    }

    // JSONを読み込む
    const body: unknown = await req.json();

    // JSONの形式を確認
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { message: '入力内容が正しくありません。' },
        { status: 400 }
      );
    }

    const {
      situationType,
      userChoice,
      relationshipContext,
    } = body as {
      situationType?: unknown;
      userChoice?: unknown;
      relationshipContext?: unknown;
    };

    // 各入力項目の型と文字数を確認
    const fields = [
      { name: 'situationType', value: situationType },
      { name: 'userChoice', value: userChoice },
      { name: 'relationshipContext', value: relationshipContext },
    ];

    for (const field of fields) {
      if (
        field.value !== undefined &&
        (typeof field.value !== 'string' ||
          field.value.length > MAX_FIELD_LENGTH)
      ) {
        return NextResponse.json(
          { message: '入力内容が長すぎるか、形式が正しくありません。' },
          { status: 400 }
        );
      }
    }

    // 入力値を整える
    const situationText =
      typeof situationType === 'string' && situationType.trim()
        ? situationType.trim()
        : '未選択';

    const choiceText =
      typeof userChoice === 'string' && userChoice.trim()
        ? userChoice.trim()
        : '未記入';

    const contextText =
      typeof relationshipContext === 'string' && relationshipContext.trim()
        ? relationshipContext.trim()
        : '未記入';

    // 3項目すべてが未入力なら処理しない
    if (
      situationText === '未選択' &&
      choiceText === '未記入' &&
      contextText === '未記入'
    ) {
      return NextResponse.json(
        { message: '入力内容を確認して、もう一度お試しください。' },
        { status: 400 }
      );
    }

    const prompt = `
あなたは、心の悩みに温かく寄り添うAIサポーターです。
人間関係での回避や不安について、本人の気持ちとペースを尊重して支援してください。
医療専門家による診断の代わりになる評価は行わず、入力情報だけで心理状態を断定しないでください。

【ユーザーの入力情報】
- 場面・関係性: ${situationText}
- 直面している状況や選んだ行動・迷い: ${choiceText}
- 相手との関係性の背景: ${contextText}

以下の3つの観点から、受容と温かさに満ちた実践的なアドバイスを日本語で作成してください。

1. avoidanceAnalysis:
今回の状況における回避や恐れの可能性を、決めつけずに説明し、当時の気持ちを受け止めてください。

2. assertiveAlternative:
相手との境界線を守りながら、自分も大切にする具体的な関わり方を提案してください。

3. recoveryScoreAndMessage:
回復の過程を表すステータスと、本人を労うメッセージを作成してください。
医学的な点数や診断結果であるかのように表現しないでください。

以下の3つの文字列プロパティを持つJSONオブジェクトだけを返してください。
MarkdownのバッククォートやJSON以外の説明は付けないでください。

{
  "avoidanceAnalysis": "回避傾向についての説明と受容の文章",
  "assertiveAlternative": "アサーティブな関わり方の提案",
  "recoveryScoreAndMessage": "回復のステータスと労いのメッセージ"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    const text = response.text?.trim() || '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return NextResponse.json(
        { message: 'AIの回答を正しく処理できませんでした。もう一度お試しください。' },
        { status: 502 }
      );
    }

    const data: unknown = JSON.parse(jsonMatch[0]);

    // AIの返答が期待する形式か確認
    if (
      !data ||
      typeof data !== 'object' ||
      Array.isArray(data) ||
      !('avoidanceAnalysis' in data) ||
      !('assertiveAlternative' in data) ||
      !('recoveryScoreAndMessage' in data) ||
      typeof data.avoidanceAnalysis !== 'string' ||
      typeof data.assertiveAlternative !== 'string' ||
      typeof data.recoveryScoreAndMessage !== 'string'
    ) {
      return NextResponse.json(
        { message: 'AIの回答形式が正しくありません。もう一度お試しください。' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      avoidanceAnalysis: data.avoidanceAnalysis,
      assertiveAlternative: data.assertiveAlternative,
      recoveryScoreAndMessage: data.recoveryScoreAndMessage,
    });
  } catch {
    // 利用者の入力内容や詳細なエラーをレスポンスやログに出さない
    console.error('Kokocheck API request failed.');

    return NextResponse.json(
      { message: 'AIの処理中にエラーが発生しました。時間を置いて再度お試しください。' },
      { status: 500 }
    );
  }
}
