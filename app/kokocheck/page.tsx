import type { Metadata } from 'next';
import KokocheckContent from './KokocheckContent';

export const metadata: Metadata = {
  title: 'ここチェック（回復診断） | ここらぼ',
  description: '日々のシチュエーションでの選択を振り返り、回避傾向に気づきとアサーティブな関わり方、今の回復度をチェックします。',
};

export default function KokocheckPage() {
  return <KokocheckContent />;
}