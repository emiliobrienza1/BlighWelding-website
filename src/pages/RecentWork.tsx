// src/pages/RecentWork.tsx
import { useEffect, useMemo, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   Vite glob import
───────────────────────────────────────────────────────────────────────────── */
const imageModules = import.meta.glob("../assets/recentwork/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
}) as Record<string, { default: string }>;

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */
type SingleItem = { kind: "single"; src: string; name: string };
type PairItem   = { kind: "pair"; beforeSrc: string; afterSrc: string; name: string };
type GalleryItem = SingleItem | PairItem;

/* ─────────────────────────────────────────────────────────────────────────────
   Build items — pair "Xbefore.*" with "Xafter.*", rest are singles
───────────────────────────────────────────────────────────────────────────── */
function buildItems(): GalleryItem[] {
  const entries = Object.entries(imageModules).map(([path, mod]) => {
    const filename = path.split("/").pop() ?? path;
    return { filename, src: mod.default, lower: filename.toLowerCase() };
  });

  entries.sort((a, b) => a.lower.localeCompare(b.lower, undefined, { numeric: true }));

  const afterMap:  Record<string, string> = {};
  const beforeMap: Record<string, string> = {};
  const singles:   { filename: string; src: string }[] = [];

  for (const e of entries) {
    const a = e.lower.match(/^(.+?)after(\..+)$/);
    const b = e.lower.match(/^(.+?)before(\..+)$/);
    if (a)      afterMap[a[1]]  = e.src;
    else if (b) beforeMap[b[1]] = e.src;
    else        singles.push(e);
  }

  const items: GalleryItem[] = [];

  // Pairs — only if both before AND after exist
  for (const [base, afterSrc] of Object.entries(afterMap)) {
    const beforeSrc = beforeMap[base];
    if (beforeSrc) {
      items.push({ kind: "pair", beforeSrc, afterSrc, name: base });
    } else {
      items.push({ kind: "single", src: afterSrc, name: base + "after" });
    }
  }

  // Pure singles
  for (const s of singles) {
    items.push({ kind: "single", src: s.src, name: s.filename });
  }

  return items;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Scroll reveal
───────────────────────────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
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
      { threshold: 0.10, rootMargin: "0px 0px -4% 0px" }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  });
}

/* ─────────────────────────────────────────────────────────────────────────────
   Lightbox — single image OR before/after side by side
───────────────────────────────────────────────────────────────────────────── */
function Lightbox({
  items, index, onClose, onPrev, onNext,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   onPrev();
      if (e.key === "ArrowRight")  onNext();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="rwLightbox" role="dialog" aria-modal="true" aria-label="Image preview">
      <button className="rwBackdrop" onClick={onClose} aria-label="Close preview" type="button" />

      <div className="rwFrame">
        <button className="rwClose" onClick={onClose} aria-label="Close" type="button">&#10005;</button>

        <button
          className="rwNav rwPrev"
          onClick={onPrev}
          aria-label="Previous"
          disabled={index === 0}
          type="button"
        >&#8249;</button>

        {item.kind === "pair" ? (
          <div className="rwPairContent">
            <div className="rwPairImages">
              <div className="rwPairSide">
                <div className="rwPairLabel">Before</div>
                <img src={item.beforeSrc} alt="Before" />
              </div>
              <div className="rwPairDivider" />
              <div className="rwPairSide">
                <div className="rwPairLabel">After</div>
                <img src={item.afterSrc} alt="After" />
              </div>
            </div>
          </div>
        ) : (
          <img className="rwFull" src={(item as SingleItem).src} alt="Recent work preview" />
        )}

        <button
          className="rwNav rwNext"
          onClick={onNext}
          aria-label="Next"
          disabled={index === items.length - 1}
          type="button"
        >&#8250;</button>

        <div className="rwMeta">{index + 1} / {items.length}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────────────── */
export default function RecentWork() {
  const items = useMemo(() => buildItems(), []);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useReveal();

  const open  = (i: number) => setActiveIndex(i);
  const close = () => setActiveIndex(null);
  const prev  = () => setActiveIndex((v) => (v !== null ? Math.max(v - 1, 0) : null));
  const next  = () => setActiveIndex((v) => (v !== null ? Math.min(v + 1, items.length - 1) : null));

  return (
    <main className="section">
      <div className="sectionHead">
        <div className="kicker">RECENT WORK</div>
        <h2>Gallery</h2>
        <p>
          Selected welding and fabrication projects. Click any image to enlarge
          {items.some(i => i.kind === "pair") && " — before & after projects show both photos side by side"}.
        </p>
      </div>

      <div className="rwGrid">
        {items.map((item, idx) => {
          const thumbSrc = item.kind === "pair" ? item.afterSrc : item.src;
          return (
            <button
              key={item.name}
              className="rwTile"
              onClick={() => open(idx)}
              aria-label={item.kind === "pair" ? "View before & after" : "Open image"}
              type="button"
            >
              <div
                className="rwMedia"
                data-reveal
                style={{ "--d": `${(idx % 6) * 40}ms` } as React.CSSProperties}
              >
                <img className="rwImg" src={thumbSrc} alt="Recent work" loading="lazy" />
                <div className="rwOverlay" />
                {item.kind === "pair" && (
                  <span className="rwPairPip">B / A</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {activeIndex !== null && (
        <Lightbox
          items={items}
          index={activeIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}

      {/* Pair lightbox extra styles — scoped here so they don't pollute global */}
      <style>{`
        .rwPairContent {
          width: 100%;
          background: #e9edf2;
        }
        .rwPairImages {
          display: flex;
          align-items: stretch;
          width: 100%;
          max-height: 78vh;
        }
        .rwPairSide {
          flex: 1;
          min-width: 0;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .rwPairSide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          flex: 1;
          min-height: 0;
        }
        .rwPairLabel {
          position: absolute;
          bottom: 48px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 4;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.95);
          background: rgba(14,18,24,0.52);
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 6px;
          padding: 4px 10px;
          backdrop-filter: blur(6px);
          white-space: nowrap;
          pointer-events: none;
        }
        .rwPairDivider {
          width: 2px;
          background: rgba(255,255,255,0.60);
          flex-shrink: 0;
          box-shadow: 0 0 8px rgba(0,0,0,0.20);
        }
        .rwPairPip {
          position: absolute;
          top: 10px;
          right: 10px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(20,24,31,0.80);
          background: linear-gradient(180deg, rgba(255,255,255,0.90) 0%, rgba(210,216,224,0.70) 100%);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 3px 7px;
          box-shadow: 0 2px 6px rgba(8,12,18,0.10);
          pointer-events: none;
        }
        @media (max-width: 600px) {
          .rwPairImages { flex-direction: column; max-height: none; }
          .rwPairDivider { width: 100%; height: 2px; }
          .rwPairLabel { bottom: 12px; }
        }
      `}</style>
    </main>
  );
}
