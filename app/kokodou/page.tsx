import type { Metadata } from 'next';
import KokodouContent from './KokodouContent';

export const metadata: Metadata = {
  title: 'ここどう 〜あなたの行動で相手はどうなる？〜 | ここらぼ - 心に寄り添うセルフケア',
  description: '愛着スタイルとシチュレーションから、二人の相互作用や相手の心理、より良い関係づくりのためのアドバイスを紐解くインタラクティブ診断コンテンツ。',
};

export default function KokodouPage() {
  return <KokodouContent />;
}