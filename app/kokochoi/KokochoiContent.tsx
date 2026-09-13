// app/kokochoi/KokochoiContent.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

interface Scenario {
  id: string;
  title: string;
  partnerRole: string;
  situation: string;
  initialMessage: string;
  options: {
    text: string;
    aiReply: string;
    feedback: string;
    isGood: boolean;
  }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'busy-partner',
    title: 'CASE 1：連絡が減ったパートナー',
    partnerRole: '少しお疲れ気味のパートナー',
    situation: '最近、相手の仕事が忙しく連絡がそっけない。「もしかして嫌われた？」と不安になる場面。',
    initialMessage: '「ごめん、最近仕事立て込んでて連絡返せなくて……。しばらく自分のことでいっぱいいっぱいかも」',
    options: [
      {
        text: '「私のこと嫌いになったの？ 何で連絡してくれないのさっきから不安だったんだよ！」と感情をぶつける',
        aiReply: '「……そんなふうに詰められると、正直もっとしんどくなっちゃう。今はそっとしておいてほしい……」',
        feedback: '【不安型の暴走パターン】不安がピークに達して感情をぶつけると、回避型の相手はさらに殻に閉じこもりがちになってしまいます。',
        isGood: false,
      },
      {
        text: '「そっか、仕事大変だもんね。私のことは気にせず自分のことに集中して！」（と、本当は寂しいのに我慢する）',
        aiReply: '「うん、ありがとう……。心配かけてごめんね。」（本当の気持ちは言えず、すれ違いが残る）',
        feedback: '【自己犠牲・過剰同調パターン】波風は立ちませんが、自分の寂しさにフタをしているため、後でモヤモヤや爆発の火種になってしまいます。',
        isGood: false,
      },
      {
        text: '「伝えてくれてありがとう。大変なんだね。私はいつでも味方だから、落ち着いたらまたお茶でもしよう」と伝える',
        aiReply: '「ありがとう……その言葉ですごく救われる。落ち着いたら絶対連絡するね！」',
        feedback: '【安定型のしなやかな関わり】相手を責めず、かといって自分を犠牲にしない「境界線のある思いやり」が伝わる素晴らしい対応です！',
        isGood: true,
      },
    ],
  },
  {
    id: 'say-no',
    title: 'CASE 2：頼まれごとを断れないとき',
    partnerRole: '少し押しが強い同僚・友人',
    situation: '自分のキャパシティがいっぱいのときに、さらに面倒な頼みごとをされた場面。',
    initialMessage: '「ねえ、来週の急ぎの資料まとめ、手伝ってもらえないかな？ 君ならすぐ終わるでしょ！」',
    options: [
      {
        text: '「あ、うーん……まあ、何とかやってみる……」（本当は無理なのに引き受けてしまう）',
        aiReply: '「本当？助かる！じゃあよろしくね！」（後で自分の首を絞めることに……）',
        feedback: '【エンパシー過多・自己犠牲】相手の期待に応えようとして自分のキャパを超えてしまい、慢性的な疲弊や燃え尽きに繋がります。',
        isGood: false,
      },
      {
        text: '「無理に決まってるでしょ！こっちの都合も考えてよ！」と強い口調で突っぱねる',
        aiReply: '「えっ、そんな言い方しなくても……。もう頼まないよ」と気まずい空気になる',
        feedback: '【攻撃・防衛反応】自分の領域を守ろうとするあまり、相手を攻撃する形になってしまい、関係性に摩擦が生じてしまいます。',
        isGood: false,
      },
      {
        text: '「声かけてくれて嬉しいんだけど、今週は自分のタスクがいっぱいで手伝えないんだ。ごめんね！」と伝える',
        aiReply: '「そっか、忙しい時期だもんね。無理言ってごめん、他を当たってみるよ！」',
        feedback: '【アサーティブな境界線】相手を否定せず、自分の状況を穏やかに伝えることで、健全な人間関係の距離感を保てています！',
        isGood: true,
      },
    ],
  },
  {
    id: 'un-replied-message',
    title: 'CASE 3：既読スルーされたとき',
    partnerRole: 'マイペースな友人・恋人',
    situation: '大切な予定の確認LINEを送ったのに、既読がついたまま丸一日返事がない場面。',
    initialMessage: '（既読がついているのに、いつまで経っても返信が来ない……）',
    options: [
      {
        text: '「ねえ、既読スルーってどういうこと？何か怒らせるようなこと言ったならハッキリ言ってよ！」と追い討ちLINEを送る',
        aiReply: '「……え、スマホ見る余裕なかっただけなんだけど。そんな詰問されると返事する気なくなる……」',
        feedback: '【不安型の連投パターン】相手の状況を想像できず、自分の不安を鎮めるために連絡を強要すると、相手は負担を感じて距離を置いてしまいます。',
        isGood: false,
      },
      {
        text: '「どうせ私なんて優先順位低いんだ……もう連絡するのやめよ」と心を閉ざし、すネる',
        aiReply: '（相手はそれに気づかず、関係が自然消滅に向かって冷え込んでいく……）',
        feedback: '【回避・引きこもりパターン】不満や不安を言葉にせず、心の中でシャッターを下ろしてしまうと、お互いの信頼関係を育む機会が失われてしまいます。',
        isGood: false,
      },
      {
        text: '「お仕事忙しいのかなと思って。返信は落ち着いた時で大丈夫だよ！日程だけ都合の良い時に教えてね」と送る',
        aiReply: '「ごめん！バタバタして返せてなかった。気遣ってくれてありがとう、来週の土曜なら空いてるよ！」',
        feedback: '【成熟した信頼】相手の自由を認めつつ、必要な要件をプレッシャーなく伝えることで、心地よい安心感を生み出せています！',
        isGood: true,
      },
    ],
  },
  {
    id: 'unsolicited-advice',
    title: 'CASE 4：良かれと思ったおせっかい',
    partnerRole: '先輩・上司（または親）',
    situation: '自分で進め方を変えたかった仕事に対して、頼んでもいない細かいダメ出しや指示をされた場面。',
    initialMessage: '「ここはこうした方が絶対いいよ！私の言う通りにしなさい、昔はこうだったんだから」',
    options: [
      {
        text: '「はい……わかりました……（内心：自分のやり方でやりたかったのに、全部否定された気分だ……）」と従う',
        aiReply: '「素直でよろしい！じゃあその通りに進めてね」',
        feedback: '【従順・自己抑圧】衝突を避けるために言いなりになると、自分の主体性が削られ、やがてエネルギーが枯渇してしまいます。',
        isGood: false,
      },
      {
        text: '「そんなの今のやり方と違います！口出ししないでください！」と感情的に反発する',
        aiReply: '「なんだその態度は！こっちはアドバイスしてあげてるのに！」と険悪な雰囲気になる',
        feedback: '【反発・防衛】プライドや怒りで突発的に跳ね返すと、相手も攻撃モードになり、建設的な対話ができなくなってしまいます。',
        isGood: false,
      },
      {
        text: '「アドバイスありがとうございます！今回は自分なりにこの方法で試してみたいので、結果を見てまた相談させてください」と伝える',
        aiReply: '「そっか、自分で試してみたいんだね。わかった、何か困ったらまた言ってね」',
        feedback: '【境界線の保持】相手の好意は受け取りつつ、自分の領域（主導権）をリスペクトを持って守る、大人の対応です！',
        isGood: true,
      },
    ],
  },
  {
    id: 'cancelled-plans',
    title: 'CASE 5：ドタキャンされたとき',
    partnerRole: '約束していた友人・パートナー',
    situation: '楽しみにしていたデートや約束の直前に「ごめん、体調（または仕事）でやっぱり行けなくなった」と連絡が来た場面。',
    initialMessage: '「本当にごめん！今日の約束、急用が入っちゃって行けなくなっちゃった……また今度ね！」',
    options: [
      {
        text: '「え、ひどい！こっちはずっと楽しみにしてたのに！私のこと何だと思ってるの？」と激怒する',
        aiReply: '「こっちだって好きでキャンセルしたわけじゃないのに……そんな風に言われると連絡しづらいよ」',
        feedback: '【感情の爆発】相手の事情に関係なく自分の悲しみや怒りをぶつけてしまうと、相手は罪悪感と息苦しさを感じてしまいます。',
        isGood: false,
      },
      {
        text: '「ううん、全然大丈夫だよ！気気にしないで！」（本当は大泣きしたいほどショックなのに平気なふりをする）',
        aiReply: '「よかった、優しいね！また今度ね〜」',
        feedback: '【過剰適応】自分の本当の感情（寂しさ・ガッカリ感）を押し殺して「いい人」を演じ続けると、心がすり減ってしまいます。',
        isGood: false,
      },
      {
        text: '「そっか、残念だけど仕方ないね。体調（お仕事）お疲れ様！また落ち着いたら埋め合わせよろしくね」と返す',
        aiReply: '「ごめんね、本当にありがとう！埋め合わせ絶対するから、来週とかどうかな？」',
        feedback: '【健やかな受容】落胆した気持ちを認めつつも、相手を過度に責めず、前向きに再調整のコミュニケーションが取れています！',
        isGood: true,
      },
    ],
  },
  {
    id: 'criticism-at-work',
    title: 'CASE 6：人前でダメ出しされたとき',
    partnerRole: '職場の同僚・上司',
    situation: '会議中や大勢の前で、自分の成果物やミスについて少しトゲのある言い方で指摘された場面。',
    initialMessage: '「これ、なんでこんなミスしてるの？基本がなってないよ、みんなも気をつけてよね」',
    options: [
      {
        text: '（顔が真っ赤になり、その場で涙ぐむか、縮こまって一言も喋れなくなる）',
        aiReply: '（周囲も気まずい雰囲気に包まれ、そのまま流れてしまう……）',
        feedback: '【フリーズ（凍結）反応】過剰なプレッシャーや恐怖心から自己防衛として固まってしまい、自分の意見や事実を伝えられなくなります。',
        isGood: false,
      },
      {
        text: '「そんな言い方しなくてもいいじゃないですか！あなただって前ミスしてたろ！」と言い返す',
        aiReply: '「なんだその態度は！仕事のミスを指摘されて逆ギレするのか？」と大喧嘩に発展する',
        feedback: '【攻撃による防衛】プライドを傷つけられた怒りから反射的にやり返すと、問題の本質がずれて人間関係がこじれてしまいます。',
        isGood: false,
      },
      {
        text: '「指摘ありがとうございます。確かにそこは確認不足でした。後で修正版を共有しますね」と冷静に受け止める',
        aiReply: '「あ、うん、よろしく頼むよ……（冷静な対応に少し拍子抜けする）」',
        feedback: '【感情の切り分け】指摘の中身（事実）と、相手の感情的なトーンを切り離し、大人の落ち着きで主導権を握れています！',
        isGood: true,
      },
    ],
  },
  {
    id: 'different-opinions',
    title: 'CASE 7：意見が真っ向から対立したとき',
    partnerRole: '意見の強いパートナーや友人',
    situation: '休日の過ごし方や大切な計画について、自分の意見と相手の意見が完全に割れている場面。',
    initialMessage: '「絶対に今回はこっちの場所に行くべきだよ！普通はそうするでしょ」',
    options: [
      {
        text: '「うーん、分かった……じゃああなたの行きたい方に合わせるよ（本当は行きたくない）」',
        aiReply: '「やった！じゃあそこに決まりね！」',
        feedback: '【自己犠牲・事なかれ主義】争いを避けて相手に従うことで一時的な平和は保てますが、不満が蓄積していつか爆発してしまいます。',
        isGood: false,
      },
      {
        text: '「絶対こっちの方がいいに決まってる！なんでそんなこと言うの、絶対譲らないから！」',
        aiReply: '「なんだよその言い方、こっちの意見を全然聞こうとしないじゃん！」',
        feedback: '【マウンティング・パワー闘争】どちらが正しいかの「勝ち負け」にこだわってしまうと、お互いが傷つき溝が深まります。',
        isGood: false,
      },
      {
        text: '「そっちはそういう理由で行きたいんだね。私はこっちがいいなと思ってたんだけど、どう折衷案を見つけようか？」と話し合う',
        aiReply: '「そっか、そういう見方もあったね。じゃあ午前と午後で両方行くのはどう？」',
        feedback: '【協調・第3の案】お互いの意見を尊重し合いながら、勝ち負けではなく「協力体制」で解決策を探る素晴らしい対話です！',
        isGood: true,
      },
    ],
  },
  {
    id: 'praise-acceptance',
    title: 'CASE 8：褒められたとき・感謝されたとき',
    partnerRole: '仕事の同僚や友人',
    situation: '自分が頑張った仕事や親切に対して、ストレートに「すごいね」「助かったよ」と褒められた場面。',
    initialMessage: '「本当にありがとう！君のおかげで今回のプロジェクト大成功だよ、すごい才能だね！」',
    options: [
      {
        text: '「そんなことないよ！たまたま運が良かっただけだし、私なんて全然大したことないよ！」と全力で否定する',
        aiReply: '「え, せっかく褒めたのにそんなに否定しなくても……」と相手が少し白けてしまう',
        feedback: '【インポスター症候群・自己卑下】自己肯定感が低いと、褒め言葉を受け取るのが怖くなり、かえって相手の好意を拒絶してしまいます。',
        isGood: false,
      },
      {
        text: '「でしょ？私って本当に優秀だから、これくらい余裕なんだよね」と調子に乗る',
        aiReply: '「……は、はい、そうだね（ちょっと鼻につく人だな……）」',
        feedback: '【過剰防衛・虚勢】本当は嬉しいのに、謙遜の裏返しや防衛として傲慢な態度をとってしまうと、周囲からの信頼を損ねます。',
        isGood: false,
      },
      {
        text: '「そう言ってもらえるとすごく嬉しい！みんなで協力できたから頑張れたよ、ありがとう！」と笑顔で受け取る',
        aiReply: '「こちらこそ本当にありがとう！一緒に仕事できてよかったよ！」',
        feedback: '【健全な自己受容】自分の努力や喜びを素直に受け取りつつ、相手への感謝も分かち合うことで、温かい絆が深まります！',
        isGood: true,
      },
    ],
  },
  {
    id: 'over-dependent',
    title: 'CASE 9：依存されそうになったとき',
    partnerRole: '悩みを何でも相談してくる友人・後輩',
    situation: '毎日のように深夜の長電話や愚痴につき合わされ、自分のプライベートや睡眠時間が削られている場面。',
    initialMessage: '「ねえ、今大丈夫？今日も色々あって辛くて……話を聞いてくれるのは〇〇さんしかいないの！」',
    options: [
      {
        text: '自分の睡眠時間を削って、毎晩2時間も嫌な顔せず愚痴を聞き続ける',
        aiReply: '「やっぱり〇〇さんは優しいね！明日もいいかな？」',
        feedback: '【境界線の崩壊・共依存】相手の「救済者」になろうとして自分の境界線を失うと、お互いの自立を妨げ、共倒れになってしまいます。',
        isGood: false,
      },
      {
        text: '「いい加減にしてよ！こっちにも生活があるんだから、何でもかんでも頼ってこないで！」と冷たく突き放す',
        aiReply: '「……そんな言い方しなくてもいいじゃん。もう二度と相談しないよ」と絶縁状態になる',
        feedback: '【急激な遮断】限界を迎えて突然冷たく突き放すと、相手を見捨てたと感じさせてしまい、強い反発や罪悪感を生みます。',
        isGood: false,
      },
      {
        text: '「すごく大変だったんだね。ただ、今日はもう休む時間だから、続きはまた明日（または週末）のこの時間にするね」と優しく区切る',
        aiReply: '「そっか、夜遅くにごめんね。また明日連絡するね、おやすみ！」',
        feedback: '【思いやりと境界の両立】相手の気持ちに寄り添いながらも、自分のエネルギーを守るための「健康的なルール（境界線）」を引けています！',
        isGood: true,
      },
    ],
  },
  {
    id: 'impatient-partner',
    title: 'CASE 10：早く返事を催促されたとき',
    partnerRole: 'せっかちなパートナー・仕事仲間',
    situation: 'じっくり考えたい大事な決断について、今すぐ「YesかNoか決めてよ！」と急かされている場面。',
    initialMessage: '「ねえ、どうするか早く決めてよ！返事待ってるんだけど、いつになったらわかるの？」',
    options: [
      {
        text: '焦りとプレッシャーに負けて、よく考えずに「じゃあそれでいいです……」と適当にOKしてしまう',
        aiReply: '「決まりね！じゃあすぐ進めるから！」（後で後悔することになる）',
        feedback: '【迎合・流されパターン】相手のペースや圧力に圧倒されて自分の軸を手放すと、後から大きな後悔や不満となって返ってきます。',
        isGood: false,
      },
      {
        text: '「そんなに急かさないでよ！こっちのペースもあるんだから邪魔しないで！」とキレ返す',
        aiReply: '「こっちはスケジュールがあるんだから、早くしてよ！」と口論になる',
        feedback: '【迎撃・パニック】急かされるストレスから攻撃や防衛に走ってしまい、お互いに余裕がなくなってしまいます。',
        isGood: false,
      },
      {
        text: '「急かせてごめんね。大事なことだからちゃんと考えたいの。明日の夕方までに必ず返事するから待ってね」と伝える',
        aiReply: '「わかった、それなら待つよ。よろしくね！」',
        feedback: '【タイムプロテクション】相手の焦りに巻き込まれず、自分の思考のスペース（時間的境界線）を堂々と確保できています！',
        isGood: true,
      },
    ],
  },
];

export default function KokochoiContent() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelectScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setSelectedOption(null);
  };

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
  };

  const resetSelection = () => {
    setSelectedScenario(null);
    setSelectedOption(null);
  };

  return (
    <main className="w-full pb-20">
      {/* ヘッダーセクション */}
      <section className="relative overflow-hidden from-[#E8F5E9] via-[#F1F8F2] to-[#FDFBF7] py-16 px-4 text-center">
        <div className="max-w-6xl mx-auto space-y-4 relative z-10">
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
            対話型トレーニング
          </span>
          <PageHeader title="ここちょい" />
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            人間関係のちょっとした言いづらい場面やすれ違いを、AI相手に安全にロールプレイング（練習）できるスペースです。
          </p>
        </div>
      </section>

      {/* メインコンテンツエリア */}
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        
        {!selectedScenario ? (
          /* シナリオ選択画面 */
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#1F2937] px-1">
              トレーニングするケースを選んでください
            </h2>
            <div className="grid gap-4">
              {SCENARIOS.map((sc) => (
                <div
                  key={sc.id}
                  onClick={() => handleSelectScenario(sc)}
                  className="bg-white border border-[#EFECE6] hover:border-emerald-600 rounded-3xl p-6 shadow-sm transition-all cursor-pointer group space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-emerald-600 bg-[#E8F5E9] px-2.5 py-1 rounded-full">
                      {sc.partnerRole}
                    </span>
                    <span className="text-xs text-[#6B7280] group-hover:text-emerald-600 font-bold transition-all">
                      練習を始める →
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1F2937]">
                    {sc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                    {sc.situation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ロールプレイ対話画面 */
          <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-[#EFECE6] pb-4">
              <span className="text-xs font-bold text-emerald-600 bg-[#E8F5E9] px-3 py-1 rounded-full">
                {selectedScenario.partnerRole}との対話
              </span>
              <button
                onClick={resetSelection}
                className="text-xs text-[#6B7280] hover:text-emerald-600 underline"
              >
                ← シナリオ一覧に戻る
              </button>
            </div>

            {/* AIパートナーからのメッセージ吹出し */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#6B7280]">相手の言葉：</span>
              <div className="bg-[#FAFAF8] border border-[#EFECE6] rounded-2xl p-4 sm:p-5 text-sm sm:text-base text-[#374151] font-medium leading-relaxed">
                {selectedScenario.initialMessage}
              </div>
            </div>

            {/* 自分の返答選択肢 */}
            {selectedOption === null ? (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-[#6B7280] block">あなたならどう返答する？</span>
                {selectedScenario.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className="w-full text-left p-4 rounded-2xl border border-[#EFECE6] hover:border-emerald-600 hover:bg-[#E8F5E9]/30 transition-all text-sm text-[#374151] font-medium leading-relaxed group flex items-start gap-3"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F3F4F6] text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center text-xs font-bold transition-all">
                      {idx + 1}
                    </span>
                    <span>{opt.text}</span>
                  </button>
                ))}
              </div>
            ) : (
              /* 返答後のフィードバック結果 */
              <div className="space-y-6 pt-2">
                {/* 自分が選んだ返答 */}
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-4 space-y-1">
                  <span className="text-xs font-bold text-emerald-700">あなたの返答：</span>
                  <p className="text-sm text-[#374151] font-medium">
                    {selectedScenario.options[selectedOption].text}
                  </p>
                </div>

                {/* 相手の反応 */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#6B7280]">相手の反応（AI）：</span>
                  <div className="bg-[#FAFAF8] border border-[#EFECE6] rounded-2xl p-4 text-sm text-[#374151] font-medium">
                    {selectedScenario.options[selectedOption].aiReply}
                  </div>
                </div>

                {/* カウンセラーの解説・フィードバック */}
                <div className={`p-5 rounded-2xl border space-y-2 ${
                  selectedScenario.options[selectedOption].isGood 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                    : 'bg-amber-50/60 border-amber-200 text-amber-900'
                }`}>
                  <span className="text-xs font-bold uppercase tracking-wider block">
                    {selectedScenario.options[selectedOption].isGood ? '✨ 素晴らしいアプローチ！' : '💡 ここを少し工夫するヒント'}
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed font-medium">
                    {selectedScenario.options[selectedOption].feedback}
                  </p>
                </div>

                {/* もう一度挑戦ボタン */}
                <div className="pt-2">
                  <button
                    onClick={() => setSelectedOption(null)}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 !text-white text-center rounded-xl font-medium text-sm transition-all shadow-xs"
                  >
                    別の返答を試してみる
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 導線エリア */}
        <div className="pt-2 space-y-3">
          <Link
            href="/kokosure"
            className="block w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 !text-white text-center rounded-xl font-medium text-sm transition-all shadow-xs"
          >
            🧭 「ここすれ」で心の傾向もチェックしてみる
          </Link>
          <Link
            href="/kokoniwa"
            className="block w-full py-3.5 bg-white border border-emerald-600 text-emerald-700 hover:bg-[#E8F5E9]/50 text-center rounded-xl font-medium text-sm transition-all"
          >
            🌿 「ここにわ」でお庭を眺めて一息つく
          </Link>
        </div>

      </div>
    </main>
  );
}