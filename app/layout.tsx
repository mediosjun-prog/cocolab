import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KokonaviBot from '@/components/KokonaviBot';

export const metadata: Metadata = {
title: {
    default: 'ここらぼ - 心と愛着を育む心理ケア',
    template: '%s | ここらぼ',
  },
  description: 'AIカウンセラーと専門家による、愛着と心の回復をサポートする心理ケアプラットフォーム',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900 antialiased">
        {/* ② 共通ヘッダー */}
        <Header />

        {/* ③ 各ページのコンテンツ（page.tsx）が入る部分 */}
        <div className="flex-grow">
          {children}
        </div>

        {/* ④ 共通フッター */}
        <Footer />
        {/* 🌟 ⑤ サイト全体に常駐する「ここなび」チャットボット */}
        <KokonaviBot />
      </body>
    </html>
  );
}
