// app/kokokoe/page.tsx
import type { Metadata } from 'next';
import KokokoeContent from './KokokoeContent';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'こここえ（心にしみる言葉のシャワー） | ここらぼ - 心に寄り添うセルフケア',
  description: '大切な人や自分からかけてほしい温かい言葉を選び、リピート再生で心を満たすセルフケアコンテンツです。',
};

export default function KokokoePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/30 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <section className="text-center space-y-3 pt-4">
          <div>
            <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
              VOICE SHOWER
            </span>
          </div>
          <PageHeader title="こここえ" />
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            今、あなたに必要な温かい言葉のシャワーを浴びて、
            <br className="hidden sm:inline" />
            ほっと心が安らぐひとときをお過ごしください。
          </p>
        </section>
        <KokokoeContent />
      </div>
    </main>
  );
}