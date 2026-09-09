import { Suspense } from 'react';
import KokoRoomContent from './kokoRoomContent';

export default function KokoRoomPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-[#6B7280]">読み込み中...</div>}>
      <KokoRoomContent />
    </Suspense>
  );
}