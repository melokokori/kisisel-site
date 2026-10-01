import type { L } from '../i18n';

export type Education = {
  degree: L; // ör. "Bilgisayar Mühendisliği Yüksek Lisans"
  institution: L;
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
    institution: { tr: 'Üsküdar Üniversitesi', en: 'Üsküdar University' },
    location: 'İstanbul',
    start: '2025',
  },
  {
    degree: { tr: 'Adli Bilimler, Lisans', en: 'B.Sc. in Forensic Science' },
    institution: { tr: 'Üsküdar Üniversitesi', en: 'Üsküdar University' },
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
        tr: 'Veri bilimi alanında literatür taraması yaptım; ilgili makaleleri inceleyip özetledim ve karşılaştırdım.',
        en: 'Conducted literature reviews in data science, analysing, summarising and comparing relevant papers.',
      },
      {
        tr: 'Veri setleri üzerinde analiz yaptım ve makine öğrenmesi modelleri kurdum.',
        en: 'Analysed datasets and built machine learning models.',
      },
      {
        tr: 'Akademik bir çalışmanın yazım sürecine katkı verdim; araştırmadan yayına giden süreci yakından deneyimledim.',
        en: 'Contributed to the writing of an academic paper and experienced the path from research to publication first-hand.',
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
        tr: 'Ağ ve zafiyet taramaları yaparak sistemlerdeki güvenlik açıklarını tespit ettim.',
        en: 'Performed network and vulnerability scans to identify security weaknesses in systems.',
      },
      {
        tr: 'Test ortamında saldırı senaryolarını simüle ederek saldırı türlerini ve savunma mekanizmalarını uygulamalı olarak inceledim.',
        en: 'Simulated attack scenarios in a test environment to study attack types and defense mechanisms hands-on.',
      },
    ],
  },
];

export const skills: SkillGroup[] = [
  { group: { tr: 'Programlama dilleri', en: 'Programming languages' }, items: ['Python', 'R', 'Java', 'JavaScript', 'SQL'] },
  {
    group: { tr: 'Veri ve yapay zekâ', en: 'Data & AI' },
    items: ['pandas', 'NumPy', 'scikit-learn', 'PyTorch', 'TensorFlow'],
  },
  { group: { tr: 'Web geliştirme', en: 'Web development' }, items: ['HTML', 'CSS', 'React', 'Astro', 'Node.js', 'REST API'] },
  { group: { tr: 'Araçlar ve sistemler', en: 'Tools & systems' }, items: ['Git', 'GitHub', 'Linux'] },
];

export const languages: Language[] = [
  { name: { tr: 'Türkçe', en: 'Turkish' }, level: { tr: 'ana dil', en: 'native' } },
  { name: { tr: 'İngilizce', en: 'English' }, level: { tr: 'B2', en: 'B2' } },
];

export const awards: Award[] = [];
