import { empty, type L } from '../i18n';

export type Interest = { title: L; description: L };

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
    status: empty() as L, // ör. "Literatür taraması", "Deneyler sürüyor"
    abstract: empty() as L,
    year: '',
  },
};

export const publications: Publication[] = [];
