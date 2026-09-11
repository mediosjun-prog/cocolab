// app/kokorogu/KokoroguContent.tsx
'use client';

import { useState, useEffect } from 'react';
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
    | 'ここみえ'
    | 'ここすき'
    | 'こここえ'
    | 'ここいく'
    | 'ここるーむ'
    | 'ここにっし'
    | 'ここにわ'
    | 'ここチェック';
  title: string;
  summary: string;
}

export default function KokoroguContent() {
  const [logs, setLogs] = useState<LogItem[]>([]);

  // ページ読み込み時に各ローカルストレージから履歴をかき集めて表示する
  useEffect(() => {
    const loadedLogs: LogItem[] = [];

    try {
      // 1. 「ここすき」の履歴を取得
      const kokosukiData = localStorage.getItem('kokurabo_kokosuki_records');
      if (kokosukiData) {
        const items = JSON.parse(kokosukiData);
        items.forEach((item: any) => {
          const negativesText = [...(item.negatives || []), item.customNegative].filter(Boolean).join('、');
          loadedLogs.push({
            id: `kokosuki-${item.id}`,
            date: item.date ? item.date.split('T')[0] : '',
            type: 'ここすき',
            title: negativesText ? `「${negativesText}」の変換` : 'ここすき変換',
            summary: item.positiveMessage || '',
          });
        });
      }

      // 2. 「ここみえ」の履歴を取得
      const kokomieData = localStorage.getItem('kokomie_history_v1');
      if (kokomieData) {
        const items = JSON.parse(kokomieData);
        items.forEach((item: any) => {
          loadedLogs.push({
            id: `kokomie-${item.id}`,
            date: item.createdAt ? item.createdAt.split('T')[0] : (item.date ? item.date.split('T')[0] : ''),
            type: 'ここみえ',
            title: item.question || '心のパレット',
            summary: item.message ? `選択: ${item.selectedChoice}\n${item.message}` : (item.aiResponse || ''),
          });
        });
      }

      // 日付の新しい順に並び替え
      loadedLogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setLogs(loadedLogs);
    } catch (e) {
      console.error('Failed to load logs', e);
    }
  }, []);

  // 履歴をクリアする関数
  const handleClearLogs = () => {
    if (window.confirm('これまでの利用履歴をすべてクリアしますか？')) {
      localStorage.removeItem('kokurabo_kokosuki_records');
      localStorage.removeItem('kokomie_history_v1');
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
              保存された記録：<span className="text-emerald-700">{logs.length}件</span>
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
              className="text-xs text-rose-500 hover:text-rose-700 font-medium underline transition-all cursor-pointer"
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
                <p className="text-xs sm:text-sm text-[#4B5563] bg-[#FAFAF8] p-3 rounded-xl border border-[#EFECE6] whitespace-pre-wrap">
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
              「ここすき」や「ここみえ」などを使ってみましょう！
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