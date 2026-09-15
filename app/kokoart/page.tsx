import { Metadata } from 'next';
import KokoArtContent from './kokoArtContent';

export const metadata: Metadata = {
  title: 'ここあーと | ここらぼ - 心に寄り添うセルフケア',
  description: '4つのイメージ（ここあーと）を通じて、あなたの心や愛着の傾向に優しくふれ、内面のニーズに気づくためのセルフリフレクションページです。',
};

export default function KokoArtPage() {
  return (
    <main className="min-h-screen bg-[#F7F9F8] text-[#2C4A43] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <KokoArtContent />
      </div>
    </main>
  );
}