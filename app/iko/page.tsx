import type { Metadata } from 'next';
import KokochoiContent from './IkoContent';

export const metadata: Metadata = {
  title: 'ここいく | 心に寄り添うセルフケア',
  description: 'ここらぼは、愛着理論に基づく心理診断とAIカウンセリング、専門家サポートを提供するメンタルケアプラットフォームです。',
};

export default function KokochoiPage() {
  return <KokochoiContent />;
}