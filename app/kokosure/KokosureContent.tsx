'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

interface Question {
  id: number;
  situation: string;
  options: {
    text: string;
    type: 'anxious' | 'avoidant' | 'empathy' | 'secure';
    feedback: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    situation: 'パートナーや親しい人にLINEを送ったのに、既読がついたまま半日以上返信がないとき、あなたならどうする？',
    options: [
      {
        text: '「何か気に障る事言ったかな…？」と不安になり、追撃のメッセージを送ってしまう',
        type: 'anxious',
        feedback: '【不安型こじらせ傾向】相手の反応に心が引っ張り回され、「見捨てられ不安」が爆発しやすいモードです。',
      },
      {
        text: '「どうせ自分なんて…」と殻に閉じこもり、自分も連絡を絶ってしまう',
        type: 'avoidant',
        feedback: '【回避×防御傾向】傷つくのを恐れて先回りして距離を置き、心の壁を作ってしまうパターンです。',
      },
      {
        text: '「忙しいのかな」と思いつつも、モヤモヤして仕事や家事が手につかなくなる',
        type: 'empathy',
        feedback: '【エンパシー過多傾向】相手の状況を察しようとしすぎて、自分のエネルギーを過剰に消費してしまいます。',
      },
      {
        text: '「まあ忙しいか」と自分の趣味ややることに集中して、気長に待つ',
        type: 'secure',
        feedback: '【安定型バランス】相手と自分の境界線がしっかりしており、適度な距離感を保てている状態です。',
      },
    ],
  },
  {
    id: 2,
    situation: '仕事や日常でイライラしている様子のパートナー。あなたに直接の原因はなさそうだけど、機嫌が悪そう…どうする？',
    options: [
      {
        text: '「私のせい…？」と気になって、機嫌を取ろうと必死に笑顔で話しかけてしまう',
        type: 'anxious',
        feedback: '【不安・過剰同調傾向】相手の機嫌の悪さを自分の責任として背負い込んでしまいがちです。',
      },
      {
        text: '面倒に巻き込まれたくないので、なるべく視界に入らないように静かに過ごす',
        type: 'avoidant',
        feedback: '【回避型傾向】摩擦や衝突を極限まで避けるあまり、深いサポートの機会を逃してしまいます。',
      },
      {
        text: '相手のイライラをもろに貰ってしまい、自分までどっと疲れてしまう',
        type: 'empathy',
        feedback: '【エンパシー過多傾向】相手の感情の境界線が自分に入り込み、共感疲労を起こしやすい状態です。',
      },
      {
        text: '「何かあった？」と一言だけ優しく声をかけ、あとはそっとしておく',
        type: 'secure',
        feedback: '【安定型バランス】適切な距離感を保ちながらも、見捨てていない安心感を相手に与えられます。',
      },
    ],
  },
  {
    id: 3,
    situation: 'デートや約束の直前になって、相手から「体調が悪い（または仕事が長引いた）から、リスケしてほしい」と言われたとき、内心どう感じる？',
    options: [
      {
        text: '「本当は会いたくない口実なんじゃ…」と裏を勘ぐって落ち込んでしまう',
        type: 'anxious',
        feedback: '【不安型傾向】ちょっとした予定変更も「拒絶されたサイン」と過剰に受け取ってしまいがちです。',
      },
      {
        text: '「お、一人の時間ができたラッキー」と、内心ホッとして自分の時間を楽しむ',
        type: 'avoidant',
        feedback: '【回避型傾向】一人の空間や自由が確保されることに強い安心感を覚える防衛パターンです。',
      },
      {
        text: '「無理して合わせてくれてたのかな…私の方こそ気づけなくてごめん」と自分を責める',
        type: 'empathy',
        feedback: '【エンパシー過多傾向】相手の事情をすべて自分の配慮不足のせいにしがちです。',
      },
      {
        text: '「お疲れ様！お大事にしてね。また元気な時に会おう」と気負わず返信する',
        type: 'secure',
        feedback: '【安定型バランス】相手の状況をフラットに受け止め、余計なプレッシャーを与えません。',
      },
    ],
  },
  {
    id: 4,
    situation: '自分の意見や不満を相手に伝えたいとき、あなたはどうやって伝えることが多い？',
    options: [
      {
        text: '嫌われるのが怖くて我慢し続けるが、限界を迎えると感情的に爆発してしまう',
        type: 'anxious',
        feedback: '【不安・爆発型】日頃の我慢がキャパオーバーになり、感情のコントロールが難しくなりやすいです。',
      },
      {
        text: '波風を立てるくらいなら、自分の意見は飲み込んで心の中にしまい込む',
        type: 'avoidant',
        feedback: '【回避・沈黙型】衝突を避けるために本音を隠し、心のシャッターを下ろしてしまいます。',
      },
      {
        text: '相手が気を悪くしないように、遠回しに、かつ自分の罪悪感を抱えながら伝える',
        type: 'empathy',
        feedback: '【エンパシー過多傾向】相手の感情を過剰に守ろうとして、伝えたい本質がぼやけてしまいます。',
      },
      {
        text: '「私はこう感じたよ」と、責めずに自分の気持ちを落ち着いて言葉にする',
        type: 'secure',
        feedback: '【安定型バランス】アサーティブ（お互いを尊重した）なコミュニケーションが取れています。',
      },
    ],
  },
  {
    id: 5,
    situation: 'あなたにとって、「誰かと深く親密になること」とは、率直に言うとどんなイメージ？',
    options: [
      {
        text: 'いつかいなくなるかもしれないという不安と、べったり甘えたい気持ちが同居している',
        type: 'anxious',
        feedback: '【不安型】愛されたい欲求と見捨てられ恐怖のジレンマを抱えやすい傾向があります。',
      },
      {
        text: '心地よいこともあるけれど、深入りしすぎると自分の領域が侵されてしんどい',
        type: 'avoidant',
        feedback: '【回避型】一定の距離感を保ち、自分のコントロール下で関係を築きたい欲求が強いです。',
      },
      {
        text: '相手の重荷になっていないか、常に気を遣いすぎて疲れてしまうもの',
        type: 'empathy',
        feedback: '【エンパシー過多】人間関係が「尽くす・我慢する」の構図になりがちです。',
      },
      {
        text: 'お互いを尊重しつつ、支え合える安心できる居場所',
        type: 'secure',
        feedback: '【安定型】人間関係に対してポジティブで柔軟な信頼感を持てています。',
      },
    ],
  },
];

export default function KokosureContent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (type: string) => {
    setSelectedAnswers([...selectedAnswers, type]);
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setIsFinished(false);
  };

  const getResultType = () => {
    const counts: Record<string, number> = { anxious: 0, avoidant: 0, empathy: 0, secure: 0 };
    selectedAnswers.forEach((ans) => {
      counts[ans] = (counts[ans] || 0) + 1;
    });
    const maxKey = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
    
    switch (maxKey) {
      case 'anxious':
        return {
          title: '「不安型こじらせ」タイプ',
          desc: '相手の反応や愛情のバロメーターに心が大きく揺さぶられやすい状態です。「自分は愛されているか」の不安を、少しずつ自分でなだめる（セルフ・スージング）練習をしてみましょう。',
        };
      case 'avoidant':
        return {
          title: '「回避・自己防衛」タイプ',
          desc: '傷つくのを恐れて、無意識に心にシャッターを下ろしてしまう傾向があります。たまには小さな本音や弱音を言葉にしてみるのが、関係を深めるカギです。',
        };
      case 'empathy':
        return {
          title: '「エンパシー過多（燃え尽き）」タイプ',
          desc: '他人の感情や機嫌を自分のことのように背負い込んでしまいがちです。「相手の感情」と「自分の感情」の間に、優しく境界線を引く練習をしましょう。',
        };
      default:
        return {
          title: '「しなやか安定」タイプ',
          desc: '自分と相手の距離感を心地よく保てているバランス派です。その安心感をベースに、周りの人たちの心もそっと温めてあげられる存在です。',
        };
    }
  };

  return (
    <main className="w-full pb-20">
      {/* ヘッダーセクション */}
      <section className="relative overflow-hidden from-[#E8F5E9] via-[#F1F8F2] to-[#FDFBF7] py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
            2分でわかる心理テスト
          </span>
          <PageHeader title="ここすれ" />
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            人間関係のよくある5つのワンシーン。あなたならどう動く？ 選択肢を通じて、無意識の愛着パターンや心のくせを楽しく紐解きます。
          </p>
        </div>
      </section>

      {/* メインゲームエリア */}
      <div className="max-w-4xl mx-auto px-4">
        {!isFinished ? (
          <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            {/* 進捗バー */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#6B7280]">
                <span>QUESTION {currentStep + 1} / {QUESTIONS.length}</span>
                <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% 完了</span>
              </div>
              <div className="w-full bg-[#F3F4F6] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* シチュエーション */}
            <div className="bg-[#FAFAF8] p-5 rounded-2xl border border-[#EFECE6]">
              <h2 className="text-base sm:text-lg font-bold text-[#1F2937] leading-relaxed">
                {QUESTIONS[currentStep].situation}
              </h2>
            </div>

            {/* 選択肢 */}
            <div className="space-y-3">
              {QUESTIONS[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt.type)}
                  className="w-full text-left p-4 rounded-2xl border border-[#EFECE6] hover:border-[#446246] hover:bg-[#E8F5E9]/30 transition-all text-sm text-[#374151] font-medium leading-relaxed group flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F3F4F6] text-[#446246] group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center text-xs font-bold transition-all">
                    {idx + 1}
                  </span>
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* 結果画面 */
          <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-center">
            <div className="inline-block bg-[#E8F5E9] text-[#446246] text-xs font-bold px-3 py-1 rounded-full">
              診断結果発表
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#1F2937]">
                あなたの傾向は…
              </h2>
              <div className="text-xl font-extrabold text-[#446246] pt-2">
                {getResultType().title}
              </div>
            </div>

            <p className="text-sm text-[#4B5563] leading-relaxed bg-[#FAFAF8] p-5 rounded-2xl border border-[#EFECE6] text-left">
              {getResultType().desc}
            </p>

            <div className="pt-4 space-y-3">
              <Link
                href="/cases"
                className="block w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 !text-white text-center rounded-xl font-medium text-sm transition-all shadow-xs"
              >
                📚 似た事例（ケーススタディ）を詳しく見てみる
              </Link>
              <Link
                href="/kokoroom"
                className="block w-full py-3.5 bg-white border border-[#446246] text-[#446246] hover:bg-[#E8F5E9]/50 text-center rounded-xl font-medium text-sm transition-all"
              >
                💬 ここるーむで自分の気持ちを対話練習する
              </Link>
              <button
                onClick={resetQuiz}
                className="text-xs text-[#6B7280] hover:text-[#446246] underline pt-2"
              >
                もう一度診断しなおす
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}