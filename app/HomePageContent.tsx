import Link from 'next/link';
import Image from 'next/image';
import NewsList from '@/components/NewsList';

export default function HomePageContent() {
  return (
    <main className="min-h-screen bg-slate-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* --- 1. HERO セクション --- */}
      <section className="max-w-6xl mx-auto bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-8">
        <div className="flex-1 space-y-4 text-center sm:text-left">
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
            24時間いつでも寄り添うメンタルケア
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-800 leading-tight">
            一人で抱え込まず、<br />心に寄り添う一歩を。
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            人間関係の不安や生きづらさ。あなたの「愛着タイプ」を診断し、AIカウンセラーと専門家が共に心を解きほぐします。
          </p>
          <div className="pt-2">
            <Link
              href="/diagnosis"
              className="inline-block bg-[#93c296] text-white font-bold px-8 py-4 rounded-full shadow-md hover:bg-[#5d8860] transition-colors text-base !text-white"
            >
              まずは無料で診断してみる
            </Link>
          </div>
        </div>
        <div className="relative w-full sm:w-1/2 h-60 sm:h-72 rounded-2xl overflow-hidden bg-slate-100">
          <Image
            src="/images/step2-ai.png"
            alt="リラックスした空間でスマホを使うイメージ"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* --- 2. 悩みの共感セクション --- */}
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            こんなお悩みはありませんか？
          </h2>
          <p className="text-slate-500 text-sm">多くの方が心の葛藤を抱えています</p>
          {/* イメージ画像挿入エリア */}
          <div className="relative w-full h-90 md:h-[650px] rounded-2xl overflow-hidden my-4">
            <Image
              src="/images/home-problems4.png"
              alt="心の悩みを持つ人のイメージイラスト"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* --- 1つ目のカード --- */}
          <div className="relative py-10 px-9 text-slate-700 text-sm leading-relaxed overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
              style={{ backgroundImage: "url('/images/bg-chat2.png')" }}
            />
            <div className="relative z-10">
              自分の気持ちを言葉にするのが苦手で、モヤモヤを一人で抱え込む
            </div>
          </div>

          {/* --- 2つ目のカード --- */}
          <div className="relative py-10 px-9 text-slate-700 text-sm leading-relaxed overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
              style={{ backgroundImage: "url('/images/bg-chat2.png')" }}
            />
            <div className="relative z-10">
              人と深く付き合うのが怖くて、つい自分から距離を置いてしまう
            </div>
          </div>

          {/* --- 3つ目のカード --- */}
          <div className="relative py-10 px-9 text-slate-700 text-sm leading-relaxed overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
              style={{ backgroundImage: "url('/images/bg-chat2.png')" }}
            />
            <div className="relative z-10">
              人に頼るのが苦手で、何でも自分一人で頑張ってしまう
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. 当サイトでできること（サービスの特徴） --- */}
      <section className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            ここらぼが提供する3つのステップ
          </h2>
          <p className="text-slate-500 text-sm mt-1">あなたのペースに合わせた安心のプロセス</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {/* Feature 1 */}
          <div className="bg-[#fafaf2] rounded-2xl p-6 border border-slate-100 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold bg-[#D0F9C7] text-[#446246] px-2.5 py-1 rounded-md">
                01. 診断
              </span>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#fafaf2] mt-4 mb-3">
                <Image
                  src="/images/fstep1.png"
                  alt="愛着タイプの可視化イメージ"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mt-3 mb-2">愛着タイプの可視化</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                心理学に基づく設問で、不安型・回避型・恐れ回避型などの心のパターンを分析します。
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#fafaf2] rounded-2xl p-6 border border-slate-100 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold bg-[#D0F9C7] text-[#446246] px-2.5 py-1 rounded-md">
                02. AI対話
              </span>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#fafaf2] mt-4 mb-3">
                <Image
                  src="/images/fstep2.png"
                  alt="24時間AIカウンセリングイメージ"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mt-3 mb-2">24時間AIカウンセリング</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                音声・テキスト両対応。診断結果に寄り添うAIが、いつでも否定せず気持ちを受け止めます。
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#fafaf2] rounded-2xl p-6 border border-slate-100 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold bg-[#D0F9C7] text-[#446246] px-2.5 py-1 rounded-md">
                03. 連携
              </span>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#fafaf2] mt-4 mb-3">
                <Image
                  src="/images/fstep3.png"
                  alt="専門家へのご案内イメージ"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mt-3 mb-2">専門家へのご案内</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                必要に応じてプロの心理カウンセラーへ相談予約可能。ステップアップもスムーズです。
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/about/"
            className="inline-block bg-[#93c296] hover:bg-[#82b385] !text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            ここらぼについて →
          </Link>
        </div>
      </section>

      {/* --- 4. CTA（Call to Action） --- */}
      <section className="max-w-4xl mx-auto text-center bg-[#5d8860] text-[#ffffff] rounded-3xl p-8 sm:p-12 shadow-lg space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold">
          自分の心を知ることから、始めてみませんか？
        </h2>
        <p className="text-indigo-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          診断は数分で完了します。あなたの感情パターンを理解し、安心できる日常への第一歩を踏み出しましょう。
        </p>
        <div>
          <Link
            href="/diagnosis"
            className="inline-block bg-[#ffffff] text-[#5d8860] font-bold px-8 py-4 rounded-full shadow-md hover:bg-[#E4FFA8] transition-colors text-base"
          >
            無料診断をスタートする
          </Link>
        </div>
      </section>
      {/* --- 5. 新着・更新情報（お知らせ）セクション --- */}
      <section className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
          <div>
            <span className="text-xs font-bold text-[#5d8860] bg-[#D0F9C7] px-2.5 py-1 rounded-md">
              NEWS & UPDATES
            </span>
            <h2 className="text-xl font-bold text-slate-800 mt-2">
              新着・更新情報
            </h2>
          </div>
        </div>

        {/* お知らせリストをパーツとして読み込む */}
        <NewsList />
      </section>

      {/* --- 6. 愛着についての深掘りセクション --- */}
      <section className="py-16 px-4 bg-[#F9F6D9] text-center w-full rounded-3xl max-w-4xl mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#3B523D]">
            ご自身の愛着についてさらに深く知る
          </h2>
          <p className="text-slate-600 mt-4 leading-relaxed text-sm sm:text-base">
            診断結果をもとに、あなたの愛着タイプに合わせた具体的な向き合い方や、心を軽くするためのヒントを記事でご紹介しています。
          </p>
          
          <Link 
            href="/articles/category/attachment"
            className="inline-block mt-8 px-8 py-4 bg-[#5A7A5C] !text-white font-bold rounded-xl hover:bg-[#4A5A4B] transition shadow-md text-sm sm:text-base"
          >
            愛着タイプに関する記事一覧を見る →
          </Link>
        </div>
      </section>

    </main>
  );
}