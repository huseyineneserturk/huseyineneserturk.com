import type { Lang } from "@/i18n/ui";

export const bio: Record<Lang, string[]> = {
  tr: [
    "Türkiye'den, 3. sınıf bir Yazılım Mühendisliği öğrencisiyim. Backend geliştirme ve dağıtık sistemler üzerine yoğunlaşıyorum; ölçeklenebilir sistem tasarımı, yapay zekâ entegrasyonu ve temiz, sürdürülebilir kod benim asıl ilgi alanlarım.",
    "Kod yazmadığım zamanlarda yeni teknolojileri kurcalamayı, güvenlik araştırmalarını ve öğrendiklerimi yazıya dökmeyi seviyorum. Bu kodeks de tam olarak bunun için var.",
  ],
  en: [
    "I'm a third-year Software Engineering student from Turkey, focused on backend development and distributed systems. Scalable system design, AI integration and clean, maintainable code are my core interests.",
    "When I'm not coding, I enjoy tinkering with new technologies, security research, and writing down what I learn. This codex exists for exactly that.",
  ],
};

export interface SkillGroup {
  label: Record<Lang, string>;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    label: { tr: "Diller", en: "Languages" },
    items: ["Java", "C#", "Python", "TypeScript", "Dart"],
  },
  {
    label: { tr: "Backend & Çatılar", en: "Backend & Frameworks" },
    items: ["Spring Boot", "FastAPI", "Next.js", "Flutter", "LangChain"],
  },
  {
    label: { tr: "Veritabanı & Önbellek", en: "Databases & Caching" },
    items: ["PostgreSQL", "MySQL", "MongoDB", "SQL Server", "Redis"],
  },
  {
    label: { tr: "DevOps & Araçlar", en: "DevOps & Tools" },
    items: ["Docker", "Kubernetes", "GitHub Actions", "Prometheus", "Grafana", "Git"],
  },
];

export interface TimelineEntry {
  year: string;
  title: Record<Lang, string>;
  detail: Record<Lang, string>;
}

export const timeline: TimelineEntry[] = [
  {
    year: "2026",
    title: { tr: "Kişisel Proje — Agentia", en: "Personal Project — Agentia" },
    detail: {
      tr: "Okul döneminde bireysel olarak geliştirdiğim mobil öncelikli yapay zekâ ajan orkestrasyon platformu.",
      en: "A mobile-first AI agent orchestration platform I built individually during my studies.",
    },
  },
  {
    year: "2025",
    title: { tr: "Yapay Zekâ ve Teknoloji Akademisi", en: "AI & Technology Academy" },
    detail: {
      tr: "Google Yapay Zekâ ve Teknoloji Akademisi; bootcamp projeleri (Notest, CommsItumo, Quizz.AI).",
      en: "Google AI & Technology Academy; bootcamp projects (Notest, CommsItumo, Quizz.AI).",
    },
  },
  {
    year: "2025",
    title: { tr: "Oyun ve Uygulama Akademisi", en: "Game & Application Academy" },
    detail: {
      tr: "Google Oyun ve Uygulama Akademisi; App Jam takım projeleri (SayCheese, Quizz.AI).",
      en: "Google Game & Application Academy; App Jam team projects (SayCheese, Quizz.AI).",
    },
  },
  {
    year: "2025",
    title: { tr: "Güvenlik Araştırması", en: "Security Research" },
    detail: {
      tr: "Elektrikli araç şarj altyapısı (OCPP & CAN Bus) üzerine güvenlik araştırması.",
      en: "Security research on EV charging infrastructure (OCPP & CAN Bus).",
    },
  },
  {
    year: "2024 →",
    title: { tr: "Yazılım Mühendisliği", en: "Software Engineering" },
    detail: {
      tr: "Lisans eğitimi; backend ve dağıtık sistemlere artan bir tutkuyla yoğunlaşma.",
      en: "Undergraduate studies; a growing focus on backend and distributed systems.",
    },
  },
];
