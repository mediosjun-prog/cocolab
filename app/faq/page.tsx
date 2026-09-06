import type { Metadata } from 'next';
import FaqContent from './FaqContent';

export const metadata: Metadata = {
  title: 'よくあるご質問 | 心に寄り添うセルフケア',
  description: 'ここらぼは、愛着理論に基づく心理診断とAIカウンセリング、専門家サポートを提供するメンタルケアプラットフォームです。',
};

export default function Page() {
  return <FaqContent />;
}