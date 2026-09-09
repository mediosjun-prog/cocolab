'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  // スマホ用のアコーディオン（開閉）状態
  const [mobileConsultOpen, setMobileConsultOpen] = useState(false);
  const [mobileRecoveryOpen, setMobileRecoveryOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* ロゴエリア */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="ここらぼ - 心と愛着を育む心理ケア"
            width={200}
            height={50}
            className="h-10 md:h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* PC用ナビゲーション（md以上で表示） */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6">
          <Link
            href="/about"
            className="text-sm font-medium text-slate-600 hover:text-[#5d8860] transition-colors"
          >
            ここらぼについて
          </Link>

          <Link
            href="/diagnosis"
            className="text-sm font-medium text-slate-600 hover:text-[#5d8860] transition-colors"
          >
            診断
          </Link>

          {/* PC用「相談」プルダウン */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-slate-600 group-hover:text-[#5d8860] py-2 transition-colors cursor-pointer">
              <span>相談</span>
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 w-44 bg-white rounded-2xl shadow-lg border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 space-y-1 z-50">
              <Link
                href="/counselors"
                className="block px-4 py-2 text-xs font-medium text-slate-600 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
              >
                AI相談
              </Link>
              <Link
                href="/experts"
                className="block px-4 py-2 text-xs font-medium text-slate-600 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
              >
                専門家相談
              </Link>
            </div>
          </div>

          {/* PC用「回復」プルダウン */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-slate-600 group-hover:text-[#5d8860] py-2 transition-colors cursor-pointer">
              <span>回復</span>
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute top-full left-0 w-48 bg-white rounded-2xl shadow-lg border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 space-y-1 z-50">
              <Link
                href="/kokomusubi"
                className="block px-4 py-2 text-xs font-medium text-slate-600 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
              >
                ここむすび
              </Link>
              <Link
                href="/kokokako"
                className="block px-4 py-2 text-xs font-medium text-slate-600 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
              >
                ここかこ
              </Link>
              <Link
                href="/iko"
                className="block px-4 py-2 text-xs font-medium text-slate-600 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
              >
                ここいく
              </Link>
              <Link
                href="/kokoroom"
                className="block px-4 py-2 text-xs font-medium text-slate-600 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
              >
                ここるーむ
              </Link>
              <Link
                href="/nisshi"
                className="block px-4 py-2 text-xs font-medium text-slate-600 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
              >
                ここにっし
              </Link>
              <Link
                href="/kokocheck"
                className="block px-4 py-2 text-xs font-medium text-slate-600 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
              >
                ここチェック
              </Link>
            </div>
          </div>

          <Link
            href="/faq"
            className="text-sm font-medium text-slate-600 hover:text-[#5d8860] transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-slate-600 hover:text-[#5d8860] transition-colors"
          >
            お問い合わせ
          </Link>
        </nav>

        {/* スマホ用ハンバーガーボタン（md未満で表示） */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
          aria-label="メニューを開く"
          aria-expanded={isOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* スマホ用ドロップダウンメニュー（開閉時） */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-2 animate-fadeIn max-h-[calc(100vh-4rem)] overflow-y-auto">
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block py-2.5 px-3 rounded-xl text-base font-medium text-slate-700 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
          >
            ここらぼについて
          </Link>

          <Link
            href="/diagnosis"
            onClick={() => setIsOpen(false)}
            className="block py-2.5 px-3 rounded-xl text-base font-medium text-slate-700 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
          >
            診断
          </Link>

          {/* スマホ用「相談」アコーディオン */}
          <div>
            <button
              onClick={() => setMobileConsultOpen(!mobileConsultOpen)}
              className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-base font-medium text-slate-700 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
            >
              <span>相談</span>
              <svg className={`w-4 h-4 transition-transform ${mobileConsultOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileConsultOpen && (
              <div className="pl-4 space-y-1 mt-1 border-l-2 border-slate-100 ml-3">
                <Link
                  href="/counselors"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
                >
                  AI相談
                </Link>
                <Link
                  href="/experts"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
                >
                  専門家相談
                </Link>
              </div>
            )}
          </div>

          {/* スマホ用「回復」アコーディオン */}
          <div>
            <button
              onClick={() => setMobileRecoveryOpen(!mobileRecoveryOpen)}
              className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-base font-medium text-slate-700 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
            >
              <span>回復</span>
              <svg className={`w-4 h-4 transition-transform ${mobileRecoveryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileRecoveryOpen && (
              <div className="pl-4 space-y-1 mt-1 border-l-2 border-slate-100 ml-3">
                <Link
                  href="/kokomusubi"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
                >
                  ここむすび
                </Link>
                <Link
                  href="/kokokako"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
                >
                  ここかこ
                </Link>
                <Link
                  href="/iko"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
                >
                  ここいく
                </Link>
                  <Link
                  href="/kokoroom"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
                >
                  ここるーむ
                </Link>
                <Link
                  href="/nisshi"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
                >
                  ここにっし
                </Link>
                  <Link
                  href="/kokocheck"
                  onClick={() => setIsOpen(false)}
                  className="block py-2 px-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
                >
                  ここチェック
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/faq"
            onClick={() => setIsOpen(false)}
            className="block py-2.5 px-3 rounded-xl text-base font-medium text-slate-700 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
          >
            FAQ
          </Link>

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block py-2.5 px-3 rounded-xl text-base font-medium text-slate-700 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
          >
            お問い合わせ
          </Link>
        </div>
      )}
    </header>
  );
}