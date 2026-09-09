'use client';

import { useState } from 'react';
import KokokomusubiForm from './KokokomusubiForm';
import PageHeader from '@/components/PageHeader';

export default function KokokomusubiContent() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    try {
      const res = await fetch('/api/kokomusubi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'エラーが発生しました');
      setResult(data);
    } catch (e: any) {
      alert(e.message || 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/30 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* ヘッダーセクション */}
        <section className="text-center space-y-3 pt-4">
          <div>
            <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
              ATTACHMENT RECOVERY
            </span>
          </div>
          <PageHeader title="ここむすび" />
          <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            愛着の傷や親子関係にまつわるトラウマを紐解き、
            <br className="hidden sm:inline" />
            内なる安全基地を育てていくためのプログラムです。
          </p>
        </section>

        {/* フォームまたは結果表示 */}
        {!result ? (
          <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-sm">
            <KokokomusubiForm onSubmit={handleSubmit} loading={loading} />
          </div>
        ) : (
          <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-100">
                プログラム分析・アプローチ案
              </span>
              <h2 className="text-xl font-bold text-gray-800 mt-3">愛着の癒やしと安全基地の構築</h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 space-y-1.5">
                <h3 className="font-bold text-emerald-900">🌱 愛着スタイルの見立てと受容</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{result.attachmentAnalysis}</p>
              </div>

              <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 space-y-1.5">
                <h3 className="font-bold text-blue-900">🛡️ 内なる安全基地（セルフ・ケア）のワーク</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{result.safeBaseWork}</p>
              </div>

              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-100 space-y-1.5">
                <h3 className="font-bold text-amber-900">🕊️ 今ここから始める境界線（バウンダリー）の引き方</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{result.boundaryGuide}</p>
              </div>
            </div>

            <button
              onClick={() => setResult(null)}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all cursor-pointer text-sm"
            >
              入力画面に戻って別のテーマを深掘りする
            </button>
          </div>
        )}
      </div>
    </main>
  );
}