// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Arama motorlarına kapalı yardımcı sayfalar (CV ve paylaşım kartı kaynakları)
const utilityPage = /\/(en\/)?(cv|og)\/?$/;

// https://astro.build/config
export default defineConfig({
  site: 'https://melihturgut.dev',
  // CSS küçük; ayrı dosya yerine sayfaya gömülür (render'ı engelleyen istek kalmaz)
  build: { inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => !utilityPage.test(new URL(page).pathname),
      i18n: { defaultLocale: 'tr', locales: { tr: 'tr-TR', en: 'en-US' } },
    }),
  ],
});
