import type { Metadata } from 'next';
import ExpertsContent from './ExpertsContent';

export const metadata: Metadata = {
  title: '専門カウンセラー一覧 | ここらぼ - 心に寄り添うセルフケア',
  description: 'AIでの気づきをもとに、より深い相談や個別のサポートを受けたい方へ。経験豊富な専門カウンセラーがあなたの心に寄り添います。',
};

export default function ExpertsPage() {
  return <ExpertsContent />;
}