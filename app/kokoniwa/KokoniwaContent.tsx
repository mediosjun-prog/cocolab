'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';

export default function KokoniwaContent() {
  const [checkedItems, setCheckedItems] = useState({
    walk: false,
    sleep: false,
    relax: false,
  });

  const [waterCount, setWaterCount] = useState(2); 

  // 1. 共通の成長ステージ（0〜5の6段階）を計算する関数
  const getPlantStage = () => {
    const completedCount = Object.values(checkedItems).filter(Boolean).length;
    if (waterCount >= 15 || completedCount === 3) return 5; // 満開
    if (waterCount >= 12) return 4; // 蕾
    if (waterCount >= 8)  return 3; // ツル
    if (waterCount >= 5)  return 2; // 双葉
    if (waterCount >= 3)  return 1; // 芽
    return 0;                       // 種
  };

  const currentStage = getPlantStage();

  // 2. ステージに対応する画像パスのリスト
  const plantImages = [
    '/images/asagao/asagao-1.png', // 種
    '/images/asagao/asagao-2.png', // 芽
    '/images/asagao/asagao-3.png', // 双葉
    '/images/asagao/asagao-4.png', // ツル
    '/images/asagao/asagao-5.png', // 蕾
    '/images/asagao/asagao-6.png', // 満開
  ];

  // 3. ステージに対応するメッセージのリスト
  const stageMessages = [
    '「小さな種をまいたよ。ここからどんな芽が出てくるか楽しみですね。」',
    '「かわいい小さな芽が出てきたね！大切に育てていこう。」',
    '「双葉がしっかり開いて、葉っぱが生き生きしてきたね！」',
    '「ツルが支柱に巻きついて、ぐんぐん大きくなってきたね。」',
    '「小さなつぼみが見えてきたよ！咲くのが待ち遠しいね。」',
    '「わぁ、きれいな朝顔の花が咲いたよ！毎日のケアの成果だね✨」',
  ];

  // 4. 初期メッセージまたは水やり時のメッセージを管理
  const [message, setMessage] = useState(stageMessages[currentStage]);

  // チェックボックス変更時の処理
  const handleCheck = (key: 'walk' | 'sleep' | 'relax') => {
    const updated = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(updated);

    // チェック状態が変わったときも現在のステージに合わせてメッセージを更新
    const newCompletedCount = Object.values(updated).filter(Boolean).length;
    if (newCompletedCount === 3) {
      setMessage('✨ 心の栄養が満タンになりました！お庭の朝顔たちがとても嬉しそうに輝いています。');
    } else {
      setMessage('「ご自身のペースで大丈夫ですよ。ゆっくり心を整えていきましょう。」');
    }
  };

  // 水やり（お世話）ボタン
  const handleWatering = () => {
    setWaterCount((prev) => {
      const nextCount = prev + 1;
      // 水やり後に進む新しいステージに合わせてメッセージを即座に連動させる
      const completedCount = Object.values(checkedItems).filter(Boolean).length;
      let nextStage = 0;
      if (nextCount >= 15 || completedCount === 3) nextStage = 5;
      else if (nextCount >= 12) nextStage = 4;
      else if (nextCount >= 8)  nextStage = 3;
      else if (nextCount >= 5)  nextStage = 2;
      else if (nextCount >= 3)  nextStage = 1;

      setMessage(stageMessages[nextStage]);
      return nextCount;
    });
  };

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
            🌱 庭の成長レベル: ステージ {currentStage + 1}
          </div>

          {/* 庭のキャラクター・植物のシンボルイラスト */}
          <div className="py-10 flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="w-28 h-28 sm:w-36 sm:h-36 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-[#C1E1C2] overflow-hidden animate-bounce-slow">
                <Image
                  src={plantImages[currentStage]}
                  alt="お庭の朝顔"
                  width={112}
                  height={112}
                  className="object-contain w-20 h-20 sm:w-24 sm:h-24 transition-all duration-500"
                  priority
                />
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
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 !text-white text-sm font-bold rounded-full shadow-sm transition-all transform active:scale-95 cursor-pointer"
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