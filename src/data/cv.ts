import type { L } from '../i18n';

export type Education = {
  degree: L; // ör. "Bilgisayar Mühendisliği Yüksek Lisans"
  institution: string;
  location: string;
  start: string; // 'YYYY' veya 'YYYY-MM'
  end?: string; // boşsa "devam ediyor"
  details?: L; // not ortalaması, tez, öne çıkan dersler
};

export type Experience = {
  role: L;
  organization: string;
  url?: string;
  location: string;
  start: string;
  end?: string;
  highlights: L[]; // somut çıktılar, madde madde
};

export type SkillGroup = { group: L; items: string[] };
export type Language = { name: L; level: string };
export type Award = { title: L; issuer: string; year: string; url?: string };

export const education: Education[] = [];
export const experience: Experience[] = [];
export const skills: SkillGroup[] = [];
export const languages: Language[] = [];
export const awards: Award[] = [];
