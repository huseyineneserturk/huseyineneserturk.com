import type { Lang } from "@/i18n/ui";

export const bio: Record<Lang, string[]> = {
  tr: [
    "Türkiye'den, 3. sınıf bir Yazılım Mühendisliği öğrencisiyim. Backend geliştirme ve dağıtık sistemler üzerine yoğunlaşıyorum; ölçeklenebilir sistem tasarımı, yapay zekâ entegrasyonu ve temiz, sürdürülebilir kod benim asıl ilgi alanlarım.",
    "Şu anda bitirme projem olan **Agentia**'yı geliştiriyorum: mobil öncelikli bir yapay zekâ ajan orkestrasyon platformu. Bu yolculukta Spring Boot'tan FastAPI'ye, Flutter'dan Kubernetes'e kadar geniş bir cephanelik kullanıyorum.",
    "Kod yazmadığım zamanlarda yeni teknolojileri kurcalamayı, güvenlik araştırmalarını ve öğrendiklerimi yazıya dökmeyi seviyorum. Bu kodeks de tam olarak bunun için var.",
  ],
  en: [
    "I'm a third-year Software Engineering student from Turkey, focused on backend development and distributed systems. Scalable system design, AI integration and clean, maintainable code are my core interests.",
    "I'm currently building **Agentia**, my graduation project: a mobile-first AI agent orchestration platform. Along the way I work with a broad arsenal — from Spring Boot to FastAPI, from Flutter to Kubernetes.",
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
    title: { tr: "Bitirme Projesi — Agentia", en: "Graduation Project — Agentia" },
    detail: {
      tr: "Mobil öncelikli yapay zekâ ajan orkestrasyon platformunun tasarımı ve geliştirilmesi.",
      en: "Designing and building a mobile-first AI agent orchestration platform.",
    },
  },
  {
    year: "2025",
    title: { tr: "Yapay Zekâ Akademisi & Bootcamp'ler", en: "AI Academy & Bootcamps" },
    detail: {
      tr: "Google Yapay Zekâ ve Teknoloji Akademisi; AppJam ve bootcamp projeleri (Notest, SayCheese, Quizz.AI).",
      en: "Google AI & Technology Academy; AppJam and bootcamp projects (Notest, SayCheese, Quizz.AI).",
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
