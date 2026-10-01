import { empty, type L } from '../i18n';

// Kimlik ve iletişim. Boş bırakılan alanlar sitede gösterilmez.
export const profile = {
  name: 'Melih Turgut',
  role: empty() as L, // ör. "Bilgisayar Mühendisliği YL Öğrencisi, Üsküdar Üniversitesi"
  tagline: empty() as L, // tek cümlelik konumlandırma: "X alanında Y üzerine çalışıyorum"
  bio: empty() as L, // Hakkımda paragrafı (Adli Bilimler → Bilgisayar Müh. hikâyesi)
  photo: '', // public/ altındaki yol, ör. '/images/melih.jpg'
  location: empty() as L,
  email: '',
  cv: empty() as L, // public/ altındaki PDF yolları, ör. { tr: '/cv/melih-turgut-tr.pdf', en: '/cv/melih-turgut-en.pdf' }
  links: {
    github: '',
    linkedin: '',
    scholar: '', // Google Scholar
    orcid: '',
  },
};
