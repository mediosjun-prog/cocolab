import type { Metadata } from 'next';
import KokomieContent from './KokomieContent';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'ここみえ | ここらぼ - 心に寄り添うセルフケア',
  description: 'ランダムに表示される画像や問いから、あなたの潜在意識を紐解くインスピレーションコンテンツです。',
};

export default function KokomiePage() {
  return (
    <main className="min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
       <section className="text-center space-y-3 pt-4">
          <div>
            <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
              SUBCONSCIOUS MIND
            </span>
          </div>
          <PageHeader title="ここみえ" />
          <p className="text-sm text-slate-600">
            直感で選んだ選択肢から、今のあなたの深層心理とメッセージを映し出します。
          </p>
        </section>
        <KokomieContent />
      </div>
    </main>
  );
}