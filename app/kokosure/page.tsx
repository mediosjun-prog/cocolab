import type { Metadata } from 'next';
import KokosureContent from './KokosureContent';

export const metadata: Metadata = {
  title: 'ここすれ | 心に寄り添うセルフケア',
  description: 'ここらぼは、愛着理論に基づく心理診断とAIカウンセリング、専門家サポートを提供するメンタルケアプラットフォームです。',
};

export default function KokosurePage() {
  return <KokosureContent />;
}