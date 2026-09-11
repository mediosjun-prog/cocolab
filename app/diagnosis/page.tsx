import type { Metadata } from 'next';
import DiagnosisContent from './DiagnosisContent'; // ← この行を追加

export const metadata: Metadata = {
  title: '愛着スタイル診断テスト | ここらぼ - 心に寄り添うセルフケア',
  description: '12の質問から、あなたの愛着スタイル（不安型・回避型・恐れ回避型・安定型）を診断します。',
};

export default function DiagnosisPage() {
  return <DiagnosisContent />;
}