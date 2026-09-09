'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Message {
  senderId: string;
  senderName: string;
  text: string;
  isUser: boolean;
}

const MEMBER_INFO: Record<string, { name: string; color: string; bg: string }> = {
  supporter: { name: '寄り添いサポーター「みお」', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  logical: { name: 'おだやかカウンセラー「ソラ」', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  cheerful: { name: 'おっとり和み役「るー」', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  realistic: { name: '現実派の意見番「クロ」', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' },
};

export default function KokoRoomChatContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const situation = searchParams.get('situation') || '自由にフリートーク';
  const membersParam = searchParams.get('members') || 'supporter,logical';
  const nickname = searchParams.get('nickname') || 'あなた';

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [reviewSummary, setReviewSummary] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 初期挨拶の生成
  useEffect(() => {
    const initialMsgs: Message[] = [
      {
        senderId: 'system',
        senderName: 'ここるーむ案内',
        text: `【シチュエーション：${situation}】のルームが開始されました。安心できる空間です。あなたのペースでお話しください。`,
        isUser: false,
      },
    ];

    const activeMemberIds = membersParam.split(',');
    if (activeMemberIds.length > 0) {
      const firstId = activeMemberIds[0];
      const info = MEMBER_INFO[firstId];
      if (info) {
        let welcomeText = `こんにちは、${nickname}さん。ここに来てくれて嬉しいです。今日はどんなお話をしましょうか？`;
        if (firstId === 'realistic') {
          welcomeText = `ようこそ。まぁ、気楽に行こうや。何か胸につかえてることがあるなら、ここで吐き出していきなよ。`;
        } else if (firstId === 'cheerful') {
          welcomeText = `わぁ、いらっしゃい！☕️ ここは誰も急かさないから、のんびりリラックスして過ごしてね〜。`;
        }
        initialMsgs.push({
          senderId: firstId,
          senderName: info.name,
          text: welcomeText,
          isUser: false,
        });
      }
    }

    setMessages(initialMsgs);
  }, [situation, membersParam, nickname]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMsgText = inputMessage;
    setInputMessage('');

    const newMessages: Message[] = [
      ...messages,
      { senderId: 'user', senderName: nickname, text: userMsgText, isUser: true },
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/kokoroom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          situation,
          members: membersParam,
          nickname,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'エラーが発生しました');

      setMessages([
        ...newMessages,
        {
          senderId: data.speakerId,
          senderName: data.speakerName,
          text: data.reply,
          isUser: false,
        },
      ]);
    } catch (err: any) {
      console.error(err);
      alert(err.message || '通信エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinishRoom = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/kokoroom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'evaluate',
          messages,
          situation,
          members: membersParam,
          nickname,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'エラーが発生しました');

      setReviewSummary(data.totalEvaluation);
      setIsFinished(true);
    } catch (err: any) {
      console.error(err);
      alert(err.message || '総評の生成に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#2C2C2C] flex flex-col">
      {/* ヘッダー */}
      <header className="bg-white border-b border-[#EFECE6] px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <Link href="/kokoroom" className="text-xs text-[#6B7280] hover:text-[#4B5563] flex items-center gap-1">
          ← ルーム設定に戻る
        </Link>
        <div className="text-center">
          <span className="text-xs font-bold text-[#374151]">ここるーむ：{situation}</span>
        </div>
        <button
          onClick={handleFinishRoom}
          disabled={isFinished || isLoading}
          className="text-xs bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-lg font-medium hover:bg-rose-100 transition-all disabled:opacity-50"
        >
          会話を終了して総評を見る
        </button>
      </header>

      {/* チャットメッセージエリア */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-6 space-y-4 overflow-y-auto mb-20">
        {messages.map((msg, index) => {
          if (msg.senderId === 'system') {
            return (
              <div key={index} className="text-center my-4">
                <span className="text-xs bg-[#F3F4F6] text-[#6B7280] px-3 py-1.5 rounded-full inline-block border border-[#E5E7EB]">
                  {msg.text}
                </span>
              </div>
            );
          }

          if (msg.isUser) {
            return (
              <div key={index} className="flex justify-end">
                <div className="max-w-[80%] bg-[#374151] text-white rounded-2xl rounded-tr-xs px-4 py-3 shadow-xs text-sm leading-relaxed">
                  <div className="text-[10px] text-gray-300 mb-0.5 text-right">{msg.senderName}</div>
                  {msg.text}
                </div>
              </div>
            );
          }

          const memberStyle = MEMBER_INFO[msg.senderId] || { color: 'text-gray-700', bg: 'bg-white border-gray-200' };

          return (
            <div key={index} className="flex justify-start">
              <div className={`max-w-[85%] rounded-2xl rounded-tl-xs px-4 py-3 border shadow-xs text-sm leading-relaxed ${memberStyle.bg}`}>
                <div className={`text-xs font-bold mb-1 ${memberStyle.color}`}>{msg.senderName}</div>
                <div className="text-[#2C2C2C]">{msg.text}</div>
              </div>
            </div>
          );
        })}

        {isLoading && !isFinished && (
          <div className="flex justify-start">
            <div className="bg-white border border-[#EFECE6] rounded-2xl rounded-tl-xs px-4 py-3 text-xs text-[#6B7280] animate-pulse">
              仲間たちが考えています...
            </div>
          </div>
        )}

        {/* 総評が表示された場合 */}
        {isFinished && reviewSummary && (
          <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm my-6 space-y-4">
            <div className="text-center">
              <span className="inline-block bg-emerald-600 !text-white text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
                🌿 対話の振り返り・総評
              </span>
              <h2 className="text-lg font-bold text-[#1F2937]">お疲れ様でした</h2>
            </div>
            <div className="text-sm text-[#4B5563] whitespace-pre-line leading-relaxed bg-[#FAFAF8] p-4 rounded-xl border border-[#EFECE6]">
              {reviewSummary}
            </div>
            <div className="flex gap-3 pt-2">
              <Link
                href="/kokoroom"
                className="flex-1 py-3 bg-emerald-600 !text-white text-center rounded-xl font-medium text-sm hover:bg-[#1F2937] transition-all"
              >
                別のルームをつくる
              </Link>
              <Link
                href="/"
                className="flex-1 py-3 bg-white border border-[#D1D5DB] text-[#374151] text-center rounded-xl font-medium text-sm hover:bg-[#FAFAF8] transition-all"
              >
                ホームへ戻る
              </Link>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* メッセージ入力固定フッター */}
      {!isFinished && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#EFECE6] p-3 shadow-md">
          <form onSubmit={handleSendMessage} className="max-w-2xl mx-auto flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="ここに入力して発言する..."
              className="flex-1 px-4 py-3 rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#9CA3AF] text-sm bg-[#FAFAF8]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="px-5 py-3 bg-emerald-600 !text-white hover:bg-[#1F2937] font-medium rounded-2xl text-sm transition-all disabled:opacity-50 shrink-0"
            >
              送信
            </button>
          </form>
        </div>
      )}
    </main>
  );
}