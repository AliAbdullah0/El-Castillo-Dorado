import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/explore', changefreq: 'monthly', priority: 0.9 },
  { url: '/discussions', changefreq: 'weekly', priority: 0.8 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
];

const generateSitemap = async () => {
  const sitemap = new SitemapStream({ hostname: 'https://elcastillodorado.vercel.app/' });
  const writeStream = createWriteStream('./public/sitemap.xml');
  sitemap.pipe(writeStream);

  routes.forEach((route) => sitemap.write(route));
  sitemap.end();

  await streamToPromise(sitemap);
  console.log('Sitemap generated successfully!');
};

generateSitemap();
