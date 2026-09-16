'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/PageHeader';

interface Question {
  id: number;
  text: string;
  category: 'avoidant' | 'asd';
}

const questions: Question[] = [
  // 回避型（愛着の防衛）傾向を測る質問（全5問）
  { id: 1, text: "人と親密になりそうになると、無意識に距離を置いてしまったり、急に連絡を絶ちたくなることがある。", category: 'avoidant' },
  { id: 2, text: "本当は誰かと心を通わせたい気持ちがあるのに、「どうせ期待しても裏切られる」と思ってしまう。", category: 'avoidant' },
  { id: 3, text: "自分の弱みや本音を他者に見せるのが極端に苦手で、悩みはすべて一人で抱え込みがちだ。", category: 'avoidant' },
  { id: 4, text: "人の機嫌や評価に過剰に敏感で、嫌われるくらいなら最初から関わらないほうが楽だと感じる。", category: 'avoidant' },
  { id: 5, text: "人から好意や優しさを向けられたとき、素直に受け取れず、かえって警戒したり負担に感じてしまう。", category: 'avoidant' },

  // ASD（発達障害）特性の傾向を測る質問（全5問）
  { id: 6, text: "悪気はないのに「ストレートすぎる」「空気が読めない」と言われたり、暗黙のルールに戸惑うことがよくある。", category: 'asd' },
  { id: 7, text: "人付き合いや集団の中にいると、相手の気持ちを察したり合わせたりすることに、人一倍エネルギーが削られる。", category: 'asd' },
  { id: 8, text: "予定の急な変更や、自分のこだわり・ルーティンが乱されることに、強いストレスや居心地の悪さを感じる。", category: 'asd' },
  { id: 9, text: "雑談や世間話が苦手で、要件のみのやり取りのほうが圧倒的に楽だと感じる。", category: 'asd' },
  { id: 10, text: "周囲の騒音や特定の感覚（光や匂いなど）が人一倍気になったり、強い疲労感を覚えたりすることがある。", category: 'asd' }
];

export default function KokoDiagnosisContent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState({ avoidant: 0, asd: 0 });
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (value: number) => {
    const currentQ = questions[currentIndex];
    const newScores = { ...scores };

    if (currentQ.category === 'avoidant') {
      newScores.avoidant += value;
    } else {
      newScores.asd += value;
    }
    setScores(newScores);

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setScores({ avoidant: 0, asd: 0 });
    setIsFinished(false);
  };

  const getResultType = () => {
    const { avoidant, asd } = scores;
    if (avoidant > asd + 2) {
      return {
        title: "「心の防衛（回避型）」優勢タイプ",
        description: "過去の対人関係での傷つきや、「これ以上近づくと危ない」という防衛反応が強く働いている可能性があります。本当はつながりたいのに、傷つくのを守るために距離を取っている状態かもしれません。",
        prescription: "「人を遠ざけたい」のではなく「自分の心を守りたかったんだ」と、その優しすぎる防衛をまずはご自身で認めてあげましょう。安心できる小さな関係から、少しずつ心を緩める練習を。"
      };
    } else if (asd > avoidant + 2) {
      return {
        title: "「認知・感覚特性（ASD傾向）」優勢タイプ",
        description: "脳の情報処理のスタイルや、コミュニケーションの文脈を読み取る仕組みの違いから、人間関係や環境でエネルギーを消耗しやすい状態にある可能性があります。",
        prescription: "「避けている」のではなく「お互いの波長やエネルギーの消耗度が違う」だけ。頑張って周りに合わせるよりも、自分がホッとできる静かな時間や環境を優先してデザインしてあげてください。"
      };
    } else {
      return {
        title: "「複合・重なり合い」タイプ",
        description: "特性によるエネルギーの消耗（ASD傾向）と、人間関係の中で何度も傷ついたことによる防衛（回避型）の両方が、複雑に重なり合っている状態かもしれません。",
        prescription: "「自分のせい」と責める必要はありません。今抱えている生きづらさは、あなたの心と脳が一生懸命サバイブしてきた証拠です。まずは心身を十分に休める時間を最優先にしましょう。"
      };
    }
  };

  const result = getResultType();

  return (
    <main className="w-full pb-20">
      {/* ヘッダー：背景の重なり・ダブりを防ぎ、すっきりした単一グラデーションに調整 */}
      <section className="py-0 px-4 text-center">
        <div className="max-w-6xl mx-auto space-y-4">
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
            セルフ理解ツール
          </span>
          <PageHeader title="ここきょり" />
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            「なぜか人と距離をとってしまう」「人間関係で疲れやすい」その背景にある心や特性の仕組みを優しく紐解きます。
          </p>
        </div>
      </section>

      {/* メインコンテンツエリア */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          {/* 診断中画面 */}
          {!isFinished ? (
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-[#84A98C] mb-4">
                <span>質問 {currentIndex + 1} / {questions.length}</span>
                <span>{Math.round(((currentIndex) / questions.length) * 100)}% 完了</span>
              </div>

              <div className="w-full bg-[#EAEFEA] h-2 rounded-full mb-8 overflow-hidden">
                <div 
                  className="bg-[#52796F] h-full transition-all duration-300"
                  style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
                />
              </div>

              <div className="bg-[#F7F9F8] p-6 rounded-2xl border border-[#D8E6E1] mb-8 min-h-[120px] flex items-center justify-center text-center">
                <p className="text-sm sm:text-base font-medium text-[#2C4A43] leading-relaxed">
                  {questions[currentIndex].text}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleAnswer(2)}
                  className="w-full py-3.5 px-4 bg-white border border-[#52796F] hover:bg-[#52796F] hover:text-white text-[#52796F] font-medium rounded-xl transition-all text-sm shadow-sm"
                >
                  よくあてはまる
                </button>
                <button
                  onClick={() => handleAnswer(1)}
                  className="w-full py-3.5 px-4 bg-white border border-[#84A98C] hover:bg-[#84A98C] hover:text-white text-[#5B7068] font-medium rounded-xl transition-all text-sm shadow-sm"
                >
                  どちらとも言えない
                </button>
                <button
                  onClick={() => handleAnswer(0)}
                  className="w-full py-3.5 px-4 bg-white border border-[#D8E6E1] hover:bg-[#D8E6E1] text-[#5B7068] font-medium rounded-xl transition-all text-sm shadow-sm"
                >
                  あまりあてはまらない
                </button>
              </div>
            </div>
          ) : (
            /* 結果発表画面 */
            <div className="space-y-6 text-left">
              <div className="bg-[#EAEFEA] p-6 rounded-2xl border border-[#D8E6E1] text-center">
                <span className="text-xs font-bold text-[#52796F] uppercase tracking-wider">診断結果</span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#2C4A43] mt-2">
                  {result.title}
                </h2>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#2C4A43] mb-1">【傾向の解説】</h3>
                <p className="text-xs sm:text-sm text-[#5B7068] leading-relaxed">
                  {result.description}
                </p>
              </div>

              <div className="bg-[#F7F9F8] p-5 rounded-2xl border border-[#D8E6E1]">
                <h3 className="text-sm font-bold text-[#52796F] mb-1">💡 ここらぼからの優しい処方箋</h3>
                <p className="text-xs sm:text-sm text-[#5B7068] leading-relaxed">
                  {result.prescription}
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="w-full py-3.5 px-4 bg-[#52796F] hover:bg-[#3E5C52] text-white font-medium rounded-xl transition-all text-sm shadow-sm text-center"
                >
                  もう一度診断する
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}