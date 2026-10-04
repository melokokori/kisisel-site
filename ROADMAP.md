# Kişisel Site — Roadmap

Hedef: Bir bilgisayar mühendisliği yüksek lisans öğrencisini (Melih Turgut) akademisyenlere,
danışmanlara, doktora komisyonlarına ve işverenlere **en güçlü şekilde** gösteren bir site.
Ziyaretçi 10 saniyede şunu anlamalı: *kim, ne üzerine çalışıyor, neyi kanıtlayabiliyor, nasıl ulaşılır.*

## Teknik kararlar

| Konu | Karar | Neden |
|---|---|---|
| Framework | **Astro** (statik çıktı) | İçerik odaklı, sıfır JS varsayılan, Markdown/MDX içerik koleksiyonları, Lighthouse 100'e yakın |
| İçerik | Projeler/yazılar `src/content/` altında Markdown; profil, araştırma, yayınlar, CV `src/data/*.ts` | Yeni proje/yazı eklemek = tek `.md` dosyası |
| Dil | TR (`/`) + EN (`/en`), tek sayfa dosyasından | Akademik çevre ve yurtdışı başvuruları için EN şart |
| Deploy | GitHub `main` → Vercel otomatik deploy; PR'lar → preview URL | Mevcut `kisisel-site` Vercel projesi kullanılacak |
| Tasarım | Claude Design ile görsel yön keşfi → `frontend-design` skill ile koda dökme | Jenerik "AI şablonu" görüntüsünden kaçınmak |
| Denetim | `web-design-guidelines` skill + Lighthouse | Erişilebilirlik, performans, UX hataları |

Eski site (index/hakkimda/iletisim + chaos/sun/weather/theme efektleri, eski CV PDF'i) `legacy-v1` tag'inde kalır, yeni sitede kullanılmaz.

## Fazlar

### Faz 0 — Hazırlık ✅
- [x] Skill'ler kuruldu: `frontend-design`, `web-design-guidelines` (`.claude/skills/`)
- [x] Mevcut durum incelendi (statik HTML, Vercel + GitHub bağlı)

### Faz 1 — İçerik envanteri (en kritik faz)
Site, içeriği kadar iyidir.
- [x] Bölüm iskeleti ve veri şemaları kuruldu (Astro); tüm alanlar boş — doldurulacak yerler `CLAUDE.md` → Proje yapısı

Toplanacaklar:
- [ ] Tek cümlelik konumlandırma ("X alanında Y üzerine çalışan ...")
- [ ] Araştırma ilgi alanları (3–4 başlık) + tez konusu / danışman
- [ ] Projeler: her biri için problem → yaklaşım → sonuç → link (GitHub/demo/video)
- [ ] Yayın / poster / bildiri / seminer (varsa; yoksa "devam eden çalışmalar")
- [ ] Deneyim: Ölçsan (Siber Güvenlik), OptiWisdom (Veri Bilimi) — somut çıktılarla yeniden yazılacak
- [ ] Eğitim: Adli Bilimler lisans → Bilgisayar Müh. YL (bu geçiş bir hikâye olarak anlatılmalı)
- [ ] Profesyonel fotoğraf, güncel CV (TR + EN, sıkıştırılmış PDF — mevcut 3.8 MB)
- [ ] Linkler: GitHub, LinkedIn, Google Scholar, ORCID (yoksa açılmalı)

### Faz 2 — Tasarım yönü ✅
- [x] Claude Design'da 3 yön (Vaka Dosyası / Akademik Editoryal / Sinyal) → **C · Sinyal** seçildi
- [x] Palet: **Luminol** (koyu) + açık eşi; Geist / Geist Mono
- [x] Açık/koyu tema geçişi
- [x] Tasarım Astro'ya uygulandı; `/cv` → `/about` (hikâye + CV + iletişim)

### Faz 3 — Astro iskeleti ve sayfalar
- [x] Astro kurulumu, Vercel ayarları, eski dosyaların temizlenmesi
- [ ] Ana sayfa: kimlik, konumlandırma, öne çıkan 3 proje, son yazılar, iletişim
- [ ] `/research` — ilgi alanları, tez, yayınlar
- [ ] `/projects` + her proje için detay sayfası (case study)
- [x] `/about` — hikâye, zaman çizelgesi, yetkinlikler, CV PDF, iletişim
- [ ] `/blog` veya `/notes` — teknik yazılar (uzmanlık kanıtı)
- [x] TR/EN dil geçişi

### Faz 4 — Kalite ve görünürlük
- [x] SEO: meta, Open Graph görselleri, `sitemap.xml`, JSON-LD (`Person`)
- [x] Erişilebilirlik + performans denetimi (`web-design-guidelines`, Lighthouse mobil 98–100, erişilebilirlik/SEO 100)
- [x] Vercel Analytics (bileşen eklendi; panelden etkinleştirilmeli)
- [x] Özel alan adı: **melihturgut.dev**

### Faz 4.5 — Tasarım cilası
- [x] A: mobil başlık, boşluklar, Hakkımda iki sütun (yapışkan künye), yanıltıcı bağlantı etiketi
- [x] B: "şu an" satırı, ilgi alanlarını gösteren sinyal (sonra sade listeye çevrildi), bölüm numaraları, Luminol ışıması (adli bilimler göndermesi yok)
- [x] C: JS'siz sayfa geçişleri, üzerine gelme efektleri, e-postayı kopyala, 404 sayfası
- [x] Logo: referanstan geometrik "M" monogramı (başlık, favicon, iOS ikonu, paylaşım kartı)
- [x] Ana sayfa parallax'ı: ışık katmanlarından arka plan (kaydırma + fare) ve hero derinliği
- [x] Kalp atışı (EKG) çizgisi tüm sitede kaldırıldı; ilgi alanları sade liste
- [ ] 2.5B portre (katmanlara ayrılmış portre) — isteğe bağlı deneme
- [ ] D: başlıklarda ikinci (editoryal serif) yazı tipi — ayrı branch'te denenecek

### Faz 5 — Sürdürme
- [ ] Ayda 1 yazı veya proje güncellemesi
- [ ] Her dönem sonu CV + yayın listesi güncellemesi

## İş akışı
1. Her faz ayrı bir branch'te geliştirilir → PR → Vercel preview URL'de kontrol
2. Onaylanınca `main`'e merge → canlı site otomatik güncellenir
