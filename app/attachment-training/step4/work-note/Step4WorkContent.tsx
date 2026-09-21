"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Send, CheckCircle2, Calendar } from "lucide-react";
import PageHeader from '@/components/PageHeader';

export default function Step4WorkContent() {
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [date, setDate] = useState(getTodayDate());
  const [suffering, setSuffering] = useState("");
  const [commonHumanity, setCommonHumanity] = useState("");
  const [kindness, setKindness] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. 新しい記録オブジェクトを作成
    const newEntry = {
      id: Date.now(),
      step: "Step 4",
      title: `セルフ・コンパッション・ブレイク: ${suffering.slice(0, 15)}...`,
      date: date,
      summary: `【苦しみ】${suffering} / 【共通の人間性】${commonHumanity} / 【自分への優しさ】${kindness}`,
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
            href="/attachment-training/step4"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Step 4 解説ページへ戻る
          </Link>
        </div>

        {/* ヘッダー */}
          <section className="text-center space-y-4 pt-2 mb-6">
            <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
            Step 4 実践ワーク
          </span>
          <PageHeader title="セルフ・コンパッション・ブレイク" />
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            失敗したり自己嫌悪に陥ったとき、「現状の受容」「共通の人間性の思い出し」「自分への優しい言葉がけ」の3ステップで心を癒やすためのワークシートです。
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
              ご自身を厳しく責めるのではなく、温かく包み込むケアができましたね。記録はマイ日誌に保存され、いつでも見返すことができます。
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
                1. マインドフルネス（今、どんな痛みや苦しさを感じているか？）
              </label>
              <textarea
                rows={3}
                required
                value={suffering}
                onChange={(e) => setSuffering(e.target.value)}
                placeholder="例：仕事でミスをしてしまい、自分が情けなくて落ち込んでいる。"
                className="w-full rounded-xl border border-slate-200 p-3.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                2. 共通の人間性（孤立感の解消）
              </label>
              <p className="text-xs text-slate-500 mb-2">「失敗して落ち込むのは自分だけじゃない。人間なら誰もが経験することだ」と捉え直してみましょう。</p>
              <textarea
                rows={3}
                required
                value={commonHumanity}
                onChange={(e) => setCommonHumanity(e.target.value)}
                placeholder="例：失敗して落ち込むのは私だけじゃない。人間だれしも完璧ではないし、こういう時もある。"
                className="w-full rounded-xl border border-slate-200 p-3.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                3. 自分への優しさ（どんな言葉をかけてあげるか？）
              </label>
              <textarea
                rows={3}
                required
                value={kindness}
                onChange={(e) => setKindness(e.target.value)}
                placeholder="例：今回はよく頑張ったよ。次から気を付ければ大丈夫、自分を責めないであげよう。"
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