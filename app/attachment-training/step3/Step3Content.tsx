"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, CheckCircle2, MessageCircle, Users } from "lucide-react";
import PageHeader from '@/components/PageHeader';

export default function Step3Content() {
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
            Step 3 詳細解説
          </span>
          <PageHeader title="安全なパートナーシップを体験する" />
          <p className="text-slate-600 leading-relaxed">
            自分の愛着の癖に気づき、心の中に安全基地が育ってきたら、次は現実の人間関係やパートナーシップの中で「安全な絆」を小さく体験していくステップです。安心感のあるコミュニケーションの取り方を紐解いていきましょう。
          </p>
        </section>

        {/* 本文セクション */}
        <div className="space-y-8 mb-12">
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-[#299a0b]" />
              人間関係を通じて愛着は上書きできる
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              過去の人間関係で傷ついた心は、安全で安心できる「今の人間関係」の経験を通じて少しずつ癒やされていきます。これを心理学では「修正体験」と呼びます。
            </p>
            <p className="text-slate-700 leading-relaxed">
              「感情を率直に伝えても、相手は怒ったり見捨てたりしない」「お互いに違いを認め合える」という安心感を体験することが、獲得安定型への大きな後押しとなります。
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-[#299a0b]" />
              実践したい2つのコミュニケーションスキル
            </h2>
            <div className="space-y-4 text-slate-700">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-1">1. 「Youメッセージ」から「Iメッセージ」へ</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  「どうして連絡してくれないの！（相手を責める・Youメッセージ）」ではなく、「私は連絡がないと不安になってしまうんだ（自分の気持ちを伝える・Iメッセージ）」という表現に言い換えます。
                </p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-1">2. お互いの「境界線（バウンダリー）」を尊重する</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  相手を自分の思い通りに変えようとしたり、自分の不安をすべて相手に背負わせたりするのではなく、「相手には相手のペースがある」という健全な境界線を引いたうえでつながりを持ちます。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-[#299a0b]" />
              今日からできる実践ワーク：素直な気持ちの言語化
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              人間関係でモヤモヤしたり、イライラしたときは、相手にぶつける前に自分の本音を整理してみましょう。
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 text-sm sm:text-base ml-2">
              <li><strong className="text-slate-900">事実の確認：</strong>相手は実際にどんな行動をとったか？</li>
              <li><strong className="text-slate-900">隠れた本音：</strong>その裏で、自分はどんな不安や寂しさを感じていたか？</li>
              <li><strong className="text-slate-900">リクエスト：</strong>相手に対して、次にどうしてくれたら安心できるか？</li>
            </ul>
            {/* 実践ワークノートへのリンク（ボタン配置） */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Link
                href="/attachment-training/step3/work-note" // 実際のワークノートのパスに合わせて変更してください
                className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 !text-white text-sm font-semibold rounded-xl transition-colors"
              >
                実践ワークノートを開く →
              </Link>
            </div>
          </div>

        </div>

        {/* 前後のステップへの案内 */}
        <div className="bg-[#FCF8D1] rounded-2xl p-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/attachment-training/step2"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            ← Step 2：安心の基地を心の中に作る へ戻る
          </Link>
          <Link
            href="/attachment-training/step4"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl bg-emerald-600 hover:bg-emerald-700 !text-white transition-colors shadow-sm"
          >
            Step 4：セルフ・コンパッション へ進む →
          </Link>
        </div>
        </div>
      </div>
    </div>
    </main>
  );
}