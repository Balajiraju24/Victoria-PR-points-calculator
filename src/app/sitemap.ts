import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vicpoints.com.au';
  const currentDate = new Date().toISOString();

  const routes = [
    '',
    '/calculator',
    '/how-it-works',
    '/occupation-guide',
    '/resources',
    '/faq',
    '/privacy',
    '/disclaimer',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' || route === '/calculator' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route === '/calculator' ? 0.9 : 0.7,
  }));
}
