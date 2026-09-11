// app/nisshi/page.tsx
import type { Metadata } from 'next';
import NisshiPageContent from './NisshiPageContent';

export const metadata: Metadata = {
  title: 'ここにっし | 心に寄り添うセルフケア',
  description: 'ここらぼは、愛着理論に基づく心理診断とAIカウンセリング、専門家サポートを提供するメンタルケアプラットフォームです。',
};

export default function NisshiPage() {
  return <NisshiPageContent />;
}