// components/PageHeader.tsx
import React from 'react';

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
        {title}
      </h1>
      {/* h1の下に挿入する装飾画像 */}
      <div className="mt-3 flex justify-center">
        <img 
          src="/images/titline.png" // ご自身の装飾画像のパスに合わせてください
          alt="" 
          className="w-30 h-auto" // お好みに合わせてサイズ調整
        />
      </div>
    </div>
  );
}