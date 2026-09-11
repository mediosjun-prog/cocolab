// app/iko/IkoContent.tsx
'use client';

import { useState } from 'react';
import IkoSetup from './IkoSetup';
import IkoChat from './IkoChat';
import IkoHistory from './IkoHistory';

export default function IkoContent() {
  const [viewMode, setViewMode] = useState<'setup' | 'chat' | 'history'>('setup');
  const [sessionConfig, setSessionConfig] = useState<any>(null);

  const handleStartSession = (config: any) => {
    setSessionConfig(config);
    setViewMode('chat');
  };

  const handleBackToSetup = () => {
    setViewMode('setup');
    setSessionConfig(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/30 py-8 px-4 sm:px-6">
      {/* 画面上部の共通ナビゲーション切り替えボタン */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-end gap-2">
        {viewMode !== 'history' && (
          <button
            onClick={() => setViewMode('history')}
            className="px-4 py-2 bg-white/85 hover:bg-white text-emerald-700 text-xs font-bold rounded-2xl border border-emerald-200 shadow-xs transition-all cursor-pointer"
          >
            📊 過去の履歴・軌跡を見る
          </button>
        )}
      </div>

      {viewMode === 'setup' && <IkoSetup onStartSession={handleStartSession} />}
      {viewMode === 'chat' && <IkoChat config={sessionConfig} onBackToSetup={handleBackToSetup} />}
      {viewMode === 'history' && (
        <IkoHistory
          onBackToSetup={handleBackToSetup}
          onStartNew={() => setViewMode('setup')}
        />
      )}
    </main>
  );
}