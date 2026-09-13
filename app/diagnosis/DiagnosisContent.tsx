'use client';

import { useState } from 'react';
import AttachmentArticles from '../../components/AttachmentArticles';
import PageHeader from '../../components/PageHeader';
import Link from 'next/link';
import Image from 'next/image';

interface Question {
  id: number;
  text: string;
  type: 'anxious' | 'avoidant';
  image?: string;
}

const QUESTIONS: Question[] = [
  // 不安型（anxious）の設問
  {
    id: 1,
    text: 'パートナーや親しい人が自分から離れていかないか不安になる',
    type: 'anxious',
    image: '/images/questions/q1.png',
  },
  {
    id: 2,
    text: '相手からの連絡が遅いと、嫌われたのではないかと焦る',
    type: 'anxious',
    image: '/images/questions/q2.png',
  },
  {
    id: 3,
    text: '自分の気持ちよりも相手の機嫌や顔色を優先してしまいがちだ',
    type: 'anxious',
    image: '/images/questions/q3.png',
  },
  {
    id: 4,
    text: '「本当に愛されているか」を何度も確かめたくなる',
    type: 'anxious',
    image: '/images/questions/q4.png',
  },
  {
    id: 5,
    text: '一人でいると強い孤独感や見捨てられ不安を感じる',
    type: 'anxious',
    image: '/images/questions/q5.png',
  },
  {
    id: 6,
    text: '相手のちょっとした言動の変化に過剰に反応してしまう',
    type: 'anxious',
    image: '/images/questions/q6.png',
  },

  // 回避型（avoidant）の設問
  {
    id: 7,
    text: '人に頼ったり、本音を話したりするのが苦手だ',
    type: 'avoidant',
    image: '/images/questions/q7.png',
  },
  {
    id: 8,
    text: '他人に深く踏み込まれると、鬱陶しいと感じて距離を置きたくなる',
    type: 'avoidant',
    image: '/images/questions/q8.png',
  },
  {
    id: 9,
    text: '自分の悩みや感情は自分一人で解決すべきだと思う',
    type: 'avoidant',
    image: '/images/questions/q9.png',
  },
  {
    id: 10,
    text: '親密な関係になると、束縛されているように感じて逃げたくなる',
    type: 'avoidant',
    image: '/images/questions/q10.png',
  },
  {
    id: 11,
    text: '他人に過度な期待をしないように感情を抑えることが多い',
    type: 'avoidant',
    image: '/images/questions/q11.png',
  },
  {
    id: 12,
    text: 'トラブルが起きたときは感情的にならず自立して対処したい',
    type: 'avoidant',
    image: '/images/questions/q12.png',
  },
];

export default function DiagnosisContent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [anxiousScore, setAnxiousScore] = useState(0);
  const [avoidantScore, setAvoidantScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (isYes: boolean) => {
    const currentQ = QUESTIONS[currentStep];

    if (isYes) {
      if (currentQ.type === 'anxious') {
        setAnxiousScore((prev) => prev + 1);
      }

      if (currentQ.type === 'avoidant') {
        setAvoidantScore((prev) => prev + 1);
      }
    }

    const nextStep = currentStep + 1;

    if (nextStep < QUESTIONS.length) {
      setCurrentStep(nextStep);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnxiousScore(0);
    setAvoidantScore(0);
    setIsCompleted(false);
  };

  const getResultData = () => {
    const anxiousPercent = Math.round((anxiousScore / 6) * 100);
    const avoidantPercent = Math.round((avoidantScore / 6) * 100);

    const securePercent = Math.max(
      0,
      100 - Math.round(((anxiousScore + avoidantScore) / 12) * 100)
    );

    const isHighAnxious = anxiousScore >= 3;
    const isHighAvoidant = avoidantScore >= 3;

    if (isHighAnxious && isHighAvoidant) {
      return {
        typeKey: 'fearful',
        englishTitle: 'Fearful / Disorganized',
        title: '恐れ回避型',
        imageUrl: '/images/pp4.png',
        imageAlt: '恐れ回避型のイメージ画像',
        description:
          'あなたは「愛されたい」という気持ちと「傷つくのが怖い」という気持ちが共存している複雑なタイプです。親密になりたいのに、なるほど怖くなって距離を置いてしまう……そんな矛盾した行動を取ることがあります。過去の傷つきや不安定な愛着体験が影響していることが多いです。',
        scores: [
          {
            label: '安定型',
            value: securePercent,
            color: 'bg-emerald-500',
          },
          {
            label: '不安型',
            value: anxiousPercent,
            color: 'bg-orange-500',
          },
          {
            label: '回避型',
            value: avoidantPercent,
            color: 'bg-indigo-600',
          },
          {
            label: '恐れ回避型',
            value: Math.round(
              (anxiousPercent + avoidantPercent) / 2
            ),
            color: 'bg-purple-600',
          },
        ],
        strengths: '深い共感力・繊細さ・感受性の豊かさ',
        hint:
          '安全な環境で少しずつ信頼の経験を積み重ねることが、傷の癒やしに繋がります。',
        message:
          '自分を責めないでください。このパターンは変えられます。信頼できる人や専門家との対話が助けになることも。',
        bookTitle: '恐れ回避型のための電子書籍',
      };
    }

    if (isHighAnxious) {
      return {
        typeKey: 'anxious',
        englishTitle: 'Anxious / Preoccupied',
        title: '不安型（とらわれ型）',
        imageUrl: '/images/pp3.png',
        imageAlt: '不安型のイメージ画像',
        description:
          '相手の顔色や感情の変化にとても敏感で、「見捨てられるのではないか」「本当に愛されているか」という不安を感じやすいタイプです。過度に相手に合わせたり連絡を確認したくなったりします。',
        scores: [
          {
            label: '安定型',
            value: securePercent,
            color: 'bg-emerald-500',
          },
          {
            label: '不安型',
            value: anxiousPercent,
            color: 'bg-orange-500',
          },
          {
            label: '回避型',
            value: avoidantPercent,
            color: 'bg-indigo-600',
          },
          {
            label: '恐れ回避型',
            value: 15,
            color: 'bg-purple-600',
          },
        ],
        strengths:
          '愛情深さ・高い察知能力・相手を思いやる気持ち',
        hint:
          '一人でいる時間も自分の価値を感じられるように、趣味や自分磨きの時間を大切にしましょう。',
        message:
          '不安になる気持ちを受け入れつつ、相手に委ねすぎず自分軸を育んでいきましょう。',
        bookTitle: '不安型のための電子書籍',
      };
    }

    if (isHighAvoidant) {
      return {
        typeKey: 'avoidant',
        englishTitle: 'Dismissing / Avoidant',
        title: '回避型（軽視型）',
        imageUrl: '/images/pp2.png',
        imageAlt: '回避型のイメージ画像',
        description:
          '他者と深く関わることや頼ることを避け、自分の力で独立して生きていくことを好むタイプです。感情をオープンにすることや親密さを求められると負担を感じて距離を置く傾向があります。',
        scores: [
          {
            label: '安定型',
            value: securePercent,
            color: 'bg-emerald-500',
          },
          {
            label: '不安型',
            value: anxiousPercent,
            color: 'bg-orange-500',
          },
          {
            label: '回避型',
            value: avoidantPercent,
            color: 'bg-indigo-600',
          },
          {
            label: '恐れ回避型',
            value: 15,
            color: 'bg-purple-600',
          },
        ],
        strengths:
          '高い自立心・冷静な判断力・境界線を守る力',
        hint:
          '少しずつで良いので、信頼できる人に小さな頼み事や自分の感情を伝える練習をしてみましょう。',
        message:
          '自立しているのは素晴らしい強みですが、誰かに甘えることも自分を楽にする選択肢です。',
        bookTitle: '回避型のための電子書籍',
      };
    }

    return {
      typeKey: 'secure',
      englishTitle: 'Secure',
      title: '安定型',
      imageUrl: '/images/pp1.png',
      imageAlt: '安定型のイメージ画像',
      description:
        '自分も他者も肯定的に捉えられ、安心した人間関係を築くのが得意なタイプです。見捨てられる不安も他者への拒絶感も少なく、適度な距離感で信頼関係を築けます。',
      scores: [
        {
          label: '安定型',
          value: securePercent,
          color: 'bg-emerald-500',
        },
        {
          label: '不安型',
          value: anxiousPercent,
          color: 'bg-orange-500',
        },
        {
          label: '回避型',
          value: avoidantPercent,
          color: 'bg-indigo-600',
        },
        {
          label: '恐れ回避型',
          value: 5,
          color: 'bg-purple-600',
        },
      ],
      strengths:
        'バランス感覚・高いコミュニケーション能力・安心感を与える力',
      hint:
        'これからもお互いを尊重しあえる関係性を大切に育てていきましょう。',
      message:
        '素晴らしい安定感を持っています。その安心感を大切な人にも分けてあげてください。',
      bookTitle:
        '愛着障害と関係性に関する電子書籍',
    };
  };

  const result = getResultData();
  const currentQ = QUESTIONS[currentStep];

  return (
    <main className="w-full p-4 md:p-8 bg-slate-50/50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* ページタイトル・ヘッダー部分 */}
        <section className="text-center space-y-4 pt-4 mb-6">
          <div>
            <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
              DIAGNOSIS
            </span>
          </div>
          <PageHeader title="愛着スタイル診断" />
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            12の質問に答えて、あなたの愛着スタイル（対人関係のパターン）を確認してみましょう。
          </p>
        </section>

        {/* 診断カード本体 */}
        <div className="bg-[#fdfaf3] p-8 rounded-3xl shadow-sm text-gray-800 font-sans border border-gray-100">
          {!isCompleted ? (
            <div className="text-left py-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 w-full">
                  <span className="inline-block px-3 py-1 bg-[#D0F9C7] text-[#446246] font-bold text-xs rounded-full">
                    質問 {currentStep + 1} / {QUESTIONS.length}
                  </span>

                  {currentQ.image && (
                    <div className="w-full flex justify-center items-center my-6 md:hidden">
                      <div className="relative w-48 h-48">
                        <Image
                          src={currentQ.image}
                          alt={`質問 ${currentStep + 1} のイラスト`}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>
                  )}

                  <h2 className="text-xl font-bold text-gray-800 mb-8 min-h-[60px] flex items-center leading-snug">
                    {currentQ.text}
                  </h2>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleAnswer(true)}
                      className="flex-1 md:w-36 md:flex-none py-3 bg-[#5d8860] text-white font-bold rounded-xl hover:bg-[#93c296] transition"
                    >
                      はい
                    </button>

                    <button
                      onClick={() => handleAnswer(false)}
                      className="flex-1 md:w-36 md:flex-none py-3 bg-[#cf9746] text-white font-bold rounded-xl hover:bg-[#f1c88d] transition"
                    >
                      いいえ
                    </button>
                  </div>
                </div>

                {currentQ.image && (
                  <div className="hidden md:flex w-full md:w-48 lg:w-52 flex-shrink-0 justify-center items-center">
                    <div className="relative w-40 h-40 md:w-48 md:h-48">
                      <Image
                        src={currentQ.image}
                        alt={`質問 ${currentStep + 1} のイラスト`}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-8 text-left">
              <div>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 font-medium text-xs rounded-full mb-3">
                  {result.englishTitle}
                </span>

                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {result.title}
                </h2>
              </div>

              <div className="w-full h-72 md:h-96 overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={result.imageUrl}
                  alt={result.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {result.description}
              </p>

              <hr className="border-gray-100" />

              <div>
                <p className="text-xs font-semibold text-gray-400 mb-4 tracking-wider uppercase">
                  スコア分布
                </p>

                <div className="space-y-3">
                  {result.scores.map((score, i) => (
                    <div key={i} className="flex items-center text-xs">
                      <span className="w-20 font-medium text-gray-600">
                        {score.label}
                      </span>

                      <div className="flex-1 bg-cyan-50 h-2 rounded-full overflow-hidden mx-3">
                        <div
                          className={`h-full ${score.color} rounded-full transition-all duration-500`}
                          style={{ width: `${score.value}%` }}
                        />
                      </div>

                      <span className="w-8 text-right font-semibold text-gray-400">
                        {score.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100" />

              <div>
                <p className="text-xs font-semibold text-gray-400 mb-2 tracking-wider uppercase">
                  強み
                </p>

                <p className="text-sm font-bold text-gray-800">
                  {result.strengths}
                </p>
              </div>

              <hr className="border-gray-100" />

              <div>
                <p className="text-xs font-semibold text-gray-400 mb-2 tracking-wider uppercase">
                  成長のヒント
                </p>

                <p className="text-sm font-bold text-gray-800 leading-relaxed">
                  {result.hint}
                </p>
              </div>

              <hr className="border-gray-100" />

              <div>
                <p className="text-xs font-semibold text-gray-400 mb-2 tracking-wider uppercase">
                  あなたへのメッセージ
                </p>

                <p className="text-sm font-bold text-gray-800 leading-relaxed">
                  {result.message}
                </p>
              </div>

              <hr className="border-[#C4783E]/40" />

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-white border border-gray-300 text-gray-600 font-medium text-xs rounded-xl hover:bg-gray-50 transition"
                >
                  もう一度診断する
                </button>
              </div>

              <div className="p-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 rounded-2xl border border-indigo-100/80 text-left">
                <span className="text-xs font-bold text-[#5d8860] tracking-wider uppercase">
                  AI Recovery Session
                </span>

                <h3 className="text-lg font-bold text-gray-900 mt-1 mb-2">
                  【{result.title}専用】AIカウンセラーと対話トレーニング
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  あなたのタイプに寄り添うAIカウンセラーと、チャットや音声で安全に本音を話す練習ができます。
                </p>

                <Link
                  href={`/diagnosis/chat?type=${result.typeKey}`}
                  className="inline-flex items-center justify-center w-full py-3 bg-[#5d8860] text-white font-bold text-sm rounded-xl hover:bg-[#446246] transition shadow-sm gap-2 !text-white transition-colors"
                >
                  <span>
                    💬 AIカウンセラーと話してみる（音声対応）
                  </span>
                  <span>→</span>
                </Link>
              </div>

              <hr className="border-[#C4783E]/40" />

              <div>
                <p className="text-xs font-semibold text-gray-400 mb-3 tracking-wider uppercase">
                  おすすめ電子書籍
                </p>

                <a
                  href="https://www.amazon.co.jp/%E5%9B%9E%E9%81%BF%E6%80%A7%E6%84%9B%E7%9D%80%E9%9A%9C%E5%AE%B3%EF%BD%9E%E7%B5%86%E3%81%8C%E7%A8%80%E8%96%84%E3%81%AA%E4%BA%BA%E3%81%9F%E3%81%A1%EF%BD%9E-%E5%85%89%E6%96%87%E7%A4%BE%E6%96%B0%E6%9B%B8-%E5%B2%A1%E7%94%B0-%E5%B0%8A%E5%8F%B8-ebook/dp/B00HK6ZSL8/ref=tmm_kin_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.jLd_N9GIf4EPiUSgE4qtac0fo9iahl15DDafEC4upOgx6Fc8WZEiTwKw19GW73WdjAeV2eS2F2i7uVxx0UbYW9IEx53MwyZCT-iHeCCAgOZ7HBSHcKW8MbwLVeGqcxTIjHcxWbWjl3ZXzp1j9VhaRLWoyLNrMYscCQK049YpcrU.6WRDt2nV1IIpGrepIAJlgRkimRQVrCtPzSh0vt8U4hE&qid=1788606843&sr=8-1" target='_blank'
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200/60 transition group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📖</span>

                    <span className="text-sm font-bold text-indigo-900">
                      {result.bookTitle}
                    </span>
                  </div>

                  <span className="text-teal-500 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              </div>

              <div className="pt-8 border-t border-[#C4783E]/40 mt-12">
                <AttachmentArticles />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}