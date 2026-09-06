'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'ここらぼについて', href: '/about' },
    { label: '愛着診断', href: '/diagnosis' },
    { label: 'AI相談', href: '/counselors' },
    { label: '専門家相談', href: '/experts' },
    { label: 'FAQ', href: '/faq' },
    { label: 'お問い合わせ', href: '/contact' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 hover:text-[#5d8860] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* スマホ用ハンバーガーボタン（md未満で表示） */}
        <button
          onClick={toggleMenu}
          type="button"
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
          aria-label="メニューを開く"
          aria-expanded={isOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              // バツ印（閉じるアイコン）
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // ハンバーガーアイコン
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* スマホ用ドロップダウンメニュー（開閉時） */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)} // ページ遷移時にメニューを閉じる
              className="block py-2.5 px-3 rounded-xl text-base font-medium text-slate-700 hover:bg-[#D0F9C7]/30 hover:text-[#446246] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}