// app/api/kokoroom/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI();

const MEMBER_PROFILES: Record<string, { name: string; role: string; desc: string }> = {
  supporter: {
    name: 'みお',
    role: '全肯定・受容特化',
    desc: 'どんな感情もそのまま受け止め、深く共感してくれます。優しく包み込むようなトーンで話します。',
  },
  logical: {
    name: 'ソラ',
    role: '客観的・整理特化',
    desc: '感情の波を優しく整理し、冷静な視点や別の捉え方をそっと提示してくれます。',
  },
  cheerful: {
    name: 'るー',
    role: 'ユーモア・緊張緩和',
    desc: '重くなりがちな空気をフッと和ませ、リラックスさせてくれるおっとりした存在です。',
  },
  realistic: {
    name: 'クロ',
    role: '少し辛口・慎重型',
    desc: 'あえて現実的な視点や少し手厳しい意見・ツッコミを挟みます。ただし悪意はなく、現実社会に向けた免疫づくりのための存在です。',
  },
};

// 503エラーなどの時にリトライしながらAIを呼び出すヘルパー関数
async function generateWithRetry(model: string, contents: string, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({ model, contents });
      return response;
    } catch (error: any) {
      const isOverloaded = error?.status === 503 || error?.message?.includes('high demand') || error?.message?.includes('UNAVAILABLE');
      if (isOverloaded && attempt < maxRetries) {
        // 待機時間を少しずつ延ばしながらリトライ (例: 1秒, 2秒...)
        const delay = attempt * 1000;
        console.warn(`APIが混雑しています (${error.message})。${delay}ms後に再試行します... (試行回数 ${attempt}/${maxRetries})`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error('APIの混雑が解消されませんでした。しばらく経ってから再度お試しください。');
}

export async function POST(req: Request) {
  try {
    const { messages, situation, members, nickname, action } = await req.json();

    const activeMemberIds: string[] = members ? members.split(',') : ['supporter', 'logical'];
    const activeMembersDesc = activeMemberIds
      .map((id) => {
        const p = MEMBER_PROFILES[id];
        return `- ${p.name}（${p.role}）: ${p.desc}`;
      })
      .join('\n');

    // 総評（evaluate）アクションの場合
    if (action === 'evaluate') {
      const prompt = `
あなたは愛着障害克服プログラムの専門カウンセラーです。
以下の「ここるーむ」でのマルチAI対話の履歴を分析し、ユーザーの対話に対する温かい総評レポートを作成してください。

【シチュエーション】
${situation}

【参加したAIメンバー】
${activeMembersDesc}

【対話履歴】
${messages.map((m: any) => `${m.senderName}: ${m.text}`).join('\n')}

以下のJSON形式のみで出力してください（マークダウンのバッククォート等は含めない）。
{
  "totalEvaluation": "今回の対話の総評、ユーザーが自分の気持ちを表現できたことへの労い、今後の人間関係に向けた優しいアドバイスを詳しく記述してください。"
}
      `;

      const response = await generateWithRetry('gemini-3.6-flash', prompt);

      const text = response.text || '';
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const result = JSON.parse(cleaned);

      return NextResponse.json(result);
    }

    // 通常のチャット返答生成アクション
    const userMessage = messages[messages.length - 1].text;

    const prompt = `
ここは愛着障害や対人不安を抱える人が安心して人間関係の練習をするためのバーチャル空間「ここるーむ」です。
現在、ユーザー（${nickname}さん）と複数のAIキャラクターがグループチャットをしています。

【シチュエーション】
${situation}

【同席しているAIメンバーのプロフィール】
${activeMembersDesc}

【これまでの対話履歴】
${messages.slice(0, -1).map((m: any) => `${m.senderName}: ${m.text}`).join('\n')}

【最新のユーザーの発言】
${userMessage}

【指示】
1. 今回の発言に対して、同席しているAIメンバーの中から**最も適した1人**を選んで返答させてください。
2. そのメンバーの性格・役割（プロフィール）に完全に成りきってください。
3. 他のメンバーではなく、選んだキャラクターの口調や視点で自然に返答してください。

以下のJSON形式のみで出力してください（マークダウンのバッククォート等は含めない）。
{
  "speakerId": "選んだメンバーのid (例: supporter, logical, cheerful, realistic のいずれか)",
  "speakerName": "選んだメンバーの名前 (例: 寄り添いサポーター「みお」)",
  "reply": "キャラクターとしての返答テキスト"
}
    `;

    const response = await generateWithRetry('gemini-3.6-flash', prompt);

    const text = response.text || '';
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleaned);

    return NextResponse.json(result);

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message || 'エラーが発生しました' }, { status: 500 });
  }
}