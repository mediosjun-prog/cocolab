"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Send, CheckCircle2, Calendar } from "lucide-react";
import PageHeader from '@/components/PageHeader';

export default function Step2WorkContent() {
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [date, setDate] = useState(getTodayDate());
  const [triggerEvent, setTriggerEvent] = useState("");
  const [soothingAction, setSoothingAction] = useState("");
  const [reflection, setReflection] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. 新しい記録オブジェクトを作成
    const newEntry = {
      id: Date.now(),
      step: "Step 2",
      title: `安心のスイッチ: ${soothingAction.slice(0, 15)}...`,
      date: date,
      summary: `【出来事】${triggerEvent} / 【実践】${soothingAction} / 【変化】${reflection}`,
    };

    // 2. ブラウザの localStorage に保存
    try {
      const existingEntries = JSON.parse(localStorage.getItem("attachment_journals") || "[]");
      const updatedEntries = [newEntry, ...existingEntries];
      localStorage.setItem("attachment_journals", JSON.stringify(updatedEntries));
    } catch (error) {
      console.error("保存に失敗しました", error);
    }

    setSubmitted(true);
  };

  return (
    <main>
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* 戻るリンク */}
        <div className="mb-8">
          <Link
            href="/attachment-training/step2"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Step 2 解説ページへ戻る
          </Link>
        </div>

        {/* ヘッダー */}
        <section className="text-center space-y-4 pt-2 mb-6">
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
            Step 2 実践ワーク
          </span>
          <PageHeader title="安心のスイッチ（セルフ・スージング）" />
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            不安や焦りが湧いたときに、自分で自分の心身を落ち着かせるための「安心のスイッチ（身体へのアプローチやセルフ・トーク）」を実践し、その効果を記録するワークシートです。
          </p>
        </section>

        {submitted ? (
          /* 投稿完了画面 */
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center">
            <div className="w-12 h-12 bg-emerald-50 text-[#299a0b] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">安心のスイッチを記録しました</h2>
            <p className="text-sm text-slate-600 mb-8 leading-relaxed">
              ご自身で安心感を作り出す体験を丁寧に積み重ねられましたね。記録はマイ日誌に保存され、いつでも見返すことができます。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
              >
                もう一度新しい記録を書く
              </button>
              <Link
                href="/attachment-training/journal"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 !text-white text-sm font-semibold rounded-xl transition-colors"
              >
                ワーク日誌一覧で見返す →
              </Link>
            </div>
          </div>
        ) : (
          /* 入力フォーム */
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-10 space-y-6">
            
            {/* 日付入力フィールド */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2 flex items-center">
                <Calendar className="w-4 h-4 mr-1.5 text-indigo-600" />
                記録日
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full sm:w-auto rounded-xl border border-slate-200 p-3 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                1. どんな時・出来事で不安や焦りを感じたか？
              </label>
              <textarea
                rows={3}
                required
                value={triggerEvent}
                onChange={(e) => setTriggerEvent(e.target.value)}
                placeholder="例：予定の変更を急に告げられ、頭が真っ白になった。"
                className="w-full rounded-xl border border-slate-200 p-3.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                2. どんな「安心のスイッチ」を実践したか？
              </label>
              <p className="text-xs text-slate-500 mb-2">例：胸に手を当ててゆっくり3回深呼吸した、「大丈夫、なんとかなる」と声をかけた、など。</p>
              <textarea
                rows={3}
                required
                value={soothingAction}
                onChange={(e) => setSoothingAction(e.target.value)}
                placeholder="例：両手を胸に当てて、温かさを感じながら深呼吸を5回繰り返した。"
                className="w-full rounded-xl border border-slate-200 p-3.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                3. 実践してみて、心身にどんな変化があったか？
              </label>
              <textarea
                rows={3}
                required
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="例：肩の力が抜け、呼吸が深くなって脈拍が落ち着いた。"
                className="w-full rounded-xl border border-slate-200 p-3.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 !text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
              >
                <Send className="w-4 h-4 mr-2" />
                この内容で記録・保存する
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
    </main>
  );
}