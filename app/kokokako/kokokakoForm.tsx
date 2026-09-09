'use client';

import { useState } from 'react';

interface KokokakoFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

// 感情の選択肢リスト
const EMOTION_OPTIONS = {
  minus: ['恐怖', '苛立ち', '怒り', '悲しみ', '恥ずかしい', '寂しい', '無愛想', '拒絶感', '無力感', '緊張', '罪悪感'],
  plus: ['暖かい', '喜び', '明るい', '憧れ', '味わい深い', '愛情に満ちた', '安心', '感謝', '愛おしい', '尊敬'],
};

// 選択肢を選ぶためのコンポーネント（複数選択対応）
function EmotionSelector({
  label,
  selectedValues,
  onChange,
  otherValue,
  onOtherChange,
}: {
  label: string;
  selectedValues: string[];
  onChange: (values: string[]) => void;
  otherValue: string;
  onOtherChange: (val: string) => void;
}) {
  const toggleEmotion = (emotion: string) => {
    if (selectedValues.includes(emotion)) {
      onChange(selectedValues.filter((item) => item !== emotion));
    } else {
      onChange([...selectedValues, emotion]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block font-bold text-gray-700">{label}</label>
      
      {/* マイナス感情タグ */}
      <div>
        <span className="text-xs font-semibold text-rose-700 block mb-1">▼ マイナスの感情（複数選択可）</span>
        <div className="flex flex-wrap gap-1.5">
          {EMOTION_OPTIONS.minus.map((emo) => {
            const isSelected = selectedValues.includes(emo);
            return (
              <button
                type="button"
                key={emo}
                onClick={() => toggleEmotion(emo)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-rose-300 hover:bg-rose-50/30'
                }`}
              >
                {emo}
              </button>
            );
          })}
        </div>
      </div>

      {/* プラス感情タグ */}
      <div className="pt-1">
        <span className="text-xs font-semibold text-emerald-700 block mb-1">▼ プラスの感情（複数選択可）</span>
        <div className="flex flex-wrap gap-1.5">
          {EMOTION_OPTIONS.plus.map((emo) => {
            const isSelected = selectedValues.includes(emo);
            return (
              <button
                type="button"
                key={emo}
                onClick={() => toggleEmotion(emo)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/30'
                }`}
              >
                {emo}
              </button>
            );
          })}
        </div>
      </div>

      {/* その他の自由記述 */}
      <div className="pt-1">
        <input
          type="text"
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder="その他の気持ちや補足（例：諦めに似た感情、など）"
          className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 text-xs bg-white/50"
        />
      </div>
    </div>
  );
}

export default function kokokakoForm({ onSubmit, loading }: KokokakoFormProps) {
  // 各項目の状態（配列で選択された感情を保持）
  const [pastParentEmotions, setPastParentEmotions] = useState<string[]>([]);
  const [pastParentOther, setPastParentOther] = useState('');

  const [currentParentEmotions, setCurrentParentEmotions] = useState<string[]>([]);
  const [currentParentOther, setCurrentParentOther] = useState('');

  const [parentRelation, setParentRelation] = useState('');

  const [siblingEmotions, setSiblingEmotions] = useState<string[]>([]);
  const [siblingOther, setSiblingOther] = useState('');

  // 自由記述項目
  const [traumaEvent, setTraumaEvent] = useState('');
  const [hurtWords, setHurtWords] = useState('');
  const [happyWords, setHappyWords] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 選択された感情と自由記述をまとめて文字列（またはオブジェクト）としてAPIに渡す形に結合
    const formatEmotions = (emotions: string[], other: string) => {
      const list = [...emotions];
      if (other.trim()) list.push(other.trim());
      return list.join('、');
    };

    const formData = {
      pastParentEmotion: formatEmotions(pastParentEmotions, pastParentOther),
      currentParentEmotion: formatEmotions(currentParentEmotions, currentParentOther),
      parentRelation,
      siblingEmotion: formatEmotions(siblingEmotions, siblingOther),
      traumaEvent,
      hurtWords,
      happyWords,
    };

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6 text-sm">
        {/* 1. 両親に対しての過去の感情 */}
        <div className="p-4 rounded-2xl bg-emerald-50/20 border border-emerald-100">
          <EmotionSelector
            label="両親に対しての過去の感情"
            selectedValues={pastParentEmotions}
            onChange={setPastParentEmotions}
            otherValue={pastParentOther}
            onOtherChange={setPastParentOther}
          />
        </div>

        {/* 2. 両親に対しての今の感情 */}
        <div className="p-4 rounded-2xl bg-emerald-50/20 border border-emerald-100">
          <EmotionSelector
            label="両親に対しての今の感情"
            selectedValues={currentParentEmotions}
            onChange={setCurrentParentEmotions}
            otherValue={currentParentOther}
            onOtherChange={setCurrentParentOther}
          />
        </div>

        {/* 3. 両親との今の関係性 */}
        <div>
          <label className="block font-bold text-gray-700 mb-1">両親との今の関係性</label>
          <input
            type="text"
            value={parentRelation}
            onChange={(e) => setParentRelation(e.target.value)}
            placeholder="例：年数回連絡を取る程度、同居しているがほぼ会話がない、など"
            className="w-full p-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-emerald-500 text-xs"
          />
        </div>

        {/* 4. 兄弟への感情（いる場合） */}
        <div className="p-4 rounded-2xl bg-emerald-50/20 border border-emerald-100">
          <EmotionSelector
            label="兄弟への感情（いる場合）"
            selectedValues={siblingEmotions}
            onChange={setSiblingEmotions}
            otherValue={siblingOther}
            onOtherChange={setSiblingOther}
          />
        </div>

        {/* 5. トラウマになっている出来事 */}
        <div>
          <label className="block font-bold text-gray-700 mb-1">過去の思い出でトラウマになっている出来事</label>
          <textarea
            value={traumaEvent}
            onChange={(e) => setTraumaEvent(e.target.value)}
            placeholder="当時の情景や、自分がどう感じたかを自由に書いてください"
            rows={3}
            className="w-full p-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-emerald-500 text-xs resize-none"
          />
        </div>

        {/* 6. ダメージを受けた言葉 */}
        <div>
          <label className="block font-bold text-gray-700 mb-1">過去に親から言われてダメージを受けた言葉</label>
          <input
            type="text"
            value={hurtWords}
            onChange={(e) => setHurtWords(e.target.value)}
            placeholder="例：「お前は手がかかる」「なんでできないんだ」"
            className="w-full p-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-emerald-500 text-xs"
          />
        </div>

        {/* 7. 嬉しかった言葉 */}
        <div>
          <label className="block font-bold text-gray-700 mb-1">過去に親から言われて嬉しかった言葉（あれば）</label>
          <input
            type="text"
            value={happyWords}
            onChange={(e) => setHappyWords(e.target.value)}
            placeholder="例：「助かったよ」「よくやったね」など"
            className="w-full p-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-emerald-500 text-xs"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer text-sm"
      >
        {loading ? 'AIが心を整理しています...' : 'AIによる再解釈・新しい意味づけを受け取る'}
      </button>
    </form>
  );
}