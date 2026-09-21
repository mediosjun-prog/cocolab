"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, CheckCircle2, Heart, Shield } from "lucide-react";
import PageHeader from '@/components/PageHeader';

export default function Step2Content() {
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
            Step 2 詳細解説
          </span>
          <PageHeader title="安心の基地を心の中に作る" />
          <p className="text-slate-600 leading-relaxed">
            安定した愛着を育むためには、外部の人間関係だけに頼るのではなく、自分自身の内側に「ここに戻れば大丈夫」と思える安全な土台（安全基地）をつくることが不可欠です。過去の傷つきを癒やし、内なる安心感を育むアプローチを見ていきましょう。
          </p>
        </section>

        {/* 本文セクション */}
        <div className="space-y-8 mb-12">
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-[#299a0b]" />
              なぜ「心の安全基地」が必要なのか？
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              愛着が不安定な状態にあるときは、「人に嫌われたらどうしよう」「見捨てられるかもしれない」という恐れから、常に心が戦闘モードや緊張状態に置かれています。
            </p>
            <p className="text-slate-700 leading-relaxed">
              心の中に安全な基地（セーフ・プレイス）があると、外側で嵐が起きたとしても、「私にはいつでも戻れる場所がある」という感覚が生まれ、感情の波に飲み込まれにくくなります。
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-[#299a0b]" />
              内なる安全基地を育む2つのアプローチ
            </h2>
            <div className="space-y-4 text-slate-700">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-1">1. インナーチャイルド（内なる子ども）の癒やし</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  過去に我慢したり、傷ついたりした幼少期の自分のイメージに寄り添います。「あの時は怖かったね」「よく頑張ったね」と、当時の自分が必要としていた言葉を、今の大人の自分がかけてあげるワークを行います。
                </p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-1">2. 想像上のセーフ・プレイス（安心の空間）を作る</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  現実の人間関係とは別に、目を閉じれば心からリラックスできる場所（美しい景色、温かい光に包まれた部屋など）を脳内で精巧にイメージし、いつでも安心感をチャージできるようにします。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-[#299a0b]" />
              今日からできる実践ワーク：安心のスイッチを入れる
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              不安や焦りが湧き上がってきたときは、以下の手順で心と身体を落ち着かせるセルフケアを試してみましょう。
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 text-sm sm:text-base ml-2">
              <li><strong className="text-slate-900">深い呼吸：</strong>息をゆっくり吐き出しながら、身体の力が抜けるのを感じる。</li>
              <li><strong className="text-slate-900">身体へのタッチ：</strong>優しく自分の胸や肩に手を当て、手の温もりを意識する。</li>
              <li><strong className="text-slate-900">自己対話：</strong>「大丈夫、今ここに安全にいるよ」と心の中で優しく声をかける。</li>
            </ul>
            {/* 実践ワークノートへのリンク（ボタン配置） */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Link
                href="/attachment-training/step2/work-note" // 実際のワークノートのパスに合わせて変更してください
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
            href="/attachment-training/step1"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            ← Step 1：自分の愛着の癖に気づく へ戻る
          </Link>
           
          <Link
            href="/attachment-training/step3"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl bg-emerald-600 hover:bg-emerald-700 !text-white transition-colors shadow-sm"
          >
            Step 3：安全なパートナーシップ へ進む →
          </Link>
          </div>
        </div>

      </div>
    </div>
    </main>
  );
}