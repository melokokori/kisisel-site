export const locales = ['tr', 'en'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'tr';

/** İki dilli metin alanı. */
export type L = Record<Lang, string>;
export const empty = (): L => ({ tr: '', en: '' });

/** Her sayfanın getStaticPaths'i: TR kökte (/), EN /en altında. */
export const localeParams = () =>
  locales.map((lang) => ({ params: { locale: lang === defaultLang ? undefined : lang }, props: { lang } }));

export const langFromParam = (locale: string | undefined): Lang => (locale === 'en' ? 'en' : 'tr');

export const localePath = (lang: Lang, path = '/') => {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === defaultLang ? clean : `/${lang}${clean === '/' ? '' : clean}`;
};

/** Koleksiyon kaydının id'si "tr/dosya-adi" biçimindedir; dil klasörünü ayırır. */
export const splitEntryId = (id: string) => {
  const [lang, ...rest] = id.split('/');
  return { lang: lang as Lang, slug: rest.join('/') };
};

const ui = {
  tr: {
    nav: { home: 'Ana Sayfa', research: 'Araştırma', projects: 'Projeler', writing: 'Yazılar', cv: 'CV' },
    about: 'Hakkımda',
    featured: 'Öne Çıkan Projeler',
    interests: 'Araştırma İlgi Alanları',
    thesis: 'Tez',
    advisor: 'Danışman',
    publications: 'Yayınlar',
    recentPosts: 'Son Yazılar',
    contact: 'İletişim',
    education: 'Eğitim',
    experience: 'Deneyim',
    skills: 'Yetkinlikler',
    languages: 'Diller',
    awards: 'Ödüller ve Sertifikalar',
    downloadCv: "CV'yi indir (PDF)",
    allProjects: 'Tüm projeler',
    allPosts: 'Tüm yazılar',
    emptySection: 'Bu bölüm yakında doldurulacak.',
    switchLang: 'English',
  },
  en: {
    nav: { home: 'Home', research: 'Research', projects: 'Projects', writing: 'Writing', cv: 'CV' },
    about: 'About',
    featured: 'Featured Projects',
    interests: 'Research Interests',
    thesis: 'Thesis',
    advisor: 'Advisor',
    publications: 'Publications',
    recentPosts: 'Recent Writing',
    contact: 'Contact',
    education: 'Education',
    experience: 'Experience',
    skills: 'Skills',
    languages: 'Languages',
    awards: 'Awards & Certificates',
    downloadCv: 'Download CV (PDF)',
    allProjects: 'All projects',
    allPosts: 'All writing',
    emptySection: 'This section is coming soon.',
    switchLang: 'Türkçe',
  },
} as const;

export const t = (lang: Lang) => ui[lang];
