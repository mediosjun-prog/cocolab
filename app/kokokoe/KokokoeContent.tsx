// app/kokokoe/KokokoeContent.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { saveKokokoeRecord, getKokokoeRecords, KokokoeRecord, deleteKokokoeRecord } from './kokokoeStorage';

const COMMON_DESIRES = [
  '「いつも頑張ってるね、お疲れ様」',
  '「そのままで十分素敵だよ」',
  '「そばにいてくれてありがとう」',
  '「君なら絶対に大丈夫だよ」',
  '「無理しなくていいんだよ」',
  '「よくやっているよ、すごいね」',
  '「失敗しても味方だからね」',
  '「大好きだよ」',
];

const ATTRIBUTES = [
  '恋人・パートナー',
  '親愛なる友人',
  '優しい親・家族',
  '頼もしい自分（セルフハグ）',
  '慈愛に満ちたカウンセラー',
];

const DURATIONS = [
  { label: '1分間', value: 1 },
  { label: '2分間', value: 2 },
  { label: '3分間', value: 3 },
  { label: '5分間', value: 5 },
];

export default function KokokoeContent() {
  const [selectedDesires, setSelectedDesires] = useState<string[]>([]);
  const [customDesire, setCustomDesire] = useState('');
  const [attribute, setAttribute] = useState(ATTRIBUTES[0]);
  const [durationMinutes, setDurationMinutes] = useState(1);

  const [history, setHistory] = useState<KokokoeRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');

  // 再生モード中のステート
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const timerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  // 発話中のUtteranceをrefで保持（GC対策）
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const jpVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    setHistory(getKokokoeRecords());

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        const jpVoice = voices.find(
          v => v.lang === 'ja-JP' || v.lang.toLowerCase().startsWith('ja') || v.lang.includes('JP')
        );
        if (jpVoice) {
          jpVoiceRef.current = jpVoice;
        }
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSelect = (item: string) => {
    if (selectedDesires.includes(item)) {
      setSelectedDesires(selectedDesires.filter(i => i !== item));
    } else {
      setSelectedDesires([...selectedDesires, item]);
    }
  };

  const activeSentences = [...selectedDesires, customDesire.trim()].filter(Boolean);

  // ブラウザの音声合成（SpeechSynthesis）でメッセージを喋らせる関数（デバッグログ付き）
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    const synth = window.speechSynthesis;

    // 一度完全に停止・リセット
    synth.cancel();

    const cleanText = text.replace(/[「」]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // その場で最新のボイス一覧を取得
    const voices = synth.getVoices();
    console.log('[kokokoe] 利用可能な音声一覧:', voices.map(v => `${v.name} (${v.lang})`));

    const jpVoice =
      jpVoiceRef.current ||
      voices.find(v => v.lang === 'ja-JP' || v.lang.toLowerCase().startsWith('ja') || v.lang.includes('JP'));
      
    if (jpVoice) {
      utterance.voice = jpVoice;
      console.log('[kokokoe] 適用した日本語音声:', jpVoice.name);
    } else {
      console.warn('[kokokoe] 日本語音声が見つからなかったため、ブラウザのデフォルトで再生します');
    }

    utterance.onstart = () => {
      console.log('[kokokoe] 再生開始:', cleanText);
    };
    
    utterance.onerror = (event) => {
      if (event.error === 'canceled' || event.error === 'interrupted') return;
      console.error('[kokokoe] 再生エラー:', event.error);
    };

    utteranceRef.current = utterance;

    // cancel直後のキュー競合を防ぐため、わずかに遅延させてから発話
    setTimeout(() => {
      synth.speak(utterance);
    }, 100);
  };

  const handleStart = () => {
    if (activeSentences.length === 0) {
      alert('言われたい言葉を1つ以上選択または入力してください。');
      return;
    }

    saveKokokoeRecord({
      desires: selectedDesires,
      customDesire,
      attribute,
      durationMinutes,
    });
    setHistory(getKokokoeRecords());

    setIsPlaying(true);
    setCurrentTextIndex(0);
    const totalSeconds = durationMinutes * 60;
    setTimeLeft(totalSeconds);

    // 初回再生
    speakText(activeSentences[0]);

    // ローテーション（8秒ごとに次の言葉へ切り替え＆音声発話）
    intervalRef.current = window.setInterval(() => {
      setCurrentTextIndex(prev => {
        const nextIndex = (prev + 1) % activeSentences.length;
        speakText(activeSentences[nextIndex]);
        return nextIndex;
      });
    }, 8000);

    // 全体タイマー
    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleStop();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStop = () => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    utteranceRef.current = null;
  };

  const handleDelete = (id: string) => {
    const updated = deleteKokokoeRecord(id);
    setHistory(updated);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {isPlaying && (
        <div className="fixed inset-0 z-50 bg-emerald-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-white text-center">
          <div className="absolute top-8 right-8 text-emerald-200 text-sm font-mono bg-emerald-900/60 px-4 py-2 rounded-full border border-emerald-700/50">
            残り時間: {formatTime(timeLeft)}
          </div>

          <div className="space-y-8 max-w-2xl mx-auto">
            <span className="inline-block bg-emerald-800/80 text-emerald-200 text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-600/40">
              {attribute}からのメッセージ
            </span>

            <div className="text-2xl sm:text-4xl font-bold leading-relaxed tracking-wide text-emerald-100 drop-shadow-md py-8 transition-all animate-pulse">
              {activeSentences[currentTextIndex]}
            </div>

            <p className="text-xs text-emerald-300/80">
              音声を聞きながら、温かい言葉を心で受け取りましょう...
            </p>

            <div className="pt-6">
              <button
                type="button"
                onClick={handleStop}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-bold border border-white/30 transition-all cursor-pointer"
              >
                終了する
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('create')}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-xs cursor-pointer ${
            activeTab === 'create' ? 'bg-emerald-600 text-white' : 'bg-white/60 text-slate-600 hover:bg-white'
          }`}
        >
          🎧 こここえ体験
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-xs cursor-pointer ${
            activeTab === 'history' ? 'bg-emerald-600 text-white' : 'bg-white/60 text-slate-600 hover:bg-white'
          }`}
        >
          📖 保存された言葉 ({history.length})
        </button>
      </div>

      {activeTab === 'create' ? (
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-sm border border-emerald-100 p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-slate-800">心に栄養をあたえる「こここえ」</h2>
            <p className="text-sm text-slate-600">
              今、誰からどんな言葉をかけてほしいですか？あなたを包み込む温かい音声とリピート空間をお届けします。
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700">1. 言われたい言葉を選ぶ（複数選択可）</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {COMMON_DESIRES.map(item => {
                const isSelected = selectedDesires.includes(item);
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

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-600">自由に書いてみる</label>
            <input
              type="text"
              value={customDesire}
              onChange={e => setCustomDesire(e.target.value)}
              placeholder="例：「よくここまで頑張ってきたね、えらいよ」"
              className="w-full rounded-2xl border border-slate-200 p-4 text-sm focus:border-[#446246] focus:ring-1 focus:ring-[#446246] outline-none transition-all text-slate-700 bg-slate-50/50"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700">2. 言ってくれる人の属性</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ATTRIBUTES.map(attr => (
                <button
                  key={attr}
                  type="button"
                  onClick={() => setAttribute(attr)}
                  className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all border cursor-pointer ${
                    attribute === attr
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {attr}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700">3. 再生する時間</label>
            <div className="grid grid-cols-4 gap-2">
              {DURATIONS.map(d => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDurationMinutes(d.value)}
                  className={`py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                    durationMinutes === d.value
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleStart}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 !text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <span>▶️ こここえ再生をはじめる</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-12 bg-white/90 rounded-3xl border border-emerald-100 text-slate-400 text-sm">
              保存された履歴はまだありません。
            </div>
          ) : (
            history.map(item => (
              <div key={item.id} className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-3">
                <div className="flex justify-between items-start text-xs text-slate-400">
                  <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    {item.attribute} / {item.durationMinutes}分間
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    削除
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.desires.map((d, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                      {d}
                    </span>
                  ))}
                  {item.customDesire && (
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                      {item.customDesire}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}