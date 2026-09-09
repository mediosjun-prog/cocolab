// app/iko/IkoChat.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import PageHeader from '@/components/PageHeader';
import { saveIkoRecord } from './ikoStorage';

interface IkoChatProps {
  config: {
    myGender: string;
    myAge: string;
    targetGender: string;
    targetAge: string;
    relation: string;
    situation: string;
    timeLimit: number;
  };
  onBackToSetup: () => void;
}

export default function IkoChat({ config, onBackToSetup }: IkoChatProps) {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'target'; content: string }>>([
    {
      role: 'target',
      content: '（会話がスタートしました。お互いの距離感を意識しながら話しかけてみましょう）',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(config.timeLimit);
  const [isFinished, setIsFinished] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{ score: number; totalEvaluation: string } | null>(null);
  const [forcedTerminated, setForcedTerminated] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // タイマー処理
  useEffect(() => {
    if (isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishSession(messages, false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished, messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

// ① メッセージ送信時のfetch
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || isFinished) return;

    const newMessages = [...messages, { role: 'user' as const, content: input.trim() }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/iko', { // ← ここを '/api/iko' にする
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, config, action: 'chat' }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      if (data.isForcedTerminated) {
        setForcedTerminated(true);
        setMessages([...newMessages, { role: 'target', content: data.reply }]);
        handleFinishSession([...newMessages, { role: 'target', content: data.reply }], true);
        return;
      }

      setMessages([...newMessages, { role: 'target', content: data.reply }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

// ② 終了・採点時のfetch
  const handleFinishSession = async (currentMessages: typeof messages, isForced: boolean) => {
    setIsFinished(true);
    setLoading(true);

    if (isForced) {
      // ... 略 ...
      return;
    }

    try {
      const res = await fetch('/api/iko', { // ← ここも '/api/iko' にする
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: currentMessages, config, action: 'evaluate' }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setEvaluationResult({
        score: data.score,
        totalEvaluation: data.totalEvaluation,
      });

      saveIkoRecord({
        myGender: config.myGender,
        myAge: config.myAge,
        targetGender: config.targetGender,
        targetAge: config.targetAge,
        relation: config.relation,
        situation: config.situation,
        score: data.score,
        totalEvaluation: data.totalEvaluation,
      });
    } catch (err) {
      console.error(err);
      setEvaluationResult({
        score: 50,
        totalEvaluation: '採点の取得中にエラーが発生しましたが、シミュレーションはお疲れ様でした。',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* ヘッダー＆タイマー */}
      <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
            シミュレーション中
          </span>
          <h2 className="text-sm font-bold text-gray-800 mt-1">
            関係: {config.relation} / 場面: {config.situation.slice(0, 15)}...
          </h2>
        </div>
        <div className={`text-lg font-mono font-bold px-4 py-1.5 rounded-xl ${timeLeft <= 30 ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-emerald-50 text-emerald-800'}`}>
          ⏱️ {formatTime(timeLeft)}
        </div>
      </div>

      {/* チャットエリア */}
      <div className="bg-white/70 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-emerald-100 shadow-sm h-[400px] overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-xs ${
              m.role === 'user'
                ? 'bg-emerald-600 text-white rounded-br-none'
                : 'bg-white text-gray-800 border border-emerald-100 rounded-bl-none'
            }`}>
              <span className="block text-[10px] font-bold opacity-70 mb-1">
                {m.role === 'user' ? 'あなた' : 'お相手'}
              </span>
              {m.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 入力フォーム または 結果表示 */}
      {!isFinished ? (
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="メッセージを入力してください..."
            disabled={loading}
            className="flex-1 bg-white/95 border border-emerald-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-xs"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? '送信中...' : '送信'}
          </button>
        </form>
      ) : (
        <div className="bg-white/95 p-6 rounded-3xl border border-emerald-200 shadow-md space-y-6 text-center">
          <h3 className="text-lg font-bold text-gray-800">
            {forcedTerminated ? '⚠️ シミュレーション強制終了' : '🎉 シミュレーション終了・採点結果'}
          </h3>

          {loading ? (
            <p className="text-sm text-gray-600 py-4">AIが会話を分析し、採点を行っています...</p>
          ) : evaluationResult && (
            <div className="space-y-4">
              <div className="inline-block p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <span className="block text-xs text-gray-500 font-semibold">コミュニケーションスコア</span>
                <span className="text-3xl font-black text-emerald-700">{evaluationResult.score}点</span>
              </div>
              <div className="text-left bg-gray-50 p-4 rounded-2xl border border-gray-200 text-sm text-gray-700 space-y-2">
                <h4 className="font-bold text-gray-900">📝 総評・アドバイス</h4>
                <p className="whitespace-pre-wrap leading-relaxed">{evaluationResult.totalEvaluation}</p>
              </div>
            </div>
          )}

          <button
            onClick={onBackToSetup}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer"
          >
            設定に戻る / もう一度挑戦する
          </button>
        </div>
      )}
    </div>
  );
}