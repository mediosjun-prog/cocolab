import type { Metadata } from 'next';
import KokoniwaContent from './KokoniwaContent';

export const metadata: Metadata = {
  title: 'ここにわ | 心に寄り添うセルフケア',
  description: 'ここらぼは、愛着理論に基づく心理診断とAIカウンセリング、専門家サポートを提供するメンタルケアプラットフォームです。',
};

export default function KokoniwaPage() {
  return <KokoniwaContent />;
}