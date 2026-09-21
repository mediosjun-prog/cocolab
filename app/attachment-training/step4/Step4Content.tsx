"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, CheckCircle2, Heart, Smile } from "lucide-react";
import PageHeader from '@/components/PageHeader';

export default function Step4Content() {
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
            Step 4 詳細解説
          </span>
          <PageHeader title="セルフ・コンパッション（自己慈愛）" />
          <p className="text-slate-600 leading-relaxed">
            獲得安定型を定着させるうえで最も大切なのが、自分自身に対する優しさである「セルフ・コンパッション（自己慈愛）」です。うまくいかない自分を厳しく責めるのをやめ、温かく労わる習慣を身につけていきましょう。
          </p>
        </section>

        {/* 本文セクション */}
        <div className="space-y-8 mb-12">
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-[#299a0b]" />
              なぜ自己批判ではなく「コンパッション」なのか？
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              愛着が不安定な傾向がある人は、人間関係や仕事で失敗したとき、「自分がダメだからだ」「愛されないんだ」と過剰に自分を責めてしまいがちです。しかし、自己批判は心を消耗させるだけで、根本的な解決にはつながりません。
            </p>
            <p className="text-slate-700 leading-relaxed">
              セルフ・コンパッションとは、傷ついたり悩んだりしている自分を、親しい友人に接するように丸ごと受け止め、温かくケアしてあげる心理的アプローチです。
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <Smile className="w-5 h-5 mr-2 text-[#299a0b]" />
              実践したい2つの視点
            </h2>
            <div className="space-y-4 text-slate-700">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-1">1. 「親友モード」で自分に語りかける</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  もし大切な親友が自分と同じミスをしたり、落ち込んでいたりしたら何と声をかけるでしょうか？その優しい言葉を、そのまま自分自身に向けて投げかけてあげます。
                </p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-1">2. 「共通の人間性」を思い出す</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  「失敗したり不安になったりするのは自分だけじゃない。人間なら誰もが経験する自然なことだ」と捉え直すことで、孤独感や過剰なプレッシャーから心を解放します。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-[#299a0b]" />
              今日からできる実践ワーク：セルフ・コンパッション・ブレイク
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              心がざわついたり自己嫌悪に陥ったときは、その場で次の3ステップを心の中で唱えてみましょう。
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 text-sm sm:text-base ml-2">
              <li><strong className="text-slate-900">マインドフルネス（現状の受容）：</strong>「今、自分はすごく苦しいんだな、辛いんだな」と痛みをそのまま認める。</li>
              <li><strong className="text-slate-900">共通の人間性（孤立感の解消）：</strong>「こういう気持ちになるのは自分だけじゃない、人間として自然なことだ」と思う。</li>
              <li><strong className="text-slate-900">自分への優しさ：</strong>「自分に優しくしよう。大丈夫だよ」と心の中で温かく声をかける。</li>
            </ul>
            {/* 実践ワークノートへのリンク（ボタン配置） */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Link
                href="/attachment-training/step4/work-note" // 実際のワークノートのパスに合わせて変更してください
                className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 !text-white text-sm font-semibold rounded-xl transition-colors"
              >
                実践ワークノートを開く →
              </Link>
            </div>
          </div>

        </div>

        {/* 前のステップへの案内 & 完了バナー */}
        <div className="bg-[#FCF8D1] rounded-2xl p-8 text-center">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            4つのステップを終えて
          </h3>
          <p className="text-sm text-slate-600 mb-6 max-w-lg mx-auto leading-relaxed">
            自分の癖に気づき、心の中に安全基地をつくり、安全な関係を体験し、自分を慈しむ。この積み重ねが、あなたの中に「獲得安定型」の土台をしっかりと育ててくれます。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/attachment-training/step3"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              ← Step 3：安全なパートナーシップ へ戻る
            </Link>
            <Link
              href="/attachment-training"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl bg-emerald-600 hover:bg-emerald-700 !text-white transition-colors shadow-sm"
            >
              トレーニング一覧へ戻る
            </Link>
          </div>
        </div>

      </div>
    </div>
    </main>
  );
}