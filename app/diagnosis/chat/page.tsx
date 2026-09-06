'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { AI_PERSONAS, Persona } from '../../../lib/aiPersonas';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export default function GeminiChatSessionPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'fearful';
  const persona: Persona = AI_PERSONAS[type] || AI_PERSONAS.fearful;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 音声入力・出力関連
  const [isListening, setIsListening] = useState(false);
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);

  // 最新のステートを非同期コールバック内で参照するためのref
  const inputTextRef = useRef(inputText);
  useEffect(() => {
    inputTextRef.current = inputText;
  }, [inputText]);

  const isThinkingRef = useRef(isThinking);
  useEffect(() => {
    isThinkingRef.current = isThinking;
  }, [isThinking]);

  const isProcessingRef = useRef(isProcessing);
  useEffect(() => {
    isProcessingRef.current = isProcessing;
  }, [isProcessing]);

  useEffect(() => {
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: persona.initialMessage,
      },
    ]);
  }, [persona]);

  // ★ VOICEVOX再生を試み、失敗時はブラウザ標準音声にフォールバックする関数
const speakText = (text: string) => {
  if (!isVoiceOutputEnabled) return;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000); // 3秒でタイムアウト

  fetch('/api/voicevox', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: text,
      speaker: persona.voicevoxSpeaker ?? 3,
    }),
    signal: controller.signal,
  })
    .then(async (ttsRes) => {
      clearTimeout(timeoutId);
      if (ttsRes.ok) {
        const audioBlob = await ttsRes.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      } else {
        throw new Error('VOICEVOX API error');
      }
    })
    .catch((err) => {
      clearTimeout(timeoutId);
      const reason =
        err.name === 'AbortError'
          ? 'タイムアウトしました'
          : err.message ?? '不明なエラー';
      console.warn(`VOICEVOXの利用に失敗したため(${reason})、ブラウザ標準音声に切り替えます:`, err);

      // ブラウザ標準の音声合成（SpeechSynthesis）で代替再生
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    });
};

  // メッセージ送信処理の定義（音声認識からも呼び出せるようにする）
  const handleSend = async (textToSend: string) => {
  const trimmed = textToSend.trim();
  if (!trimmed || isThinkingRef.current || isProcessingRef.current) return;

  const userMsg: Message = {
    id: Date.now().toString(),
    sender: 'user',
    text: trimmed,
  };

  const newMessages = [...messages, userMsg];
  setMessages(newMessages);
  setInputText('');
  setIsThinking(true);

  try {
    const res = await fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: newMessages,
        systemPrompt: persona.systemPrompt,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      // ステータス・コードに応じてメッセージを出し分ける
      const text =
        data.code === 'DAILY_QUOTA_EXCEEDED'
          ? '本日のAI利用回数の上限に達しました。しばらくしてから、または翌日以降にお試しください🙏'
          : data.code === 'RATE_LIMITED'
          ? '現在アクセスが集中しています。少し時間をおいて再度お試しください。'
          : data.error || 'エラーが発生しました。もう一度お試しください。';

      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text,
      };
      setMessages((prev) => [...prev, errMsg]);
      return;
    }

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: data.text,
    };
    setMessages((prev) => [...prev, aiMsg]);

    if (isVoiceOutputEnabled) {
      speakText(data.text);
    }

  } catch (error) {
    console.error(error);
    const errMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: '通信エラーが発生しました。ネットワーク状況を確認して、もう一度お試しください。',
    };
    setMessages((prev) => [...prev, errMsg]);
  } finally {
    setIsThinking(false);
  }
};

  // ★ Web Speech API（音声認識）の初期化
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'ja-JP';
    recognition.interimResults = false;

    recognitionRef.current = recognition;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);

      // 音声認識で取得したテキストをそのまま自動送信する
      handleSend(transcript);
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'no-speech') {
        console.log('音声が検出されませんでした（タイムアウト）');
        setIsListening(false);
        return;
      }

      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, [messages]); // messagesの更新をキャッチできるように調整

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // 音声入力のトグル
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('お使いのブラウザは音声認識に対応していません。（Chrome/Safari推奨）');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        setInputText('');
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Recognition start error:', err);
      }
    }
  };

  // 音声出力ON/OFF
  const toggleVoiceOutput = () => {
    setIsVoiceOutputEnabled(!isVoiceOutputEnabled);
  };

  return (
    <main className="min-h-screen bg-[#8cabd9] py-6 px-4 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col h-[85vh]">
        {/* チャットヘッダー */}
        <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
              <img
                src={persona.imagePath}
                alt={persona.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-600 mb-0.5">
                {persona.role}
              </p>
              <h1 className="text-lg font-bold text-slate-800 leading-none">
                {persona.name}
              </h1>
            </div>
          </div>

          {/* 音声ON/OFF ボタン */}
          <button
            onClick={toggleVoiceOutput}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              isVoiceOutputEnabled
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isVoiceOutputEnabled ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <span>音声ON</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
                <span>音声OFF</span>
              </>
            )}
          </button>
        </div>

        {/* メッセージエリア */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${persona.bgColor}`}>
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.sender === 'ai' ? (
                <div className="flex items-start space-x-3 max-w-[85%]">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-slate-200 flex-shrink-0 mt-0.5 shadow-sm">
                    <img
                      src={persona.imagePath}
                      alt={persona.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 mb-1 block pl-1">
                      {persona.name}
                    </span>
                    <div className="bg-white text-slate-800 p-3.5 rounded-2xl rounded-tl-none shadow-sm text-sm leading-relaxed border border-slate-100 relative">
                      {msg.text}
                      <div className="absolute top-0 -left-2 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <div className="bg-emerald-500 text-white p-3.5 rounded-2xl rounded-tr-none shadow-sm text-sm leading-relaxed max-w-[80%] relative">
                    {msg.text}
                    <div className="absolute top-0 -right-2 w-0 h-0 border-t-[8px] border-t-emerald-500 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent"></div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {(isThinking || isProcessing) && (
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-slate-200 flex-shrink-0 shadow-sm">
                <img
                  src={persona.imagePath}
                  alt={persona.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white text-slate-400 p-3.5 rounded-2xl rounded-tl-none shadow-sm text-sm border border-slate-100 animate-pulse flex items-center space-x-2">
                <svg className="w-4 h-4 animate-spin text-indigo-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{isThinking ? '思考中...' : '音声処理中...'}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 入力エリア */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center space-x-2">
          <button
            onClick={toggleListening}
            disabled={isThinking || isProcessing}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
            placeholder={isListening ? "音声を聞き取り中..." : "メッセージを入力..."}
            disabled={isThinking || isProcessing}
            className="flex-1 bg-slate-100 text-slate-800 px-4 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-70"
          />

          <button
            onClick={() => handleSend(inputText)}
            disabled={isThinking || isProcessing || !inputText.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium px-5 py-2.5 rounded-full text-sm transition-colors shadow-sm"
          >
            送信
          </button>
        </div>
      </div>
    </main>
  );
}