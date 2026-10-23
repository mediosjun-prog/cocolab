import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const MAX_FIELD_LENGTH = 2000;
const MAX_BODY_SIZE = 20 * 1024;

export async function POST(req: Request) {
  try {
    // APIキーの設定を確認
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

    // Content-Lengthが指定されている場合はサイズを確認
    const contentLength = Number(req.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_SIZE) {
      return NextResponse.json(
        { message: '入力内容が大きすぎます。文章を短くしてお試しください。' },
        { status: 413 }
      );
    }

    // リクエスト本文を読み込む
    const body: unknown = await req.json();

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { message: '入力内容が正しくありません。' },
        { status: 400 }
      );
    }

    const {
      pastParentEmotion,
      currentParentEmotion,
      parentRelation,
      siblingEmotion,
      traumaEvent,
      hurtWords,
      happyWords,
    } = body as {
      pastParentEmotion?: unknown;
      currentParentEmotion?: unknown;
      parentRelation?: unknown;
      siblingEmotion?: unknown;
      traumaEvent?: unknown;
      hurtWords?: unknown;
      happyWords?: unknown;
    };

    // 各入力項目の型と文字数を検証
    const fields = [
      { name: 'pastParentEmotion', value: pastParentEmotion },
      { name: 'currentParentEmotion', value: currentParentEmotion },
      { name: 'parentRelation', value: parentRelation },
      { name: 'siblingEmotion', value: siblingEmotion },
      { name: 'traumaEvent', value: traumaEvent },
      { name: 'hurtWords', value: hurtWords },
      { name: 'happyWords', value: happyWords },
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
    const getInput = (value: unknown, fallback: string) =>
      typeof value === 'string' && value.trim()
        ? value.trim()
        : fallback;

    const pastParentEmotionText = getInput(pastParentEmotion, '未選択');
    const currentParentEmotionText = getInput(currentParentEmotion, '未選択');
    const parentRelationText = getInput(parentRelation, '未記入');
    const siblingEmotionText = getInput(siblingEmotion, '未選択');
    const traumaEventText = getInput(traumaEvent, '未記入');
    const hurtWordsText = getInput(hurtWords, '未記入');
    const happyWordsText = getInput(happyWords, '未記入');

    // すべて未入力の場合は処理しない
    if (
      pastParentEmotionText === '未選択' &&
      currentParentEmotionText === '未選択' &&
      parentRelationText === '未記入' &&
      siblingEmotionText === '未選択' &&
      traumaEventText === '未記入' &&
      hurtWordsText === '未記入' &&
      happyWordsText === '未記入'
    ) {
      return NextResponse.json(
        { message: '入力内容を確認して、もう一度お試しください。' },
        { status: 400 }
      );
    }

    const prompt = `
あなたは、過去の記憶や感情の整理を支援する、温かく思いやりのあるAIサポーターです。
ユーザーが自分の経験を振り返り、新しい意味づけを考える手助けをしてください。

診断や専門家による治療の代わりになる判断は行わないでください。
入力内容だけで、過去の出来事の原因や家族の意図、ユーザーの心理状態を断定しないでください。
無理に肯定的な意味づけを押しつけず、本人が感じた痛みや複雑な感情を尊重してください。

【ユーザーの入力情報】
- 両親に対しての過去の感情: ${pastParentEmotionText}
- 両親に対しての今の感情: ${currentParentEmotionText}
- 両親との今の関係性: ${parentRelationText}
- 兄弟への感情: ${siblingEmotionText}
- 心に残っている出来事: ${traumaEventText}
- 傷ついた言葉: ${hurtWordsText}
- 嬉しかった言葉: ${happyWordsText}

以下の3つの観点から、日本語で温かく実践的な文章を作成してください。

1. reframingAnalysis:
当時の体験や感情を否定せず、別の視点から振り返るための文章。

2. newMeaning:
過去の出来事について、新しい意味づけを考えるための視点。
無理に肯定的に捉え直す必要はないことも伝えてください。

3. actionStep:
今の自分に贈る言葉と、無理なく試せる小さなセルフケアの提案。

次の3つの文字列プロパティを持つJSONオブジェクトだけを返してください。
MarkdownのバッククォートやJSON以外の説明は付けないでください。

{
  "reframingAnalysis": "体験の受容と振り返り",
  "newMeaning": "新しい意味づけの視点",
  "actionStep": "自分への言葉と小さなアクション"
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

    // AIの返答が期待する形式か検証
    if (
      !data ||
      typeof data !== 'object' ||
      Array.isArray(data) ||
      !('reframingAnalysis' in data) ||
      !('newMeaning' in data) ||
      !('actionStep' in data) ||
      typeof data.reframingAnalysis !== 'string' ||
      typeof data.newMeaning !== 'string' ||
      typeof data.actionStep !== 'string'
    ) {
      return NextResponse.json(
        { message: 'AIの回答形式が正しくありません。もう一度お試しください。' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      reframingAnalysis: data.reframingAnalysis,
      newMeaning: data.newMeaning,
      actionStep: data.actionStep,
    });
  } catch {
    // 入力内容や内部のエラー詳細をログやレスポンスに出さない
    console.error('Kokokako API request failed.');

    return NextResponse.json(
      { message: 'AIの処理中にエラーが発生しました。時間を置いて再度お試しください。' },
      { status: 500 }
    );
  }
}
