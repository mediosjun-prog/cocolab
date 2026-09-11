import type { Metadata } from 'next';
import CounselorsContent from './CounselorsContent';

export const metadata: Metadata = {
  title: 'AIカウンセラー 一覧 | ここらぼ - 心に寄り添うセルフケア',
  description: 'ここらぼは、愛着理論に基づく心理診断とAIカウンセリング、専門家サポートを提供するメンタルケアプラットフォームです。',
};

export default function Page() {
  return <CounselorsContent />;
}


