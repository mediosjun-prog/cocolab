// app/kokosuki/page.tsx
import type { Metadata } from 'next';
import KokosukiContent from './KokosukiContent';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'ここすき（ポジティブ変換） | ここらぼ - 心に寄り添うセルフケア',
  description: '自分の気になる欠点やネガティブな要素をポジティブに解釈し、温かく誉めてもらえるセルフケアツールです。',
};

export default function KokosukiPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/30 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <section className="text-center space-y-3 pt-4">
          <div>
            <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
              POSITIVE REFRAME
            </span>
          </div>
          <PageHeader title="ここすき" />
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            ご自身の気になる部分をポジティブに解釈し直して、
            <br className="hidden sm:inline" />
            あたたかいメッセージで心をほぐすコンテンツです。
          </p>
        </section>
        <KokosukiContent />
      </div>
    </main>
  );
}

