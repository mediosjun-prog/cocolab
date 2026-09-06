import type { Metadata } from 'next';
import HomePageContent from './HomePageContent';

export const metadata: Metadata = {
  title: 'ホーム | ここらぼ - 心に寄り添うAIカウンセリング＆愛着タイプ診断',
  description: 'ここらぼは、あなたの愛着タイプ（心のパターン）を知り、AIと専門家が共に支えるメンタルケアプラットフォーム。',
};

export default function HomePage() {
  return <HomePageContent />;
}