'use client'; // インタラクティブな処理を行うためクライアントコンポーネントにする

import { useState } from 'react';

export default function TextInput() {
  // ① テキストを保持する状態（State）を定義
  const [text, setText] = useState('');

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full border border-gray-100 mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        リアルタイム入力フォーム
      </h2>

      {/* ② 入力フォーム */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)} // 入力された値をstateに保存
        placeholder="ここに入力してください..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
      />

      {/* ③ 入力した文字をリアルタイムに表示 */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500 mb-1">プレビュー表示：</p>
        <p className="text-lg font-medium text-gray-800 break-words">
          {text || '（まだ入力されていません）'}
        </p>
      </div>

      {/* リセットボタン（おまけ） */}
      {text && (
        <button
          onClick={() => setText('')}
          className="mt-3 text-sm text-red-500 hover:underline"
        >
          クリア
        </button>
      )}
    </div>
  );
}