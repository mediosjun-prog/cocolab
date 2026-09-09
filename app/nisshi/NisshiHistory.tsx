// app/nisshi/NisshiHistory.tsx
'use client';

import { NisshiRecord } from './nisshiStorage';
import Image from 'next/image';

interface NisshiHistoryProps {
  records: NisshiRecord[];
  onSelectRecord: (record: NisshiRecord) => void;
}

const weatherLabels: Record<string, string> = {
  sunny: '晴れ',
  cloudy: 'くもり',
  rainy: '雨',
  snowy: '雪',
};

const animalImages: Record<string, string> = {
  cat: '/images/nisshi/animal-cat.png',
  dog: '/images/nisshi/animal-dog.png',
  rabbit: '/images/nisshi/animal-rabbit.png',
  bear: '/images/nisshi/animal-bear.png',
  hedgehog: '/images/nisshi/animal-hedgehog.png',
  sheep: '/images/nisshi/animal-sheep.png',
};

export default function NisshiHistory({ records, onSelectRecord }: NisshiHistoryProps) {
  if (records.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm">
        まだ保存された日誌はありません。今日の日記をつけてみましょう！
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-md font-bold text-gray-800 flex items-center gap-2">
        📖 過去の心の日記一覧 ({records.length}件)
      </h3>
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {records.map((record) => {
          const animalImg = animalImages[record.animal] || '/images/nisshi/animal-cat.png';
          const percentage = record.scoreData?.percentage || 70;

          return (
            <div
              key={record.id}
              onClick={() => onSelectRecord(record)}
              className="p-4 bg-white/70 hover:bg-white rounded-2xl border border-emerald-100 shadow-sm transition-all cursor-pointer flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                {/* 小さな動物アイコン */}
                <div className="w-12 h-12 relative bg-emerald-50 rounded-full p-2 flex items-center justify-center border border-emerald-100 flex-shrink-0">
                  <Image src={animalImg} alt={record.animal} fill className="object-contain p-1.5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-semibold text-gray-700">{record.date}</span>
                    <span>•</span>
                    <span>天気: {weatherLabels[record.weather] || record.weather}</span>
                  </div>
                  <p className="text-xs font-bold text-emerald-800 line-clamp-1">
                    "{record.scoreData?.message || '今日もよく頑張ったね'}"
                  </p>
                </div>
              </div>

              {/* パーセンテージの簡易表示 */}
              <div className="text-right flex-shrink-0">
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  {percentage}% 満ちてます
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}