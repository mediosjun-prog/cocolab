'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';

// 4つの選択肢（絵のデータ）
const kokoArtOptions = [
  {
    id: 'a',
    title: 'お互いの距離を大切にしながら、温かく寄り添う木々',
    description: '程よい距離感を保ちながらも、根っこでしっかりとつながり、心地よい空間を作っている姿。',
    imageSrc: '/images/kokoart/option-a.png', 
    theme: '安心と調和（安定のイメージ）',
    message: 'この絵に惹かれるあなたは、心のどこかで「お互いを尊重し合える、安心した関係」を何よりも大切にしたいと願っています。それは、あなたがこれまで培ってきた、あるいはこれから育んでいきたい「穏やかな結びつき」の形です。',
    advice: '今のままで大丈夫。あなたの中には、すこやかな安心感を育む力が備わっています。日々の小さな心地よさを大切にしていきましょう。'
  },
  {
    id: 'b',
    title: 'お互いに引かれ合い、そっと触れ合おうとする光の粒',
    description: '離れていた時間から、あたたかな光に向かってそっと引き寄せられ、結びつきを求めている姿。',
    imageSrc: '/images/kokoart/option-b.png',
    theme: 'つながりへの願い（不安・密着のイメージ）',
    message: 'この絵を選んだあなたは、心の奥底で「誰かと深くつながりたい」「もっと大切にされたい」という純粋で温かい願いを持っています。同時に、「いなくなってしまうかもしれない」という切なさを抱えてきたかもしれません。',
    advice: 'その「大切に想う気持ち」はとてもピュアで、あなたの優しさの証です。まずは何よりも、頑張ってきたご自身の心を、あなた自身が優しく抱きしめてあげてくださいね。'
  },
  {
    id: 'c',
    title: 'やわらかな毛布に包まれた、自分だけの安心な空間',
    description: 'そっと外側に向きを変え、自分のペースと心地よい境界線を守っている貝殻や空間。',
    imageSrc: '/images/kokoart/option-c.png',
    theme: '自分のペースを守る（回避・境界線のイメージ）',
    message: 'この絵を選んだあなたは、「これ以上傷つかないように、自分の心を守りたい」「自分のペースを大切にしたい」という、とても健気で賢い知恵を持っています。距離を取ることで、ご自身の心を守ってきたのですね。',
    advice: '人に頼るのが少し苦手でも、無理をしなくて大丈夫です。安全だと感じられる小さな居場所を、少しずつご自身のペースで増やしていきましょう。'
  },
  {
    id: 'd',
    title: 'やわらかなパステルカラーが優しく重なり合う水彩のグラデーション',
    description: '近づきたい気持ちと怖さが、美しい色彩の中で複雑に、でも温かく溶け合っている姿。',
    imageSrc: '/images/kokoart/option-d.png',
    theme: '繊細な揺らぎと葛藤（混乱・模索のイメージ）',
    message: 'この絵を選んだあなたは、人と深く関わりたい気持ちと、近づきすぎて傷つけることへの怖さが、同時に胸の中で揺れ動いているかもしれません。その複雑で繊細な感情のグラデーションこそが、あなたの豊かな感受性の表れです。',
    advice: '揺れ動くご自身の心を「どちらかに決めなきゃ」と責めなくて大丈夫です。「どちらの気持ちも自分の中にあるんだな」と、ただ優しく見つめてあげることから始めてみてください。'
  },
];

export default function KokoArtContent() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedOption = kokoArtOptions.find((opt) => opt.id === selectedId);

  return (
    <div className="space-y-12">
      {/* ヘッダー部分 */}
      <section className="text-center space-y-4 backdrop-blur-sm p-8">
        <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
          ART
        </span>
        <PageHeader title="ここあーと" />
        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          過去の思い出や、あなたが心の中で求めている「親子関係・人との距離感」に一番近いものはどれでしょうか。<br className="hidden sm:inline" />
          直感で、今のあなたの心にしっくりくるものを1つ選んでみてください。
        </p>
      </section>

      {/* 4枚の絵の選択肢グリッド */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {kokoArtOptions.map((option) => {
          const isSelected = selectedOption?.id === option.id;
          return (
            <div
              key={option.id}
              onClick={() => setSelectedId(option.id)}
              className={`cursor-pointer bg-white rounded-3xl p-6 transition-all duration-300 border-2 flex flex-col justify-between ${
                isSelected 
                  ? 'border-[#52796F] shadow-md bg-[#F2F7F5]' 
                  : 'border-[#E3EDE8] hover:border-[#84A98C] shadow-sm hover:shadow'
              }`}
            >
              <div>
{/* イラスト表示部分 */}
<div className="relative w-full h-48 mb-4 rounded-2xl overflow-hidden bg-[#EAEFEA] flex items-center justify-center border border-[#D8E6E1]">
  {/* もしプレビュー用のテキストを残したい場合はそのままでOKですが、画像が重なるため削除するか調整してください */}
  <Image 
    src={option.imageSrc} // 💡 ここを option.imageSrc に変更する
    alt={option.title} 
    fill 
    sizes="(max-width: 768px) 100vw, 50vw" 
    className="object-cover"
  />
</div>

                <span className="text-xs font-semibold text-[#52796F] uppercase tracking-wider">
                  Image {option.id.toUpperCase()}
                </span>
                <h2 className="text-lg font-bold text-[#2C4A43] mt-1 mb-2">
                  {option.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#5B7068] leading-relaxed">
                  {option.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAEFEA] flex items-center justify-between">
                <span className="text-xs font-medium text-[#3B6E62]">
                  {isSelected ? '選択中 ✓' : 'この絵を選んでみる'}
                </span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-emerald-600 text-white' : 'bg-[#E3EDE8] text-[#52796F]'
                }`}>
                  →
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 選択された場合の深層心理・解説セクション */}
      {selectedOption && (
        <section className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#84A98C] shadow-lg space-y-6 transition-all animate-fadeIn">
          <div className="border-b border-[#EAEFEA] pb-4">
            <span className="text-xs font-semibold text-[#3B6E62] bg-[#E3EDE8] px-3 py-1 rounded-full">
              選んだイメージの深層心理
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#2C4A43] mt-2">
              「{selectedOption.theme}」
            </h3>
          </div>

          <div className="space-y-4 text-[#3A504B] text-sm sm:text-base leading-relaxed">
            <p className="bg-[#F7F9F8] p-6 rounded-2xl border border-[#E3EDE8]">
              {selectedOption.message}
            </p>
            <div>
              <h4 className="font-bold text-[#2C4A43] mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#52796F]"></span>
                ここらぼからの小さな処方箋
              </h4>
              <p className="text-[#52796F] leading-relaxed">
                {selectedOption.advice}
              </p>
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 !text-white text-sm font-medium rounded-full transition-colors shadow-sm"
            >
              もう一度ほかの絵を見てみる
            </button>
          </div>
        </section>
      )}
    </div>
  );
}