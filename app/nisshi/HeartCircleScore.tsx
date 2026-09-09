// app/nisshi/HeartCircleScore.tsx
'use client';

import Image from 'next/image';

interface HeartCircleScoreProps {
  percentage: number; // 0 〜 100
  message: string;
  animal: string;
}

const animalImages: Record<string, string> = {
  cat: '/images/nisshi/animal-cat.png',
  dog: '/images/nisshi/animal-dog.png',
  rabbit: '/images/nisshi/animal-rabbit.png',
  bear: '/images/nisshi/animal-bear.png',
  hedgehog: '/images/nisshi/animal-hedgehog.png',
  sheep: '/images/nisshi/animal-sheep.png',
};

export default function HeartCircleScore({ percentage, message, animal }: HeartCircleScoreProps) {
  // SVG円の計算 (半径 r = 40, 周長 = 2 * π * 40 ≈ 251.2)
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const animalImg = animalImages[animal] || '/images/nisshi/animal-cat.png';

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-emerald-50/60 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* 背景の薄いサークル */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="text-emerald-100"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
          />
          {/* 進捗（スコア）に応じて満ちるサークル */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="text-emerald-500 transition-all duration-1000 ease-out"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>

        {/* 中央の動物アイコンとちょっとした演出 */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 relative bg-white/80 rounded-full shadow-sm p-1 flex items-center justify-center mb-1">
            <Image src={animalImg} alt={animal} fill className="object-contain p-1" />
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-white/90 px-2 py-0.5 rounded-full shadow-xs">
            {percentage === 100 ? '満タン日和♪' : '心を整える時間'}
          </span>
        </div>
      </div>

      {/* 動物からのショートメッセージ */}
      <div className="text-center space-y-1">
        <p className="text-sm font-bold text-gray-800 flex items-center justify-center gap-1.5">
          <span>🌿</span> {message}
        </p>
        <p className="text-xs text-gray-500">
          今のあなたの心模様に合わせた、優しいバランスです。
        </p>
      </div>
    </div>
  );
}