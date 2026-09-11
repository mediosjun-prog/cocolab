// app/nisshi/NisshiPageContent.tsx
'use client';

import { useState, useEffect } from 'react';
import NisshiContent from './NisshiContent';
import NisshiHistory from './NisshiHistory';
import { getNisshiRecords, saveNisshiRecord, NisshiRecord } from './nisshiStorage';

export default function NisshiPageContent() {
  const [tab, setTab] = useState<'create' | 'history'>('create');
  const [weather, setWeather] = useState('sunny');
  const [color, setColor] = useState('green');
  const [animal, setAnimal] = useState('cat');
  const [character, setCharacter] = useState('counselor1');
  const [note, setNote] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [scoreData, setScoreData] = useState<{ percentage: number; message: string } | null>(null);
  
  const [records, setRecords] = useState<NisshiRecord[]>([]);

  useEffect(() => {
    setRecords(getNisshiRecords());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAiResponse(null);
    setScoreData(null);

    try {
      const res = await fetch('/api/nisshi/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ character, weather, color, animal, note }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'エラーが発生しました');
      }

      setAiResponse(data.message);

      // 日誌を保存し、自動計算された scoreData を受け取る
      const newRecord = saveNisshiRecord({
        character,
        weather,
        color,
        animal,
        note,
        aiResponse: data.message,
      });

      setScoreData(newRecord.scoreData || null);
      setRecords(getNisshiRecords());
    } catch (error: any) {
      console.error(error);
      setAiResponse(`エラーが発生しました: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRecord = (record: NisshiRecord) => {
    setWeather(record.weather);
    setColor(record.color);
    setAnimal(record.animal);
    setCharacter(record.character);
    setNote(record.note);
    setAiResponse(record.aiResponse);
    setScoreData(record.scoreData || null);
    setTab('create');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/30 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* タブ切り替えボタン */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setTab('create')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-xs cursor-pointer ${
              tab === 'create'
                ? 'bg-emerald-600 text-white'
                : 'bg-white/60 text-gray-600 hover:bg-white'
            }`}
          >
            ✏️ 日記を書く
          </button>
          <button
            onClick={() => setTab('history')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-xs cursor-pointer ${
              tab === 'history'
                ? 'bg-emerald-600 text-white'
                : 'bg-white/60 text-gray-600 hover:bg-white'
            }`}
          >
            📖 過去の履歴 ({records.length})
          </button>
        </div>

        {tab === 'create' ? (
          <NisshiContent
            weather={weather}
            setWeather={setWeather}
            color={color}
            setColor={setColor}
            animal={animal}
            setAnimal={setAnimal}
            character={character}
            setCharacter={setCharacter}
            note={note}
            setNote={setNote}
            loading={loading}
            aiResponse={aiResponse}
            scoreData={scoreData}
            onSubmit={handleSubmit}
          />
        ) : (
          <NisshiHistory records={records} onSelectRecord={handleSelectRecord} />
        )}
      </div>
    </main>
  );
}