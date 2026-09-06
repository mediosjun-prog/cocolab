'use client';

import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export default function PrivacyContent() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* ヒーローヘッダーセクション（他ページ共通仕様） */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <section className="text-center space-y-4 pt-4">
            <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
              PRIVACY POLICY
            </span>
            <PageHeader title="プライバシーポリシー" />
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              ここらぼ（以下、「当サイト」）における、お客様の個人情報の取扱いについて定めています。
            </p>
          </section>
        </div>

        {/* メインコンテンツカード */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 -mt-6 relative z-20">
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

            <div className="space-y-10 text-[#4A5A4B] leading-relaxed text-sm sm:text-base">
              
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-[#3B523D] border-b border-[#E2EAE1] pb-2">
                  1. 個人情報の収集について
                </h2>
                <p>
                  当サイトでは、お問い合わせやサービスご利用の際、必要に応じてお名前、メールアドレスなどの個人情報をご提供いただく場合があります。ご提供いただいた個人情報は、ご意図いただいた目的以外の用途では利用いたしません。
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-[#3B523D] border-b border-[#E2EAE1] pb-2">
                  2. 個人情報の利用目的
                </h2>
                <p>
                  ご提供いただいた個人情報は、以下の目的のために利用いたします。
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
                  <li>お問い合わせに対する回答や、必要な情報を電子メールなどでご連絡するため</li>
                  <li>サービス向上のための分析や、より良いコンテンツを提供するため</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-[#3B523D] border-b border-[#E2EAE1] pb-2">
                  3. 個人情報の第三者提供
                </h2>
                <p>
                  当サイトでは、お預かりした個人情報を適切に管理し、次の場合を除き第三者に開示いたしません。
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
                  <li>ご本人の同意がある場合</li>
                  <li>法令に基づき開示することが必要である場合</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-[#3B523D] border-b border-[#E2EAE1] pb-2">
                  4. プライバシーポリシーの変更
                </h2>
                <p>
                  本ポリシーの内容は、法令の変更その他当サイトの都合により、事前の予告なく変更することがあります。変更後のプライバシーポリシーは、当サイトに掲載した時点から効力を生じるものとします。
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-[#3B523D] border-b border-[#E2EAE1] pb-2">
                  5. お問い合わせ
                </h2>
                <p>
                  当サイトの個人情報の取扱いに関するお問い合わせは、
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