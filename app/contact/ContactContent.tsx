'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/PageHeader';

export default function ContactContent() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'サービスの使い方について',
    message: '',
  });

  // 戻るボタンのハンドラー
  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1つのメッセージに綺麗にまとめる
      const formattedMessage = `
Webサイトのお問い合わせフォームからメッセージがありました。

■ お名前：${formData.name}
■ メールアドレス：${formData.email}
■ お問い合わせ種別：${formData.category}
■ お問い合わせ内容：
${formData.message || 'なし'}
      `.trim();

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '79bb8822-8607-47eb-b0cd-d33b0527f7bd',
          subject: `【お問い合わせ】[${formData.category}] ${formData.name}様`,
          name: formData.name,       // 差出人名として裏で設定
          email: formData.email,     // 返信用アドレスとして裏で設定
          message: formattedMessage, // まとめた日本語の本文を送信
        }),
      });

      const result = await response.json();
      console.log('Web3Forms Response:', result);

      if (result.success) {
        setSubmitted(true);
      } else {
        alert(`送信失敗: ${result.message || '不明なエラー'}`);
      }
    } catch (err) {
      console.error(err);
      alert('通信エラーが発生しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full p-4 md:p-8">
      {/* コンテンツの幅制限と中央寄せ */}
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 戻るボタンエリア */}
        <div>
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center text-xs text-slate-500 hover:text-[#93c296] transition-colors cursor-pointer"
          >
            ← 前のページに戻る
          </button>
        </div>

        {/* 統一されたヘッダーセクション */}
        <section className="text-center space-y-4 pt-2 mb-6">
          <div>
            <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
              CONTACT
            </span>
          </div>
          <PageHeader title="お問い合わせ" />
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            ご意見・ご質問や専門家へのご依頼について、
            <br className="hidden sm:inline" />
            以下のフォームよりお気軽にお問い合わせください。
          </p>
        </section>

        {/* フォーム部分 */}
        <div className="max-w-6xl mx-auto bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="text-4xl">✉️</div>
              <h2 className="text-xl font-bold text-slate-800">
                お問い合わせを受け付けました
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                内容を確認のうえ、通常2〜3営業日以内にご返信いたします。
                <br />
                今しばらくお待ちください。
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    category: 'サービスの使い方について',
                    message: '',
                  });
                }}
                className="mt-4 inline-block bg-[#93c296] hover:bg-[#82b385] !text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                続けてお問い合わせする
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* お名前 */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  お名前 <span className="text-rose-500 text-xs">*必須</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="山田 太郎"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#93c296] focus:ring-1 focus:ring-[#93c296] text-slate-800 text-sm transition-all"
                />
              </div>

              {/* メールアドレス */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  メールアドレス <span className="text-rose-500 text-xs">*必須</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#93c296] focus:ring-1 focus:ring-[#93c296] text-slate-800 text-sm transition-all"
                />
              </div>

              {/* お問い合わせ種別 */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  お問い合わせ種別
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#93c296] focus:ring-1 focus:ring-[#93c296] text-slate-800 text-sm bg-white transition-all"
                >
                  <option value="サービスの使い方について">
                    サービスの使い方について
                  </option>
                  <option value="専門家へのご相談・ご依頼">
                    専門家へのご相談・ご依頼
                  </option>
                  <option value="愛着診断について">愛着診断について</option>
                  <option value="その他">その他</option>
                </select>
              </div>

              {/* お問い合わせ内容 */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  お問い合わせ内容{' '}
                  <span className="text-slate-400 text-xs font-normal">
                    （任意）
                  </span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="ご質問やご相談内容があればご記入ください。"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#93c296] focus:ring-1 focus:ring-[#93c296] text-slate-800 text-sm transition-all resize-none"
                />
              </div>

              {/* 送信ボタン */}
              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-w-[200px] bg-[#93c296] hover:bg-[#82b385] disabled:opacity-50 !text-white font-semibold px-8 py-3.5 rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  {isSubmitting ? '送信中...' : '送信する'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}