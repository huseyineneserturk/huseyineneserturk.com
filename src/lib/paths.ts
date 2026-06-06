import { languages, type Lang } from "@/i18n/ui";

/** [lang] dinamik segmenti için iki dilin statik yollarını üretir. */
export function langStaticPaths() {
  return (Object.keys(languages) as Lang[]).map((lang) => ({
    params: { lang },
  }));
}
