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
  interests: [] as Interest[],
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
