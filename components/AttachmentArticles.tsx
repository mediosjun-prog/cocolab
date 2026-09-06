'use client';

import Link from 'next/link';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  date: string;
}

const ATTACHMENT_ARTICLES: Article[] = [
  {
    id: '1',
    // 1つ目は /attachment-guide に直接飛ばすため、リンクパスを調整または条件分岐します
    slug: 'attachment-guide', 
    title: '診断結果から見えてきた、心がふっと軽くなる愛着の整え方',
    excerpt: '日常の中でできる、小さなセルフケアの実践',
    category: '愛着障害・心理学',
    // 画像URLがパスになっていたため、プレースホルダー画像に変更
    imageUrl: '/images/topi1.jpg',
    date: '2026.09.15',
  },
  {
    id: '2',
    slug: 'avoidant-attachment-guide',
    title: '回避型愛着スタイルの心理：人と距離を置きたくなる理由とは？',
    excerpt: '人に頼るのが苦手で束縛を嫌う「回避型」。自分の本音と向き合い、心地よい人間関係を築くヒント。',
    category: '愛着障害・心理学',
    imageUrl: '/images/topi2.jpg',
    date: '2026.08.10',
  },
  {
    id: '3',
    slug: 'fearful-avoidant-healing',
    title: '恐れ・回避型（未解決型）の人が安心感を得るためのアプローチ',
    excerpt: '「親密になりたいけれど怖い」という葛藤を抱える方へ。傷ついた過去の愛着体験を癒やすプロセス。',
    category: '愛着障害・心理学',
    imageUrl: '/images/topi3.jpg',
    date: '2026.08.01',
  },
];

export default function AttachmentArticles() {
  return (
    <section className="max-w-5xl mx-auto py-12 px-4">
      {/* セクションヘッダー */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
            Articles
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            愛着タイプに関する記事
          </h2>
        </div>
        <Link
          href="/articles/category/attachment"
          className="text-sm font-bold text-blue-600 hover:text-blue-800 transition"
        >
          すべて見る →
        </Link>
      </div>

      {/* 記事カードのグリッド配置 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ATTACHMENT_ARTICLES.map((article) => {
          // 1つ目の記事だけリンク先を 「/attachment-guide」 に個別指定する処理
          const articleHref = article.id === '1' ? '/attachment-guide' : `/articles/${article.slug}`;

          return (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition group flex flex-col"
            >
              {/* アイキャッチ画像 */}
              <div className="h-44 w-full overflow-hidden bg-gray-100 relative">
                <Link href={articleHref}>
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
              </div>

              {/* コンテンツ */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 font-medium text-[10px] rounded-full">
                      {article.category}
                    </span>
                    <time className="text-[11px] text-gray-400">{article.date}</time>
                  </div>
                  <h3 className="font-bold text-gray-800 text-base leading-snug line-clamp-2 group-hover:text-blue-600 transition">
                    <Link href={articleHref}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-50 text-right">
                  <Link
                    href={articleHref}
                    className="text-xs font-bold text-gray-700 group-hover:text-blue-600 transition inline-flex items-center gap-1"
                  >
                    記事を読む <span>→</span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}