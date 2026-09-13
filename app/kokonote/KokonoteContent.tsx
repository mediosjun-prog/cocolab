'use client';

import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

interface ContentItem {
  title: string;
  nameEn: string;
  category: string;
  description: string;
  href: string;
  badge: string;
}

const ITEMS: ContentItem[] = [
{
    title: '🪢 ここむすび',
    nameEn: 'ATTACHMENT RECOVERY',
    category: '心理プログラム',
    description: '愛着の傷や親子関係にまつわるトラウマを紐解き、内なる安全基地を育てていくためのプログラムです。',
    href: '/kokomusubi',
    badge: '深層ケア',
  },
  {
    title: '💗 ここかこ',
    nameEn: 'REFRAME',
    category: '心理プログラム',
    description: '当時の記憶や感情を整理し、AIカウンセラーと一緒に内的ワーキングモデルの更新と新しい意味づけを見つけていきましょう。',
    href: '/kokokako',
    badge: '過去の書き換え',
  },
  {
    title: '💬 ここちょい',
    nameEn: 'INTERACTIVE TRAINING',
    category: '対話トレーニング',
    description: '人間関係のちょっとした言いづらい場面やすれ違いを、AI相手に安全にロールプレイング（練習）できるスペースです。',
    href: '/kokochoi',
    badge: '実践的スキル',
  },
  {
    title: '🎬 ここすれ',
    nameEn: 'PSYCHOLOGICAL TEST',
    category: '心理テスト',
    description: '人間関係のよくある5つのワンシーン。あなたならどう動く？',
    href: '/kokosure',
    badge: '人気No.1',
  },
    {
    title: '🔍 ここみえ',
    nameEn: 'SUBCONSCIOUS MIND',
    category: '心理テスト',
    description: '直感で選んだ選択肢から、今のあなたの深層心理とメッセージを映し出します。',
    href: '/kokomie',
    badge: 'あなたの深層心理',
  },
  {
    title: '❤️ ここすき',
    nameEn: 'POSITIVE REFRAME',
    category: 'セルフケア',
    description: 'ご自身の気になる部分をポジティブに解釈し直して、あたたかいメッセージで心をほぐします。',
    href: '/kokosuki',
    badge: 'あなたの魅力度UP',
  },
  {
    title: '📢 こここえ',
    nameEn: 'PSYCHOLOGICAL TEST',
    category: 'セルフケア',
    description: '今、あなたに必要な温かい言葉のシャワーを浴びて、ほっと心が安らぐひとときをお過ごしください。',
    href: '/kokokoe',
    badge: 'あなたの魅力度UP',
  },

  {
    title: '👤 ここいく',
    nameEn: 'COCOIKU',
    category: '対話トレーニング',
    description: '安全な仮想世界の中で、心地よい距離感やコミュニケーションを対話を通じて学びましょう。',
    href: '/iko',
    badge: 'スキルアップ',
  },
  {
    title: '🛏️ ここるーむ',
    nameEn: 'KOKOROOM',
    category: 'AI対話・相談',
    description: 'ここは、他人の目を気にせず、傷つかずに人間関係の練習や心の休息ができる安心のバーチャル空間',
    href: '/kokoroom',
    badge: 'いつでも安心',
  },
  {
    title: '📗 ここにっし',
    nameEn: 'DIAYR',
    category: 'セルフケア・育成',
    description: '今日の天気、心の色、動物、そして今の気分を選んで、あなただけの心の日記をつけましょう。',
    href: '/nisshi',
    badge: '毎日癒やされる',
  },
  {
    title: '🪴 ここにわ',
    nameEn: 'DIGITAL HEALING GARDEN',
    category: 'セルフケア・育成',
    description: '日々の小さなセルフケア（歩く、睡眠、心を緩める）を記録すると、お庭の植物がすくすく育つ癒やしのスペースです。',
    href: '/kokoniwa',
    badge: '毎日癒やされる',
  },
  {
    title: '☑️ ここチェック',
    nameEn: 'PSYCHOLOGICAL TEST',
    category: '心理テスト',
    description: '日々のシチュエーションでどのような選択をしたかを振り返り、回避傾向に気づき、アサーティブな関わり方と今の回復度をチェック',
    href: '/kokocheck',
    badge: 'おすすめ診断',
  },
  {
    title: '✏️ こころぐ',
    nameEn: 'MY LOG / HISTORY',
    category: 'マイログ・履歴',
    description: 'ここシリーズのコンテンツを利用した履歴や、ご自身の心の変化の軌跡を振り返るパーソナルスペース',
    href: '/kokorogu',
    badge: 'ご利用履歴',
  },
];

export default function KokonoteContent() {
  return (
    <main className="w-full pb-20">
      {/* ヘッダーセクション */}
      <section className="relative overflow-hidden from-[#E8F5E9] via-[#F1F8F2] to-[#FDFBF7] py-16 px-4 text-center">
        <div className="max-w-6xl mx-auto space-y-4 relative z-10">
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
            コンテンツカタログ
          </span>
          <PageHeader title="ここのーと" />
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            ここらぼが提供するすべての体験型コンテンツや癒やしツールのまとめノートです。今のあなたに必要な場所へすぐアクセスできます。
          </p>
        </div>
      </section>

      {/* コンテンツ一覧カードグリッド */}
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          {ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#EFECE6] hover:border-emerald-600 rounded-3xl p-6 sm:p-8 shadow-sm transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-700 bg-[#E8F5E9] px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-700 font-bold bg-[#FCF6BF] px-2.5 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-[#1F2937] group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-xs font-bold text-[#6B7280]">
                    {item.nameEn}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={item.href}
                  className="block w-full py-3 bg-emerald-600 hover:bg-emerald-700 !text-white text-center rounded-xl font-medium text-sm transition-all shadow-xs"
                >
                  このページを開く →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}