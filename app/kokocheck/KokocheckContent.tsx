'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';

export default function KokocheckContent() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // フォームの状態
  const [situationType, setSituationType] = useState('職場・仕事関係');
  const [selectedBehavior, setSelectedBehavior] = useState('');
  const [userChoice, setUserChoice] = useState('');
  const [relationshipContext, setRelationshipContext] = useState('');

  const situationOptions = [
    { id: 'work', label: '職場・仕事関係（上司、同僚からの依頼や理不尽な対応）' },
    { id: 'partner', label: 'パートナー・家族（意見のすれ違いや期待へのプレッシャー）' },
    { id: 'friend', label: '友人・知人関係（誘いの断り方や距離感の悩み）' },
    { id: 'other', label: 'その他（日常の様々な対人トラブル・自己防衛の場面）' },
  ];

  // よくある反応・行動の選択肢
  const behaviorOptions = [
    { id: 'compliance', label: '本当は嫌だったが、相手の機嫌や空気を壊すのが怖くて笑顔で引き受けてしまった' },
    { id: 'avoidance', label: '衝突や面倒なことを避けるため、既読スルーや話題をそらして逃げてしまった' },
    { id: 'suppression', label: '言いたいことはあったが、「自分が我慢すればいい」と心を無にして飲み込んだ' },
    { id: 'reflex', label: '相手の勢いに圧倒され、反射的にその場しのぎの返事をして後から後悔した' },
    { id: 'other_behavior', label: 'その他（下の詳細・補足欄に具体的に記入する）' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBehavior) {
      alert('その時の振る舞い（選択肢）をいずれかお選びください。');
      return;
    }

    // 選択肢と自由記入をまとめて送信用のテキストに合成
    const combinedChoice = `【選んだ行動パターン】\n${selectedBehavior}\n\n【詳細・補足】\n${userChoice.trim() || '特になし'}`;

    setLoading(true);
    try {
      const res = await fetch('/api/kokocheck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          situationType,
          userChoice: combinedChoice,
          relationshipContext,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'エラーが発生しました');
      setResult(data);
    } catch (err: any) {
      alert(err.message || 'エラーが発生しました');
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
              RECOVERY CHECK
            </span>
          </div>
          <PageHeader title="ここチェック（回復診断）" />
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            日々のシチュエーションでどのような選択をしたかを振り返り、
            <br className="hidden sm:inline" />
            回避傾向に気づき、アサーティブな関わり方と今の回復度をチェックします。
          </p>
        </section>

        {/* メインコンテンツ（未診断時はフォーム、診断後は結果表示） */}
        {!result ? (
          <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. シチュエーション選択 */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">
                  1. 場面・関係性の選択
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {situationOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSituationType(opt.label)}
                      className={`p-3.5 text-left text-xs sm:text-sm rounded-2xl border transition-all cursor-pointer ${
                        situationType === opt.label
                          ? 'border-[#446246] bg-[#D0F9C7]/20 text-[#446246] font-bold shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. 自分の振る舞い（選択式 ＋ 詳細・補足の統合ブロック） */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-700">
                  2. その時、どのように振る舞ってしまいましたか？（最も近いものをお選びください）
                </label>
                <div className="space-y-2">
                  {behaviorOptions.map((beh) => (
                    <button
                      key={beh.id}
                      type="button"
                      onClick={() => setSelectedBehavior(beh.label)}
                      className={`w-full p-3.5 text-left text-xs sm:text-sm rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        selectedBehavior === beh.label
                          ? 'border-[#446246] bg-[#D0F9C7]/20 text-[#446246] font-bold shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span className={`w-4 h-4 mt-0.5 rounded-full border flex items-center justify-center shrink-0 ${
                        selectedBehavior === beh.label ? 'border-[#446246] bg-[#446246]' : 'border-slate-300'
                      }`}>
                        {selectedBehavior === beh.label && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </span>
                      <span>{beh.label}</span>
                    </button>
                  ))}
                </div>

                {/* 選択肢とセットになった詳細・補足テキストエリア */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-600 mb-1.5" htmlFor="userChoice">
                    詳細・補足（当時の具体的なエピソードや相手の言動など、自由にご記入ください）
                  </label>
                  <textarea
                    id="userChoice"
                    rows={3}
                    value={userChoice}
                    onChange={(e) => setUserChoice(e.target.value)}
                    placeholder="例：上司から「これ明日までにやっておいて」と定間際に追加の仕事を振られ、断れずに引き受けてしまいました。"
                    className="w-full p-4 text-sm rounded-2xl border border-slate-200 focus:border-[#446246] focus:ring-1 focus:ring-[#446246] outline-none transition-all text-slate-700 bg-slate-50/50"
                  />
                </div>
              </div>

              {/* 3. 関係性の背景（任意） */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700" htmlFor="relationshipContext">
                  3. 相手との関係性や、心の背景（任意）
                </label>
                <input
                  type="text"
                  id="relationshipContext"
                  value={relationshipContext}
                  onChange={(e) => setRelationshipContext(e.target.value)}
                  placeholder="例：過去に断って機嫌を損ねられたトラウマがある等"
                  className="w-full p-3.5 text-sm rounded-2xl border border-slate-200 focus:border-[#446246] focus:ring-1 focus:ring-[#446246] outline-none transition-all text-slate-700 bg-slate-50/50"
                />
              </div>

              {/* 送信ボタン */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 !text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer disabled:opacity-50 text-sm sm:text-base flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>AIが回復度と選択を分析中...</span>
                  </>
                ) : (
                  <span>ここチェックを実行する</span>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* 診断結果表示 */
          <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-100">
                回復チェック結果
              </span>
              <h2 className="text-xl font-bold text-slate-800 mt-3">あなたの選択と心の現在地</h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 space-y-1.5">
                <h3 className="font-bold text-emerald-900">🛡️ 回避・恐れ回避の傾向分析</h3>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {result.avoidanceAnalysis || 'データがありません'}
                </p>
              </div>

              <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 space-y-1.5">
                <h3 className="font-bold text-blue-900">💡 アサーティブな選択・関わり方のヒント</h3>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {result.assertiveAlternative || 'データがありません'}
                </p>
              </div>

              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-100 space-y-1.5">
                <h3 className="font-bold text-amber-900">🌱 現在の回復度ステータスと労いのメッセージ</h3>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {result.recoveryScoreAndMessage || 'データがありません'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setResult(null)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 !text-white font-bold rounded-2xl transition-all cursor-pointer text-sm"
            >
              別のシチュエーションで再挑戦する
            </button>
          </div>
        )}
      </div>
    </main>
  );
}