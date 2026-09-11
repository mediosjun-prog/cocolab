'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

interface LogItem {
  id: string;
  date: string;
  type: 
    | 'ここむすび' 
    | 'ここかこ' 
    | 'ここちょい' 
    | 'ここすれ' 
    | 'ここいく' 
    | 'ここるーむ' 
    | 'ここにっし' 
    | 'ここにわ' 
    | 'ここチェック';
  title: string;
  summary: string;
}
// サンプル履歴データ
const INITIAL_LOGS: LogItem[] = [

];

export default function KokoroguContent() {
  const [logs, setLogs] = useState<LogItem[]>(INITIAL_LOGS);

  // 履歴をクリアする関数
  const handleClearLogs = () => {
    if (window.confirm('これまでの利用履歴をすべてクリアしますか？')) {
      setLogs([]);
    }
  };

  return (
    <main className="w-full pb-20">
      {/* ヘッダーセクション */}
      <section className="relative overflow-hidden from-[#E8F5E9] via-[#F1F8F2] to-[#FDFBF7] py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
            マイログ・履歴
          </span>
          <PageHeader title="こころぐ 〜あなたの心の歩み〜" />
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            ここシリーズのコンテンツを利用した履歴や、ご自身の心の変化の軌跡を振り返るパーソナルスペースです。
          </p>
        </div>
      </section>

      {/* 履歴リストエリア */}
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        
        {/* サマリーカード */}
        <div className="bg-gradient-to-br from-[#F2FBF4] to-[#E8F5E9] border border-[#D1E7D2] rounded-3xl p-6 sm:p-8 flex items-center justify-between shadow-xs">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-700">トータル活動記録</span>
            <h2 className="text-2xl font-extrabold text-[#1F2937]">
              今週のケア回数：<span className="text-emerald-700">{logs.length > 0 ? '3回' : '0回'}</span>
            </h2>
            <p className="text-xs text-[#6B7280]">ご自身のペースで着実に心が整っています。</p>
          </div>
          <div className="text-4xl">🌱</div>
        </div>

        {/* タイムラインヘッダー & クリアボタン */}
        <div className="flex justify-between items-center px-1">
          <h3 className="text-sm font-bold text-[#6B7280]">
            最近の利用・記録履歴
          </h3>
          {logs.length > 0 && (
            <button
              onClick={handleClearLogs}
              className="text-xs text-rose-500 hover:text-rose-700 font-medium underline transition-all"
            >
              履歴をクリアする
            </button>
          )}
        </div>

        {/* 履歴リスト表示 */}
        {logs.length > 0 ? (
          <div className="space-y-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-white border border-[#EFECE6] rounded-2xl p-5 shadow-sm space-y-2 hover:border-emerald-600 transition-all"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-emerald-700 bg-[#E8F5E9] px-2.5 py-0.5 rounded-full">
                    {log.type}
                  </span>
                  <span className="text-[#6B7280]">{log.date}</span>
                </div>
                <h4 className="text-base font-bold text-[#1F2937]">
                  {log.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#4B5563] bg-[#FAFAF8] p-3 rounded-xl border border-[#EFECE6]">
                  {log.summary}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-10 text-center space-y-3">
            <div className="text-3xl">📭</div>
            <p className="text-sm text-[#6B7280] font-medium">
              現在、保存されている履歴はありません。
            </p>
            <p className="text-xs text-[#9CA3AF]">
              「ここすれ」や「ここにわ」などを使ってみましょう！
            </p>
          </div>
        )}

        {/* 導線エリア */}
        <div className="pt-4 space-y-3">
          <Link
            href="/kokonote"
            className="block w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 !text-white text-center rounded-xl font-medium text-sm transition-all shadow-xs"
          >
            ノート（一覧）に戻る
          </Link>
        </div>

      </div>
    </main>
  );
}