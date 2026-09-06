import type { Metadata } from 'next';
import CounselorDetailContent from './CounselorDetailContent';
import { expertsData } from '@/data/experts';

type Props = {
  params: Promise<{ id: string }>;
};

// 動的メタデータを生成する関数
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const counselor = expertsData.find((item) => String(item.id) === resolvedParams.id);

  if (!counselor) {
    return {
      title: 'カウンセラーが見つかりません | ここらぼ',
    };
  }

  return {
    title: `${counselor.name}（${counselor.title}）の詳細 | ここらぼ`,
    description: `${counselor.name}の経歴、メッセージ、専門分野についてご覧いただけます。ここらぼでのオンライン相談予約も受付中。`,
  };
}

export default function CounselorDetailPage() {
  return <CounselorDetailContent />;
}