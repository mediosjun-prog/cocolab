'use client';

import { useState } from 'react';

// ① Propsの型（型定義）を設定する
interface CounterProps {
  title: string;        // タイトル（文字列）
  initialCount?: number; // 初期値（数値・オプショナル：指定がなければ0）
}

// ② 引数でPropsを受け取る（初期値のデフォルト設定も可能）
export default function Counter({ title, initialCount = 0 }: CounterProps) {
  // ③ 受け取った initialCount を useState の初期値にセット
  const [count, setCount] = useState(initialCount);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100 max-w-sm w-full">
      {/* ④ 受け取った title を表示 */}
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {title}
      </h2>
      
      <p className="text-5xl font-extrabold text-blue-600 mb-6">
        {count}
      </p>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
        >
          減らす (-1)
        </button>
        
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          増やす (+1)
        </button>
      </div>
    </div>
  );
}