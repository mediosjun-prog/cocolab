import type { Metadata } from 'next';
import KokotalkContent from './KokotalkContent';

export const metadata: Metadata = {
  title: 'こことーく | ここらぼ - 心に寄り添うセルフケア',
  description: '色んなタイプのAIと気軽におしゃべりしてね',
};

export default function KokotalkPage() {
  return <KokotalkContent />;
}