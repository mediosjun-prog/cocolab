import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

// ① 動的にメタデータを生成する関数
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  // APIから該当記事の情報を取得
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  
  if (!res.ok) {
    return {
      title: '記事が見つかりません | My Next.js App',
    };
  }

  const post = await res.json();

  return {
    title: `${post.title} | My Next.js App`,
    description: post.body.slice(0, 100), // 本文の冒頭100文字をメタ説明文にする
  };
}

// ② ページコンポーネント本体
export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();

  return (
    <main className="w-full p-4 md:p-8 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
        {post.title}
      </h1>
      <p className="text-gray-700">{post.body}</p>
      <Link href="/posts" className="text-blue-500 hover:underline mt-6 inline-block">
        ← 記事一覧に戻る
      </Link>
    </main>
  );
}