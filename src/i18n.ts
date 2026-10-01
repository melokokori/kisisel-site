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
    nav: { home: 'Ana Sayfa', research: 'Araştırma', projects: 'Projeler', writing: 'Yazılar', about: 'Hakkımda', contact: 'İletişim' },
    about: 'Hakkımda',
    featured: 'Öne çıkan projeler',
    interests: 'İlgi alanları',
    thesis: 'Tez',
    advisor: 'Danışman',
    publications: 'Yayınlar',
    recentPosts: 'Son yazılar',
    contact: 'İletişim',
    education: 'Eğitim',
    experience: 'Deneyim',
    skills: 'Yetkinlikler',
    languages: 'Diller',
    awards: 'Ödüller ve sertifikalar',
    downloadCv: "CV'yi indir (PDF)",
    allProjects: 'Tüm projeler',
    allPosts: 'Tüm yazılar',
    emptySection: 'Bu bölüm yakında doldurulacak.',
    switchLang: 'EN',
    educationExperience: 'Eğitim ve deneyim',
    educationTag: 'Eğitim',
    experienceTag: 'Deneyim',
    present: 'devam ediyor',
    lastUpdated: 'Son güncelleme',
    contactCta: 'İletişime geç',
    researchMore: 'Tez ve yayınlar',
    thesisOngoing: 'Yüksek lisans tezi · devam ediyor',
    thesisStages: ['Literatür', 'Yöntem', 'Deneyler', 'Yazım', 'Savunma'],
    progress: 'İlerleme',
    institution: 'Kurum',
    started: 'Başlangıç',
    role: 'Rol',
    period: 'Süre',
    stack: 'Teknolojiler',
    links: 'Bağlantılar',
    onThisPage: 'Bu sayfada',
    nextProject: 'Sonraki proje',
    backToProjects: 'Projeler',
    backToWriting: 'Yazılar',
    filterAll: 'Tümü',
    filterLabel: 'Etikete göre filtrele',
    minRead: 'dk okuma',
    mainMenu: 'Ana menü',
    themeToggle: 'Açık / koyu tema',
    native: 'ana dil',
    linkLabels: { github: 'Kod', demo: 'Demo', paper: 'Makale', video: 'Video' },
    pubTypes: { journal: 'makale', conference: 'bildiri', poster: 'poster', talk: 'sunum', preprint: 'ön baskı', thesis: 'tez' },
  },
  en: {
    nav: { home: 'Home', research: 'Research', projects: 'Projects', writing: 'Writing', about: 'About', contact: 'Contact' },
    about: 'About',
    featured: 'Featured projects',
    interests: 'Interests',
    thesis: 'Thesis',
    advisor: 'Advisor',
    publications: 'Publications',
    recentPosts: 'Recent writing',
    contact: 'Contact',
    education: 'Education',
    experience: 'Experience',
    skills: 'Skills',
    languages: 'Languages',
    awards: 'Awards & certificates',
    downloadCv: 'Download CV (PDF)',
    allProjects: 'All projects',
    allPosts: 'All writing',
    emptySection: 'This section is coming soon.',
    switchLang: 'TR',
    educationExperience: 'Education & experience',
    educationTag: 'Education',
    experienceTag: 'Experience',
    present: 'present',
    lastUpdated: 'Last updated',
    contactCta: 'Get in touch',
    researchMore: 'Thesis & publications',
    thesisOngoing: "Master's thesis · in progress",
    thesisStages: ['Literature', 'Method', 'Experiments', 'Writing', 'Defense'],
    progress: 'Progress',
    institution: 'Institution',
    started: 'Started',
    role: 'Role',
    period: 'Period',
    stack: 'Stack',
    links: 'Links',
    onThisPage: 'On this page',
    nextProject: 'Next project',
    backToProjects: 'Projects',
    backToWriting: 'Writing',
    filterAll: 'All',
    filterLabel: 'Filter by tag',
    minRead: 'min read',
    mainMenu: 'Main menu',
    themeToggle: 'Light / dark theme',
    native: 'native',
    linkLabels: { github: 'Code', demo: 'Demo', paper: 'Paper', video: 'Video' },
    pubTypes: { journal: 'journal', conference: 'conference', poster: 'poster', talk: 'talk', preprint: 'preprint', thesis: 'thesis' },
  },
} as const;

export const t = (lang: Lang) => ui[lang];
