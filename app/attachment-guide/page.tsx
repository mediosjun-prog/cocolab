import type { Metadata } from 'next';
import FeatureContent from './FeatureContent';

export const metadata: Metadata = {
  title: '愛着タイプを深く知るための特別ガイド | ここらぼ',
  description: '愛着診断の結果をもとに、あなたの心のパターンを紐解き、日常の不安を和らげるためのヒントを専門家が解説します。',
};

export default function FeaturePage() {
  return <FeatureContent />;
}