import type { Metadata } from 'next';
import KokotalkContent from './KokotalkContent';

export const metadata: Metadata = {
  title: 'こことーく | ここらぼ - 心に寄り添うセルフケア',
  description: '色んなタイプのAIと気軽におしゃべりしてね',
};

// 型定義をここに追加してエクスポートする
export interface KokotalkConfig {
  gender: string;
  age: string;
  occupation: string;
  personality: string;
  styles: string[];
  avatar: string;
  voiceId: number;
}

export default function KokotalkPage() {
  return <KokotalkContent />;
}