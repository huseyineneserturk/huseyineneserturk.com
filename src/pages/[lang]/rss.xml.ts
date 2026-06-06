import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getBlogPosts, entrySlug } from "@/lib/content";
import { languages, ui, type Lang } from "@/i18n/ui";

export function getStaticPaths() {
  return (Object.keys(languages) as Lang[]).map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang;
  const posts = await getBlogPosts(lang);

  return rss({
    title: `${ui[lang]["site.title"]} — ${ui[lang]["blog.title"]}`,
    description: ui[lang]["blog.subtitle"],
    site: context.site ?? "https://huseyineneserturk.com",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/${lang}/blog/${entrySlug(post.id)}/`,
      categories: post.data.tags,
    })),
    customData: `<language>${lang === "tr" ? "tr-TR" : "en-US"}</language>`,
  });
}
