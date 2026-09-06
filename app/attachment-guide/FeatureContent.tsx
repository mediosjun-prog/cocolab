import Link from 'next/link';
import Image from 'next/image';

export default function FeatureContent() {
  return (
    <main className="w-full p-4 md:p-8 bg-slate-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* 戻るナビゲーション ＆ タグ */}
        <div className="flex items-center justify-between">
          <Link
            href="/diagnosis"
            className="inline-flex items-center text-xs text-slate-500 hover:text-[#93c296] transition-colors"
          >
            ← 診断ページに戻る
          </Link>
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
            SPECIAL FEATURE
          </span>
        </div>

        {/* 記事ヘッダー */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-semibold text-[#446246] bg-[#fdfaf3] px-3 py-1 rounded-full border border-[#D0F9C7]">
              愛着スタイル別の歩き方
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-800 leading-tight">
              診断結果から見えてきた、<br />心がふっと軽くなる愛着の整え方
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm">
              公開日：2026年6月1日 ｜ 監修：ここらぼ編集部
            </p>
          </div>

          {/* アイキャッチ画像 */}
          <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden bg-slate-100">
            <Image
              src="/images/step2-ai.png" // 適宜画像パスを変更してください
              alt="愛着タイプについての解説イメージ"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* リード文 */}
          <div className="bg-[#fdfaf3] p-6 rounded-2xl border border-[#D0F9C7]/60 text-slate-700 text-sm sm:text-base leading-relaxed">
            「なんだかいつも人間関係で疲れてしまう」「相手の反応が気になって仕方のない自分を変えたい」。
            そんな悩みを抱えていませんか？ここらぼの愛着診断は、あなたを型に当てはめてジャッジするためではなく、
            「ご自身の心のクセ」に優しく気づくための羅針盤です。この記事では、結果を受け取ったあとにできる具体的なステップをご紹介します。
          </div>
        </div>

        {/* 本文セクション1 */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#93c296] rounded-full inline-block"></span>
            1. 「不安」や「恐れ」は、あなたの心が守ろうとした証拠
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            愛着スタイル（不安型、回避型など）の特徴を知ったとき、「どうして自分はこうなんだろう」と責めてしまう方がいらっしゃいます。
            ですが、その心のパターンは、過去の経験の中であなたが傷つかないために身につけた大切な「防衛反応」です。
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            まずは「これまで自分の心を守ってくれてありがとう」と、その気質を受け止めてあげることからすべてが始まります。
          </p>
        </section>

        {/* 本文セクション2 */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#93c296] rounded-full inline-block"></span>
            2. 日常の中でできる、小さなセルフケアの実践
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#fafaf2] p-5 rounded-2xl border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-800 text-sm sm:text-base text-[#446246]">🌱 感情をそのままラベリングする</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                「今、私は不安になっているな」と、頭の中で実況中継するように自分の感情を客観的に見つめてみましょう。
              </p>
            </div>
            <div className="bg-[#fafaf2] p-5 rounded-2xl border border-slate-100 space-y-2">
              <h3 className="font-bold text-slate-800 text-sm sm:text-base text-[#446246]">☕ 立ち止まる時間を作る</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                スマホの通知を少しだけオフにして、深呼吸する時間を1日5分だけ作ることが、自律神経を整える第一歩です。
              </p>
            </div>
          </div>
        </section>

        {/* 下部CTA（誘導）エリア */}
        <section className="bg-[#5d8860] text-white rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold">
            一人で抱え込まず、AIや専門家に話してみませんか？
          </h2>
          <p className="text-indigo-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            文字にすることで、モヤモヤした感情は少しずつ整理されていきます。ここらぼのAIカウンセラーや専門家が、いつでもあなたをお待ちしています。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link
              href="/diagnosis"
              className="bg-white text-[#5d8860] font-bold px-6 py-3.5 rounded-full shadow hover:bg-[#E4FFA8] transition-colors text-sm"
            >
              もう一度診断をやってみる
            </Link>
            <Link
              href="/experts"
              className="bg-[#446246] !text-white font-bold px-6 py-3.5 rounded-full shadow hover:bg-[#344d36] transition-colors text-sm border border-[#93c296]/50"
            >
              専門カウンセラーを探す →
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}