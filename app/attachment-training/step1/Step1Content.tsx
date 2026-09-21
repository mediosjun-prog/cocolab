"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, CheckCircle2, AlertCircle, BookOpen } from "lucide-react";
import PageHeader from '@/components/PageHeader';

export default function Step1Content() {
  return (
    <main>
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* 戻るリンク */}
        <div className="mb-8">
          <Link
            href="/attachment-training"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            トレーニング一覧へ戻る
          </Link>
        </div>

        {/* ヘッダー */}
       <section className="text-center space-y-4 pt-2 mb-6">
         <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
            Step 1 詳細解説
          </span>
          <PageHeader title="自分の「愛着の癖」に気づく" />
          <p className="text-slate-600 leading-relaxed">
            不安になった時や親密な関係から距離を置きたくなった時、私たちは無意識のうちに特定のパターン（愛着の癖）を発動させています。まずはそのメカニズムを知り、ジャッジせずに観察することから変容が始まります。
          </p>
        </section>

        {/* 本文セクション */}
        <div className="space-y-8 mb-12">
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-[#299a0b]" />
              なぜ「気づくこと」が最初のステップなのか？
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              愛着の癖は、幼少期から何十年もかけて培われてきた「心を守るためのオートマチックな防衛反応」です。そのため、本人は「それが普通（あるいは自分が悪い）」と感じてしまい、無意識に人間関係のすれ違いを繰り返してしまいます。
            </p>
            <p className="text-slate-700 leading-relaxed">
              「あ、今自分は不安型（または回避型）のスイッチが入っているな」と客観的に気づくだけで、自動的な反応と自分の間に「余白」が生まれ、行動を選び直すことができるようになります。
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-[#299a0b]" />
              よくある愛着のトリガーと身体のサイン
            </h2>
            <div className="space-y-4 text-slate-700">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-1">🔴 不安型が発動しやすいサイン</h3>
                <p className="text-sm text-slate-600">
                  既読がつかない、そっけない態度をとられた時に、胸がざわついたり、「嫌われたのではないか」と急に連絡を重ねてしまいたくなる衝動。
                </p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-1">🔵 回避型が発動しやすいサイン</h3>
                <p className="text-sm text-slate-600">
                  相手がグッと距離を縮めてきたり、深い話を求められた時に、急に面倒くさくなったり、頭が真っ白になって話題を変えたくなる衝動。
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-[#299a0b]" />
              今日からできる実践ワーク：トリガー・ノート
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              心がざわついたり、人間関係で強い感情が動いたときは、以下の3つをノートに書き出してみましょう。
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 text-sm sm:text-base ml-2 mb-6">
              <li><strong className="text-slate-900">状況：</strong>何があったか（事実だけをシンプルに）</li>
              <li><strong className="text-slate-900">身体の感覚：</strong>みぞおちが重い、呼吸が浅くなっている等</li>
              <li><strong className="text-slate-900">思考・感情：</strong>「見捨てられるかもしれない」等の思い込み</li>
            </ul>

            {/* 実践ワークノートへのリンク（ボタン配置） */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Link
                href="/attachment-training/step1/work-note" // 実際のワークノートのパスに合わせて変更してください
                className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 !text-white text-sm font-semibold rounded-xl transition-colors"
              >
                実践ワークノートを開く →
              </Link>
            </div>
          </div>
        </div>

        {/* 次のステップへの案内 */}
        <div className="bg-[#FCF8D1] rounded-2xl p-8 text-center">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            次のステップへ進みましょう
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            自分の癖に気づけるようになったら、次は心の中に安全な土台を作っていきます。
          </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/attachment-training/step2"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl bg-emerald-600 hover:bg-emerald-700 !text-white transition-colors shadow-sm"
          >
            Step 2：安心の基地を心の中に作る を見る
          </Link>
          </div>
        </div>

      </div>
    </div>
    </main>
  );
}