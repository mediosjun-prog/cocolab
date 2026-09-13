'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';

// FAQデータの定義
const faqCategories = [
  {
    category: 'サービス・使い方について',
    items: [
      {
        q: '愛着タイプ診断は無料で利用できますか？',
        a: 'はい、愛着タイプ診断および基本的な診断結果の確認はすべて無料でご利用いただけます。',
      },
      {
        q: 'AIカウンセリングは24時間いつでも使えますか？',
        a: 'はい、24時間365日いつでもAIカウンセラーとの対話が可能です。深夜や早朝など、心が波立ったタイミングで気軽にご利用ください。',
      },
      {
        q: '自分の診断結果や相談内容が他人に知られることはありますか？',
        a: 'いいえ、ご入力いただいたデータや相談履歴は厳重に保護されており、第三者に公開されることは一切ありません。',
      },
    ],
  },
  {
    category: '専門家（カウンセラー）へのご依頼方法',
    items: [
      {
        q: '専門家（人間）のカウンセリングを受けるにはどうすればいいですか？',
        a: '「カウンセラー一覧」ページから、ご自身の診断タイプや希望する雰囲気に合った専門家をお選びいただき、詳細ページからオンラインセッションのご予約が可能です。',
      },
      {
        q: 'AIカウンセリングと専門家カウンセリングの違いは何ですか？',
        a: 'AIカウンセリングは日々の細かな感情の整理や即時の傾聴を得意としています。一方、専門家のカウンセリングでは、より深いトラウマのケアや具体的な対人関係の課題解決に向けて、個別に伴走したサポートを行います。',
      },
      {
        q: '予約のキャンセルや日時変更はできますか？',
        a: 'ご予約日時の24時間前までであれば、マイページより無料でキャンセル・変更が可能です。',
      },
    ],
  },
];

export default function FaqContent() {
  // アコーディオンの開閉状態管理
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <main className="w-full p-4 md:p-8">
      {/* コンテンツの幅制限と中央寄せ */}
      <div className="max-w-6xl mx-auto">
        {/* 統一されたヘッダーセクション */}
        <section className="text-center space-y-4 pt-4 mb-10">
          <div>
            <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
              FAQ
            </span>
          </div>
          <PageHeader title="よくある質問" />
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            サービスの使い方や専門家へのご相談方法について、
            <br className="hidden sm:inline" />
            寄せられることの多い質問をまとめました。
          </p>
        </section>

        {/* FAQコンテンツ */}
        <div className="space-y-8">
          {faqCategories.map((cat, catIdx) => (
            <section key={catIdx} className="space-y-4">
              <h2 className="text-lg font-bold text-slate-800 border-b pb-2 border-slate-200">
                {cat.category}
              </h2>
              <div className="space-y-3">
                {cat.items.map((item, itemIdx) => {
                  const id = `${catIdx}-${itemIdx}`;
                  const isOpen = openIndex === id;
                  return (
                    <div
                      key={itemIdx}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all"
                    >
                      <button
                        onClick={() => toggleAccordion(id)}
                        className="w-full text-left p-4 sm:p-5 flex justify-between items-center font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-[#93c296] font-bold">Q.</span>
                          {item.q}
                        </span>
                        <span className="text-slate-400 text-xl font-normal ml-2">
                          {isOpen ? '−' : '＋'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="p-4 sm:p-5 pt-0 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          <div className="flex gap-3 pt-3">
                            <span className="text-rose-400 font-bold">A.</span>
                            <div>{item.a}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}