import { Metadata } from 'next';
import AboutUsContent from './AboutUsContent';

export const metadata: Metadata = {
  title: '運営組織について | ここらぼ - 心に寄り添うセルフケア',
  description: 'ここらぼの運営組織情報および事業概要についてご紹介します。',
};

export default function Page() {
  return <AboutUsContent />;
}