import { NextResponse } from 'next/server';

import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const MAX_ITEMS = 30;

const MAX_ITEM_LENGTH = 200;

const MAX_CUSTOM_LENGTH = 1000;

export async function POST(request: Request) {

  try {

    if (!ai) {

      return NextResponse.json(

        { message: '現在、AI機能を利用できません。時間を置いて再度お試しください。' },

        { status: 503 }

      );

    }

    // JSON以外のリクエストを拒否

    const contentType = request.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {

      return NextResponse.json(

        { message: 'リクエストの形式が正しくありません。' },

        { status: 415 }

      );

    }

    // リクエスト本文のサイズを制限（20KB）

    const contentLength = Number(request.headers.get('content-length') || 0);

    if (contentLength > 20 * 1024) {

      return NextResponse.json(

        { message: '入力内容が大きすぎます。文章を短くしてお試しください。' },

        { status: 413 }

      );

    }

    const body: unknown = await request.json();

    if (!body || typeof body !== 'object' || Array.isArray(body)) {

      return NextResponse.json(

        { message: '入力内容が正しくありません。' },

        { status: 400 }

      );

    }

    const { negatives, customNegative } = body as {

      negatives?: unknown;

      customNegative?: unknown;

    };

    // negatives の型・件数・各項目の長さを検証

    if (

      negatives !== undefined &&

      (!Array.isArray(negatives) ||

        negatives.length > MAX_ITEMS ||

        !negatives.every(

          (item) =>

            typeof item === 'string' &&

            item.length <= MAX_ITEM_LENGTH

        ))

    ) {

      return NextResponse.json(

        { message: '選択項目の形式または長さが正しくありません。' },

        { status: 400 }

      );

    }

    // customNegative の型・長さを検証

    if (

      customNegative !== undefined &&

      (typeof customNegative !== 'string' ||

        customNegative.length > MAX_CUSTOM_LENGTH)

    ) {

      return NextResponse.json(

        { message: '入力内容が長すぎるか、形式が正しくありません。' },

        { status: 400 }

      );

    }

    const allNegatives = [

      ...((negatives as string[] | undefined) || []),

      (customNegative as string | undefined) || '',

    ]

      .map((item) => item.trim())

      .filter(Boolean)

      .join('、');

    if (!allNegatives) {

      return NextResponse.json(

        { message: '変換する内容が選択または入力されていません。' },

        { status: 400 }

      );

    }

    const prompt = `

あなたはユーザーの心に寄り添う温かいカウンセラーです。

ユーザーが「自分の欠点だと思っていること」を伝えてくれます。

心理学や愛着理論、リフレーミングの視点を参考に、

優しく、現実的で、押しつけのないメッセージを作成してください。

【ユーザーの入力】

${allNegatives}

【出力条件】

- 共感から始める。

- 長所として捉え直せる可能性を伝える。

- すべての悩みを無理に長所と決めつけない。

- 読みやすい文章にする。

- 医療上の診断を断定しない。

`;

    const response = await ai.models.generateContent({

      model: 'gemini-3.6-flash',

      contents: prompt,

    });

    const message = response.text?.trim();

    if (!message) {

      return NextResponse.json(

        { message: 'AIから回答を取得できませんでした。もう一度お試しください。' },

        { status: 502 }

      );

    }

    return NextResponse.json({ message });

  } catch (error) {

    // 入力内容や詳細なエラー情報を利用者に返さない

    console.error('Kokosuki AI request failed.');

    return NextResponse.json(

      { message: 'AIの処理中にエラーが発生しました。時間を置いて再度お試しください。' },

      { status: 500 }

    );

  }

}
