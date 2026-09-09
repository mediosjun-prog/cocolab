'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

// AIメンバーの定義（ちょっと手強い現実派キャラ「クロ」を追加）
const AI_MEMBERS = [
  { id: 'supporter', name: '寄り添いサポーター「みお」', role: '全肯定・受容特化', desc: 'どんな感情もそのまま受け止め、深く共感してくれます。' },
  { id: 'logical', name: 'おだやかカウンセラー「ソラ」', role: '客観的・整理特化', desc: '感情の波を優しく整理し、別の視点をそっと提示してくれます。' },
  { id: 'cheerful', name: 'おっとり和み役「るー」', role: 'ユーモア・緊張緩和', desc: '重くなりがちな空気をフッと和ませて、安心感を与えてくれます。' },
  { id: 'realistic', name: '現実派の意見番「クロ」', role: '少し辛口・慎重型', desc: 'あえて反対意見やリスクを指摘してきます。実際の人間関係に向けた免疫づくりの練習に。' },
];

const SITUATIONS = [
  '職場の休憩時間・雑談の練習',
  '意見が食い違ったときの話し合い',
  '自分の気持ちを素直に伝える練習',
  'ただ静かに今日一日を労ってもらう',
  '自由にフリートーク（フリーテーマ）',
];

export default function KokoRoomContent() {
  const router = useRouter();
  const [selectedSituation, setSelectedSituation] = useState(SITUATIONS[0]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>(['supporter', 'logical']);
  const [userNickname, setUserNickname] = useState('あなた');
  const [isLoading, setIsLoading] = useState(false);

  const toggleMember = (id: string) => {
    if (selectedMembers.includes(id)) {
      if (selectedMembers.length <= 1) return; // 最低1人は残す
      setSelectedMembers(selectedMembers.filter(m => m !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  const handleStartRoom = () => {
    setIsLoading(true);
    const query = new URLSearchParams({
      situation: selectedSituation,
      members: selectedMembers.join(','),
      nickname: userNickname,
    });
    router.push(`/kokoroom/chat?${query.toString()}`);
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#2C2C2C] px-4 py-8">
      <div className="max-w-4xl mx-auto">

        {/* ヘッダーセクション */}
        <section className="text-center space-y-3 pt-4">
          <div>
            <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
              KOKOROOM
            </span>
          </div>
          <PageHeader title="ここるーむ" />
          <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            ここは、他人の目を気にせず、傷つかずに人間関係の練習や心の休息ができる安心のバーチャル空間です。
            <br className="hidden sm:inline" />
            あなたに合わせたメンバーとシチュエーションを設定して、対話を始めましょう。
          </p>
        </section>


        {/* ステップ1：あなたの呼び名 */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#EFECE6] mb-6">
          <h2 className="text-sm font-semibold text-[#374151] mb-2 uppercase tracking-wider">
            Step 1. あなたの呼び名（ニックネーム）
          </h2>
          <input
            type="text"
            value={userNickname}
            onChange={(e) => setUserNickname(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#9CA3AF] text-sm bg-[#FAFAF8]"
            placeholder="例：匿名さん、ユウ など"
          />
        </div>

        {/* ステップ2：シチュエーション選択 */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#EFECE6] mb-6">
          <h2 className="text-sm font-semibold text-[#374151] mb-3 uppercase tracking-wider">
            Step 2. 話してみたいシチュエーション・テーマ
          </h2>
          <div className="space-y-2.5">
            {SITUATIONS.map((sit) => (
              <label
                key={sit}
                className={`flex items-center p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedSituation === sit
                    ? 'border-[#4B5563] bg-[#F3F4F6] font-medium text-[#111827]'
                    : 'border-[#E5E7EB] bg-white hover:bg-[#FAFAF8] text-[#374151]'
                }`}
              >
                <input
                  type="radio"
                  name="situation"
                  checked={selectedSituation === sit}
                  onChange={() => setSelectedSituation(sit)}
                  className="mr-3 text-[#4B5563] focus:ring-0"
                />
                <span className="text-sm">{sit}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ステップ3：AIメンバーの選択 */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#EFECE6] mb-8">
          <h2 className="text-sm font-semibold text-[#374151] mb-1 uppercase tracking-wider">
            Step 3. ルームに同席する仲間（AIメンバー）を選ぶ
          </h2>
          <p className="text-xs text-[#6B7280] mb-4">複数選ぶと、それぞれのタイプに応じた温かい会話が展開されます（少し手強いキャラを混ぜることもできます）。</p>
          <div className="space-y-3">
            {AI_MEMBERS.map((member) => {
              const isSelected = selectedMembers.includes(member.id);
              return (
                <div
                  key={member.id}
                  onClick={() => toggleMember(member.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'border-[#4B5563] bg-[#F9FAFB] shadow-xs'
                      : 'border-[#E5E7EB] bg-white opacity-70 hover:opacity-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className="mt-1 rounded text-[#4B5563] focus:ring-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1F2937]">{member.name}</span>
                      <span className="text-xs px-2 py-0.5 bg-[#E5E7EB] text-[#374151] rounded-md font-medium">
                        {member.role}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280] mt-1">{member.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ルーム入室ボタン */}
        <button
          onClick={handleStartRoom}
          disabled={isLoading || selectedMembers.length === 0}
          className="w-full py-4 bg-emerald-600 !text-white hover:bg-[#1F2937] font-medium rounded-2xl shadow-sm transition-all text-center flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <span>ルームを準備中...</span>
          ) : (
            <>
              <span>🌿</span>
              <span>ここるーむに入室する</span>
            </>
          )}
        </button>
      </div>
    </main>
  );
}