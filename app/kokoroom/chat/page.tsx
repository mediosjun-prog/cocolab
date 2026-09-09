import { Suspense } from 'react';
import KokoRoomChatContent from './kokoRoomChatContent';

export default function KokoRoomChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-[#6B7280]">ルームを読み込んでいます...</div>}>
      <KokoRoomChatContent />
    </Suspense>
  );
}