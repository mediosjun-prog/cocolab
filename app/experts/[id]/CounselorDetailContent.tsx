'use client';

import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { expertsData } from '@/data/experts';

export default function CounselorDetailContent() {
  const params = useParams();
  const targetId = params?.id ? String(params.id) : '';

  const counselor = expertsData.find((item) => String(item.id) === targetId);

  if (!counselor) {
    notFound();
  }

  return (
    <main className="w-full p-4 md:p-8 bg-slate-50/50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* 戻るナビゲーション */}
        <div className="flex items-center justify-between">
          <Link
            href="/experts"
            className="inline-flex items-center text-xs text-slate-500 hover:text-[#93c296] transition-colors"
          >
            ← 専門カウンセラー一覧に戻る
          </Link>
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
            COUNSELOR PROFILE
          </span>
        </div>

        {/* メインカード */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start border-b border-slate-100">
            {counselor.imagePath && (
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden flex-shrink-0 shadow-md border-4 border-white bg-slate-100">
                <Image
                  src={counselor.imagePath}
                  alt={counselor.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="space-y-4 text-center md:text-left flex-1">
              <div>
                <span className="text-xs font-semibold text-[#446246] tracking-wide uppercase bg-[#fdfaf3] px-3 py-1 rounded-full border border-[#D0F9C7]">
                  {counselor.title}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-3">
                  {counselor.name}
                </h1>
              </div>

              <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                {counselor.specialty}
              </p>

              <div>
                <p className="text-xs font-semibold text-slate-400 mb-1">料金</p>
                <p className="text-sm font-bold text-slate-800">{counselor.price}</p>
              </div>

              {/* SNSリンクボタン群（オブジェクトを動的にループ） */}
              {counselor.sns && Object.keys(counselor.sns).length > 0 && (
                <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-2">
                  {Object.entries(counselor.sns).map(([platform, url]) => {
                    if (!url) return null;
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#446246] bg-[#fdfaf3] hover:bg-[#D0F9C7]/40 border border-[#D0F9C7] px-3 py-1.5 rounded-lg transition-colors uppercase"
                      >
                        <span>{platform}</span>
                        <span>→</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            {/* メッセージ */}
            <div className="space-y-3 bg-[#fdfaf3] p-6 rounded-2xl border border-[#D0F9C7]/60">
              <h2 className="text-base font-bold text-[#446246] flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#93c296] rounded-full inline-block"></span>
                カウンセラーからのメッセージ
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {counselor.message}
              </p>
            </div>

            {/* 経歴・実績セクション（配列をリスト表示） */}
            {counselor.experience && counselor.experience.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-[#93c296] rounded-full inline-block"></span>
                  経歴・実績
                </h2>
                <ul className="space-y-2 pl-3.5">
                  {counselor.experience.map((exp, index) => (
                    <li key={index} className="text-slate-600 text-sm sm:text-base leading-relaxed flex items-start gap-2">
                      <span className="text-[#93c296] font-bold mt-0.5">•</span>
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 予約アクション */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-xs text-slate-500">このカウンセラーに相談する</p>
                <p className="text-sm font-bold text-slate-800">{counselor.name}</p>
              </div>

              <Link
                href={`/booking?counselor=${encodeURIComponent(counselor.name)}`}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#93c296] hover:bg-[#82b385] !text-white font-bold px-8 py-3.5 rounded-xl shadow-sm transition-colors text-sm"
              >
                このカウンセラーを指名して予約する →
              </Link>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}