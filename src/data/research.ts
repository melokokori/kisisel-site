import { empty, type L } from '../i18n';

export type Interest = { title: L; description: L; keywords: string[] };

export type Publication = {
  title: string;
  authors: string[]; // kendi adın dahil, sıralı
  venue: string; // dergi / konferans / etkinlik
  year: number;
  type: 'journal' | 'conference' | 'poster' | 'talk' | 'preprint' | 'thesis';
  status: 'published' | 'accepted' | 'under-review' | 'in-progress';
  doi?: string;
  url?: string;
  pdf?: string; // public/ altındaki yol
};

export const research = {
  summary: empty() as L, // araştırma sayfasının giriş paragrafı
  interests: [
    {
      title: { tr: 'Yapay zekâ ve veri bilimi', en: 'AI & data science' },
      description: {
        tr: 'Veriden anlam çıkaran ve öğrenen modeller: veri analizi, makine öğrenmesi ve bu modellerin gerçek problemlere uygulanması.',
        en: 'Models that learn from data: data analysis, machine learning and applying these models to real problems.',
      },
      keywords: ['Machine learning', 'Python', 'R'],
    },
    {
      title: { tr: 'Web geliştirme', en: 'Web development' },
      description: {
        tr: 'Kullanıcının gördüğü arayüzden onu besleyen sunucu tarafına kadar uçtan uca web uygulamaları.',
        en: 'End-to-end web applications, from the interface users see to the server side that powers it.',
      },
      keywords: ['Frontend', 'Backend', 'API'],
    },
    {
      title: { tr: 'Bilgisayar ağları', en: 'Computer networks' },
      description: {
        tr: 'Sistemlerin birbiriyle nasıl konuştuğu: ağ protokolleri, mimariler ve bunların güvenilir çalışması.',
        en: 'How systems talk to each other: network protocols, architectures and making them reliable.',
      },
      keywords: ['Protocols', 'Network architecture', 'Linux'],
    },
  ] as Interest[],
  thesis: {
    title: empty() as L,
    advisor: '',
    stage: null as number | null, // 0 Literatür, 1 Yöntem, 2 Deneyler, 3 Yazım, 4 Savunma (i18n thesisStages)
    abstract: empty() as L,
    started: '', // ör. '2025'
    institution: '',
  },
};

export const publications: Publication[] = [];
