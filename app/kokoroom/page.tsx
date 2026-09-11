import type { Metadata } from 'next';
import { Suspense } from 'react';
import KokoRoomContent from './kokoRoomContent';

export const metadata: Metadata = {
  title: 'ここるーむ | ここらぼ - 心に寄り添うセルフケア',
  description: 'ここらぼは、愛着理論に基づく心理診断とAIカウンセリング、専門家サポートを提供するメンタルケアプラットフォームです。',
};

export default function KokoRoomPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-[#6B7280]">読み込み中...</div>}>
      <KokoRoomContent />
    </Suspense>
  );
}