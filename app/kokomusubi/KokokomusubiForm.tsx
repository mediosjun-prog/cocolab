'use client';

import { useState } from 'react';

interface KokokomusubiFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

const ATTACHMENT_ISSUES = [
  '見捨てられる不安が強い',
  '人に頼るのが怖く、何でも自分で抱え込んでしまう',
  '親の機嫌や顔色を常に伺ってきた',
  '自分の意見を言うと拒絶されると感じる',
  '距離が近づくと急に怖くなって逃げたくなる',
  '人から愛される価値がないと感じる',
  '「いい子」でいないと愛されないと思っていた',
];

export default function KokokomusubiForm({ onSubmit, loading }: KokokomusubiFormProps) {
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [parentDynamic, setParentDynamic] = useState('');
  const [currentChallenge, setCurrentChallenge] = useState('');

  const toggleIssue = (issue: string) => {
    if (selectedIssues.includes(issue)) {
      setSelectedIssues(selectedIssues.filter((i) => i !== issue));
    } else {
      setSelectedIssues([...selectedIssues, issue]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      attachmentIssues: selectedIssues.join('、'),
      parentDynamic,
      currentChallenge,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6 text-sm">
        {/* 1. 愛着の傷・傾向の選択 */}
        <div className="p-4 rounded-2xl bg-emerald-50/20 border border-emerald-100 space-y-2">
          <label className="block font-bold text-gray-700">
            ご自身の中に感じる「愛着のパターンや傾向」（複数選択可）
          </label>
          <div className="flex flex-wrap gap-2 pt-1">
            {ATTACHMENT_ISSUES.map((issue) => {
              const isSelected = selectedIssues.includes(issue);
              return (
                <button
                  type="button"
                  key={issue}
                  onClick={() => toggleIssue(issue)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border text-left ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/30'
                  }`}
                >
                  {issue}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. 子ども時代の親子関係のダイナミクス */}
        <div>
          <label className="block font-bold text-gray-700 mb-1">
            子ども時代、親との関係で最もプレッシャーだったことや環境
          </label>
          <textarea
            value={parentDynamic}
            onChange={(e) => setParentDynamic(e.target.value)}
            placeholder="例：母が常にヒステリックで安心できなかった、父の期待が高く応えられないと無視された、など"
            rows={3}
            className="w-full p-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-emerald-500 text-xs resize-none bg-white/50"
          />
        </div>

        {/* 3. 今の対人関係や生きづらさでの悩み */}
        <div>
          <label className="block font-bold text-gray-700 mb-1">
            現在、パートナーシップや人間関係で繰り返してしまうお悩み
          </label>
          <textarea
            value={currentChallenge}
            onChange={(e) => setCurrentChallenge(e.target.value)}
            placeholder="例：相手が少し不機嫌なだけで自分が責められているように感じてパニックになる、など"
            rows={3}
            className="w-full p-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-emerald-500 text-xs resize-none bg-white/50"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer text-sm"
      >
        {loading ? 'AIがここむすびのプログラムを構築中...' : '安全基地を育むカウンセリングを受け取る'}
      </button>
    </form>
  );
}