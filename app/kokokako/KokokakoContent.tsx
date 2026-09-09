'use client';

import { useState } from 'react';
import KokokakoForm from './kokokakoForm';
import PageHeader from '@/components/PageHeader';

export default function KokokakoContent() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    try {
      const res = await fetch('/api/kokokako', {
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
      <div className="max-w-4xl mx-auto space-y-6">
        {/* ヘッダーセクション */}
        <section className="text-center space-y-3 pt-4">
          <div>
            <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
              REFRAME
            </span>
          </div>
          <PageHeader title="ここかこ" />
          <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            当時の記憶や感情を整理し、AIカウンセラーと一緒に
            <br className="hidden sm:inline" />
            内的ワーキングモデルの更新と新しい意味づけを見つけていきましょう。
          </p>
        </section>

        {/* フォームまたは結果表示 */}
        {!result ? (
          <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-sm">
            <KokokakoForm onSubmit={handleSubmit} loading={loading} />
          </div>
        ) : (
          <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-100">
                分析結果
              </span>
              <h2 className="text-xl font-bold text-gray-800 mt-3">過去の再意味づけとカウンセリング</h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 space-y-1.5">
                <h3 className="font-bold text-emerald-900">🌱 当時の痛みの受容と労い</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {result.reframingAnalysis || result.painAcceptance || result.analysis || 'データがありません'}
                </p>
              </div>

              <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 space-y-1.5">
                <h3 className="font-bold text-blue-900">💡 新しい意味づけ（リフレーミング）</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {result.newMeaning || 'データがありません'}
                </p>
              </div>

              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-100 space-y-1.5">
                <h3 className="font-bold text-amber-900">💌 過去の自分（インナーチャイルド）へ</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {result.actionStep || result.innerChildMessage || result.action || 'データがありません'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setResult(null)}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all cursor-pointer text-sm"
            >
              入力画面に戻って再挑戦する
            </button>
          </div>
        )}
      </div>
    </main>
  );
}