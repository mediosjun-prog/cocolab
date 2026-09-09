import type { Metadata } from 'next';
import KokokakoContent from './KokokakoContent';

export const metadata: Metadata = {
  title: 'ここかこ（対人関係シミュレーション） | 心に寄り添うセルフケア',
  description: '当時の記憶や感情を整理し、AIカウンセラーと一緒に内的ワーキングモデルの更新と新しい意味づけを見つけていきましょう。',
};

export default function Page() {
  return <KokokakoContent />;
}