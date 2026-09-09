// app/iko/IkoSetup.tsx
'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';

interface IkoSetupProps {
  onStartSession: (config: {
    myGender: string;
    myAge: string;
    targetGender: string;
    targetAge: string;
    relation: string;
    situation: string;
    timeLimit: number;
  }) => void;
}

export default function IkoSetup({ onStartSession }: IkoSetupProps) {
  const [myGender, setMyGender] = useState('female');
  const [myAge, setMyAge] = useState('30代');
  const [targetGender, setTargetGender] = useState('male');
  const [targetAge, setTargetAge] = useState('30代');
  const [relation, setRelation] = useState('partner');
  const [situation, setSituation] = useState('opinion_diff');
  const [timeLimit, setTimeLimit] = useState(120); // 秒数 (デフォルト2分)

  const relations = [
    { id: 'partner', label: 'パートナー・恋人' },
    { id: 'family', label: '家族・親族' },
    { id: 'friend', label: '友人・知人' },
    { id: 'colleague', label: '職場の人・上司同僚' },
  ];

  const situations = [
    { id: 'opinion_diff', label: '意見が食い違ったとき、自分の気持ちを伝える' },
    { id: 'refuse', label: '相手の頼みや誘いを、角を立てずに断る' },
    { id: 'apologize', label: 'ミスをしてしまい、謝罪と歩み寄りをする' },
    { id: 'boundry', label: '相手の踏み込んだ言動に対して、優しく境界線を引く' },
    { id: 'vulnerable', label: '自分の弱音や本音を素直に打ち明ける' },
    { id: 'praise', label: '相手からの褒め言葉や好意を素直に受け取る' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartSession({
      myGender,
      myAge,
      targetGender,
      targetAge,
      relation,
      situation,
      timeLimit,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="text-center space-y-4 pt-4 mb-6">
        <div>
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
            COCOIKU
          </span>
        </div>
        <PageHeader title="ここいく（対人関係シミュレーション）" />
        <p className="text-sm text-gray-600">
          安全な仮想世界の中で、心地よい距離感やコミュニケーションを対話を通じて学びましょう。
        </p>
      </section>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-sm">
        {/* 自分と相手の設定 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* 自分 */}
          <div className="space-y-4 p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100">
            <h3 className="text-sm font-bold text-emerald-900">👤 あなたの設定</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">性別</label>
                <select
                  value={myGender}
                  onChange={(e) => setMyGender(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-400 outline-none"
                >
                  <option value="female">女性</option>
                  <option value="male">男性</option>
                  <option value="other">その他・答えない</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">年代</label>
                <select
                  value={myAge}
                  onChange={(e) => setMyAge(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-400 outline-none"
                >
                  <option value="20代">20代</option>
                  <option value="30代">30代</option>
                  <option value="40代">40代</option>
                  <option value="50代">50代</option>
                  <option value="60代以上">60代以上</option>
                </select>
              </div>
            </div>
          </div>

          {/* 相手 */}
          <div className="space-y-4 p-4 bg-amber-50/40 rounded-2xl border border-amber-100">
            <h3 className="text-sm font-bold text-amber-900">👥 お相手の設定</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">相手の性別</label>
                <select
                  value={targetGender}
                  onChange={(e) => setTargetGender(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-amber-400 outline-none"
                >
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                  <option value="other">その他</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">相手の年代</label>
                <select
                  value={targetAge}
                  onChange={(e) => setTargetAge(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-gray-200 text-sm focus:ring-2 focus:ring-amber-400 outline-none"
                >
                  <option value="同年代">同年代</option>
                  <option value="年上">年上・目上</option>
                  <option value="年下">年下・後輩</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 関係性 */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-700">🤝 二人の関係性</label>
          <div className="grid grid-cols-2 gap-3">
            {relations.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRelation(r.id)}
                className={`p-3 rounded-2xl text-xs sm:text-sm font-medium border text-left transition-all ${
                  relation === r.id
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-xs'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* シチュエーション選択 */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-700">🌱 シチュエーション（学びたい場面）</label>
          <div className="space-y-2">
            {situations.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSituation(s.id)}
                className={`w-full p-3.5 rounded-2xl text-xs sm:text-sm font-medium border text-left transition-all ${
                  situation === s.id
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-xs'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 会話制限時間 */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-700">⏱️ 会話の制限時間</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { time: 60, label: '1分（短め）' },
              { time: 120, label: '2分（標準）' },
              { time: 180, label: '3分（じっくり）' },
            ].map((t) => (
              <button
                key={t.time}
                type="button"
                onClick={() => setTimeLimit(t.time)}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  timeLimit === t.time
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-xs'
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* スタートボタン */}
        <button
          type="submit"
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer"
        >
          💬 シミュレーションを開始する
        </button>
      </form>
    </div>
  );
}