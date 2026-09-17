'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { KokotalkConfig } from './page';

interface Props {
  initialConfig: KokotalkConfig;
  onStart: (config: KokotalkConfig) => void;
}

// スタイルの選択肢リスト
const STYLE_OPTIONS = [
  '相手の名前を会話の中に自然に盛り込む',
  '相手の話を遮らず、適度に相槌を打つ',
  '会話の中にユーモアを取り入れる',
  '相手に寄り添い、共感を示す',
  '相手を尊重しながら自分の意見を伝える',
  'さりげなく褒め言葉を使う',
  '話すよりも聞くことを意識する',
  '表情や声のトーンを豊かにする',
  'ギャップ有り',
];

// VOICEVOXのサンプルリスト（例：四国めたん、ずんだもん等）
const VOICE_OPTIONS = [
  { id: 2, name: '四国めたん (ノーマル)' },
  { id: 3, name: 'ずんだもん (ノーマル)' },
  { id: 8, name: '春日部つむぎ (ノーマル)' },
  { id: 10, name: '雨晴はう (ノーマル)' },
];

// アバターのサンプル（性別で絞り込み）
const AVATARS = {
  女性: [
    { id: 'f1', name: 'お姉さん風', url: '/images/avatar_f2.png' },
    { id: 'f2', name: 'キュート風', url: '/images/avatar_f1.png' },
  ],
  男性: [
    { id: 'm1', name: 'クール風', url: '/images/avatar_m2.png' },
    { id: 'm2', name: '爽やか風', url: '/images/avatar_m1.png' },
  ],
  その他: [
    { id: 'o1', name: '中性・マスコット', url: '/images/avatar_o1.png' },
  ],
};

export default function KokotalkSetup({ initialConfig, onStart }: Props) {
  const [gender, setGender] = useState(initialConfig.gender);
  const [age, setAge] = useState(initialConfig.age);
  const [occupation, setOccupation] = useState(initialConfig.occupation);
  const [personality, setPersonality] = useState(initialConfig.personality);
  const [styles, setStyles] = useState<string[]>(initialConfig.styles);
  
  // 性別に応じたアバターリストの取得
  const currentAvatars = AVATARS[gender as keyof typeof AVATARS] || AVATARS['女性'];
  const [avatar, setAvatar] = useState(initialConfig.avatar || currentAvatars[0].url);
  const [voiceId, setVoiceId] = useState(initialConfig.voiceId);

  // チェックボックスの切り替えハンドラ
  const handleStyleToggle = (style: string) => {
    if (styles.includes(style)) {
      setStyles(styles.filter((s) => s !== style));
    } else {
      setStyles([...styles, style]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart({ gender, age, occupation, personality, styles, avatar, voiceId });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800">こことーく 設定</h1>
        <p className="text-sm text-slate-500 mt-1">対話するAIキャラクターの設定を行いましょう</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. 会話相手の設定 */}
        <section className="space-y-4">
          <h2 className="text-base font-semibold text-slate-700 border-b pb-2">1. 会話相手のプロフィール設定</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">性別</label>
              <select
                value={gender}
                onChange={(e) => {
                  const newGender = e.target.value;
                  setGender(newGender);
                  // 性別が変わったらアバターの選択もリセット・連動
                  const defaultAvatarList = AVATARS[newGender as keyof typeof AVATARS] || AVATARS['女性'];
                  setAvatar(defaultAvatarList[0].url);
                }}
                className="w-full rounded-lg border border-slate-200 p-2.5 text-sm bg-white"
              >
                <option value="女性">女性</option>
                <option value="男性">男性</option>
                <option value="その他">その他・中性</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">年齢</label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2.5 text-sm bg-white"
              >
                <option value="10代">10代</option>
                <option value="20代">20代</option>
                <option value="30代">30代</option>
                <option value="40代">40代</option>
                <option value="50代以上">50代以上</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">職業</label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="例: カウンセラー、会社員"
                className="w-full rounded-lg border border-slate-200 p-2.5 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">性格・雰囲気</label>
              <input
                type="text"
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
                placeholder="例: お姉さん系、明るくポジティブ"
                className="w-full rounded-lg border border-slate-200 p-2.5 text-sm"
              />
            </div>
          </div>
        </section>

        {/* 2. 対話スタイル（チェックボックス） */}
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-slate-700 border-b pb-2">2. 会話相手へ求める対応（複数選択可）</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {STYLE_OPTIONS.map((style) => {
              const isChecked = styles.includes(style);
              return (
                <label
                  key={style}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    isChecked
                      ? 'border-emerald-500 bg-emerald-50/30 text-emerald-900 font-medium'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleStyleToggle(style)}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                  />
                  <span className="text-sm">{style}</span>
                </label>
              );
            })}
          </div>
        </section>

        {/* 3. アバターの選択（性別連動） */}
<section className="space-y-3">
          <h2 className="text-base font-semibold text-slate-700 border-b pb-2">3. アバターの選択</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {currentAvatars.map((item) => (
              <div
                key={item.id}
                onClick={() => setAvatar(item.url)}
                className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${
                  avatar === item.url ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/10' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* 修正：グレーの四角の代わりに <img> タグでアバター画像を表示 */}
                <div className="w-16 h-16 mx-auto rounded-full mb-2 overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs font-medium text-slate-700">{item.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 声の選択（VOICEVOX） */}
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-slate-700 border-b pb-2">4. 声の選択（VOICEVOX）</h2>
          <select
            value={voiceId}
            onChange={(e) => setVoiceId(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-200 p-2.5 text-sm bg-white"
          >
            {VOICE_OPTIONS.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} (ID: {v.id})
              </option>
            ))}
          </select>
        </section>

        {/* 5. 「とーく開始」ボタン */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 transition-all text-center"
          >
            とーく開始する
          </button>
        </div>
      </form>
    </div>
  );
}