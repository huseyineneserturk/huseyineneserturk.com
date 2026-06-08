// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Yayınlanacak alan adı. Hostinger'dan alıp DigitalOcean App Platform'a
// bağlandıktan sonra burası birincil (www'lu) alan adı olarak kalmalı.
const SITE = "https://www.huseyineneserturk.com";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  i18n: {
    locales: ["tr", "en"],
    defaultLocale: "tr",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "tr",
        locales: { tr: "tr-TR", en: "en-US" },
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      // Tema ile uyumlu, "mahzen" hissi veren koyu kod teması.
      theme: "css-variables",
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
