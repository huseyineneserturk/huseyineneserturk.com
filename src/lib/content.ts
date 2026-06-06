import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "@/i18n/ui";

// İçerik id'si "tr/yazi-adi" biçiminde gelir (klasör = dil).
// Bu yardımcılar dili ve temiz slug'ı ayrıştırır.

export function entryLang(id: string): Lang {
  return id.split("/")[0] as Lang;
}

export function entrySlug(id: string): string {
  return id.split("/").slice(1).join("/");
}

const isProd = import.meta.env.PROD;

/** Bir dile ait, yayımlanmış blog yazıları — tarihe göre yeniden eskiye. */
export async function getBlogPosts(lang: Lang): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog", ({ id, data }) => {
    return entryLang(id) === lang && (!isProd || data.draft !== true);
  });
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

/** Bir dile ait projeler — order, sonra yıl. */
export async function getProjects(lang: Lang): Promise<CollectionEntry<"projects">[]> {
  const items = await getCollection("projects", ({ id, data }) => {
    return entryLang(id) === lang && (!isProd || data.draft !== true);
  });
  return items.sort((a, b) => {
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    return a.data.order - b.data.order;
  });
}

/** Bir dildeki tüm benzersiz etiketler (sıklığa göre). */
export async function getAllTags(lang: Lang): Promise<{ tag: string; count: number }[]> {
  const posts = await getBlogPosts(lang);
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
