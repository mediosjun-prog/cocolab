// components/NewsList.tsx
import Link from 'next/link';

export default function NewsList() {
  return (
    <div className="bg-white p-4 rounded-2xl max-h-[250px] overflow-y-auto">
      {/* お知らせリスト */}
      <div className="divide-y divide-slate-100 text-sm">

        <div className="py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-slate-50/50 transition-colors px-2 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">2026.09.13</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded">ここるーむ</span>
          </div>
          <Link href="/iko" className="text-slate-700 hover:text-[#5d8860] font-medium flex-1">
            ここいくを更新しました。
          </Link>
        </div>

        <div className="py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-slate-50/50 transition-colors px-2 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">2026.09.12</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded">ここるーむ</span>
          </div>
          <Link href="/kokomie" className="text-slate-700 hover:text-[#5d8860] font-medium flex-1">
            ここみえを公開しました。
          </Link>
        </div>

        <div className="py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-slate-50/50 transition-colors px-2 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">2026.09.11</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded">ここるーむ</span>
          </div>
          <Link href="/kokosuki" className="text-slate-700 hover:text-[#5d8860] font-medium flex-1">
            ここすきを公開しました。
          </Link>
        </div>

        <div className="py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-slate-50/50 transition-colors px-2 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">2026.09.11</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded">ここるーむ</span>
          </div>
          <Link href="/kokokoe" className="text-slate-700 hover:text-[#5d8860] font-medium flex-1">
            こここえを公開しました。
          </Link>
        </div>     

        <div className="py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-slate-50/50 transition-colors px-2 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">2026.09.10</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded">ここるーむ</span>
          </div>
          <Link href="/kokoniwa" className="text-slate-700 hover:text-[#5d8860] font-medium flex-1">
            ここにわ〜ここらぼガーデン〜を公開しました。
          </Link>
        </div>

        <div className="py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-slate-50/50 transition-colors px-2 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">2026.09.07</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded">ここるーむ</span>
          </div>
          <Link href="/kokosure" className="text-slate-700 hover:text-[#5d8860] font-medium flex-1">
            ここすれ〜心のすれ違いクエスト〜を更新しました。
          </Link>
        </div>

        <div className="py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-slate-50/50 transition-colors px-2 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">2026.09.05</span>
            <span className="text-xs bg-amber-100 text-amber-800 font-medium px-2 py-0.5 rounded">お知らせ</span>
          </div>
          <Link href="/about" className="text-slate-700 hover:text-[#5d8860] font-medium flex-1">
            メンタルケアプラットフォーム「ここらぼ」を正式オープンしました。
          </Link>
        </div>
      </div>
    </div>
  );
}