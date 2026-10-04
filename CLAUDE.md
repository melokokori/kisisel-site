## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Proje yapısı

- Plan: `ROADMAP.md`
- Kısa veriler (tipli, iki dilli `{ tr, en }` alanlar): `src/data/profile.ts`, `research.ts`, `cv.ts`
- Uzun içerik: `src/content/{projects,posts}/{tr,en}/<slug>.md` — şablonlar `_sablon.md`
- Sayfalar `src/pages/[...locale]/` altında tek dosyadan TR (`/`) ve EN (`/en`) üretilir
- Boş alanlar sitede "yakında" notu olarak görünür (`src/components/Section.astro`)
- Tasarım: C · Sinyal, Luminol paleti — token'lar `src/styles/global.css` (`:root` koyu, `[data-theme='light']` açık). Tasarım tuvali: https://claude.ai/artifact/CYPxDNpNDFD4S9AEwL2o3J
- Deploy: `main` → Vercel (`kisisel-site`) → https://melihturgut.dev (DNS: Cloudflare, proxy kapalı), branch'ler → preview
- Üretilen varlıklar (`scripts/render.mjs`, headless Chrome): CV PDF'leri `public/cv/` ← `/cv` (`npm run cv:pdf`), paylaşım kartları `public/og/` ← `/og` (`npm run og`); iOS ikonu `public/apple-touch-icon.png` ← `scripts/apple-touch-icon.svg` (`npm run icon`); hepsi birden `npm run assets`. `src/data` değişince yeniden çalıştır, CV için `profile.cvUpdated`'ı güncelle
- SEO: sitemap (`@astrojs/sitemap`, cv/og hariç), `public/robots.txt`, Base'de canonical + OG + JSON-LD (Person); Vercel Analytics bileşeni Base'de
- Eski `kisisel-site-rouge.vercel.app` ve `www` → `melihturgut.dev` (308): Vercel alan adı ayarlarında (vercel.json'da değil; orada dosya sistemindeki sayfalara uygulanmıyordu)
- Boş bölümler render edilmez; Projeler/Yazılar sayfaları ve menü öğeleri yalnızca koleksiyonda içerik varsa üretilir
- Görsel dil: bölümler görünenler arasında sırayla numaralanır (`Section` → `num`); ana sayfada ilgi alanları sade bir liste (`InterestList.astro`, kalp atışı/EKG çizgisi kullanıcı isteğiyle kaldırıldı — geri getirme) ve `/research#interest-N`'e bağlanır; "şu an" satırı `profile.now`. Işıma token'ları `--glow`, `--halo`; etkileşimli kart için `.card-hover`. Sayfa geçişleri JS'siz (`@view-transition`), hepsi `prefers-reduced-motion`'a uyar. 404: `src/pages/404.astro`
- Logo: kullanıcının verdiği referanstan ölçülen geometrik "M" (dış bacaklar, çapraz kollar, altta iç Λ kıvrımı), koyu kare üzerinde mavi `#7aa7ff`; küçük boyutlarda okunsun diye aynı renkte kontur (`src/components/Logo.astro`). Çokgenler `public/favicon.svg` ve `scripts/apple-touch-icon.svg`'de elle kopyalı — şekil değişirse üçünü de güncelle, sonra `npm run icon` ve `npm run og`
- Ana sayfa parallax arka planı (`ParallaxBackground.astro`, yalnız ana sayfa; Base'deki `background` slot'una girer — `main` içine koyma, sayfa geçişi `position: fixed`'ı bozabilir): ekrana sabit 4 katman — ışık lekeleri, logodan türetilmiş büyük V/Λ şekilleri, nokta ızgarası, logonun küçük üçgen çiftleri. Kaydırma CSS `animation-timeline: scroll(root)` (katman başına `--d` yükselme), fare küçük bir JS ile `--mx/--my` (katman başına `--m` kayma; dokunmatikte ve hareket azaltmada kapalı). Hero'da ayrıca portre geride kalır, metin ekrandan çıkarken söner. `animation-timeline`'ı hep ayrı bir kurala yaz: küçültücü `animation` kısaltmasına katınca üretimde bildirim geçersiz oluyor
- Portre: `src/components/Avatar.astro` — statik webp (Higgsfield `gpt_image_2_5`, resimsel stil, lacivert zemin; kaynak foto Higgsfield media `fa1aefc0…`). Değişince `npm run og`
