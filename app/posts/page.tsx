import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default async function PostsPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts: Post[] = await res.json();

  return (
    <main className="w-full p-4 md:p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        記事一覧
      </h1>

      <div className="grid gap-4">
        {posts.map((post) => (
          // カード全体を Link で囲み、詳細ページへアクセスできるように変更
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="block bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition"
          >
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
              ID: {post.id}
            </span>
            <h2 className="text-xl font-bold text-gray-800 mt-2 mb-2 capitalize">
              {post.title}
            </h2>
            <p className="text-gray-600 text-sm line-clamp-2">
              {post.body}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/" className="text-blue-500 hover:underline">
          ← ホームへ戻る
        </Link>
      </div>
    </main>
  );
}