// src/pages/RecentWork.tsx
import { useEffect, useMemo, useState } from "react";

/**
 * Vite: automatically import all images from a folder.
 * Put your gallery images in: src/assets/recentwork/
 * Supported: png, jpg, jpeg, webp, svg
 */
const imageModules = import.meta.glob("../assets/recentwork/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
}) as Record<string, { default: string }>;

type GalleryItem = {
  src: string;
  name: string;
};

function buildGalleryItems(): GalleryItem[] {
  const entries = Object.entries(imageModules).map(([path, mod]) => {
    const name = path.split("/").pop() ?? path;
    return { src: mod.default, name };
  });

  // Sort by filename (e.g. 01.jpg, 02.jpg ...)
  entries.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  return entries;
}

function useRevealOnScroll(selector = "[data-reveal]") {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("isVisible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [selector]);
}

export default function RecentWork() {
  const items = useMemo(() => buildGalleryItems(), []);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useRevealOnScroll();

  const close = () => setActiveIndex(null);
  const open = (idx: number) => setActiveIndex(idx);

  // lock body scroll while lightbox open
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  // keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setActiveIndex((v) => (v === null ? null : Math.min(v + 1, items.length - 1)));
      if (e.key === "ArrowLeft") setActiveIndex((v) => (v === null ? null : Math.max(v - 1, 0)));
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, items.length]);

  return (
    <main className="section">
      <div className="sectionHead">
        <div className="kicker">RECENT WORK</div>
        <h2>Gallery</h2>
        <p>Selected welding and fabrication projects. Click any image to enlarge.</p>
      </div>

      <div className="rwGrid">
        {items.map((it, idx) => (
          <button
            key={it.name}
            className="rwTile"
            onClick={() => open(idx)}
            aria-label="Open image"
            type="button"
          >
            <div
              className="rwMedia"
              data-reveal
              style={{ ["--d" as any]: `${idx * 40}ms` }}
            >
              <img className="rwImg" src={it.src} alt="Recent work" loading="lazy" />
              <div className="rwOverlay" />
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="rwLightbox" role="dialog" aria-modal="true" aria-label="Image preview">
          <button className="rwBackdrop" onClick={close} aria-label="Close preview" type="button" />

          <div className="rwFrame">
            <button className="rwClose" onClick={close} aria-label="Close" type="button">
              ✕
            </button>

            <button
              className="rwNav rwPrev"
              onClick={() => setActiveIndex((v) => (v === null ? null : Math.max(v - 1, 0)))}
              aria-label="Previous image"
              disabled={activeIndex === 0}
              type="button"
            >
              ‹
            </button>

            <img className="rwFull" src={items[activeIndex].src} alt="Recent work preview" />

            <button
              className="rwNav rwNext"
              onClick={() => setActiveIndex((v) => (v === null ? null : Math.min(v + 1, items.length - 1)))}
              aria-label="Next image"
              disabled={activeIndex === items.length - 1}
              type="button"
            >
              ›
            </button>

            <div className="rwMeta">
              {activeIndex + 1} / {items.length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}