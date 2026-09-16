import type { Metadata } from 'next';
import KokoDiagnosisContent from "./kokoDiagnosisContent";

export const metadata: Metadata = {
  title: 'ここきょり | ここらぼ - 心に寄り添うセルフケア',
  description: 'ここらぼは、愛着理論に基づく心理診断とAIカウンセリング、専門家サポートを提供するメンタルケアプラットフォームです。',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F7F9F8] py-12 px-4 sm:px-6">
      <KokoDiagnosisContent />
    </main>
  );
}