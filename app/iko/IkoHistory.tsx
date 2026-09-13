// app/iko/IkoHistory.tsx
'use client';

import { useState, useEffect } from 'react';
import { getIkoRecords, IkoRecord } from './ikoStorage';

interface IkoHistoryProps {
  onBackToSetup: () => void;
  onStartNew: () => void;
}

export default function IkoHistory({ onBackToSetup, onStartNew }: IkoHistoryProps) {
  const [records, setRecords] = useState<IkoRecord[]>([]);

  useEffect(() => {
    setRecords(getIkoRecords());
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white/85 backdrop-blur-md p-6 rounded-3xl border border-emerald-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
            成長の軌跡
          </span>
          <h2 className="text-xl font-bold text-gray-800 mt-2">過去のシミュレーション履歴</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onBackToSetup}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-2xl transition-all cursor-pointer"
          >
            新規設定へ
          </button>
          <button
            onClick={onStartNew}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-2xl shadow-md transition-all cursor-pointer"
          >
            新しく挑戦する
          </button>
        </div>
      </div>

      {records.length === 0 ? (
        <div className="bg-white/70 backdrop-blur-md p-10 rounded-3xl border border-emerald-100 text-center text-gray-500 space-y-4">
          <p className="text-sm">まだ保存されたシミュレーション履歴がありません。</p>
          <button
            onClick={onStartNew}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-2xl shadow-md transition-all cursor-pointer"
          >
            最初のシミュレーションに挑戦する
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((rec) => (
            <div key={rec.id} className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-100">
                    関係: {rec.relation}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">{rec.date}</span>
                </div>
                <div className="text-xl font-black text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-xl">
                  {rec.score}点
                </div>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <p><strong className="text-gray-700">シチュエーション:</strong> {rec.situation}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs text-gray-700 space-y-1.5">
                <span className="font-bold text-gray-900 block">📝 総評・アドバイス</span>
                <p className="whitespace-pre-wrap leading-relaxed">{rec.totalEvaluation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}