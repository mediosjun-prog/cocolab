'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

interface CaseItem {
  id: string;
  title: string;
  pairing: string;
  summary: string;
  story: string;
  analysis: string;
  tips: string;
}

const CASES_DATA: CaseItem[] = [
  {
    id: 'anxious-avoidant',
    title: '追う者と、逃げる者のジレンマ',
    pairing: '不安型 × 回避型',
    summary: '連絡の頻度や距離感をめぐり、お互いの「安心したい」「一人になりたい」という防衛がすれ違ってしまう典型的なパターン。',
    story: `「ねぇ、最近なんだか冷たくない？」
夕方、スマホの画面を見つめながら、Aさん（不安型傾向）は何度もメッセージを打ち直しては消した。既読がついているのに、何時間も返事がない。不安に耐え切れず、「何か怒らせるようなこと言ったならごめんね」と立て続けに送ってしまう。
その頃、Bさん（回避型傾向）は、仕事のプレッシャーに加え、スマホに通知される大量のメッセージを見て、胸がキュッと締め付けられるような重圧感じていた。「何か返さなきゃ」と思えば思うほど息苦しくなり、スマホを伏せて自分の殻に閉じこもってしまう——。`,
    analysis: `【心理学的メカニズム】
不安型の人は、愛着システムが過剰に活性化し、「見捨てられること」への恐怖から相手との一体感や頻繁な連絡を求めます。一方、回避型の人は、親密さが深まると「自分の領域が侵される」「束縛される」と感じて防衛機制が働き、距離を取ろうとします。
追えば逃げ、逃げれば追うという「追跡・逃避のサイクル」が、お互いの不安とプレッシャーをさらに増幅させてしまいます。`,
    tips: `【ベストな対応とヒント】
1. **「安心の言語化」と「適度な余白」**:
   不安型側は、相手の返信の遅さを「自分嫌いになったサイン」ではなく「一人の時間を必要としているだけ」と捉え直す練習（セルフ・スージング）をします。
2. **ルールづくりの共有**:
   「忙しいときはスタンプ一つでOKにする」「お互いのペースを尊重する時間を作る」など、感情的になる前に穏やかなルールを二人で話し合っておくことが効果的です。`,
  },
  {
    id: 'avoidant-avoidant',
    title: 'お互いに踏み込めないガラスの距離感',
    pairing: '回避型 × 回避型',
    summary: '大きな衝突はないものの、お互いに本音や深い悩みを隠し、一定の距離を保ったまま心が孤立してしまう関係性。',
    story: `一緒に暮らしているCさんとDさん。日常の世間話や事務的な連絡は問題なくこなせるし、大きな喧嘩もない。
しかし、Cさんが職場で大きなトラブルを抱え、深く落ち込んで帰ってきた夜も、「どうしたの？」と聞かれて「ううん、なんでもない」と言葉を濁してしまった。Dさんも「言いたくないなら無理に聞くまい」と、それ以上踏り込もうとしない。
波風は立たないものの、お互いの心の中には決して触れ合えない「見えない壁」があり、孤独感だけが積もっていく——。`,
    analysis: `【心理学的メカニズム】
お互いに「人に頼ることは面倒をかけること」「弱みを見せると傷つけられる」というスキーマ（認知の偏り）を持っている場合によく見られます。
トラブルを避けるために衝突は起きませんが、本当の意味で支え合うことができず、何か大きな環境の変化（病気や転居など）が起きたときに、一気に絆が断ち切れてしまう脆さを抱えています。`,
    tips: `【ベストな対応とヒント】
1. **「小さな弱み」の自己開示**:
   いきなり深い悩みを話すのではなく、「今日、ちょっと疲れたな」「これ美味しかったよ」といった、当たり障りのない感情や小さな本音を言葉にする練習から始めます。
2. **安心できる「役割」を通じたつながり**:
   言葉での深い対話が難しい場合でも、一緒に作業をする、共通の趣味を楽しむなど、非言語のつながりから安心感を少しずつ蓄積していくことが有効です。`,
  },
  {
    id: 'empathy-overload',
    title: '優しさと我慢の限界点',
    pairing: 'エンパシー過多（過剰同調） × 境界線の曖昧な関係',
    summary: '相手の機嫌や感情を敏感に察知し、自分の意見を犠牲にして合わせ続けた結果、ある日突然心がポキリと折れてしまうパターン。',
    story: `「相手が機嫌よくいてくれるなら、自分が我慢すればいい」
Eさん（過剰同調型）は、パートナーや職場の人の表情やトーンを常にスキャンし、相手の望む役割を完璧に演じ続けていていた。相手が不機嫌そうにしていると、「私が何かしてしまったのでは」と胸がざわつき、自分の要望はすべて飲み込む。
しかし、どれだけ尽くしても相手はそれが「当たり前」になっていき、ある日、些細な一言をきっかけにEさんのなかの我慢のダムが決壊。「もう無理だ、すべて投げ出したい」と、強い拒絶感と燃え尽き症候群に襲われる——。`,
    analysis: `【心理学的メカニズム】
他者の感情の境界線と自分の境界線が溶け合ってしまっている状態です（心理的境界線の欠如）。幼少期に「良い子でいなければ愛されない」「親の機嫌を取ることがサバイバルだった」という経験から、自己犠牲的なスキーマが強く形成されています。
相手を思いやっているつもりが、無意識のうちに「これだけ我慢しているのだから気づいてほしい」という重荷を相手に背負わせてしまい、関係が歪みやすくなります。`,
    tips: `【ベストな対応とヒント】
1. **「自分の心地よさ」を優先する練習**:
   「相手はどう思うか」ではなく、「今、私はどうしたいか」を自分自身に問いかける時間を1日の中に少しずつ作ります。
2. **健全なバウンダリー（境界線）の引き方**:
   フィルムや境界線をしっかり引くことは冷たさではなく、お互いの健やかさを守るために大切です。`,
  },
];

export default function CasesContent() {
  const [selectedCase, setSelectedCase] = useState<CaseItem>(CASES_DATA[0]);

  return (
    <main className="w-full pb-20">
      {/* 共通のヘッダーセクション */}
      <section className="relative overflow-hidden from-[#E8F5E9] via-[#F1F8F2] to-[#FDFBF7] py-16 px-4 text-center border-b border-[#EFECE6] mb-10">
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <div>
            <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
              CASE STUDY
            </span>
          </div>
          <PageHeader title="すれ違いの向こう側 —— 愛着のパターンから読み解く人間関係の物語" />
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            「どうしてあのとき、あんな言い方をしてしまったのだろう」。人間関係のモヤモヤやすれ違いの裏側にある、無意識の心の仕組み（愛着スタイル）を、物語と専門的な視点から紐解きます。
          </p>
        </div>
      </section>

      {/* メインコンテンツエリア */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* 左側：事例リスト選択 */}
        <div className="md:col-span-1 space-y-3">
          <h2 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2 px-1">
            事例一覧
          </h2>
          {CASES_DATA.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCase(item)}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${
                selectedCase.id === item.id
                  ? 'bg-emerald-600 text-white border-[#446246] shadow-md'
                  : 'bg-white text-[#2C2C2C] border-[#EFECE6] hover:bg-[#FAFAF8]'
              }`}
            >
              <div className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-block mb-1.5 ${
                selectedCase.id === item.id ? 'bg-white/20 text-white' : 'bg-[#F3F4F6] text-[#4B5563]'
              }`}>
                {item.pairing}
              </div>
              <div className="text-sm font-bold leading-snug">{item.title}</div>
              <div className={`text-xs mt-1 line-clamp-2 ${
                selectedCase.id === item.id ? 'text-gray-100' : 'text-[#6B7280]'
              }`}>
                {item.summary}
              </div>
            </button>
          ))}
        </div>

        {/* 右側：選択された事例の詳細 */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            
            <div>
              <span className="inline-block bg-[#E8F5E9] text-[#446246] text-xs font-bold px-3 py-1 rounded-full mb-2">
                {selectedCase.pairing}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-[#1F2937]">
                {selectedCase.title}
              </h2>
            </div>

            {/* 1. 物語 */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#446246] flex items-center gap-2 border-b border-[#EFECE6] pb-2">
                📖 エピソード（物語）
              </h3>
              <div className="text-sm text-[#4B5563] whitespace-pre-line leading-relaxed bg-[#FAFAF8] p-4 rounded-2xl border border-[#EFECE6]">
                {selectedCase.story}
              </div>
            </div>

            {/* 2. 原因の分析 */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#3B82F6] flex items-center gap-2 border-b border-[#EFECE6] pb-2">
                🔍 心理学的分析
              </h3>
              <div className="text-sm text-[#4B5563] whitespace-pre-line leading-relaxed bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                {selectedCase.analysis}
              </div>
            </div>

            {/* 3. ベストな対応とヒント */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-emerald-700 flex items-center gap-2 border-b border-[#EFECE6] pb-2">
                💡 回復と向き合い方のヒント
              </h3>
              <div className="text-sm text-[#4B5563] whitespace-pre-line leading-relaxed bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                {selectedCase.tips}
              </div>
            </div>

            {/* アクション導線 */}
            <div className="pt-4 border-t border-[#EFECE6] flex flex-col sm:flex-row gap-3">
              <Link
                href="/kokoroom"
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 !text-white text-center rounded-xl font-medium text-sm transition-all shadow-xs"
              >
                ここるーむで対話を練習する
              </Link>
              <Link
                href="/counselors"
                className="flex-1 py-3 bg-white border border-[#446246] text-white hover:bg-[#E8F5E9]/50 text-center rounded-xl font-medium text-sm transition-all"
              >
                AI相談で自分の気持ちを整理する
              </Link>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}