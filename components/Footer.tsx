import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#A36E5B] border-t border-[#E2EAE1] py-8 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* ロゴやサイト名 */}
        <div className="text-sm font-bold text-white">
          ここらぼ
        </div>

        {/* フッターメニューリンク */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm !text-white">
          <Link href="/" className="hover:text-[#E4FFA8] transition !text-white">
            HOME
          </Link>
          <Link href="/about-us" className="hover:text-[#E4FFA8] transition !text-white">
            運営組織
          </Link>
          <Link href="/privacy" className="hover:text-[#E4FFA8] transition !text-white">
            プライバシーポリシー
          </Link>
          <Link href="/contact" className="hover:text-[#E4FFA8] transition !text-white">
            お問い合わせ
          </Link>
        </div>

        {/* コピーライト */}
        <div className="text-xs !text-white">
          &copy; {new Date().getFullYear()} ここらぼ All rights reserved.
        </div>
      </div>
    </footer>
  );
}