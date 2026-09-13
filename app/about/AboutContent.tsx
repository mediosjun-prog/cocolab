'use client';

import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';

// 機能・特徴のデータ構造
const features = [
  {
    title: 'ここのーと',
    description: '心理プログラム・対話トレーニング・セルフケアなど、心の状態に合わせて多彩なコンテンツを自由に選んで体験できるポータルスペースです。',
    tag: 'コンテンツ一覧',
  },
  {
    title: '音声＆テキスト両対応',
    description: '声を出して話したい時も、文字で落ち着いて書き出したい時も、ご自身の好みの方法で自由にご利用いただけます。',
    tag: '使いやすさ',
  },
  {
    title: '24時間いつでも利用可能',
    description: '深夜の不安や突然の気持ちの変化にも、AIカウンセラーが時間を気にせず即座に寄り添います。',
    tag: 'アクセシビリティ',
  },
  {
    title: '安心のプライバシー保護',
    description: 'ご相談内容や診断結果は厳重に保護されます。誰にも知られず安心して心を開ける環境を提供します。',
    tag: 'セキュリティ',
  },
  {
    title: 'シームレスな専門家連携',
    description: 'AIとの対話だけでは解決が難しい深いお悩みには、実績ある専門カウンセラーへのご案内・予約へスムーズに移行できます。',
    tag: 'サポート体制',
  },
];

export default function AboutContent() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* --- HERO / メインタイトル --- */}
        <section className="text-center space-y-4 pt-4">
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
            ABOUT US
          </span>
          <PageHeader title="ここらぼについて" />
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            一人で抱え込まず、心に寄り添う一歩を。あなたの愛着タイプを知り、AIと専門家が共に支えるメンタルケアプラットフォームです。
          </p>
        </section>

        {/* --- 1. ビジョン・コンセプト --- */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 space-y-4">
          <h2 className="text-2xl font-bold text-[#5d8860] border-b border-indigo-50 pb-3">
            「自分を知ること」から始まる、無理のない心のセルフケア
          </h2>
          {/* イメージビジュアル */}
          <div className="relative w-full h-90 md:h-[450px] rounded-2xl overflow-hidden bg-slate-100 my-4">
            <Image
              src="/images/about-vision.png"
              alt="自分を知ること・心のセルフケアのイメージ"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            <p>
              ここらぼは、対人関係や日々の生活で生じる不安・生きづらさを解消するためのメンタルヘルス支援サイトです。
              心理学の「愛着理論」に基づき、ご自身の心のタイプ（恐れ・回避型など）を可視化。
              AIカウンセラーとの対話を通じて、24時間いつでも感情を整理できる場所を提供します。
            </p>
            <p>
              さらに、ここらぼは、AIとの対話だけでは解決できない深い悩みには、臨床心理士や専門カウンセラーへスムーズに相談できる導線を整えています。
              一人ひとりが自分らしく、安心して心を開ける環境づくりを目指しています。
            </p>
          </div>
        </section>

        {/* --- 2. ご利用の流れ (3 STEP) --- */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              3ステップで始める心のケア
            </h2>
            <p className="text-slate-500 text-sm mt-1">簡単でシンプルなアプローチ</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {/* Step 1 */}
            <div className="bg-[#FFF5E8] rounded-2xl p-6 border border-slate-100 flex flex-col justify-between overflow-hidden">
              <div>
                <span className="text-xs font-bold bg-[#D0F9C7] text-[#446246] px-2.5 py-1 rounded-md">
                  STEP 01
                </span>
                <h3 className="text-lg font-bold text-slate-800 mt-3 mb-2">
                  愛着タイプの診断
                </h3>
                <div className="relative w-full h-40 rounded-xl overflow-hidden mt-2 mb-2 bg-slate-200">
                  <Image
                    src="/images/step1-diagnosis.png"
                    alt="愛着タイプの診断画面を操作している手元のイラスト"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  わずか数分で完了する質問に答えるだけで、あなたの現在の愛着傾向を診断。自分の心のパターンを知ることが、ケアの第一歩です。
                </p>
                <Link
                  href={`/diagnosis/`}
                  className="inline-block bg-[#93c296] hover:bg-[#82b385] !text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  詳細ご案内
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FFF5E8] rounded-2xl p-6 border border-slate-100 flex flex-col justify-between overflow-hidden">
              <div>
                <span className="text-xs font-bold bg-[#D0F9C7] text-[#446246] px-2.5 py-1 rounded-md">
                  STEP 02
                </span>
                <h3 className="text-lg font-bold text-slate-800 mt-3 mb-2">
                  AIカウンセラーと対話
                </h3>
                <div className="relative w-full h-40 rounded-xl overflow-hidden mt-2 mb-2 bg-slate-200">
                  <Image
                    src="/images/step2-ai.png"
                    alt="スマホでAIカウンセラーと対話し安心しているイラスト"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  診断結果に基づきマッチングされたAIカウンセラーと対話。テキストと音声入力に対応し、24時間いつでも感情を吐き出せます。
                </p>
                <Link
                  href={`/counselors/`}
                  className="inline-block bg-[#93c296] hover:bg-[#82b385] !text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  詳細ご案内
                </Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FFF5E8] rounded-2xl p-6 border border-slate-100 flex flex-col justify-between overflow-hidden">
              <div>
                <span className="text-xs font-bold bg-[#D0F9C7] text-[#446246] px-2.5 py-1 rounded-md">
                  STEP 03
                </span>
                <h3 className="text-lg font-bold text-slate-800 mt-3 mb-2">
                  専門家へのご案内
                </h3>
                <div className="relative w-full h-40 rounded-xl overflow-hidden mt-2 mb-2 bg-slate-200">
                  <Image
                    src="/images/step3-expert.png"
                    alt="専門カウンセラーとオンライン面談を行っているイラスト"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  さらに深い相談やサポートを受けたい場合は、提携する専門カウンセラーの面談予約へスムーズに進むことができます。安心してご利用いただけます。
                </p>
                <Link
                  href={`/experts/`}
                  className="inline-block bg-[#93c296] hover:bg-[#82b385] !text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  詳細ご案内
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* --- ここらぼノート（ここのーと）のご案内 --- */}
        <section className="bg-gradient-to-br from-[#F2FBF4] to-[#E8F5E9] rounded-3xl p-6 sm:p-10 shadow-sm border border-[#D1E7D2] space-y-6">
          <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
          安心回復の「ここのーと」プログラム
          </h2>
            <p className="text-slate-500 text-sm mt-1">セルフケア・心理プログラム</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D1E7D2] pb-4">
            <div>
              <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full mb-2">
                CONTENT PORTAL
              </span>
              <h2 className="text-2xl font-bold text-[#2d4a30]">
                「ここのーと」とは？
              </h2>
            </div>
            <Link
              href="/kokonote"
              className="inline-block bg-[#5d8860] hover:bg-[#4c724f] !text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-colors text-center shadow-xs"
            >
              ここのーと（一覧）を見る ↗
            </Link>
          </div>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>
              「ここのーと」は、あなたの心の状態に優しく寄り添う、多彩なセルフケア・心理プログラムをまとめたポータルスペースです。
              愛着の傷を癒やす深層プログラムから、日々の対話トレーニング、癒やしのデジタル庭園や心の日記まで、あなたのペースに合わせて自由に選んで体験できます。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-white/80 p-4 rounded-2xl border border-[#D1E7D2] space-y-1">
              <span className="text-xs font-bold text-emerald-700">心理プログラム</span>
              <h3 className="font-bold text-slate-800 text-sm">ここむすび / ここかこ / ここすれ / ここみえ</h3>
              <p className="text-xs text-slate-600">愛着の傷や記憶の再構築を行い、内的安全基地を育てます。</p>
            </div>
            <div className="bg-white/80 p-4 rounded-2xl border border-[#D1E7D2] space-y-1">
              <span className="text-xs font-bold text-emerald-700">対話トレーニング</span>
              <h3 className="font-bold text-slate-800 text-sm">ここいく / ここちょい / ここるーむ</h3>
              <p className="text-xs text-slate-600">人間関係のすれ違いや言いづらい場面を安全にロールプレイング。</p>
            </div>
            <div className="bg-white/80 p-4 rounded-2xl border border-[#D1E7D2] space-y-1">
              <span className="text-xs font-bold text-emerald-700">セルフケア・育成</span>
              <h3 className="font-bold text-slate-800 text-sm">ここにっし / ここにわ</h3>
              <p className="text-xs text-slate-600">日々の記録や小さなセルフケアで、心とデジタル庭園を育てます。</p>
            </div>
              <div className="bg-white/80 p-4 rounded-2xl border border-[#D1E7D2] space-y-1">
              <span className="text-xs font-bold text-emerald-700">セルフケア</span>
              <h3 className="font-bold text-slate-800 text-sm">ここすき / こここえ</h3>
              <p className="text-xs text-slate-600">あなたをもっと好きになる。</p>
            </div>
              <div className="bg-white/80 p-4 rounded-2xl border border-[#D1E7D2] space-y-1">
              <span className="text-xs font-bold text-emerald-700">診断</span>
              <h3 className="font-bold text-slate-800 text-sm">ここチェック</h3>
              <p className="text-xs text-slate-600">今の回復度をチェックします。</p>
            </div>
              <div className="bg-white/80 p-4 rounded-2xl border border-[#D1E7D2] space-y-1">
              <span className="text-xs font-bold text-emerald-700">ログ・履歴</span>
              <h3 className="font-bold text-slate-800 text-sm">こころぐ</h3>
              <p className="text-xs text-slate-600">利用した履歴や、ご自身の心の変化の軌跡を振り返ります</p>
            </div>
          </div>
        </section>

        {/* --- 3. 主な機能と特徴 --- */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
              主な機能と特徴
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              心に寄り添う、安心で快適なサポート機能をご用意しています
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-[#FFF5BF] text-[#664E38] text-xs sm:text-sm uppercase tracking-wider">
                  <th className="py-4 px-4 sm:px-6 font-semibold w-1/4">カテゴリー</th>
                  <th className="py-4 px-4 sm:px-6 font-semibold w-1/3">機能・特徴</th>
                  <th className="py-4 px-4 sm:px-6 font-semibold">詳細説明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {features.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 sm:px-6 align-top">
                      <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-medium px-2.5 py-1 rounded-md">
                        {item.tag}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-bold text-slate-800 align-top">
                      {item.title}
                    </td>
                    <td className="py-4 px-4 sm:px-6 leading-relaxed align-top text-slate-600">
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --- 4. CTA (Call to Action) --- */}
        <section className="text-center bg-[#5d8860] text-[#ffffff] rounded-3xl p-8 sm:p-12 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            まずは、あなたの愛着タイプをチェックしてみましょう
          </h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto text-sm sm:text-base">
            わずか数分の質問で、あなたの心のパターンを紐解きます。
          </p>
          <Link
            href="/diagnosis"
            className="inline-block bg-[#ffffff] text-[#5d8860] font-bold px-8 py-4 rounded-full shadow-md hover:bg-[#E4FFA8] transition-colors text-base"
          >
            無料で診断を受けてみる
          </Link>
        </section>

      </div>
    </main>
  );
}