'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

function BookingFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URLクエリ（?counselor=◯◯）からカウンセラー名を取得。指定がなければデフォルト名
  const counselorName = searchParams.get('counselor') || '指定なし';

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '10:00',
    notes: '',
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
以下の内容でご予約のお申し込みがありました。

■ 担当カウンセラー：${counselorName} 先生
■ お名前：${formData.name}
■ メールアドレス：${formData.email}
■ 電話番号：${formData.phone}
■ 受診希望日：${formData.date}
■ 予約時間：${formData.time}
■ 備考・ご相談内容：
${formData.notes || 'なし'}
      `.trim();

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'c8b66e3e-560a-4334-ba3f-84a80c0d2e7d',
          subject: `【ご予約お申し込み】${counselorName} (${formData.date} ${formData.time})`,
          name: formData.name,       // 通知の差出人名として設定
          email: formData.email,     // 返信先メールアドレスとして設定
          message: formattedMessage, // まとめた日本語の本文を送信
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        alert('予約送信に失敗しました。時間をおいて再度お試しください。');
      }
    } catch (err) {
      alert('通信エラーが発生しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 戻るボタンエリア */}
      <div>
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center text-xs text-slate-500 hover:text-[#93c296] transition-colors cursor-pointer"
        >
          ← カウンセラー詳細に戻る
        </button>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="text-4xl">🗓️</div>
            <h2 className="text-xl font-bold text-slate-800">
              ご予約リクエストを受け付けました
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              担当カウンセラー（{counselorName}）より、確定メールをお送りいたします。
              <br />
              今しばらくお待ちください。
            </p>
            <div className="pt-4">
              <Link
                href="/experts"
                className="inline-block bg-[#93c296] hover:bg-[#82b385] !text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                専門カウンセラー一覧に戻る
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 選択された専門カウンセラー */}
            <div className="bg-[#fdfaf3] p-4 rounded-xl border border-[#D0F9C7] flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                選択中のカウンセラー
              </span>
              <span className="text-base font-bold text-[#446246]">
                {counselorName} 先生
              </span>
            </div>

            {/* 予約者の名前 */}
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

            {/* 連絡先（メールアドレス） */}
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

            {/* 連絡先（電話番号） */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                電話番号 <span className="text-rose-500 text-xs">*必須</span>
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="090-1234-5678"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#93c296] focus:ring-1 focus:ring-[#93c296] text-slate-800 text-sm transition-all"
              />
            </div>

            {/* 受診希望日（カレンダー）＆ 予約時間（プルダウン） */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  受診希望日 <span className="text-rose-500 text-xs">*必須</span>
                </label>
                <input
                  type="date"
                  id="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#93c296] focus:ring-1 focus:ring-[#93c296] text-slate-800 text-sm bg-white transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  予約時間 <span className="text-rose-500 text-xs">*必須</span>
                </label>
                <select
                  id="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#93c296] focus:ring-1 focus:ring-[#93c296] text-slate-800 text-sm bg-white transition-all"
                >
                  <option value="10:00">10:00〜</option>
                  <option value="11:00">11:00〜</option>
                  <option value="13:00">13:00〜</option>
                  <option value="14:00">14:00〜</option>
                  <option value="15:00">15:00〜</option>
                  <option value="16:00">16:00〜</option>
                  <option value="17:00">17:00〜</option>
                  <option value="19:00">19:00〜</option>
                  <option value="20:00">20:00〜</option>
                </select>
              </div>
            </div>

            {/* 備考（自由記入） */}
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                備考・ご相談内容の事前共有{' '}
                <span className="text-slate-400 text-xs font-normal">
                  （任意）
                </span>
              </label>
              <textarea
                id="notes"
                rows={4}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="現在のお悩みや事前に伝えておきたいことががあればご記入ください。"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#93c296] focus:ring-1 focus:ring-[#93c296] text-slate-800 text-sm transition-all resize-none"
              />
            </div>

            {/* 送信ボタン */}
            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[240px] bg-[#93c296] hover:bg-[#82b385] disabled:opacity-50 !text-white font-bold px-8 py-3.5 rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                {isSubmitting ? '送信中...' : '予約する'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function BookingContent() {
  return (
    <main className="w-full p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダーセクション */}
        <section className="text-center space-y-4 pt-4 mb-10">
          <div>
            <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
              BOOKING
            </span>
          </div>
          <PageHeader title="カウンセリングご予約" />
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            ご希望の受診日時と必要事項をご入力のうえ、
            <br className="hidden sm:inline" />
            「予約する」ボタンを押してください。
          </p>
        </section>

        {/* サスペンスで囲んでクエリパラメータを取得 */}
        <Suspense fallback={<div className="text-center py-10">読み込み中...</div>}>
          <BookingFormContent />
        </Suspense>
      </div>
    </main>
  );
}