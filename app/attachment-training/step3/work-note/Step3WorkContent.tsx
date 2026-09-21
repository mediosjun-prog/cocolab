"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Send, CheckCircle2, Calendar } from "lucide-react";
import PageHeader from '@/components/PageHeader';

export default function Step3WorkContent() {
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [date, setDate] = useState(getTodayDate());
  const [situation, setSituation] = useState("");
  const [imessage, setImessage] = useState("");
  const [request, setRequest] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. 新しい記録オブジェクトを作成
    const newEntry = {
      id: Date.now(),
      step: "Step 3",
      title: `素直な気持ちの言語化: ${situation.slice(0, 15)}...`,
      date: date,
      summary: `【状況】${situation} / 【Iメッセージ】${imessage} / 【リクエスト】${request}`,
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
            href="/attachment-training/step3"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Step 3 解説ページへ戻る
          </Link>
        </div>

        {/* ヘッダー */}
        <section className="text-center space-y-4 pt-2 mb-6">
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
            Step 3 実践ワーク
          </span>
          <PageHeader title="素直な気持ちの言語化（Iメッセージとリクエスト）" />
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            人間関係でモヤモヤしたとき、相手を責める（Youメッセージ）のではなく、自分の本音やリクエストを穏やかに整理して伝えるためのワークシートです。
          </p>
        </section>

        {submitted ? (
          /* 投稿完了画面 */
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center">
            <div className="w-12 h-12 bg-emerald-50 text-[#299a0b] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">ワークを記録・保存しました</h2>
            <p className="text-sm text-slate-600 mb-8 leading-relaxed">
              ご自身の本音と相手へのリクエストを丁寧に整理できましたね。記録はマイ日誌に保存され、いつでも見返すことができます。
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
                1. 状況（何があったか？）
              </label>
              <textarea
                rows={3}
                required
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="例：意見が食い違ったときに、相手が急に話を切り上げてしまった。"
                className="w-full rounded-xl border border-slate-200 p-3.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                2. 隠れた本音（Iメッセージ：私はどう感じたか？）
              </label>
              <p className="text-xs text-slate-500 mb-2">例：「私は、途中で話を終わらせられると、拒絶されたように感じて悲しかった」など。</p>
              <textarea
                rows={3}
                required
                value={imessage}
                onChange={(e) => setImessage(e.target.value)}
                placeholder="例：私は、自分の気持ちをしっかり聞いてもらえないと、大切にされていないように感じて不安になる。"
                className="w-full rounded-xl border border-slate-200 p-3.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                3. リクエスト（次にどうしてくれたら安心できるか？）
              </label>
              <textarea
                rows={3}
                required
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                placeholder="例：意見が違うときでも、一度最後まで話を聞いてくれると安心できる。"
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