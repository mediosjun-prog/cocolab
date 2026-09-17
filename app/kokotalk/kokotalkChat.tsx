'use client';

import React, { useState, useRef, useEffect } from 'react';
import { KokotalkConfig } from './page';

interface Props {
  config: KokotalkConfig;
  onBack: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function KokotalkChat({ config, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `こんにちは！${config.occupation}の${config.personality}なキャラクターです。今日はどのようなお話をしましょうか？`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false); // 音声認識中かどうか
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // 音声認識（SpeechRecognition）の初期化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'ja-JP';
        recognition.interimResults = false; // 確定した結果のみ受け取る
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput((prev) => prev + transcript);
          setIsListening(false);
        };

        recognition.onerror = (event: any) => {
          console.error('音声認識エラー:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  // 音声認識の開始・停止切り替え
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('お使いのブラウザは音声入力に対応していません。（Google Chrome等をお使いください）');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // 録音中だった場合は停止する
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/kokotalk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          config: config,
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);

      if (data.audio && isAudioEnabled) {
        playAudio(data.audio);
      }
    } catch (error) {
      console.error('通信エラー:', error);
      alert('エラーが発生しました。設定を確認してください。');
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = (base64Data: string) => {
    try {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(blob);

      if (audioRef.current) {
        audioRef.current.pause();
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.play().catch((err) => {
        console.log('自動再生ブロック:', err);
      });
    } catch (e) {
      console.error('音声再生エラー:', e);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col h-[75vh]">
      {/* ヘッダー */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
        <div className="flex items-center gap-3">
          {/* 選択されたアバター画像をヘッダーに表示 */}
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200">
            {config.avatar ? (
              <img src={config.avatar} alt="アバター" className="w-full h-full object-cover" />
            ) : (
              <span className="text-emerald-700 font-bold text-sm">AI</span>
            )}
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">{config.occupation} ({config.personality})</h2>
            <p className="text-xs text-slate-500">VOICEVOX ID: {config.voiceId}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
              isAudioEnabled ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-medium' : 'bg-slate-100 border-slate-200 text-slate-500'
            }`}
          >
            {isAudioEnabled ? '🔊 音声ON' : '🔇 音声OFF'}
          </button>

          <button
            onClick={onBack}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-all"
          >
            設定に戻る
          </button>
        </div>
      </div>

      {/* メッセージ一覧 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-none'
                  : 'bg-slate-100 text-slate-800 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-400 rounded-2xl rounded-bl-none px-4 py-3 text-sm animate-pulse">
              考え中...
            </div>
          </div>
        )}
      </div>

      {/* 入力フォーム ＋ マイクボタン */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 flex gap-2 bg-white rounded-b-2xl items-center">
        {/* 音声入力（マイク）ボタン */}
        <button
          type="button"
          onClick={toggleListening}
          className={`p-3 rounded-xl border transition-all flex items-center justify-center ${
            isListening
              ? 'bg-red-500 border-red-500 text-white animate-pulse shadow-md shadow-red-500/30'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
          title="音声入力を切り替え"
        >
          🎤
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isListening ? 'お話しください（聞いています...）' : 'メッセージを入力またはマイクで話す...'}
          className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        />

        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-600/20"
        >
          送信
        </button>
      </form>
    </div>
  );
}