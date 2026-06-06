# 📜 Codex — Hüseyin Enes Ertürk

Kişisel profesyonel portfolyo + blog sitesi. **Ortaçağ × teknoloji** temalı
("Dijital Mahzen"): aydınlatılmış el yazması estetiği ile devre kartı motiflerinin
harmanı. İki dilli (TR/EN), tamamen statik, ziyaretçiler salt-okunur.

🔗 Yayın: [huseyineneserturk.com](https://huseyineneserturk.com)

---

## 🛠️ Teknoloji

| | |
|---|---|
| Framework | [Astro 5](https://astro.build) (statik çıktı) |
| Stil | Tailwind CSS 4 + özel tema token'ları |
| İçerik | Astro Content Collections + MDX |
| Dil | Astro i18n (`/tr`, `/en`) |
| Arama | [Pagefind](https://pagefind.app) (statik, sunucusuz) |
| Kod vurgu | Shiki |
| Dağıtım | DigitalOcean App Platform |

## 🚀 Geliştirme

```bash
npm install        # bağımlılıkları yükle
npm run dev        # geliştirme sunucusu → http://localhost:4321
npm run build      # production derlemesi (dist/) + Pagefind indeksleme
npm run preview    # derlenmiş siteyi yerelde önizle
```

> **Not:** Arama (Pagefind) yalnızca `npm run build` sonrası çalışır; `npm run dev`
> sırasında arama kutusu "yalnızca yayında çalışır" uyarısı verir. Bu normaldir.

---

## ✍️ İçerik Ekleme

Tüm içerik `src/content/` altında Markdown/MDX dosyalarıdır. Dosya eklersin,
`git push` yaparsın, site otomatik güncellenir. **Klasör = dil.**

### Yeni blog yazısı

`src/content/blog/tr/yeni-yazi.mdx` (ve istersen `en/` için ayrı dosya) oluştur:

```mdx
---
title: "Yazı Başlığı"
description: "Kısa açıklama (liste ve SEO için)."
pubDate: 2026-06-10
updatedDate: 2026-06-12        # opsiyonel
tags: ["backend", "mimari"]    # opsiyonel
cover: ./gorsel.jpg            # opsiyonel (aynı klasöre koy)
coverAlt: "Görsel açıklaması"  # opsiyonel
featured: false                # ana sayfada öne çıkar
draft: false                   # true ise yayınlanmaz
---

İçerik buraya... Standart Markdown + istersen bileşenler.
```

Yazı içinde özel bileşen kullanmak için (örn. kenar notu):

```mdx
import Marginalia from "@/components/Marginalia.astro";

<Marginalia>Kenar boşluğu notu.</Marginalia>
```

### Yeni proje

`src/content/projects/tr/proje-adi.mdx`:

```mdx
---
title: "Proje Adı"
description: "Tek cümlelik açıklama."
summary: "Kartlarda görünen biraz daha uzun özet."  # opsiyonel
tech: ["Spring Boot", "PostgreSQL", "Redis"]
repo: "https://github.com/huseyineneserturk/..."     # opsiyonel
live: "https://..."                                   # opsiyonel
featured: true        # ana sayfada başyapıt olarak göster
order: 1              # sıralama (küçük = önce)
year: "2026"
category: "Bitirme Projesi"
draft: false
---

Detaylı proje anlatımı (Markdown)...
```

> İki dilli yapmak için aynı dosyayı `en/` klasöründe İngilizce içerikle oluştur.
> Slug (dosya adı) iki dilde **aynı** olursa dil değiştirici doğru sayfaya götürür.

---

## 🎨 Temayı Özelleştirme

- **Renkler & tema:** `src/styles/global.css` — `:root` (gece) ve
  `[data-theme="light"]` (gündüz) altındaki CSS değişkenleri.
- **Fontlar:** `global.css` içindeki `@theme` bloğu (`--font-display` vb.) ve
  `src/components/BaseHead.astro` içindeki `@fontsource` importları.
- **Arayüz metinleri (TR/EN):** `src/i18n/ui.ts`
- **Hakkımda içeriği (bio, yetenekler, kronik):** `src/data/about.ts`
- **Logo/arma:** `src/components/Crest.astro`, favicon `public/favicon.svg`

---

## ☁️ Dağıtım — DigitalOcean App Platform

1. **Repoyu GitHub'a yükle** (örn. `huseyineneserturk/huseyineneserturk.com`).
2. **DigitalOcean → Apps → Create App** → GitHub reposunu seç.
   Spec hazır: [`.do/app.yaml`](.do/app.yaml) (Build: `npm run build`, Çıktı: `dist`).
   - Alternatif CLI: `doctl apps create --spec .do/app.yaml`
3. **`main` dalına her push otomatik dağıtım yapar** (`deploy_on_push: true`).

### Custom domain (Hostinger)

1. App Platform → uygulaman → **Settings → Domains → Add Domain** →
   `huseyineneserturk.com` (ve `www`).
2. DigitalOcean sana DNS kayıtlarını verir. **Hostinger** panelinde
   (Domains → DNS / Nameservers):
   - En basiti: Hostinger'da DigitalOcean **nameserver**'larına geç
     (`ns1.digitalocean.com`, `ns2...`, `ns3...`) ve DigitalOcean'da domaini
     Networking → Domains'e ekle, ardından App'e bağla; **ya da**
   - Hostinger DNS'inde kalmak istersen App Platform'un verdiği
     `CNAME` / `A`/`ALIAS` kaydını ekle.
3. SSL sertifikası DigitalOcean tarafından otomatik (Let's Encrypt) sağlanır.

> `astro.config.mjs` içindeki `site` değeri `https://huseyineneserturk.com`
> olmalı (sitemap, RSS ve kanonik URL'ler bunu kullanır).

---

## 📁 Yapı

```
src/
├─ content/{blog,projects}/{tr,en}/*.mdx   içerik (sen ekliyorsun)
├─ content.config.ts                       içerik şemaları (zod)
├─ i18n/ui.ts                              arayüz metinleri TR/EN
├─ data/about.ts                          hakkımda verisi
├─ lib/                                    yardımcılar (içerik, yollar)
├─ layouts/BaseLayout.astro
├─ components/                             Header, Footer, Hero, kartlar...
├─ pages/[lang]/...                        i18n yönlendirmeli sayfalar
└─ styles/global.css                       tasarım sistemi
public/                                    favicon, og görseli, robots.txt
.do/app.yaml                              DigitalOcean dağıtım tanımı
```

---

🤖 İlk sürüm [Claude Code](https://claude.com/claude-code) ile inşa edildi.
