'use client';

import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';

export default function AboutUsContent() {
  return (
  <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto space-y-12">
      
      {/* ヒーローヘッダーセクション（他ページ共通仕様） */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
        <section className="text-center space-y-4 pt-4">
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
            ABOUT US
          </span>
          <PageHeader title="運営組織" />
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          ここらぼの運営組織情報および事業概要についてご紹介します。
          </p>
        </section>
        </div>

      {/* メインコンテンツカード */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2EAE1] p-8 sm:p-12">
          
          {/* 戻るリンク */}
          <div className="mb-8">
            <Link 
              href="/"
              className="text-sm font-medium text-[#5A7A5C] hover:text-[#3B523D] transition"
            >
              ← ホームへ戻る
            </Link>
          </div>

          <div className="space-y-10 text-[#4A5A4B] leading-relaxed">
            
            <section>
              <h2 className="text-xl font-semibold text-[#3B523D] mb-3 border-b border-[#E2EAE1] pb-2">
                理念・ビジョン
              </h2>
              <p>
                ここらぼは、日々の暮らしやメンタルケア、ウェルネスに関する確かな情報を分かりやすくお届けし、皆様が健やかで心豊かな毎日を送るためのサポートを目的として運営されています。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#3B523D] mb-3 border-b border-[#E2EAE1] pb-2">
                組織概要
              </h2>
              <div className="bg-[#F7F9F6] rounded-xl p-6 border border-[#E2EAE1]">
                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <dt className="font-semibold text-[#3B523D]">名称</dt>
                  <dd className="sm:col-span-2 text-[#2C3E2D]">ここらぼ運営事務局</dd>

                  <dt className="font-semibold text-[#3B523D]">所在地</dt>
                  <dd className="sm:col-span-2 text-[#2C3E2D]">静岡県</dd>

                  <dt className="font-semibold text-[#3B523D]">事業内容</dt>
                  <dd className="sm:col-span-2 text-[#2C3E2D]">
                    Webメディア運営、コンテンツ企画・制作、ウェルネス関連サービス事業
                  </dd>
                </dl>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#3B523D] mb-3 border-b border-[#E2EAE1] pb-2">
                お問い合わせ
              </h2>
              <p>
                当サイトや運営組織に関するご質問、お取引に関するお問い合わせは、
                <Link href="/contact" className="text-[#5A7A5C] underline hover:text-[#3B523D] mx-1 font-medium">
                  お問い合わせページ
                </Link>
                よりご連絡ください。
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
    </main>
  );
}