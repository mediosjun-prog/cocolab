'use client';

import React, { useState, useEffect } from 'react';
import { saveKokomieRecord, getKokomieRecords, KokomieRecord, deleteKokomieRecord } from './kokomieStorage';

// 10問のインスピレーション問いと3択のデータプール
const PROMPTS_POOL = [
  {
    question: '目の前に広がる景色、最初に心が惹かれるのはどれですか？',
    choices: [
      '静寂に包まれた深い森や木漏れ日',
      '果てしなく広がる海や穏やかな水面',
      '遠くに見えるあたたかな灯火や街並み',
    ],
  },
  {
    question: '今のあなたの心の色をパレットに例えるなら？',
    choices: [
      'やわらかなペールグリーン・若葉色',
      '深みのあるインディゴブルー・夜空色',
      'おだやかなサンセットオレンジ・暖色',
    ],
  },
  {
    question: 'ふと耳に入ってきた音、どれに一番安らぎを感じますか？',
    choices: [
      '風に揺れる木々のざわめき',
      '規則正しく刻む雨の音や水滴の響き',
      '遠くで響く心地よい鳥のさえずり',
    ],
  },
  {
    question: '旅をするなら、どんな場所で過ごしたいですか？',
    choices: [
      '静かな山あいの温泉宿でゆっくりと',
      '見渡す限りの大草原や高原で深呼吸',
      '古い歴史やぬくもりを感じる街並み歩き',
    ],
  },
  {
    question: '夜、眠りにつく前に思い浮かべる大切な思い出はどれに近いですか？',
    choices: [
      '誰かと美味しいごはんを囲んで笑い合った時間',
      'ひとりで静かに美しい星空や夕日を眺めた時間',
      '新しいことに挑戦してワクワクした瞬間',
    ],
  },
  {
    question: 'もし今、自分にご褒美をあげるとしたらどれが一番しっくりきますか？',
    choices: [
      '時間を忘れて好きなだけ眠る、おうち時間',
      'お気に入りの香りに包まれたリラックスバスタイム',
      'ずっと気になっていた場所への小さな小旅行',
    ],
  },
  {
    question: '心の中に小さな庭があるとしたら、今どんな状態にしたいですか？',
    choices: [
      '色とりどりの花がのびのびと咲き誇る庭',
      '手入れが行き届いた、静かで落ち着く和の庭',
      '風通しがよく、鳥たちが自由に集まる庭',
    ],
  },
  {
    question: '一日のうちで、一番「自分に戻れる」と感じる瞬間はいつですか？',
    choices: [
      '朝の静けさの中で温かいお茶やコーヒーを飲むとき',
      '夕暮れ時に窓の外をぼんやり眺めているとき',
      '夜、お布団に入って深く深呼吸をするとき',
    ],
  },
  {
    question: 'あなたの内側にあるエネルギーを何かに例えるなら？',
    choices: [
      '静かに燃え続ける、あたたかな暖炉の火',
      '大地を潤し、ゆったりと流れるせせらぎ',
      'どこまでも高く広がっていく青空の気配',
    ],
  },
  {
    question: '今、自分の心にそっとかけてあげたい言葉はどれですか？',
    choices: [
      '「よく頑張っているね、少し肩の力を抜いていいよ」',
      '「あなたのペースで一歩ずつ進んでいけば大丈夫」',
      '「そのままで十分魅力的だから、自信を持ってね」',
    ],
  },
];

export default function KokomieContent() {
  const [currentPrompt, setCurrentPrompt] = useState(PROMPTS_POOL[0]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<KokomieRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');

  useEffect(() => {
    setHistory(getKokomieRecords());
    pickRandomPrompt();
  }, []);

  const pickRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * PROMPTS_POOL.length);
    setCurrentPrompt(PROMPTS_POOL[randomIndex]);
    setSelectedChoice(null);
    setAiResponse(null);
    setSaved(false);
  };

  const handleSelect = async (choice: string) => {
    setSelectedChoice(choice);
    setLoading(true);
    setAiResponse(null);
    setSaved(false);

    try {
      let res = await fetch('/api/kokomie/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentPrompt.question,
          choice,
        }),
      });

      let data = await res.json();

      // 503エラー対策の自動リトライ
      if (res.status === 503) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        res = await fetch('/api/kokomie/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: currentPrompt.question,
            choice,
          }),
        });
        data = await res.json();
      }

      if (!res.ok) throw new Error(data.message || 'AIモデルが現在混雑しています。');

      setAiResponse(data.message);
    } catch (err: any) {
      setAiResponse(`エラーが発生しました: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!aiResponse || !selectedChoice) return;
    saveKokomieRecord({
      question: currentPrompt.question,
      selectedChoice,
      message: aiResponse,
    });
    setHistory(getKokomieRecords());
    setSaved(true);
  };

  const handleDelete = (id: string) => {
    const updated = deleteKokomieRecord(id);
    setHistory(updated);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* タブ切り替え */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-xs cursor-pointer ${
            activeTab === 'create' ? 'bg-emerald-600 text-white' : 'bg-white/60 text-gray-600 hover:bg-white'
          }`}
        >
          👁️ ここみえ診断
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-xs cursor-pointer ${
            activeTab === 'history' ? 'bg-emerald-600 text-white' : 'bg-white/60 text-gray-600 hover:bg-white'
          }`}
        >
          📖 保存されたメッセージ ({history.length})
        </button>
      </div>

      {activeTab === 'create' ? (
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-sm border border-emerald-100 p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-100">
              直感インスピレーション
            </span>
            <button
              type="button"
              onClick={pickRandomPrompt}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-bold underline cursor-pointer"
            >
              別の問いに変える 🔄
            </button>
          </div>

          {/* 問いの表示 */}
          <div className="text-center space-y-3 py-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 leading-relaxed">
              {currentPrompt.question}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              あまり考え込まず、直感でしっくりくるものを1つ選んでください。
            </p>
          </div>

          {/* 3択の選択肢 */}
          <div className="space-y-3">
            {currentPrompt.choices.map((choice, index) => {
              const isSelected = selectedChoice === choice;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelect(choice)}
                  disabled={loading}
                  className={`w-full text-left p-4 rounded-2xl text-sm sm:text-base transition-all border cursor-pointer ${
                    isSelected
                      ? 'border-[#446246] bg-[#D0F9C7]/30 text-[#446246] font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/20'
                  } disabled:opacity-60`}
                >
                  <span className="inline-block w-6 font-bold text-emerald-700">0{index + 1}</span>
                  {choice}
                </button>
              );
            })}
          </div>

          {loading && (
            <div className="text-center py-6 text-emerald-700 font-medium text-sm animate-pulse">
              潜在意識からのメッセージを読み解いています...
            </div>
          )}

          {/* AIの結果表示 */}
          {aiResponse && !loading && (
            <div className="mt-8 p-6 bg-emerald-50/60 border border-emerald-200 rounded-3xl space-y-4 animate-fade-in">
              <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                <span>🌿</span> 潜在意識からのメッセージ
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
              保存されたメッセージはまだありません。
            </div>
          ) : (
            history.map(item => (
              <div key={item.id} className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-3">
                <div className="flex justify-between items-start text-xs text-slate-400">
                  <span>{new Date(item.date).toLocaleDateString()} 記録</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    削除
                  </button>
                </div>
                <div className="text-sm font-bold text-slate-800">Q. {item.question}</div>
                <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs border border-emerald-100 font-medium">
                  選択: {item.selectedChoice}
                </div>
                <div className="text-sm text-slate-700 bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100 whitespace-pre-wrap">
                  {item.message}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}