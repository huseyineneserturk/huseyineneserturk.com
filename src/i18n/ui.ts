// ════════════════════════════════════════════════════════════════
// Arayüz metinleri (TR / EN) ve i18n yardımcıları
// ════════════════════════════════════════════════════════════════

export const languages = {
  tr: "Türkçe",
  en: "English",
} as const;

export const defaultLang = "tr";
export type Lang = keyof typeof languages;

export const ui = {
  tr: {
    "nav.home": "Ana Sayfa",
    "nav.about": "Hakkımda",
    "nav.projects": "Projeler",
    "nav.blog": "Günce",
    "nav.contact": "İletişim",

    "site.title": "Hüseyin Enes Ertürk",
    "site.role": "Yazılım Mühendisi · Backend & Dağıtık Sistemler",
    "site.tagline": "Kadim el yazmaları ile modern mühendisliğin buluştuğu kodeks.",

    "home.greeting": "Bu Kodekse Hoş Geldin",
    "home.intro":
      "Ben Hüseyin Enes Ertürk. Yazılım mühendisliği öğrencisi ve backend tutkunuyum; ölçeklenebilir sistem tasarımı, yapay zekâ entegrasyonu ve temiz koda gönül vermiş biriyim. Bu kodeks, projelerimi ve düşüncelerimi kaydettiğim dijital mahzenim.",
    "home.cta.projects": "Eserleri Gör",
    "home.cta.contact": "İletişime Geç",
    "home.featured": "Öne Çıkan Eserler",
    "home.latest": "Günceden Son Yazılar",
    "home.viewAll": "Tümünü Gör",

    "about.title": "Hakkımda",
    "about.skills": "Yetenekler",
    "about.timeline": "Zaman Çizelgesi",
    "about.stack": "Teknolojiler",

    "projects.title": "Eserler Mecmuası",
    "projects.subtitle": "İnşa ettiğim projeler.",
    "projects.featured": "Başyapıt",
    "projects.viewRepo": "Depoyu Gör",
    "projects.viewLive": "Canlı Gör",
    "projects.all": "Tümü",

    "blog.title": "Günce",
    "blog.subtitle": "Notlar, denemeler ve teknik yazılar.",
    "blog.readingTime": "dk okuma",
    "blog.toc": "İçindekiler",
    "blog.tags": "Etiketler",
    "blog.allPosts": "Tüm Yazılar",
    "blog.tagged": "Etiket",
    "blog.empty": "Henüz yazı eklenmedi. Yakında ilk satırlar kazınacak.",
    "blog.back": "Günceye Dön",
    "blog.published": "Yayım",
    "blog.updated": "Güncelleme",

    "contact.title": "Haberci Gönder",
    "contact.subtitle":
      "Bir proje, fikir ya da sadece selam için — kapım açık.",
    "contact.email": "E-posta",
    "contact.elsewhere": "Diğer Diyarlar",

    "search.placeholder": "Kodekste ara...",
    "search.label": "Ara",

    "footer.built": "Astro ile bu mahzende inşa edildi",
    "footer.rights": "Tüm hakları saklıdır.",

    "theme.toggle": "Temayı değiştir",
    "404.title": "Kayıp Sayfa",
    "404.text": "Aradığın parşömen bu mahzende bulunamadı.",
    "404.home": "Ana Sayfaya Dön",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.blog": "Chronicle",
    "nav.contact": "Contact",

    "site.title": "Hüseyin Enes Ertürk",
    "site.role": "Software Engineer · Backend & Distributed Systems",
    "site.tagline": "A codex where ancient manuscripts meet modern engineering.",

    "home.greeting": "Welcome to the Codex",
    "home.intro":
      "I'm Hüseyin Enes Ertürk — a software engineering student and backend enthusiast devoted to scalable system design, AI integration, and clean, maintainable code. This codex is the digital crypt where I record my projects and thoughts.",
    "home.cta.projects": "View the Works",
    "home.cta.contact": "Get in Touch",
    "home.featured": "Featured Works",
    "home.latest": "Latest from the Chronicle",
    "home.viewAll": "View All",

    "about.title": "About",
    "about.skills": "Skills",
    "about.timeline": "Timeline",
    "about.stack": "Technologies",

    "projects.title": "Compendium of Works",
    "projects.subtitle": "Projects I have built.",
    "projects.featured": "Magnum Opus",
    "projects.viewRepo": "View Repo",
    "projects.viewLive": "View Live",
    "projects.all": "All",

    "blog.title": "Chronicle",
    "blog.subtitle": "Notes, essays and technical writing.",
    "blog.readingTime": "min read",
    "blog.toc": "Contents",
    "blog.tags": "Tags",
    "blog.allPosts": "All Posts",
    "blog.tagged": "Tagged",
    "blog.empty": "No entries yet. The first lines will be etched soon.",
    "blog.back": "Back to Chronicle",
    "blog.published": "Published",
    "blog.updated": "Updated",

    "contact.title": "Send a Messenger",
    "contact.subtitle":
      "For a project, an idea, or just to say hello — my door is open.",
    "contact.email": "Email",
    "contact.elsewhere": "Other Realms",

    "search.placeholder": "Search the codex...",
    "search.label": "Search",

    "footer.built": "Forged in this crypt with Astro",
    "footer.rights": "All rights reserved.",

    "theme.toggle": "Toggle theme",
    "404.title": "Lost Page",
    "404.text": "The parchment you seek was not found in this crypt.",
    "404.home": "Return Home",
  },
} as const;

export type UIKey = keyof (typeof ui)["tr"];

/** Verilen dile göre çeviri fonksiyonu döndürür. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** URL yolundan dili çıkarır (örn. /en/blog → "en"). */
export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split("/");
  if (maybeLang in languages) return maybeLang as Lang;
  return defaultLang;
}

/** Karşı dilin aynı yoldaki sürümünü üretir (dil değiştirici için). */
export function swapLangInPath(pathname: string, target: Lang): string {
  const parts = pathname.split("/");
  if (parts[1] in languages) {
    parts[1] = target;
    return parts.join("/");
  }
  return `/${target}${pathname}`;
}
