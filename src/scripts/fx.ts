// ════════════════════════════════════════════════════════════════
// Codex FX motoru — scroll-reveal, 3B tilt, özel imleç, hero parallax,
// okuma ilerleme çubuğu. Hepsi prefers-reduced-motion'a saygılı ve
// Astro View Transitions ile (astro:page-load) yeniden başlatılır.
// ════════════════════════════════════════════════════════════════

const reduceMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => window.matchMedia("(pointer: fine)").matches;

// ---- 1) Scroll-reveal -------------------------------------------------
let revealObserver: IntersectionObserver | null = null;
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.revealed)");
  if (!els.length) return;
  if (reduceMotion()) {
    els.forEach((el) => el.classList.add("revealed"));
    return;
  }
  revealObserver?.disconnect();
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          const delay = el.dataset.revealDelay;
          if (delay) el.style.transitionDelay = `${delay}ms`;
          el.classList.add("revealed");
          revealObserver?.unobserve(el);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  els.forEach((el) => revealObserver!.observe(el));
}

// ---- 2) 3B tilt -------------------------------------------------------
function initTilt() {
  if (reduceMotion() || !finePointer()) return;
  document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
    if (card.dataset.tiltBound) return;
    card.dataset.tiltBound = "1";
    let raf = 0;
    const max = 7; // derece
    const onMove = (ev: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width - 0.5;
      const py = (ev.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-4px)`;
        card.style.setProperty("--mx", `${((px + 0.5) * 100).toFixed(1)}%`);
        card.style.setProperty("--my", `${((py + 0.5) * 100).toFixed(1)}%`);
      });
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      card.style.transform = "";
    };
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", reset);
  });
}

// ---- 3) Özel imleç (rün/kıvılcım) — yalnızca masaüstü ----------------
function initCursor() {
  if (reduceMotion() || !finePointer()) return;
  if (document.getElementById("codex-cursor")) return;
  const dot = document.createElement("div");
  dot.id = "codex-cursor";
  dot.setAttribute("aria-hidden", "true");
  document.body.appendChild(dot);
  let x = innerWidth / 2,
    y = innerHeight / 2,
    cx = x,
    cy = y;
  addEventListener(
    "pointermove",
    (e) => {
      x = e.clientX;
      y = e.clientY;
      if (e.target instanceof Element && e.target.closest("a,button,[data-tilt],input"))
        dot.classList.add("hot");
      else dot.classList.remove("hot");
    },
    { passive: true },
  );
  const loop = () => {
    cx += (x - cx) * 0.18;
    cy += (y - cy) * 0.18;
    dot.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

// ---- 4) Hero parallax (devre fareyle kayar) --------------------------
function initHeroParallax() {
  if (reduceMotion() || !finePointer()) return;
  const hero = document.querySelector<HTMLElement>(".hero");
  const layer = hero?.querySelector<HTMLElement>(".filigree");
  if (!hero || !layer || hero.dataset.pxBound) return;
  hero.dataset.pxBound = "1";
  let raf = 0;
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      layer.style.transform = `translate(${px * 18}px, ${py * 14}px)`;
    });
  });
  hero.addEventListener("pointerleave", () => {
    cancelAnimationFrame(raf);
    layer.style.transform = "";
  });
}

// ---- 5) Okuma ilerleme çubuğu (blog) ---------------------------------
function initReadingProgress() {
  const bar = document.getElementById("reading-progress");
  if (!bar) return;
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = max > 0 ? (h.scrollTop / max) * 100 : 0;
    bar.style.width = `${p}%`;
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ---- 6) Tema değiştirici (VT sonrası da çalışsın) --------------------
function initThemeToggle() {
  const btn = document.getElementById("theme-toggle") as HTMLElement | null;
  if (!btn || btn.dataset.bound) return;
  btn.dataset.bound = "1";
  btn.addEventListener("click", () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.classList.add("theme-shift");
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("codex-theme", next);
    } catch {}
    window.setTimeout(() => root.classList.remove("theme-shift"), 600);
  });
}

// ---- 7) Mobil menü (VT sonrası da çalışsın) --------------------------
function initMenu() {
  const toggle = document.getElementById("menu-toggle") as HTMLElement | null;
  const nav = document.getElementById("mobile-nav");
  if (!toggle || !nav || toggle.dataset.bound) return;
  toggle.dataset.bound = "1";
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  // Bir bağlantıya tıklanınca menüyü kapat
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }),
  );
}

// ---- 8) Mini okçular → oklar İletişime Geç'te birleşir ---------------
function initArchery() {
  const hero = document.querySelector<HTMLElement>(".hero");
  if (!hero || hero.dataset.archeryBound) return;
  const archery = hero.querySelector<HTMLElement>(".archery");
  const aL = hero.querySelector<HTMLElement>(".archer-l");
  const aR = hero.querySelector<HTMLElement>(".archer-r");
  const arrowL = hero.querySelector<HTMLElement>(".arrow-l");
  const arrowR = hero.querySelector<HTMLElement>(".arrow-r");
  const spark = hero.querySelector<HTMLElement>(".hit-spark");
  const btn = document.getElementById("cta-contact");
  if (!archery || !aL || !aR || !arrowL || !arrowR || !spark || !btn) return;
  hero.dataset.archeryBound = "1";

  const shoot = (arrow: HTMLElement, from: HTMLElement) => {
    const hr = hero.getBoundingClientRect();
    const fr = from.getBoundingClientRect();
    const br = btn.getBoundingClientRect();
    const fx = fr.left + fr.width / 2 - hr.left;
    const fy = fr.top + fr.height / 2 - hr.top;
    const tx = br.left + br.width / 2 - hr.left;
    const ty = br.top + br.height / 2 - hr.top;
    const ang = (Math.atan2(ty - fy, tx - fx) * 180) / Math.PI;
    arrow.style.transition = "none";
    arrow.style.opacity = "0";
    arrow.style.transform = `translate(${fx - 13}px, ${fy - 4}px) rotate(${ang}deg)`;
    void arrow.offsetWidth; // reflow
    arrow.style.transition = "transform 1s cubic-bezier(.45,.05,.55,.95), opacity .25s";
    arrow.style.opacity = "1";
    arrow.style.transform = `translate(${tx - 13}px, ${ty - 4}px) rotate(${ang}deg)`;
  };

  const fire = () => {
    if (reduceMotion() || !archery.offsetParent) return; // gizli/mobil → atla
    shoot(arrowL, aL);
    shoot(arrowR, aR);
    window.setTimeout(() => {
      const hr = hero.getBoundingClientRect();
      const br = btn.getBoundingClientRect();
      spark.style.transform = `translate(${br.left + br.width / 2 - hr.left}px, ${br.top + br.height / 2 - hr.top}px)`;
      spark.classList.remove("burst");
      void spark.offsetWidth;
      spark.classList.add("burst");
      btn.classList.add("struck");
      arrowL.style.opacity = "0";
      arrowR.style.opacity = "0";
      window.setTimeout(() => btn.classList.remove("struck"), 650);
    }, 1000);
  };

  window.setTimeout(fire, 1500);
  window.setInterval(fire, 5800);
}

// ---- 9) Mum mührü "başa dön" butonu ----------------------------------
function initToTop() {
  const btn = document.getElementById("to-top");
  if (!btn || btn.dataset.bound) return;
  btn.dataset.bound = "1";
  const onScroll = () => {
    btn.classList.toggle("show", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion() ? "auto" : "smooth" });
  });
}

// Güvenlik ağı: herhangi bir hata olursa içerik asla gizli kalmasın
function revealAllFallback() {
  document
    .querySelectorAll<HTMLElement>("[data-reveal]:not(.revealed)")
    .forEach((el) => el.classList.add("revealed"));
}

// ---- başlat ----------------------------------------------------------
function initFx() {
  const steps = [
    initReveal,
    initTilt,
    initCursor,
    initHeroParallax,
    initReadingProgress,
    initThemeToggle,
    initMenu,
    initArchery,
    initToTop,
  ];
  for (const step of steps) {
    try {
      step();
    } catch (e) {
      console.warn("[fx]", e);
    }
  }
  // Observer bir şeyi kaçırırsa 3 sn sonra her şeyi görünür yap
  window.setTimeout(revealAllFallback, 3000);
}

document.addEventListener("astro:page-load", initFx);
// ClientRouter yoksa / ilk yükleme güvencesi:
if (document.readyState !== "loading") initFx();
else document.addEventListener("DOMContentLoaded", initFx);
