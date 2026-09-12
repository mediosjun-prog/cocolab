// components/KokonaviBot.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface GuideItem {
  keywords: string[];
  title: string;
  description: string;
  url: string;
}

// 案内できるコンテンツのデータベース（サイトのページに合わせて調整可能）
const GUIDES: GuideItem[] = [
 {
    keywords: ['むすび', '繋がり', '絆', '関係', 'コミュニティ', 'ここむすび'],
    title: 'ここむすび',
    description: '人との温かい繋がりや絆を育むためのコミュニティ・交流スペースです。',
    url: '/kokomusubi',
  },
  {
    keywords: ['かこ', '過去', '歴史', '思い出', '振り返り', 'ここかこ'],
    title: 'ここかこ',
    description: 'ご自身の歩んできた過去や思い出をやさしく振り返り、見つめ直す場所です。',
    url: '/kokokako',
  },
  {
    keywords: ['ちょい', '練習', 'ロールプレイング', '人間関係', '言いづらい', '連絡', '不安', 'ここちょい'],
    title: 'ここちょい 〜AIカウンセラー練武場〜',
    description: '人間関係のちょっとしたすれ違いや言いにくい場面を、ロールプレイング形式で楽しく練習できます。',
    url: '/kokochoi',
  },
  {
    keywords: ['すれ', '傾向', 'タイプ', '性格', '診断', 'チェック', '癖', 'ここすれ'],
    title: 'ここすれ 〜心の傾向チェック〜',
    description: 'あなたの人間関係のパターンや心の傾向をやさしく紐解く診断・チェックコンテンツです。',
    url: '/kokosure',
  },
  {
    keywords: ['みえ', '視点', '見え方', '視野', 'ここみえ'],
    title: 'ここみえ',
    description: '物事の捉え方や新しい視点に気づくためのインサイトスペースです。',
    url: '/kokomie',
  },
  {
    keywords: ['すき', '好き', '愛着', '大切', 'お気に入り', 'ここすき'],
    title: 'ここすき',
    description: '自分の「好き」や大切にしたい価値観を大切にするためのスペースです。',
    url: '/kokosuki',
  },
  {
    keywords: ['こえ', '声', '本音', '気持ち', '吐き出し', 'こここえ'],
    title: 'こここえ',
    description: '普段はしまっている自分の本当の声や気持ちに耳を傾ける場所です。',
    url: '/kokokoe',
  },
  {
    keywords: ['いく', '歩み', '前進', 'ステップ', '目標', 'ここいく'],
    title: 'ここいく',
    description: '自分のペースで少しずつ未来へ歩みを進めていくためのサポートスペースです。',
    url: '/kokoiku',
  },
  {
    keywords: ['ろーむ', 'ルーム', '部屋', '空間', '安心', 'こころーむ'],
    title: 'こころーむ',
    description: '安心して心を休められる、あなただけのプライベートな空間です。',
    url: '/kokoroom',
  },
  {
    keywords: ['にっし', '日記', '記録', '日誌', '毎日の日', 'ここにっし'],
    title: 'ここにっし',
    description: '日々の心の動きや出来事を優しく綴り、記録していくための日記スペースです。',
    url: '/kokonisshi',
  },
  {
    keywords: ['にわ', '庭', '癒やし', '疲れた', '休みたい', 'のんびり', '一息', 'ここにわ'],
    title: 'ここにわ 〜心の庭〜',
    description: 'お庭を眺めながら、ホッと一息つけるリラックススペースです。',
    url: '/kokoniwa',
  },
  {
    keywords: ['チェック', '確認', '点検', '状態', 'ここチェック'],
    title: 'ここチェック',
    description: '今のコンディションや心の状態を気軽にチェックできるスペースです。',
    url: '/kokocheck',
  },
  {
    keywords: ['質問', 'Q&A', '疑問', '使い方', '料金', 'はじめて', 'FAQ'],
    title: 'よくあるご質問（Q&A）',
    description: '「ここらぼ」の使い方や、サービスに関する疑問点についてお答えしています。',
    url: '/faq',
  },
  {
    keywords: ['専門家', 'カウンセラー', '相談', 'プロ', '聞いてほしい', '本格的'],
    title: '専門家による個別カウンセリング',
    description: '公認心理師などの専門家に、マンツーマンでじっくりお話を聴いてもらえます。',
    url: '/counseling',
  },
];

export default function KokonaviBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<
    { sender: 'bot' | 'user'; text: string; results?: GuideItem[] }[]
  >([
    {
      sender: 'bot',
      text: 'こんにちは！「ここなび」です🌿\n何か気になるお悩みや、探しているコンテンツはありますか？（例：「連絡が減って不安」「自分の傾向を知りたい」など）',
    },
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    // ユーザーの入力をチャットに追加
    const newHistory = [...chatHistory, { sender: 'user' as const, text: userText }];
    
    // キーワードマッチングによる案内先検索
    const matchedGuides = GUIDES.filter((guide) =>
      guide.keywords.some((kw) => userText.includes(kw))
    );

    let botReplyText = '';
    let results: GuideItem[] = [];

    if (matchedGuides.length > 0) {
      botReplyText = 'お悩みにぴったりのページが見つかりましたよ！こちらを参考にしてみてくださいね🐾';
      results = matchedGuides;
    } else {
      botReplyText = 'お話し聞かせてくれてありがとうございます。もしかすると、こちらのコンテンツがお役に立てるかもしれません！';
      // マッチしない場合のデフォルト（全紹介など）
      results = GUIDES;
    }

    setChatHistory([
      ...newHistory,
      { sender: 'bot', text: botReplyText, results },
    ]);
    setInputQuery('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* チャットウィンドウ（開いているとき） */}
      {isOpen && (
        <div className="mb-4 w-[90vw] sm:w-[380px] h-[500px] bg-white border border-[#EFECE6] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* ヘッダー */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden relative flex items-center justify-center shrink-0">
                <Image
                  src="/images/kokonavi-icons.png" // トリガーボタンと同じ画像のパス
                  alt="ここなび"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm">ここなび</h3>
                <p className="text-[10px] text-emerald-100">あなたの道案内スタッフ</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-sm transition-all"
            >
              ✕
            </button>
          </div>

          {/* メッセージ表示エリア */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FAFAF8] text-sm">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-white border border-[#EFECE6] text-slate-700 rounded-bl-none shadow-xs whitespace-pre-wrap'
                  }`}
                >
                  {msg.text}
                </div>

                {/* 案内カードがある場合 */}
                {msg.results && msg.results.length > 0 && (
                  <div className="w-full mt-3 space-y-2">
                    {msg.results.map((res, rIdx) => (
                      <Link
                        key={rIdx}
                        href={res.url}
                        onClick={() => setIsOpen(false)}
                        className="block bg-white hover:bg-[#E8F5E9]/40 border border-emerald-100 p-3 rounded-xl transition-all shadow-xs group"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-xs text-emerald-700 group-hover:underline">
                            {res.title}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-bold">行ってみる →</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-tight">
                          {res.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 入力フォーム */}
          <form onSubmit={handleSearch} className="p-3 bg-white border-t border-[#EFECE6] flex gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="例：「連絡が減って不安…」"
              className="flex-1 bg-[#FAFAF8] border border-[#EFECE6] rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              送信
            </button>
          </form>
        </div>
      )}

      {/* 右下に常駐するトリガーボタン（可愛い動物アイコン） */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-white hover:bg-emerald-50 border border-emerald-200 text-slate-700 pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          {/* 動物アイコン（可愛いウサギや鳥のイメージ・絵文字や画像に差し替え可能） */}
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shadow-xs group-hover:rotate-12 transition-transform relative">
            <Image
              src="/images/kokonavi-icons.png" // 💡 ご用意された画像のパスに合わせて変更してください
              alt="ここなびアイコン"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-left">
            <span className="block text-[10px] text-emerald-600 font-bold tracking-wider">
              ご案内係
            </span>
            <span className="block text-xs sm:text-sm font-bold text-slate-800">
              ここなびに相談する
            </span>
          </div>

          {/* 呼吸するようなきらめきインジケーター */}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
        </button>
      )}
    </div>
  );
}