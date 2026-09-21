"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Trash2, BookOpen, Sparkles, AlertCircle } from "lucide-react";
import PageHeader from '@/components/PageHeader';

interface JournalEntry {
  id: number;
  step: string;
  title: string;
  date: string;
  summary: string;
}

export default function JournalListPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataUpdated, setDataUpdated] = useState(false); // ← 先にステートを定義

  // マウント時、またはデータ更新時に localStorage からデータを取得
  useEffect(() => {
    try {
      const savedEntries = JSON.parse(localStorage.getItem("attachment_journals") || "[]");
      setEntries(savedEntries);
    } catch (error) {
      console.error("データの読み込みに失敗しました", error);
    } finally {
      setIsLoading(false);
    }
  }, [dataUpdated]);

  // 1件の記録を削除する関数
  const handleDelete = (id: number) => {
    if (window.confirm("この記録を削除してもよろしいですか？")) {
      try {
        const updated = entries.filter((entry) => entry.id !== id);
        localStorage.setItem("attachment_journals", JSON.stringify(updated));
        setEntries(updated);
        setDataUpdated(!dataUpdated);
      } catch (error) {
        console.error("削除に失敗しました", error);
      }
    }
  };

  // すべての記録を削除する関数
  const handleClearAll = () => {
    if (window.confirm("保存されているすべてのワーク日誌を削除しますか？この操作は元に戻せません。")) {
      try {
        localStorage.removeItem("attachment_journals");
        setEntries([]);
      } catch (error) {
        console.error("全件削除に失敗しました", error);
      }
    }
  };

  return (
    <main>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* 戻るリンク */}
          <div className="mb-8">
            <Link
              href="/attachment-training"
              className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              愛着トレーニング TOPへ戻る
            </Link>
          </div>

          {/* ヘッダー */}
          <section className="text-center space-y-4 pt-2 mb-10">
            <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
              マイ・ジャーナル
            </span>
            <PageHeader title="ワーク日誌一覧" />
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              これまでに取り組んだ各ステップのワーク記録を振り返ることができます。ご自身の心の軌跡を眺めてみましょう。
            </p>
          </section>

          {/* コンテンツ部分 */}
          {isLoading ? (
            <div className="text-center py-20 text-slate-500 text-sm">
              読み込み中...
            </div>
          ) : entries.length === 0 ? (
            /* 記録がない場合 */
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center max-w-2xl mx-auto space-y-4">
              <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-950">まだワークの記録がありません</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                各ステップの解説ページから実践ワークに取り組むと、ここに自動で保存されていきます。まずは気になるステップからワークを書いてみましょう。
              </p>
              <div className="pt-4">
                <Link
                  href="/attachment-training"
                  className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 !text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
                >
                  愛着トレーニングのステップを見る
                </Link>
              </div>
            </div>
          ) : (
            /* 記録がある場合一覧表示 */
            <div className="space-y-6">
              
              <div className="flex justify-between items-center px-2">
                <p className="text-sm text-slate-600 font-medium">
                  保存された記録: <span className="font-bold text-slate-900">{entries.length}</span> 件
                </p>
                <button
                  onClick={handleClearAll}
                  className="text-xs text-rose-600 hover:text-rose-700 font-medium transition-colors"
                >
                  すべての記録を削除する
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 transition-all hover:shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#299a0b]">
                          {entry.step}
                        </span>
                        <span className="inline-flex items-center text-xs text-slate-500">
                          <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                          {entry.date}
                        </span>
                      </div>
                      
                      <h3 className="text-base font-bold text-slate-900">
                        {entry.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                        {entry.summary}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-end gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        title="この記録を削除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      </div>
    </main>
  );
}