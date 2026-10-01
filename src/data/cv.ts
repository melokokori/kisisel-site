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
export type Language = { name: L; level: L };
export type Award = { title: L; issuer: string; year: string; url?: string };

export const education: Education[] = [
  {
    degree: { tr: 'Bilgisayar Mühendisliği, Yüksek Lisans', en: 'M.Sc. in Computer Engineering' },
    institution: 'Üsküdar Üniversitesi',
    location: 'İstanbul',
    start: '2025',
  },
  {
    degree: { tr: 'Adli Bilimler, Lisans', en: 'B.Sc. in Forensic Science' },
    institution: 'Üsküdar Üniversitesi',
    location: 'İstanbul',
    start: '2019',
    end: '2023',
    details: { tr: 'Genel not ortalaması: 3,17 / 4,00', en: 'GPA: 3.17 / 4.00' },
  },
];

export const experience: Experience[] = [
  {
    role: { tr: 'Veri Bilimi Stajyeri', en: 'Data Science Intern' },
    organization: 'OptiWisdom',
    location: 'İstanbul',
    start: '2023',
    end: '2024',
    highlights: [
      {
        tr: 'Veri bilimi alanındaki akademik makaleleri inceledim; araştırma süreçleri ve bilimsel yazım aşamalarında pratik deneyim kazandım.',
        en: 'Reviewed academic papers in data science and gained hands-on experience with research processes and scientific writing.',
      },
    ],
  },
  {
    role: { tr: 'Siber Güvenlik Stajyeri', en: 'Cyber Security Intern' },
    organization: 'Ölçsan Teknoloji A.Ş.',
    url: 'https://tr.olcsancad.com/',
    location: 'İstanbul',
    start: '2022',
    end: '2022',
    highlights: [
      {
        tr: 'Güvenlik protokolleri, saldırı türleri ve savunma mekanizmaları üzerine bilgimi derinleştirdim.',
        en: 'Deepened my knowledge of security protocols, attack types and defense mechanisms.',
      },
    ],
  },
];

export const skills: SkillGroup[] = [];

export const languages: Language[] = [
  { name: { tr: 'Türkçe', en: 'Turkish' }, level: { tr: 'ana dil', en: 'native' } },
  { name: { tr: 'İngilizce', en: 'English' }, level: { tr: 'B2', en: 'B2' } },
];

export const awards: Award[] = [];
