'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export default function KokoniwaContent() {
  // 今日のケア記録の状態
  const [checkedItems, setCheckedItems] = useState({
    walk: false,
    sleep: false,
    relax: false,
  });

  const [waterCount, setWaterCount] = useState(2); // お世話・水やりカウンター
  const [message, setMessage] = useState('「今日もよくここまで歩きましたね。お疲れさまです。」');

  // チェックボックス変更時の処理
  const handleCheck = (key: 'walk' | 'sleep' | 'relax') => {
    const updated = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(updated);

    // すべて完了したときのメッセージ
    if (updated.walk && updated.sleep && updated.relax) {
      setMessage('✨ 心の栄養が満タンになりました！お庭の植物たちがとても嬉しそうに輝いています。');
    } else {
      setMessage('「ご自身のペースで大丈夫ですよ。ゆっくり心を整えていきましょう。」');
    }
  };

  // 水やり（お世話）ボタン
  const handleWatering = () => {
    setWaterCount((prev) => prev + 1);
    const comments = [
      '「お水をありがとう！なんだか葉っぱが生き生きしてきたよ。」',
      '「深呼吸をひとつ。あなたのペースで進みましょう。」',
      '「今日もよく頑張りましたね。自分をたくさん褒めてあげてください。」',
      '「ここにわの木が少し大きくなった気がする…！」',
    ];
    setMessage(comments[Math.floor(Math.random() * comments.length)]);
  };

  // 完了したケアの数に応じて庭の成長度（ステージ）を決定
  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <main className="w-full pb-20">
      {/* ヘッダーセクション */}
      <section className="relative overflow-hidden from-[#E8F5E9] via-[#F1F8F2] to-[#FDFBF7] py-16 px-4 text-center">
        <div className="max-w-6xl mx-auto space-y-4 relative z-10">
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
            デジタル癒やし庭園
          </span>
          <PageHeader title="ここにわ" />
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            日々の小さなセルフケア（歩く、眠る、心を緩める）を記録すると、あなたのお庭の植物や相棒がすくすく育つ癒やしのスペースです。
          </p>
        </div>
      </section>

      {/* メインコンテンツエリア */}
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        
        {/* お庭のビジュアルエリア */}
        <div className="bg-gradient-to-b from-[#F2FBF4] to-[#E8F5E9] border border-[#D1E7D2] rounded-3xl p-6 sm:p-8 text-center shadow-xs relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-[#446246] border border-[#C1E1C2]">
            🌱 庭の成長レベル: ステージ {completedCount + 1}
          </div>

        {/* 庭のキャラクター・植物のシンボルイラスト（絵文字・CSS表現） */}
        <div className="py-10 flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-28 h-28 sm:w-36 sm:h-36 bg-white rounded-full flex items-center justify-center text-6xl sm:text-7xl shadow-md border-4 border-[#C1E1C2] animate-bounce-slow">
              {completedCount === 3 ? '🌳✨' : completedCount >= 1 ? '🌿' : '🌱'}
            </div>
            {/* 水やりエフェクトなどの装飾 */}
            <span className="absolute -bottom-2 -right-2 bg-emerald-600 text-white text-xs px-2.5 py-1 rounded-full shadow-xs">
              水やり {waterCount}回
            </span>
          </div>

          {/* 相棒からのメッセージ吹出し */}
          <div className="bg-white/90 backdrop-blur-xs border border-[#D1E7D2] rounded-2xl p-4 max-w-md shadow-xs">
            <p className="text-xs sm:text-sm text-[#374151] font-medium leading-relaxed">
              {message}
            </p>
          </div>
        </div>

          {/* 水やりボタン */}
          <button
            onClick={handleWatering}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 !text-white text-sm font-bold rounded-full shadow-sm transition-all transform active:scale-95"
          >
            💧 ここにわに「お水（労い）」をあげる
          </button>
        </div>

        {/* 本日のセルフケアチェックイン */}
        <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-[#1F2937]">
              本日のセルフケア・チェックイン
            </h2>
            <p className="text-xs text-[#6B7280]">
              今日できたことにチェックを入れると、心のエネルギーが充電されます。
            </p>
          </div>

          <div className="space-y-3">
            {/* チェック1：歩数・運動 */}
            <label className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
              checkedItems.walk ? 'bg-[#E8F5E9]/50 border-[#446246]' : 'bg-[#FAFAF8] border-[#EFECE6] hover:border-[#D1E7D2]'
            }`}>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={checkedItems.walk}
                  onChange={() => handleCheck('walk')}
                  className="w-5 h-5 accent-[#446246] rounded-md cursor-pointer"
                />
                <div>
                  <span className="text-sm font-bold text-[#1F2937] block">👟 ウォーキングや軽い運動をした</span>
                  <span className="text-xs text-[#6B7280]">例：日常の歩きや1万歩の意識など</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#446246]">{checkedItems.walk ? '達成！＋1' : ''}</span>
            </label>

            {/* チェック2：睡眠 */}
            <label className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
              checkedItems.sleep ? 'bg-[#E8F5E9]/50 border-[#446246]' : 'bg-[#FAFAF8] border-[#EFECE6] hover:border-[#D1E7D2]'
            }`}>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={checkedItems.sleep}
                  onChange={() => handleCheck('sleep')}
                  className="w-5 h-5 accent-[#446246] rounded-md cursor-pointer"
                />
                <div>
                  <span className="text-sm font-bold text-[#1F2937] block">💤 しっかり睡眠をとった・体を休めた</span>
                  <span className="text-xs text-[#6B7280]">例：睡眠の質を意識した夜の過ごし方</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#446246]">{checkedItems.sleep ? '達成！＋1' : ''}</span>
            </label>

            {/* チェック3：心を緩める */}
            <label className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
              checkedItems.relax ? 'bg-[#E8F5E9]/50 border-[#446246]' : 'bg-[#FAFAF8] border-[#EFECE6] hover:border-[#D1E7D2]'
            }`}>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={checkedItems.relax}
                  onChange={() => handleCheck('relax')}
                  className="w-5 h-5 accent-[#446246] rounded-md cursor-pointer"
                />
                <div>
                  <span className="text-sm font-bold text-[#1F2937] block">🍵 心を緩める時間を作った</span>
                  <span className="text-xs text-[#6B7280]">例：深呼吸、好きな飲み物、デジタルデトックス</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#446246]">{checkedItems.relax ? '達成！＋1' : ''}</span>
            </label>
          </div>
        </div>

        {/* 導線エリア */}
        <div className="pt-2 space-y-3">
          <Link
            href="/kokosure"
            className="block w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 !text-white text-center rounded-xl font-medium text-sm transition-all shadow-xs"
          >
            🧭 「ここすれ」で心の傾向もチェックしてみる
          </Link>
          <Link
            href="/kokoroom"
            className="block w-full py-3.5 bg-white border border-[#446246] text-[#446246] hover:bg-[#E8F5E9]/50 text-center rounded-xl font-medium text-sm transition-all"
          >
            💬 ここるーむで今日のモヤモヤを吐き出してみる
          </Link>
        </div>

      </div>
    </main>
  );
}