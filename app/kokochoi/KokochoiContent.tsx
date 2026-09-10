'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

interface Scenario {
  id: string;
  title: string;
  partnerRole: string;
  situation: string;
  initialMessage: string;
  options: {
    text: string;
    aiReply: string;
    feedback: string;
    isGood: boolean;
  }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'busy-partner',
    title: 'ケース1：連絡が減ったパートナー',
    partnerRole: '少しお疲れ気味のパートナー',
    situation: '最近、相手の仕事が忙しく連絡がそっけない。「もしかして嫌われた？」と不安になる場面。',
    initialMessage: '「ごめん、最近仕事立て込んでて連絡返せなくて……。しばらく自分のことでいっぱいいっぱいかも」',
    options: [
      {
        text: '「私のこと嫌いになったの？ 何で連絡してくれないのさっきから不安だったんだよ！」と感情をぶつける',
        aiReply: '「……そんなふうに詰められると、正直もっとしんどくなっちゃう。今はそっとしておいてほしい……」',
        feedback: '【不安型の暴走パターン】不安がピークに達して感情をぶつけると、回避型の相手はさらに殻に閉じこもりがちになってしまいます。',
        isGood: false,
      },
      {
        text: '「そっか、仕事大変だもんね。私のことは気にせず自分のことに集中して！」（と、本当は寂しいのに我慢する）',
        aiReply: '「うん、ありがとう……。心配かけてごめんね。」（本当の気持ちは言えず、すれ違いが残る）',
        feedback: '【自己犠牲・過剰同調パターン】波風は立ちませんが、自分の寂しさにフタをしているため、後でモヤモヤや爆発の火種になってしまいます。',
        isGood: false,
      },
      {
        text: '「伝えてくれてありがとう。大変なんだね。私はいつでも味方だから、落ち着いたらまたお茶でもしよう」と伝える',
        aiReply: '「ありがとう……その言葉ですごく救われる。落ち着いたら絶対連絡するね！」',
        feedback: '【安定型のしなやかな関わり】相手を責めず、かといって自分を犠牲にしない「境界線のある思いやり」が伝わる素晴らしい対応です！',
        isGood: true,
      },
    ],
  },
  {
    id: 'say-no',
    title: 'ケース2：頼まれごとを断れないとき',
    partnerRole: '少し押しが強い同僚・友人',
    situation: '自分のキャパシティがいっぱいのときに、さらに面倒な頼みごとをされた場面。',
    initialMessage: '「ねえ、来週の急ぎの資料まとめ、手伝ってもらえないかな？ 君ならすぐ終わるでしょ！」',
    options: [
      {
        text: '「あ、うーん……まあ、何とかやってみる……」（本当は無理なのに引き受けてしまう）',
        aiReply: '「本当？助かる！じゃあよろしくね！」（後で自分の首を絞めることに……）',
        feedback: '【エンパシー過多・自己犠牲】相手の期待に応えようとして自分のキャパを超えてしまい、慢性的な疲弊や燃え尽きに繋がります。',
        isGood: false,
      },
      {
        text: '「無理に決まってるでしょ！こっちの都合も考えてよ！」と強い口調で突っぱねる',
        aiReply: '「えっ、そんな言い方しなくても……。もう頼まないよ」と気まずい空気になる',
        feedback: '【攻撃・防衛反応】自分の領域を守ろうとするあまり、相手を攻撃する形になってしまい、関係性に摩擦が生じてしまいます。',
        isGood: false,
      },
      {
        text: '「声かけてくれて嬉しいんだけど、今週は自分のタスクがいっぱいで手伝えないんだ。ごめんね！」と伝える',
        aiReply: '「そっか、忙しい時期だもんね。無理言ってごめん、他を当たってみるよ！」',
        feedback: '【アサーティブな境界線】相手を否定せず、自分の状況を穏やかに伝えることで、健全な人間関係の距離感を保てています！',
        isGood: true,
      },
    ],
  },
];

export default function KokochoiContent() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelectScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setSelectedOption(null);
  };

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
  };

  const resetSelection = () => {
    setSelectedScenario(null);
    setSelectedOption(null);
  };

  return (
    <main className="w-full pb-20">
      {/* ヘッダーセクション */}
      <section className="relative overflow-hidden from-[#E8F5E9] via-[#F1F8F2] to-[#FDFBF7] py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
            対話型トレーニング
          </span>
          <PageHeader title="ここちょい 〜AIカウンセラー練武場〜" />
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            人間関係のちょっとした言いづらい場面やすれ違いを、AI相手に安全にロールプレイング（練習）できるスペースです。
          </p>
        </div>
      </section>

      {/* メインコンテンツエリア */}
      <div className="max-w-2xl mx-auto px-4 space-y-8">
        
        {!selectedScenario ? (
          /* シナリオ選択画面 */
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#1F2937] px-1">
              トレーニングするケースを選んでください
            </h2>
            <div className="grid gap-4">
              {SCENARIOS.map((sc) => (
                <div
                  key={sc.id}
                  onClick={() => handleSelectScenario(sc)}
                  className="bg-white border border-[#EFECE6] hover:border-emerald-600 rounded-3xl p-6 shadow-sm transition-all cursor-pointer group space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-emerald-600 bg-[#E8F5E9] px-2.5 py-1 rounded-full">
                      {sc.partnerRole}
                    </span>
                    <span className="text-xs text-[#6B7280] group-hover:text-emerald-600 font-bold transition-all">
                      練習を始める →
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1F2937]">
                    {sc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                    {sc.situation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ロールプレイ対話画面 */
          <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-[#EFECE6] pb-4">
              <span className="text-xs font-bold text-emerald-600 bg-[#E8F5E9] px-3 py-1 rounded-full">
                {selectedScenario.partnerRole}との対話
              </span>
              <button
                onClick={resetSelection}
                className="text-xs text-[#6B7280] hover:text-emerald-600 underline"
              >
                ← シナリオ一覧に戻る
              </button>
            </div>

            {/* AIパートナーからのメッセージ吹出し */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#6B7280]">相手の言葉：</span>
              <div className="bg-[#FAFAF8] border border-[#EFECE6] rounded-2xl p-4 sm:p-5 text-sm sm:text-base text-[#374151] font-medium leading-relaxed">
                {selectedScenario.initialMessage}
              </div>
            </div>

            {/* 自分の返答選択肢 */}
            {selectedOption === null ? (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-[#6B7280] block">あなたならどう返答する？</span>
                {selectedScenario.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className="w-full text-left p-4 rounded-2xl border border-[#EFECE6] hover:border-emerald-600 hover:bg-[#E8F5E9]/30 transition-all text-sm text-[#374151] font-medium leading-relaxed group flex items-start gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F3F4F6] text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center text-xs font-bold transition-all">
                      {idx + 1}
                    </span>
                    <span>{opt.text}</span>
                  </button>
                ))}
              </div>
            ) : (
              /* 返答後のフィードバック結果 */
              <div className="space-y-6 pt-2">
                {/* 自分が選んだ返答 */}
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-4 space-y-1">
                  <span className="text-xs font-bold text-emerald-700">あなたの返答：</span>
                  <p className="text-sm text-[#374151] font-medium">
                    {selectedScenario.options[selectedOption].text}
                  </p>
                </div>

                {/* 相手の反応 */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#6B7280]">相手の反応（AI）：</span>
                  <div className="bg-[#FAFAF8] border border-[#EFECE6] rounded-2xl p-4 text-sm text-[#374151] font-medium">
                    {selectedScenario.options[selectedOption].aiReply}
                  </div>
                </div>

                {/* カウンセラーの解説・フィードバック */}
                <div className={`p-5 rounded-2xl border space-y-2 ${
                  selectedScenario.options[selectedOption].isGood 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                    : 'bg-amber-50/60 border-amber-200 text-amber-900'
                }`}>
                  <span className="text-xs font-bold uppercase tracking-wider block">
                    {selectedScenario.options[selectedOption].isGood ? '✨ 素晴らしいアプローチ！' : '💡 ここを少し工夫するヒント'}
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed font-medium">
                    {selectedScenario.options[selectedOption].feedback}
                  </p>
                </div>

                {/* もう一度挑戦ボタン */}
                <div className="pt-2">
                  <button
                    onClick={() => setSelectedOption(null)}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 !text-white text-center rounded-xl font-medium text-sm transition-all shadow-xs"
                  >
                    別の返答を試してみる
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 導線エリア */}
        <div className="pt-2 space-y-3">
          <Link
            href="/kokosure"
            className="block w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 !text-white text-center rounded-xl font-medium text-sm transition-all shadow-xs"
          >
            🧭 「ここすれ」で心の傾向もチェックしてみる
          </Link>
          <Link
            href="/kokoniwa"
            className="block w-full py-3.5 bg-white border border-emerald-600 text-emerald-700 hover:bg-[#E8F5E9]/50 text-center rounded-xl font-medium text-sm transition-all"
          >
            🌿 「ここにわ」でお庭を眺めて一息つく
          </Link>
        </div>

      </div>
    </main>
  );
}