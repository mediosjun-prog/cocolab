'use client';

import React, { useState } from 'react';
import KokotalkSetup from './kokotalkSetup';
import KokotalkChat from './kokotalkChat';
import PageHeader from '@/components/PageHeader';

// 設定データの型定義
export interface KokotalkConfig {
  gender: string;
  age: string;
  occupation: string;
  personality: string;
  styles: string[]; // チェックボックスの選択肢（複数）
  avatar: string;
  voiceId: number; // VOICEVOXの音声ID
}

export default function KokotalkContent() {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [config, setConfig] = useState<KokotalkConfig>({
    gender: '女性',
    age: '20代',
    occupation: 'カウンセラー',
    personality: 'お姉さん・お兄さん系',
    styles: ['相手の話を遮らず、適度に相槌を打つ', '相手に寄り添い、共感を示す'],
    avatar: '/images/avatar_default_f.png', // サンプルパス
    voiceId: 1, // VOICEVOXのデフォルトID例
  });

  const handleStart = (selectedConfig: KokotalkConfig) => {
    setConfig(selectedConfig);
    setIsStarted(true);
  };

  const handleBackToSetup = () => {
    setIsStarted(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <section className="text-center space-y-3 pt-4">
          <div>
            <span className="inline-block bg-[#D0F9C7] text-[#446246] text-xs font-semibold px-3 py-1 rounded-full">
              AI TALK
            </span>
          </div>
          <PageHeader title="こことーく" />
          <p className="text-sm text-slate-600">
            色んなタイプのAIと気軽におしゃべりしてね
          </p>
        </section>
        {!isStarted ? (
          <KokotalkSetup initialConfig={config} onStart={handleStart} />
        ) : (
          <KokotalkChat config={config} onBack={handleBackToSetup} />
        )}
      </div>
    </main>
  );
}