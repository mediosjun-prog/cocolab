import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cocolab-wine.vercel.app';

  // 基本的な公開ページをここにリストアップします
  const routes = [
    '',
    '/about',
    '/contact',
    // 必要に応じて他のページ（例: '/diagnosis', '/counselors' など）も追加できます
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}