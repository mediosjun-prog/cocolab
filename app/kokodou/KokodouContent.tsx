'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

// データの定義
const attachmentTypes = [
  { id: 'stable', title: '安定型', desc: '自分も相手も信じられ、健全で柔軟な距離感を保てる' },
  { id: 'anxious', title: '不安型', desc: '見捨てられる不安が強く、愛情の確認や頻繁な連絡を求めがち' },
  { id: 'avoidant', title: '回避型', desc: '親密になりすぎると窮屈に感じ、距離を置こうとする' },
  { id: 'fearful', title: '恐れ・回避型', desc: '愛されたいのに傷つくのが怖く、近づきたいのに遠ざけてしまう' },
];

const situations = [
  { id: 'no_reply', label: '連絡が返ってこない（既読・未読スルー）' },
  { id: 'cancellation', label: 'デートや約束をドタキャンされた' },
  { id: 'jealousy', label: 'パートナーが他の異性と楽しそうに話していた' },
  { id: 'busy', label: '仕事が忙しくて会えない日が続いている' },
  { id: 'future', label: '将来（同棲や結婚など）の話をはぐらかされた' },
// 連絡・コミュニケーションのすれ違い
  { id: 'situation_no_reply', label: '連絡が返ってこない（既読・未読スルーされている）' },
  { id: 'situation_short_reply', label: 'LINEの返信が極端にそっけない・スタンプだけで終わる' },
  { id: 'situation_busy', label: '仕事やプライベートが忙しいと言われ、会えない日が続いている' },
  
  // 約束・予定の変更
  { id: 'situation_cancellation', label: '楽しみにしていたデートや約束をドタキャンされた' },
  { id: 'situation_forget_anniversary', label: '記念日や誕生日を忘れられた、または適当に扱われた' },
  { id: 'situation_canceling_plans', label: '先の予定（旅行やイベント）をなかなか決めてくれない' },

  // 感情・距離感の揺らぎ
  { id: 'situation_jealousy', label: 'パートナーが他の異性（同性）と楽しそうに話しているのを見た' },
  { id: 'situation_cold_attitude', label: '最近、相手の態度が冷たく感じられ、距離を感じる' },
  { id: 'situation_secrecy', label: 'スマホを隠すように見たり、急にプライベートを秘密にしだした' },

  // 未来・価値観の衝突
  { id: 'situation_future', label: '将来（同棲や結婚、仕事）の話をすると、話題をはぐらかされる' },
  { id: 'situation_argument_minor', label: '些細な言い争いになったとき、相手が急に話を放棄して黙り込んだ' },
  { id: 'situation_asking_for_space', label: '相手から「少し一人の時間がほしい（距離を置きたい）」と言われた' },

];

export default function KokodouContent() {
  // ステート管理
  const [step, setStep] = useState<number>(1);
  const [myType, setMyType] = useState<string>('anxious');
  const [partnerType, setPartnerType] = useState<string>('avoidant');
  const [situation, setSituation] = useState<string>('no_reply');
  const [actionText, setActionText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [hasResult, setHasResult] = useState<boolean>(false);

  // 分析実行ボタン
  const handleAnalyze = () => {
    if (!actionText.trim()) return;
    setIsAnalyzing(true);
    setHasResult(false);

    // 擬似的なローディング演出（1.2秒後）
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasResult(true);
      setStep(5); // 結果ステップへ
    }, 1200);
  };

  // リセット
  const handleReset = () => {
    setStep(1);
    setActionText('');
    setHasResult(false);
  };

  return (
    <main className="w-full pb-20">
      {/* ヘッダーセクション */}
      <section className="relative overflow-hidden from-[#E8F5E9] via-[#F1F8F2] to-[#FDFBF7] py-13 px-4 text-center">
        <div className="max-w-6xl mx-auto space-y-4 relative z-10">
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
            対人シミュレーション
          </span>
          <PageHeader title="ここどう" />
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            「あなたの行動で、相手はどう受け止め、どう動くのか？」愛着スタイルの視点から二人の相互作用を紐解き、より良い未来へのヒントを見つけます。
          </p>
        </div>
      </section>

      {/* メインコンテンツエリア */}
      <div className="max-w-6xl mx-auto px-4 mt-8 space-y-8">
        
        {/* ステップインジケーター */}
        {step < 5 && (
          <div className="flex items-center justify-between bg-white border border-[#EFECE6] rounded-2xl p-4 shadow-xs text-xs sm:text-sm font-medium text-slate-600">
            <span className={step >= 1 ? 'text-emerald-700 font-bold' : ''}>1. あなたのタイプ</span>
            <span>＞</span>
            <span className={step >= 2 ? 'text-emerald-700 font-bold' : ''}>2. 相手のタイプ</span>
            <span>＞</span>
            <span className={step >= 3 ? 'text-emerald-700 font-bold' : ''}>3. シチュレーション</span>
            <span>＞</span>
            <span className={step >= 4 ? 'text-emerald-700 font-bold' : ''}>4. あなたの行動</span>
          </div>
        )}

        {/* 入力フォームカード */}
        <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">

          {/* STEP 1: あなたの愛着タイプ */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-base sm:text-lg font-bold text-[#1F2937]">
                1. あなたの愛着タイプに近いものはどれですか？
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {attachmentTypes.map((t) => (
                  <label
                    key={t.id}
                    className={`flex flex-col p-4 rounded-2xl border transition-all cursor-pointer ${
                      myType === t.id ? 'bg-[#E8F5E9]/60 border-[#446246] shadow-xs' : 'bg-[#FAFAF8] border-[#EFECE6] hover:border-[#D1E7D2]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <input
                        type="radio"
                        name="myType"
                        checked={myType === t.id}
                        onChange={() => setMyType(t.id)}
                        className="accent-[#446246]"
                      />
                      <span className="font-bold text-sm text-[#1F2937]">{t.title}</span>
                    </div>
                    <p className="text-xs text-[#6B7280] pl-5 leading-relaxed">{t.desc}</p>
                  </label>
                ))}
              </div>
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 !text-white text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  次へ進む ➔
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: 相手の愛着タイプ */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-base sm:text-lg font-bold text-[#1F2937]">
                2. 対峙する相手の愛着タイプはどれに近いですか？
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {attachmentTypes.map((t) => (
                  <label
                    key={t.id}
                    className={`flex flex-col p-4 rounded-2xl border transition-all cursor-pointer ${
                      partnerType === t.id ? 'bg-[#E8F5E9]/60 border-[#446246] shadow-xs' : 'bg-[#FAFAF8] border-[#EFECE6] hover:border-[#D1E7D2]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <input
                        type="radio"
                        name="partnerType"
                        checked={partnerType === t.id}
                        onChange={() => setPartnerType(t.id)}
                        className="accent-[#446246]"
                      />
                      <span className="font-bold text-sm text-[#1F2937]">{t.title}</span>
                    </div>
                    <p className="text-xs text-[#6B7280] pl-5 leading-relaxed">{t.desc}</p>
                  </label>
                ))}
              </div>
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-bold rounded-xl transition-all cursor-pointer"
                >
                  戻る
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 !text-white text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  次へ進む ➔
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: シチュレーション選択 */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-base sm:text-lg font-bold text-[#1F2937]">
                3. どのようなシチュレーション（場面）ですか？
              </h2>
              <div className="space-y-2.5">
                {situations.map((s) => (
                  <label
                    key={s.id}
                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                      situation === s.id ? 'bg-[#E8F5E9]/60 border-[#446246] shadow-xs' : 'bg-[#FAFAF8] border-[#EFECE6] hover:border-[#D1E7D2]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="situation"
                      checked={situation === s.id}
                      onChange={() => setSituation(s.id)}
                      className="accent-[#446246]"
                    />
                    <span className="text-sm font-bold text-[#1F2937]">{s.label}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-bold rounded-xl transition-all cursor-pointer"
                >
                  戻る
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 !text-white text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  次へ進む ➔
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: あなたの行動 */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-base sm:text-lg font-bold text-[#1F2937]">
                4. そのとき、あなたならどのような行動をとりますか？
              </h2>
              <p className="text-xs text-slate-500">
                例：「どうしたの？と不安になって何度もLINEを送る」「何も言わずに自分も連絡を断つ」「冷静に『少し心配だった』と伝える」など
              </p>
              <textarea
                value={actionText}
                onChange={(e) => setActionText(e.target.value)}
                placeholder="あなたの具体的な行動や言葉を入力してください..."
                rows={4}
                className="w-full p-4 border border-[#EFECE6] rounded-2xl focus:outline-none focus:border-[#446246] text-sm text-[#1F2937] bg-[#FAFAF8]"
              />
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-bold rounded-xl transition-all cursor-pointer"
                >
                  戻る
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={!actionText.trim() || isAnalyzing}
                  className={`px-8 py-3 bg-emerald-600 hover:bg-emerald-700 !text-white text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer ${
                    (!actionText.trim() || isAnalyzing) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isAnalyzing ? '分析中...' : '結果を見る ✨'}
                </button>
              </div>
            </div>
          )}

          {/* 分析中エフェクト */}
          {isAnalyzing && (
            <div className="py-16 text-center space-y-4">
              <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-sm font-medium text-slate-600">二人の愛着パターンと相互作用を分析しています...</p>
            </div>
          )}

          {/* STEP 5: 結果表示 */}
          {hasResult && !isAnalyzing && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center pb-2 border-b border-[#EFECE6]">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                  シミュレーション結果
                </span>
                <h2 className="text-xl font-bold text-[#1F2937] mt-2">
                  ここどう分析レポート
                </h2>
              </div>

              {/* 5. 相手の行動を推測 */}
              <div className="bg-[#FAFAF8] border border-[#EFECE6] rounded-2xl p-5 space-y-2">
                <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-2">
                  <span>👀</span> 5. 相手の行動の推測
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  あなたがその行動をとったとき、相手（回避型傾向）は「プレッシャーを感じた」と受け止め、さらに殻に閉じこもる（返信を意図的に遅らせる、あるいは距離を置く）可能性が高いです。
                </p>
              </div>

              {/* 6. 相手の行動心理の分析 */}
              <div className="bg-[#FAFAF8] border border-[#EFECE6] rounded-2xl p-5 space-y-2">
                <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-2">
                  <span>🧠</span> 6. 相手の行動心理
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  相手はあなたを嫌いになったわけではなく、過度な要求や詰め寄られる感覚に対して「自己防衛反応（逃走本能）」が働いています。愛着システムが過敏になり、一人の時間でエネルギーを回復しようとしています。
                </p>
              </div>

              {/* 7. 二人の関係の未来予測 */}
              <div className="bg-[#FAFAF8] border border-[#EFECE6] rounded-2xl p-5 space-y-2">
                <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-2">
                  <span>⚖️</span> 7. 二人の関係どうなる？
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  このままお互いの不安と回避のパターン（追う側・逃げる側）を繰り返すと、あなた側の不満が爆発し、相手側は「これ以上は無理だ」と心を閉ざしてしまうデッドロック（膠着状態）に陥る危険性があります。
                </p>
              </div>

              {/* 8. より良い結果にするためのアドバイス */}
              <div className="bg-[#E8F5E9]/50 border border-[#C1E1C2] rounded-2xl p-5 space-y-2">
                <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                  <span>💡</span> 8. より良い関係にするためのアドバイス
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  まずは相手をコントロールしようとするのをやめ、ご自身の不安な感情をセルフ・コンパッション（自分で自分を労う）で落ち着けましょう。連絡をする際は、相手を責める言葉ではなく、自分の寂しさを穏やかに伝える「アイ・メッセージ」を意識してみてください。
                </p>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={handleReset}
                  className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 !text-white text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  🔄 もう一度別のシチュエーションで試す
                </button>
              </div>
            </div>
          )}

        </div>

        {/* 下部リンク */}
        <div className="pt-2 text-center">
          <Link
            href="/kokoroom"
            className="text-xs text-slate-500 hover:text-emerald-700 underline transition-all"
          >
            💬 今のモヤモヤを「ここるーむ」で吐き出してみる
          </Link>
        </div>

      </div>
    </main>
  );
}