'use client';

import Link from 'next/link';
import Image from 'next/image';
import { expertsData } from '@/data/experts';
import PageHeader from '@/components/PageHeader';

export default function ExpertsContent() {
  return (
    <main className="w-full p-4 md:p-8 bg-slate-50/50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <section className="text-center space-y-4 pt-4 mb-10">
          <div>
            <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
              EXPERTS
            </span>
          </div>
          <PageHeader title="専門カウンセラー一覧" />
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            AIでの気づきをもとに、より深い相談や個別のサポートを受けたい方へ。
            <br className="hidden sm:inline" />
            経験豊富な専門カウンセラーがあなたの心に寄り添います。
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {expertsData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                    <Image
                      src={item.imagePath}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-[#93c296] font-bold block">
                      {item.title}
                    </span>
                    <h2 className="text-lg font-bold text-slate-800">
                      {item.name}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {item.specialty}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                  {item.message}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  {item.price}
                </span>
                <Link
                  href={`/experts/${item.id}`}
                  className="bg-[#93c296] hover:bg-[#82b385] !text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  詳細情報を見る
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}