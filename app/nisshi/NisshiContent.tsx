// app/nisshi/NisshiContent.tsx
'use client';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import HeartCircleScore from './HeartCircleScore';

interface NisshiContentProps {
  weather: string;
  setWeather: (val: string) => void;
  color: string;
  setColor: (val: string) => void;
  animal: string;
  setAnimal: (val: string) => void;
  character: string;
  setCharacter: (val: string) => void;
  note: string;
  setNote: (val: string) => void;
  loading: boolean;
  aiResponse: string | null;
  scoreData?: { percentage: number; message: string } | null;
  onSubmit: (e: React.FormEvent) => void;
}

// キャラクターの名前マッピング（タイトル表示用）
const counselorNames: Record<string, string> = {
  counselor1: '癒し系カウンセラー',
  counselor2: 'ほのぼのカウンセラー',
};

export default function NisshiContent({
  weather,
  setWeather,
  color,
  setColor,
  animal,
  setAnimal,
  character,
  setCharacter,
  note,
  setNote,
  loading,
  aiResponse,
  scoreData,
  onSubmit,
}: NisshiContentProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <section className="text-center space-y-4 pt-4 mb-10">
        <div>
          <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
            DIAYR
          </span>
        </div>
        <PageHeader title="ここにっし" />
        <p className="text-sm text-gray-600">
          今日の天気、心の色、動物、そして今の気分を選んで、あなただけの心の日記をつけましょう。
        </p>
      </section>

      <form onSubmit={onSubmit} className="space-y-8">
        {/* 話し相手のキャラクター選択（ボーダーなし・透過ベース） */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ☘️ 話し相手のキャラクター
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'counselor1', name: '癒し系カウンセラー', img: '/images/nisshi/conse1.png' },
              { id: 'counselor2', name: 'ほのぼのカウンセラー', img: '/images/nisshi/conse2.png' },
            ].map((char) => (
              <button
                key={char.id}
                type="button"
                onClick={() => setCharacter(char.id)}
                className={`p-4 rounded-2xl text-left transition-all flex items-center gap-3 ${
                  character === char.id
                    ? 'bg-emerald-100/70 shadow-sm ring-2 ring-emerald-400/50'
                    : 'bg-white/40 hover:bg-white/70'
                }`}
              >
                <div className="w-12 h-12 relative rounded-full overflow-hidden bg-gray-100/50 shrink-0">
                  <Image src={char.img} alt={char.name} fill className="object-cover" />
                </div>
                <div>
                  <span className="block text-sm font-bold text-gray-800">{char.name}</span>
                  <span className="block text-xs text-gray-500">お話を聞きます</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 今日のあなたのお天気 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ☘️ 今日のあなたのお天気
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'sunny', label: '晴れ', img: '/images/nisshi/weather-sunny.png' },
              { id: 'cloudy', label: 'くもり', img: '/images/nisshi/weather-cloudy.png' },
              { id: 'rainy', label: '雨', img: '/images/nisshi/weather-rainy.png' },
              { id: 'snowy', label: '雪', img: '/images/nisshi/weather-snowy.png' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setWeather(item.id)}
                className={`p-3 rounded-2xl text-center transition-all flex flex-col items-center gap-2 ${
                  weather === item.id
                    ? 'bg-emerald-100/70 shadow-sm ring-2 ring-emerald-400/50'
                    : 'bg-white/40 hover:bg-white/70'
                }`}
              >
                <div className="w-10 h-10 relative">
                  <Image src={item.img} alt={item.label} fill className="object-contain" />
                </div>
                <span className="text-xs font-semibold text-gray-700">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 今日のあなたの心の色 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ☘️ 今のあなたの心の色
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'blue', label: '青（落ち着き）', bgClass: 'bg-blue-400' },
              { id: 'green', label: '緑（リラックス）', bgClass: 'bg-emerald-400' },
              { id: 'yellow', label: '黄（明るい）', bgClass: 'bg-amber-300' },
              { id: 'pink', label: 'ピンク（あたたか）', bgClass: 'bg-rose-300' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setColor(item.id)}
                className={`p-3 rounded-2xl text-center transition-all flex flex-col items-center gap-2 ${
                  color === item.id
                    ? 'bg-emerald-100/70 shadow-sm ring-2 ring-emerald-400/50'
                    : 'bg-white/40 hover:bg-white/70'
                }`}
              >
                <div className={`w-8 h-8 rounded-full ${item.bgClass} shadow-inner`} />
                <span className="text-xs font-semibold text-gray-700">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 今日のあなたの気分を動物に例えると */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ☘️ 今のあなたの気分を動物に例えると
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { id: 'cat', label: '猫（マイペース）', img: '/images/nisshi/animal-cat.png' },
              { id: 'dog', label: '犬（元気・忠実）', img: '/images/nisshi/animal-dog.png' },
              { id: 'rabbit', label: 'うさぎ（敏感）', img: '/images/nisshi/animal-rabbit.png' },
              { id: 'bear', label: 'くま（まったり）', img: '/images/nisshi/animal-bear.png' },
              { id: 'hedgehog', label: 'ハリネズミ（警戒・お疲れ）', img: '/images/nisshi/animal-hedgehog.png' },
              { id: 'sheep', label: 'ヒツジ（気力がでない）', img: '/images/nisshi/animal-sheep.png' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setAnimal(item.id)}
                className={`p-3 rounded-2xl text-center transition-all flex flex-col items-center gap-2 ${
                  animal === item.id
                    ? 'bg-emerald-100/70 shadow-sm ring-2 ring-emerald-400/50'
                    : 'bg-white/40 hover:bg-white/70'
                }`}
              >
                <div className="w-10 h-10 relative">
                  <Image src={item.img} alt={item.label} fill className="object-contain" />
                </div>
                <span className="text-xs font-semibold text-gray-700">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ☘️ 今日のひとことメモ（任意）
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="今日あったことや、感じたことを自由に書いてみてください..."
            rows={3}
            className="w-full rounded-xl bg-white/40 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 border-none shadow-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 !text-white font-medium rounded-xl shadow-md transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'AIがメッセージを考えています...' : 'きょうの日誌を記録してAIに相談する'}
        </button>

{/* 🔒 プライバシーに関する安心メッセージ（特記事項） */}
        <div className="p-4 bg-white/40 rounded-2xl border border-emerald-100/60 text-xs text-gray-500 space-y-1">
          <p className="font-semibold text-gray-600 flex items-center gap-1">
            <span>🔒</span> プライバシーについて
          </p>
          <p className="leading-relaxed">
            ここにっしに書いた内容は、お使いの端末（ブラウザ）の中にだけ保存されます。外部に公開されることは一切ありませんので、安心して本音をつづってくださいね。（※別の端末や機種からは閲覧できません）
          </p>
        </div>
      </form>

      {aiResponse && (
        <div className="mt-8 space-y-6">
          {/* 動的なサークルスコアの表示 */}
          {scoreData && (
            <HeartCircleScore 
              percentage={scoreData.percentage} 
              message={scoreData.message} 
              animal={animal} 
            />
          )}

          {/* AIからのメッセージカード */}
          <div className="p-6 bg-emerald-50/60 rounded-2xl border border-emerald-100 shadow-sm space-y-2">
            <h3 className="text-sm font-bold text-amber-900 mb-1 flex items-center gap-1.5">
              💬 {counselorNames[character] || 'カウンセラー'}からのメッセージ
            </h3>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{aiResponse}</p>
          </div>
        </div>
      )}
    </div>
  );
}