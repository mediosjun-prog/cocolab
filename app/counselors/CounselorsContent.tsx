'use client';

import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

const COUNSELOR_TYPES = [
  {
    id: 'fearful',
    title: '恐れ・回避型ケア専門',
    name: 'カウンセラー・ソラ',
    role: '否定せず100%安全な場所を提供',
    description:
      '人との距離感や拒絶への不安を感じやすい方向けです。気を使ったり完璧でいる必要はなく、どんな感情もそのまま受け止めます。',
    icon: '🌸',
    color: 'bg-rose-50 border-rose-200 text-rose-700',
    btnColor: 'bg-rose-500 hover:bg-rose-600 !text-white transition-colors',
    imagePath: '/images/counselor-sora.png',
    path: '/diagnosis/chat?type=fearful',
  },
  {
    id: 'anxious',
    title: '不安型ケア専門',
    name: 'カウンセラー・ミナミ',
    role: '安心感と気づきを与える対話',
    description:
      '見捨てられ不安や相手の顔色が気になってしまう方向けです。いつでも味方となり、落ち着いて気持ちを整理できるよう導きます。',
    icon: '💡',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    btnColor: 'bg-blue-500 hover:bg-blue-600 !text-white transition-colors',
    imagePath: '/images/counselor-minami.png',
    path: '/diagnosis/chat?type=anxious',
  },
  {
    id: 'avoidant',
    title: '回避型ケア専門',
    name: 'カウンセラー・タカ',
    role: '最適な距離感を保ち論理的にサポート',
    description:
      '他者と一定の距離を保ちたい方や本音を言うのが苦手な方向けです。無理に踏み込まず、客観的な視点からペースに合わせて会話します。',
    icon: '☀️',
    color: 'bg-amber-50 border-amber-200 text-amber-700',
    btnColor: 'bg-amber-500 hover:bg-amber-600 !text-white transition-colors',
    imagePath: '/images/counselor-taka.png',
    path: '/diagnosis/chat?type=avoidant',
  },
  {
    id: 'secure',
    title: 'メンタルメンテナンス',
    name: 'カウンセラー・ハル',
    role: '良好なコンディションの維持・成長',
    description:
      '日頃の対人関係のコンディションチェックや、さらに質の高いコミュニケーションを育みたい方のためのメンタルパートナーです。',
    icon: '🌱',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    btnColor: 'bg-emerald-500 hover:bg-emerald-600 !text-white transition-colors',
    imagePath: '/images/counselor-haru.png',
    path: '/diagnosis/chat?type=secure',
  },
];

export default function CounselorsContent() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 統一ヘッダー */}
        <section className="text-center space-y-4 pt-4 mb-10">
          <div>
            <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
              COUNSELORS
            </span>
          </div>
          <PageHeader title="AIカウンセラー 一覧" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            ご自身の診断タイプや現在の気分に合わせて、お好みのカウンセラーをお選びください。
            <br className="hidden sm:inline" />
            どのカウンセラーもあなたのペースに合わせて優しくサポートいたします。
          </p>
        </section>

        {/* AIカウンセラーカード一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COUNSELOR_TYPES.map((counselor) => (
            <div
              key={counselor.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className="text-xl" role="img" aria-label="icon">
                        {counselor.icon}
                      </span>
                      <span
                        className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full border ${counselor.color}`}
                      >
                        {counselor.title}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">
                      {counselor.name}
                    </h2>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      {counselor.role}
                    </p>
                  </div>

                  <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden bg-slate-100 border border-slate-100 shadow-inner flex items-center justify-center">
                    <img
                      src={counselor.imagePath}
                      alt={counselor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {counselor.description}
                </p>
              </div>

              <Link
                href={counselor.path}
                className={`w-full text-center font-medium py-3 px-4 rounded-xl shadow-sm transition-all block ${counselor.btnColor}`}
              >
                {counselor.name} に相談する
              </Link>
            </div>
          ))}
        </div>

        {/* 専門家カウンセラーへの誘導カード */}
        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-sm">
          <span className="text-[#93c296] text-xs font-bold tracking-wider uppercase">
            EXPERT SUPPORT
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-800">
            専門カウンセラーによる個別セッションをご希望の方へ
          </h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            AIでの整理にとどまらず、臨床心理士や公認心理師などの専門家に直接相談し、より深いトラウマケアや対人関係の課題解決に取り組むことができます。
          </p>
          <div className="pt-2">
            <Link
              href="/experts"
              className="inline-block bg-[#93c296] hover:bg-[#82b385] !text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
            >
              専門家一覧を見る
            </Link>
          </div>
        </div>

        {/* 診断トップへ戻る */}
        <div className="mt-8 text-center">
          <Link
            href="/diagnosis"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 underline"
          >
            ← 診断テストトップへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}