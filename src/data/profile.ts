import { empty, type L } from '../i18n';

// Kimlik ve iletişim. Boş bırakılan alanlar sitede gösterilmez.
export const profile = {
  name: 'Melih Turgut',
  role: {
    tr: 'Bilgisayar Mühendisliği Yüksek Lisans Öğrencisi · Üsküdar Üniversitesi',
    en: 'M.Sc. Student in Computer Engineering · Üsküdar University',
  } as L,
  // tek cümlelik konumlandırma (ana sayfa + meta açıklama)
  tagline: {
    tr: 'Yapay zekâ, veri bilimi ve web teknolojileri üzerine çalışıyorum.',
    en: 'I work on artificial intelligence, data science and web technologies.',
  } as L,
  // ana sayfadaki "şu an" durum satırı; değiştikçe güncelle (boşsa gizlenir)
  now: {
    tr: 'Tez konusu belirleme aşamasında',
    en: 'Defining my thesis topic',
  } as L,
  // Hakkımda sayfasının açılış cümlesi
  intro: {
    tr: 'Merhaba, ben Melih. Adli bilimlerden bilgisayar mühendisliğine uzanan bir yolda, veriden öğrenen sistemler ve web teknolojileri üzerine çalışıyorum.',
    en: "Hi, I'm Melih. My path runs from forensic science to computer engineering, and today I work on systems that learn from data and on web technologies.",
  } as L,
  // Hakkımda paragrafları; her öğe bir paragraf
  bio: [
    {
      tr: 'Lisansımı 2023 yılında Üsküdar Üniversitesi Adli Bilimler bölümünde tamamladım. Bu yıllarda kod yazmaya başladım; bir fikri çalışan bir programa dönüştürmenin verdiği keyif, yönümü kalıcı olarak değiştirdi.',
      en: 'I completed my bachelor’s degree in Forensic Science at Üsküdar University in 2023. During those years I started writing code, and the joy of turning an idea into a working program changed my direction for good.',
    },
    {
      tr: 'Bu merakın peşinden giderek Ölçsan Teknoloji’de siber güvenlik, OptiWisdom’da veri bilimi stajları yaptım. Bugün aynı üniversitede Bilgisayar Mühendisliği yüksek lisansına devam ediyorum.',
      en: 'Following that curiosity, I did internships in cyber security at Ölçsan Teknoloji and in data science at OptiWisdom. Today I am pursuing a master’s degree in Computer Engineering at the same university.',
    },
    {
      tr: 'Şu an yapay zekâ, veri bilimi, web geliştirme ve bilgisayar ağları arasında en çok iz bırakabileceğim problemi arıyorum. Öğrendiklerimi bu sitede projeler ve yazılar olarak paylaşıyorum.',
      en: 'Right now I am exploring where I can make the most impact across AI, data science, web development and computer networks. I share what I learn here as projects and writing.',
    },
  ] as L[],
  // kimlerden haber beklediğin
  contactNote: {
    tr: 'Araştırma işbirliği, staj ya da iş fırsatları için — ya da sadece bir proje hakkında konuşmak için — yazabilirsin.',
    en: 'Feel free to reach out about research collaborations, internships or job opportunities — or just to talk about a project.',
  } as L,
  location: empty() as L,
  email: '7melihturgut@gmail.com',
  cvUpdated: '2026-10', // YYYY-MM; CV'yi `npm run cv:pdf` ile yeniden ürettiğinde güncelle
  // `npm run cv:pdf` ile /cv sayfasından üretilir
  cv: { tr: '/cv/melih-turgut-cv-tr.pdf', en: '/cv/melih-turgut-cv-en.pdf' } as L,
  links: {
    github: 'https://github.com/melokokori',
    linkedin: 'https://www.linkedin.com/in/melihturgut1/',
    scholar: '', // Google Scholar
    orcid: '',
  },
};
