import AttachmentArticles from '@/components/AttachmentArticles'; // コンポーネントのパスは適宜調整してください

export default function AttachmentCategoryPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 診断結果ページにあったコンポーネントをここに配置 */}
      <AttachmentArticles />
    </main>
  );
}