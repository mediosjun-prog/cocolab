import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  date: string;
  content: string; // 本文
}

// すべての記事データを一元管理（2つ目、3つ目だけでなく今後増やす場合もここに追加できます）
const ARTICLES_DATA: Article[] = [
  {
    id: '2',
    slug: 'avoidant-attachment-guide',
    title: '回避型愛着スタイルの心理：人と距離を置きたくなる理由とは？',
    excerpt: '人に頼るのが苦手で束縛を嫌う「回避型」。自分の本音と向き合い、心地よい人間関係を築くヒント。',
    category: '愛着障害・心理学',
    imageUrl: '/images/topi2.jpg',
    date: '2026.08.10',
    content: `回避型愛着スタイルの心理
人と親しくなりたい気持ちはあるのに、距離が近くなってくると、なぜか落ち着かなくなる。
相手に好意を持っていても、深い関係になりそうになると急に距離を取りたくなったり、「一人のほうが楽」と感じたりすることがあります。
こうした傾向の背景には、「回避型愛着スタイル」と呼ばれる心理的なパターンが関係していることがあります。
人との距離が近づくと、無意識に身構えてしまう
回避型愛着スタイルの人は、必ずしも「人が嫌い」なわけではありません。
むしろ、誰かを大切に思ったり、人とのつながりを求めたりする気持ちを持っていることも少なくありません。
しかし、関係が深くなり、自分の弱さや本音を見せる場面になると、無意識に心が警戒モードに入ることがあります。`,
  },
  {
    id: '3',
    slug: 'fearful-avoidant-healing',
    title: '恐れ・回避型（未解決型）の人が安心感を得るためのアプローチ',
    excerpt: '「親密になりたいけれど怖い」という葛藤を抱える方へ。傷ついた過去の愛着体験を癒やすプロセス。',
    category: '愛着障害・心理学',
    imageUrl: '/images/topi3.jpg',
    date: '2026.08.01',
    content: `ここに「恐れ・回避型（未解決型）」の人が安心感を育むための具体的なアプローチやステップについて詳しく記述します。`,
  },
];

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES_DATA.find((item) => item.slug === slug);

  // 該当する記事がない場合は404ページを表示
  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F9F6] py-16 px-4">
      <article className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-[#E2EAE1] space-y-8">
        
        {/* パンくずリスト・カテゴリ */}
        <div className="flex items-center gap-3 text-xs">
          <Link href="/" className="text-[#5A7A5C] hover:underline">ホーム</Link>
          <span className="text-slate-300">/</span>
          <span className="bg-[#5A7A5C]/10 text-[#5A7A5C] font-semibold px-2.5 py-1 rounded-full">
            {article.category}
          </span>
          <span className="text-slate-400 ml-auto">{article.date}</span>
        </div>

        {/* 記事タイトル */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#3B523D] leading-tight">
          {article.title}
        </h1>

        {/* アイキャッチ画像 */}
        <div className="rounded-2xl overflow-hidden h-64 sm:h-96 bg-slate-100 shadow-inner">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* 本文エリア */}
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 pt-4 border-t border-[#E2EAE1]">
          <p className="text-base font-medium text-[#4A5A4B] bg-[#F7F9F6] p-4 rounded-xl border border-[#E2EAE1]/60">
            {article.excerpt}
          </p>
          
          {/* ★ whitespace-pre-line を追加して \n や改行を有効にする ★ */}
          <div className="whitespace-pre-line space-y-4 text-slate-700 leading-relaxed">
            {article.content}
          </div>
        </div>

        {/* 戻るリンク */}
        <div className="pt-8 border-t border-[#E2EAE1] text-center">
          <Link 
            href="/"
            className="inline-block px-6 py-3 bg-[#5A7A5C] !text-white text-sm font-bold rounded-xl hover:bg-[#4A5A4B] transition shadow-sm"
          >
            ホームに戻る
          </Link>
        </div>

      </article>
    </main>
  );
}