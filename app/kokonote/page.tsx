import type { Metadata } from 'next';
import KokonoteContent from './KokonoteContent';

export const metadata: Metadata = {
  title: 'ここのーと | ここらぼ - 心に寄り添うセルフケア',
  description: 'ここらぼは、愛着理論に基づく心理診断とAIカウンセリング、専門家サポートを提供するメンタルケアプラットフォームです。',
};

export default function KokonotePage() {
  return <KokonoteContent />;
}