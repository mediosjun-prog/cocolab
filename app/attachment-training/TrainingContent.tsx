"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Sparkles, CheckCircle2 } from "lucide-react";
import PageHeader from '@/components/PageHeader';

export default function TrainingContent() {
  return (
    <main>
    <div className="min-h-screen from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <section className="text-center space-y-4 pt-2 mb-6">
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
           実践心理プログラム
          </span>
          <PageHeader title="「獲得安定型」を育む実践トレーニング" />
          <p className="text-lg text-slate-600 leading-relaxed">
            大人になってからも、安心できるパートナーシップの経験や、自己理解を深めるカウンセリング、心理ワークを通じて、後天的に安定した愛着（獲得安定型）を育てていくことができます。日々の小さな実践トレーニングをご紹介します。
          </p>
       </section>        

        {/* 4つのステップセクション */}
        <div className="space-y-6 mb-12">
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-[#299a0b] text-[#ffffff] rounded-3xl shrink-0 mt-1">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#007F3F] bg-[#EFFFCC] px-2.5 py-1 rounded-full">Step 1</span>
                <h2 className="text-xl font-bold text-slate-900 mt-2 mb-2">自分の「愛着の癖」に気づく</h2>
                <p className="text-slate-700 leading-relaxed">
                  不安になった時や距離を置きたくなった時、心や身体にどんな感情・思考パターンが湧き出るのかを客観的に観察します。まずは「自分は今、そう感じているんだな」とジャッジせずに優しく受け止めることから始まります。
                </p>
                <h3 className="text-base font-bold text-[#299a0b] mt-2 mb-2">⚫︎無意識のトリガー（引き金）を特定するワーク</h3>
                <p className="text-slate-700 leading-relaxed">パートナーや親しい人との間で「急に不安になった」「殻に閉じこもりたくなった」という瞬間に、何が起きていたのかをノートに書き出します。（状況・体調・相手の言葉）。</p>
                <h3 className="text-base font-bold text-[#299a0b] mt-2 mb-2">⚫︎身体の感覚に意識を向ける（ボディ・スキャン）</h3>
                <p className="text-slate-700 leading-relaxed">不安や防衛反応は思考の前に「みぞおちの締め付け」「胸のざわざわ感」といった身体の反応として現れます。思考でぐるぐる考える前に、身体のサインに気づくトレーニングをします。</p>
              </div>
            </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Link
                href="/attachment-training/step1" // 実際のワークノートのパスに合わせて変更してください
                className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 !text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Step 1の詳細はこちら →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-[#299a0b] text-[#ffffff] rounded-3xl shrink-0 mt-1">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#007F3F] bg-[#EFFFCC] px-2.5 py-1 rounded-full">Step 2</span>
                <h2 className="text-xl font-bold text-slate-900 mt-2 mb-2">安心の基地を心の中に作る</h2>
                <p className="text-slate-700 leading-relaxed">
                  カウンセリングや心理ワークを通じて、過去の過剰な防衛反応や傷つきを癒やし、「自分は自分のままで大丈夫」という心の安全基地を内面に育てていきます。
                </p>
                <h3 className="text-base font-bold text-[#299a0b] mt-2 mb-2">⚫︎インナーチャイルド（内なる子ども）との対話</h3>
                <p className="text-slate-700 leading-relaxed">過去の傷つきや「我慢しなければ愛されない」と感じた幼少期の自分をイメージし、当時の自分に「もう頑張らなくていいよ」「味方だよ」と心の中で声をかけるワーク。</p>
                <h3 className="text-base font-bold text-[#299a0b] mt-2 mb-2">⚫︎imaginary Safe Place（心の中の安全な場所）の構築</h3>
                <p className="text-slate-700 leading-relaxed">現実の人間関係に依存しすぎず、いつでも自分がリラックスして安心感をチャージできる「自分だけの安全な風景（お気に入りの場所や景色）」を脳内で鮮明に思い出す練習いたします。</p>
              </div>
            </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Link
                href="/attachment-training/step2" // 実際のワークノートのパスに合わせて変更してください
                className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 !text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Step 2の詳細はこちら →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-[#299a0b] text-[#ffffff] rounded-3xl shrink-0 mt-1">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#007F3F] bg-[#EFFFCC] px-2.5 py-1 rounded-full">Step 3</span>
                <h2 className="text-xl font-bold text-slate-900 mt-2 mb-2">安全なパートナーシップを体験する</h2>
                <p className="text-slate-700 leading-relaxed">
                  感情を率直に伝える練習や、お互いの境界線を尊重し合える心地よいコミュニケーションを、安心できる関係性の中で少しずつ積み重ねていきます。
                </p>
                <h3 className="text-base font-bold text-[#299a0b] mt-2 mb-2">⚫︎「非難（Youメッセージ）」を「リクエスト（Iメッセージ）」に言い換える</h3>
                <p className="text-slate-700 leading-relaxed">「どうして連絡してくれないの！（責める）」ではなく、「私は連絡がないと不安になってしまうんだ（自分の気持ちを伝える）」という表現への変換トレーニング。</p>
                <h3 className="text-base font-bold text-[#299a0b] mt-2 mb-2">⚫︎お互いの「境界線（バウンダリー）」を尊重する会話</h3>
                <p className="text-slate-700 leading-relaxed">相手を変えようとしたり、自分の不安を相手にすべて背負わせたりするのではなく、「相手には相手のペースがある」という境界線を引いたうえで、健全につながる距離感の模索します。</p>
              </div>
            </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Link
                href="/attachment-training/step3" // 実際のワークノートのパスに合わせて変更してください
                className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 !text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Step 3の詳細はこちら →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-[#299a0b] text-[#ffffff] rounded-3xl shrink-0 mt-1">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#007F3F] bg-[#EFFFCC] px-2.5 py-1 rounded-full">Step 4</span>
                <h2 className="text-xl font-bold text-slate-900 mt-2 mb-2">セルフ・コンパッション（自己慈愛）</h2>
                <p className="text-slate-700 leading-relaxed">
                  うまくいかない自分を厳しく責めるのではなく、大切な友人に接するように、ありのままの自分を温かく労わり肯定する習慣を日常に定着させます。
                </p>
                <h3 className="text-base font-bold text-[#299a0b] mt-2 mb-2">⚫︎「親友モード」で自分に語りかける</h3>
                <p className="text-slate-700 leading-relaxed">うまくいかなかったり自分を責めてしまったりした時、「もし大切な親友が同じ状況だったら、何と声をかけるか？」を考え、そのまま自分自身にかけてあげる。</p>
                <h3 className="text-base font-bold text-[#299a0b] mt-2 mb-2">⚫︎「共通の人間」という視点を持つ</h3>
                <p className="text-slate-700 leading-relaxed">「失敗して落ち込んでいるのは自分だけじゃない。人間なら誰もが感じる自然なことだ」と捉え直し、孤独感や過剰な自己批判から自分を解放するワーク。</p>
              </div>
            </div>
              <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Link
                href="/attachment-training/step4" // 実際のワークノートのパスに合わせて変更してください
                className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 !text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Step 4の詳細はこちら →
              </Link>
            </div>
          </div>

        </div>

        {/* 誘導セクション */}
        <div className="bg-[#F1FFD1] rounded-2xl p-8 sm:p-10 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
            一人で抱え込まず、一緒に一歩を踏み出してみませんか？
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed">
            ここらぼのカウンセリングや心理ワークでは、あなたのペースに合わせた安心の対話を通じて、心地よい人間関係と安定した心の土台作りを丁寧にサポートします。
          </p>
          <Link
            href="/attachment-training/step1"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-xl bg-emerald-600 hover:bg-emerald-700 !text-white transition-colors shadow-sm"
          >
            Step1 自分の「愛着の癖」に気づく
          </Link>
        </div>

      </div>
    </div>
    </main>
  );
}