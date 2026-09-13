// app/kokosuki/KokosukiContent.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { saveKokosukiRecord, getKokosukiRecords, KokosukiRecord, deleteKokosukiRecord } from './kokosukiStorage';

const COMMON_NEGATIVES = [
  '気にしすぎ、考えすぎてしまう',
  '断るのが苦手、流されやすい',
  '行動が遅い、慎重すぎる',
  '三日坊主になりやすい',
  '自己主張ができない',
  'マイナス思考になりがち',
  '人見知り、緊張しやすい',
  'おっちょこちょい、忘れっぽい',
  '飽き性で移り気である',
  '完璧主義すぎて疲れてしまう',
  '周りの目が気になってしまう',
  '優柔不断で決められない',
  '感情の波が激しい、落ち込みやすい',
  '内向的でうまく話せない',
  'おせっかいを焼きすぎてしまう',
  '心配性で最悪の事態ばかり考えてしまう',
  '一つのことに集中しすぎて他が見えなくなる',
  'めんどくさがり屋、動くのが億劫',
];

export default function KokosukiContent() {
  const [selectedNegatives, setSelectedNegatives] = useState<string[]>([]);
  const [customNegative, setCustomNegative] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<KokosukiRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');

  useEffect(() => {
    setHistory(getKokosukiRecords());
  }, []);

  const toggleSelect = (item: string) => {
    if (selectedNegatives.includes(item)) {
      setSelectedNegatives(selectedNegatives.filter(i => i !== item));
    } else {
      setSelectedNegatives([...selectedNegatives, item]);
    }
  };

  const handleTransform = async () => {
    if (selectedNegatives.length === 0 && !customNegative.trim()) {
      alert('気になることを1つ以上選択または入力してください。');
      return;
    }

    setLoading(true);
    setAiResponse(null);
    setSaved(false);

    try {
      let res = await fetch('/api/kokosuki/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ negatives: selectedNegatives, customNegative }),
      });

      let data = await res.json();

      // 503エラー（高負荷）の場合に2秒待って1度だけ自動リトライ
      if (res.status === 503) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        res = await fetch('/api/kokosuki/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ negatives: selectedNegatives, customNegative }),
        });
        data = await res.json();
      }

      if (!res.ok) throw new Error(data.message || 'AIモデルが現在混雑しています。少し時間を置いて再度お試しください。');

      setAiResponse(data.message);
    } catch (err: any) {
      setAiResponse(`エラーが発生しました: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!aiResponse) return;
    saveKokosukiRecord({
      negatives: selectedNegatives,
      customNegative,
      positiveMessage: aiResponse,
    });
    setHistory(getKokosukiRecords());
    setSaved(true);
  };

  const handleDelete = (id: string) => {
    const updated = deleteKokosukiRecord(id);
    setHistory(updated);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* タブ切り替え */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-xs cursor-pointer ${
            activeTab === 'create' ? 'bg-emerald-600 text-white' : 'bg-white/60 text-gray-600 hover:bg-white'
          }`}
        >
          ✨ ここすき変換
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-xs cursor-pointer ${
            activeTab === 'history' ? 'bg-emerald-600 text-white' : 'bg-white/60 text-gray-600 hover:bg-white'
          }`}
        >
          📖 お気に入り保存箱 ({history.length})
        </button>
      </div>

      {activeTab === 'create' ? (
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-sm border border-emerald-100 p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-slate-800">自分の「ちょっと嫌だな」を、すてきな魅力に変換</h2>
            <p className="text-sm text-slate-600">
              普段気になってしまう自分の欠点やクセを選んだり入力したりして、ポジティブな言葉で癒やされましょう。
            </p>
          </div>

          {/* 選択肢 */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700">よくある「気になること」（複数選択可）</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {COMMON_NEGATIVES.map(item => {
                const isSelected = selectedNegatives.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleSelect(item)}
                    className={`text-left px-4 py-3 rounded-2xl text-xs sm:text-sm transition-all border cursor-pointer ${
                      isSelected
                        ? 'border-[#446246] bg-[#D0F9C7]/20 text-[#446246] font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {isSelected ? '💚 ' : '〇 '} {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 自由記入 */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-600">自由に書いてみる</label>
            <textarea
              value={customNegative}
              onChange={e => setCustomNegative(e.target.value)}
              placeholder="例：ついつい周りの目を気にしすぎて疲れてしまう..."
              rows={3}
              className="w-full rounded-2xl border border-slate-200 p-4 text-sm focus:border-[#446246] focus:ring-1 focus:ring-[#446246] outline-none transition-all text-slate-700 bg-slate-50/50"
            />
          </div>

          {/* 変換ボタン */}
          <button
            type="button"
            onClick={handleTransform}
            disabled={loading}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 !text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer disabled:opacity-50 text-sm sm:text-base flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>ポジティブに変換中...</span>
            ) : (
              <span>🪄 ポジティブに変換して誉めてもらう</span>
            )}
          </button>

          {/* AIの結果表示 */}
          {aiResponse && (
            <div className="mt-8 p-6 bg-emerald-50/60 border border-emerald-200 rounded-3xl space-y-4">
              <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                <span>🎁</span> AIからのポジティブメッセージ
              </h3>
              <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap bg-white p-4 rounded-2xl border border-emerald-100 shadow-2xs">
                {aiResponse}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saved}
                  className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                    saved
                      ? 'bg-slate-200 text-slate-500 cursor-default'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {saved ? '✨ 保存済みです' : '💚 お気に入り保存する'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* 履歴・保存箱タブ */
        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-12 bg-white/90 rounded-3xl border border-emerald-100 text-slate-400 text-sm">
              お気に入り保存されたメッセージはまだありません。
            </div>
          ) : (
            history.map(item => (
              <div key={item.id} className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-3">
                <div className="flex justify-between items-start text-xs text-slate-400">
                  <span>{new Date(item.date).toLocaleDateString()} 保存</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    削除
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.negatives.map((n, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs border border-emerald-100 font-medium">
                      {n}
                    </span>
                  ))}
                  {item.customNegative && (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs border border-emerald-100 font-medium">
                      {item.customNegative}
                    </span>
                  )}
                </div>
                <div className="text-sm text-slate-700 bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100 whitespace-pre-wrap">
                  {item.positiveMessage}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}