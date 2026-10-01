import { empty, type L } from '../i18n';

// Kimlik ve iletişim. Boş bırakılan alanlar sitede gösterilmez.
export const profile = {
  name: 'Melih Turgut',
  role: empty() as L, // ör. "Bilgisayar Mühendisliği YL Öğrencisi, Üsküdar Üniversitesi"
  tagline: empty() as L, // tek cümlelik konumlandırma: "X alanında Y üzerine çalışıyorum"
  intro: empty() as L, // Hakkımda sayfasının açılış cümlesi
  bio: [] as L[], // Hakkımda paragrafları (Adli Bilimler → Bilgisayar Müh. hikâyesi); her öğe bir paragraf
  contactNote: empty() as L, // kimlerden haber beklediğin: işbirliği, staj, doktora pozisyonu
  photo: '', // public/ altındaki yol, ör. '/images/melih.jpg'
  location: empty() as L,
  email: '',
  cvUpdated: '', // ör. '2026-10'
  cv: empty() as L, // public/ altındaki PDF yolları, ör. { tr: '/cv/melih-turgut-tr.pdf', en: '/cv/melih-turgut-en.pdf' }
  links: {
    github: '',
    linkedin: '',
    scholar: '', // Google Scholar
    orcid: '',
  },
};
