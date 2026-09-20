"use client";

import Image from 'next/image';
import React from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Shield, Users, RefreshCw } from "lucide-react";
import PageHeader from '@/components/PageHeader';

export default function AttachmentContent() {
  return (
    <main className="w-full p-4 md:p-8">
    <div className="min-h-screen from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto"> 

        {/* ヘッダーセクション */}
        <section className="text-center space-y-4 pt-2 mb-6">
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
            愛着の概要
          </span>
          <PageHeader title="愛着について〜人間関係の土台を知る" />
          <p className="text-lg text-slate-600 leading-relaxed">
            私たちがパートナーや友人、家族との間で感じる「不安」や「安心感」は、幼少期からの「愛着スタイル」に深く根ざしています。愛着の仕組みを知ることで、人間関係のパターンを紐解き、より健やかな絆を築くヒントが見えてきます。
          </p>
       </section>

        {/* メインコンテンツ：愛着スタイルとは */}
        <div className="space-y-8">
          
          {/* セクション 1 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">愛着スタイル（アタッチメント）とは？</h2>
            </div>

            {/* コンテンツと画像を左右（スマホでは上下）に配置するレイアウト */}
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* 画像部分（PCは右側 / スマホはセンター寄せ） */}
              <div className="w-full md:w-72 flex justify-center md:justify-end shrink-0">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src="/images/attachment-about2.png" // 実際の画像パスに変更してください
                    alt="愛着スタイルについて"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
              </div>              
              {/* テキスト部分 */}
              <div className="flex-1 space-y-4">
                <p className="text-slate-700 leading-relaxed">
                  イギリスの精神科医ジョン・ボウルビィによって提唱された愛着理論は、人が他者と親密な絆を結ぶ基本的な心理的メカニズムを説明するものです。大人になってからの恋愛や対人関係の癖も、この愛着スタイルが大きな影響を与えていると言われています。
                </p>
                <p className="text-slate-700 leading-relaxed">
                  愛着スタイルは大きく「安定型」と、それに伴う「不安型」「回避型」「恐れ・回避型（未解決型）」などの不安定なタイプに分類されることがあります。
                </p>
              </div>
            </div>
            </section>

        <div className="mt-12 text-center">
          <Link
            href="/cases"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl bg-emerald-600 hover:bg-emerald-700 !text-white transition-colors shadow-sm"
          >
            愛着タイプの事例を見る
          </Link>
        </div>



          {/* セクション 2：主なタイプ */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">代表的な4つの愛着パターン</h2>
            </div>
            
            <div className="relative w-full aspect-square sm:aspect-auto sm:h-[570px] mb-8 rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/images/attachment-patterns.png" // 画像ファイルのパス（例）
                alt="代表的な4つの愛着パターン"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#E5DBCC] rounded-xl p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">1. 安定型（Secure）</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  自分も他者も肯定的に捉えられます。適度な距離感を保ちながら、安心感のある温かい人間関係を築くことができます。
                </p>
              </div>

              <div className="bg-[#D9E5D3] rounded-xl p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">2. 回避型（Avoidant）</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  深いつながりを無意識に避け、親密になりすぎると居心地の悪さを感じて距離を置こうとします。自己防衛が強いのが特徴です。
                </p>
              </div>

              <div className="bg-[#FCE3E3] rounded-xl p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">3. 不安型（Anxious）</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  「見捨てられるのではないか」という不安が強く、パートナーからの愛情や承認を常に確認したくなる傾向があります。
                </p>
              </div>



              <div className="bg-[#E4CEE5] rounded-xl p-6 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-2">4. 恐れ・回避(混合）型（Fearful-Avoidant）</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  親密さを求める一方で、傷つくことへの恐れも非常に大きく、近づきたいのに遠ざけてしまう葛藤を抱えやすいタイプです。
                </p>
              </div>
            </div>
          </section>

        <div className="mt-12 text-center">
          <Link
            href="/diagnosis"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl bg-emerald-600 hover:bg-emerald-700 !text-white transition-colors shadow-sm"
          >
            あなたの愛着タイプは？
          </Link>
          </div>

          {/* セクション 3：愛着は変えられるか */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">「獲得安定型」へ：大人の愛着は変えられる</h2>
            </div>

            {/* コンテンツと画像を左右（スマホでは上下）に配置するレイアウト */}
            <div className="flex flex-col md:flex-row gap-6 items-center">
              
              {/* テキスト部分 */}
              <div className="flex-1 space-y-4">
                <p className="text-slate-700 leading-relaxed">
                  幼少期の経験がベースになるとはいえ、<strong className="font-semibold text-slate-900">愛着スタイルは固定されたものではありません。</strong>
                </p>
                <p className="text-slate-700 leading-relaxed">
                  大人になってからも、安心できるパートナーシップの経験や、自己理解を深めるカウンセリング、心理ワークを通じて「獲得安定型（後天的に身につく安定した愛着）」を手に入れることができます。自分のパターンに気づくこと自体が、変化への第一歩となります。
                </p>
              </div>

              {/* 画像部分（PCは右側 / スマホはセンター寄せ） */}
              <div className="w-full md:w-72 flex justify-center md:justify-end shrink-0">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src="/images/attachment-change.png" // 実際の画像ファイル名に合わせて変更してください
                    alt="大人の愛着は変えられる"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
              </div>

            </div>
          </section>

        </div>

        {/* フッター誘導 */}
        <div className="mt-12 text-center">
          <Link
            href="/counselors"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl bg-emerald-600 hover:bg-emerald-700 !text-white transition-colors shadow-sm"
          >
            愛着でお悩みの方は
          </Link>
        </div>

      </div>
    </div>
    </main>
  );
}