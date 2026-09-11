import type { Metadata } from 'next';
import CasesContent from './CasesContent';

export const metadata: Metadata = {
  title: '事例 | 心に寄り添うセルフケア',
  description: 'ここらぼは、愛着理論に基づく心理診断とAIカウンセリング、専門家サポートを提供するメンタルケアプラットフォームです。',
};

export default function CasesPage() {
  return <CasesContent />;
}