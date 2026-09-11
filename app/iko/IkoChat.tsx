// app/iko/IkoChat.tsx
'use client';

import { useState, useRef, useEffect } from 'react';

interface IkoChatProps {
  config: any;
  onBackToSetup: () => void;
}

export default function IkoChat({ config, onBackToSetup }: IkoChatProps) {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: 'こんにちは。お話しを聞かせてくださいね。今日はどんな気分ですか？',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forcedTerminated, setForcedTerminated] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isLoading || forcedTerminated) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    const newMessages = [...messages, { role: 'user' as const, content: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/iko-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          config,
        }),
      });

      // レスポンスがJSON（正常・APIエラー）か、HTML（404/500エラーページ等）かをチェック
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await res.text();
        console.error('非JSONレスポンス:', textResponse);
        throw new Error(`サーバーエラー（HTTP ${res.status}）: APIルートが存在しないか、サーバー内部でエラーが発生しています。`);
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'AIモデルが現在混雑しています。少し時間を置いて再度お試しください。');
      }

      if (data.isForcedTerminated) {
        setForcedTerminated(true);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error: any) {
      console.error('通信エラー:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: error.message || '通信エラーが発生しました。もう一度送信してください。',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-sm border border-emerald-100 flex flex-col h-[80vh] overflow-hidden">
      {/* ヘッダー部分 */}
      <div className="p-4 sm:px-6 bg-emerald-50/60 border-b border-emerald-100 flex justify-between items-center">
        <div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-200">
            セッション中
          </span>
        </div>
        <button
          type="button"
          onClick={onBackToSetup}
          className="px-4 py-1.5 bg-white hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-xl border border-slate-200 transition-all cursor-pointer"
        >
          終了して戻る
        </button>
      </div>

      {/* チャットメッセージ表示エリア */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-xs shadow-xs'
                  : 'bg-slate-100 text-slate-700 rounded-bl-xs border border-slate-200/60'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-400 rounded-2xl rounded-bl-xs px-4 py-3 text-sm border border-slate-200/60 animate-pulse">
              考えています...
            </div>
          </div>
        )}

        {forcedTerminated && (
          <div className="text-center py-4 text-xs font-bold text-red-500 bg-red-50 rounded-2xl border border-red-100">
            セッションが終了条件に達したため、強制終了となりました。お疲れ様でした。
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* メッセージ入力フォーム */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-emerald-100 flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          disabled={isLoading || forcedTerminated}
          placeholder={forcedTerminated ? 'セッションは終了しました' : 'メッセージを入力してください...'}
          className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none transition-all text-slate-700 bg-slate-50/50 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || forcedTerminated || !inputMessage.trim()}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-2xl text-sm transition-all cursor-pointer shadow-xs"
        >
          送信
        </button>
      </form>
    </div>
  );
}