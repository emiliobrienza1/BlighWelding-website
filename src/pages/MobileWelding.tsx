// src/pages/MobileWelding.tsx
import React, { useEffect, useRef } from "react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const els = el.querySelectorAll<HTMLElement>("[data-reveal]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("isVisible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

const FRAME: React.CSSProperties = {
  borderRadius: 20,
  overflow: "hidden",
  border: "1px solid var(--border)",
  boxShadow: "0 30px 90px rgba(8,12,18,0.20)",
  background: "var(--card)",
  position: "relative",
  minHeight: 420,
};

function ImgSlot({ src, alt, hint }: { src: string; alt: string; hint: string }) {
  return (
    <div style={FRAME}>
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "saturate(0.93) contrast(1.06)" }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center", padding: 24, color: "var(--muted)", background: "var(--card)", pointerEvents: "none" }}>
        <div>
          <div style={{ fontSize: 38, marginBottom: 10 }}>🔧</div>
          <div style={{ fontWeight: 900, fontSize: 13, letterSpacing: "0.08em" }}>YOUR PHOTO HERE</div>
          <div style={{ fontSize: 11, marginTop: 8, opacity: 0.6 }}><code>{hint}</code></div>
        </div>
      </div>
    </div>
  );
}

const useCases = [
  { icon: "🚛", label: "Broken Trailers" },
  { icon: "🚗", label: "Vehicle Repairs" },
  { icon: "🚜", label: "Farm Machinery" },
  { icon: "🏗️", label: "Structural Steel Repairs" },
  { icon: "🚪", label: "Gates, Railings & Outdoor Metalwork" },
  { icon: "⚙️", label: "Plant Equipment & On-Site Machinery" },
];

const whyUs = [
  "City & Guilds qualified — Level 1, 2 & 3 MIG Welding",
  "No transport needed — I come directly to you",
  "Ideal for urgent, time-sensitive repairs",
  "Strong, clean welds carried out to a high standard",
  "Domestic and commercial clients welcome",
  "Covering Tunbridge Wells and all surrounding areas",
];

const areas = ["Tunbridge Wells", "Tonbridge", "Sevenoaks", "Crowborough", "Uckfield", "Paddock Wood", "Maidstone", "& More"];

export default function MobileWelding(props: { onOpenQuote?: () => void }) {
  const { onOpenQuote } = props;
  const pageRef = useReveal();

  return (
    <div ref={pageRef}>

      {/* ── HERO ── */}
      <section className="pageHero">
        <div className="pageHeroBg" />
        <div className="pageHeroInner" style={{ gridTemplateColumns: "1fr", padding: "96px 18px 80px" }}>
          <div data-reveal>
            <div className="kicker" style={{ color: "rgba(238,241,245,0.65)", marginBottom: 16 }}>
              SERVICES / MOBILE WELDING
            </div>
            <h1 className="pageHeroTitle" style={{ fontSize: 52 }}>
              Mobile Welding —<br />
              <span className="accent">Tunbridge Wells</span> & Surrounding Areas
            </h1>
            <p className="pageHeroSub" style={{ maxWidth: 580, fontSize: 16 }}>
              Fully mobile welding service. I come directly to your home, yard, farm or worksite —
              so your equipment stays exactly where it is.
            </p>
            <div className="heroCtas" style={{ marginTop: 10 }}>
              {onOpenQuote && (
                <button className="primaryCta" type="button" onClick={onOpenQuote}>
                  Get a Free Quote
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: INTRO + IMAGE ── */}
      <section className="section">
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "center" }}>

          <div data-reveal style={{ "--d": "0ms" } as React.CSSProperties}>
            <div className="kicker" style={{ marginBottom: 14 }}>MOBILE WELDING</div>
            <h2 style={{ margin: "0 0 20px", fontSize: 36, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Professional Mobile Welding in Tunbridge Wells
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              I provide a fully mobile welding service across Tunbridge Wells and the surrounding
              areas, coming directly to your home, yard, site or premises. Mobile welding is ideal
              for repairs and projects that can't easily be transported.
            </p>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
              Whether your vehicle has broken down on your drive, equipment has failed on site, or
              you have large machinery that can't be moved — I can carry out the welding work where
              it stands. I focus on strong, reliable welds and practical solutions that get you back
              up and running as quickly as possible.
            </p>
            {onOpenQuote && (
              <button className="primaryCta" type="button" onClick={onOpenQuote}>
                Get In Touch
              </button>
            )}
          </div>

          <div data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
            <ImgSlot src="/assets/service-mobile.jpg" alt="Mobile welder on site" hint="/public/assets/service-mobile.jpg" />
          </div>
        </div>
      </section>

      {/* ── SECTION 2: USE CASES + IMAGE ── */}
      <section className="section alt">
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "center" }}>

          <div data-reveal style={{ "--d": "0ms" } as React.CSSProperties}>
            <ImgSlot src="/assets/service-mobile2.jpg" alt="Welding trailer repair" hint="/public/assets/service-mobile2.jpg" />
          </div>

          <div data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
            <div className="kicker" style={{ marginBottom: 14 }}>WHAT WE REPAIR</div>
            <h2 style={{ margin: "0 0 20px", fontSize: 34, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Mobile Welding Services
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7, marginBottom: 22 }}>
              This service is particularly useful for urgent repairs or heavy equipment that would
              be difficult or costly to transport. Common call-outs include:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {useCases.map((u) => (
                <div
                  key={u.label}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    background: "var(--card)", backgroundImage: "var(--sheen)",
                    border: "1px solid var(--border)", borderRadius: 12,
                    padding: "11px 14px", boxShadow: "0 4px 14px rgba(8,12,18,0.08)",
                  }}
                >
                  <span style={{ fontSize: 18 }}>{u.icon}</span>
                  <span style={{ fontWeight: 800, fontSize: 13, color: "rgba(20,24,31,0.88)", lineHeight: 1.3 }}>{u.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: WHY CHOOSE ── */}
      <section className="section">
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "center" }}>

          <div data-reveal style={{ "--d": "0ms" } as React.CSSProperties}>
            <div className="kicker" style={{ marginBottom: 14 }}>WHY CHOOSE US</div>
            <h2 style={{ margin: "0 0 20px", fontSize: 34, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Why Choose Bligh Welding as Your Mobile Welder?
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.75, marginBottom: 24 }}>
              I've carried out mobile welding work for domestic and commercial clients across
              Tunbridge Wells and the surrounding towns. Here's why customers choose me:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              {whyUs.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "grid", gridTemplateColumns: "28px 1fr", gap: 12,
                    alignItems: "center", fontSize: 14, fontWeight: 700,
                    color: "rgba(20,24,31,0.84)",
                  }}
                >
                  <span style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: "var(--blue)", border: "1px solid rgba(18,24,32,0.14)",
                    display: "grid", placeItems: "center", fontSize: 12, fontWeight: 900,
                    color: "#0f141b",
                  }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
            <ImgSlot src="/assets/service-mobile3.jpg" alt="Welder carrying out on-site repair" hint="/public/assets/service-mobile3.jpg" />
          </div>
        </div>
      </section>

      {/* ── SECTION 4: CLOSING CTA ── */}
      <section className="section alt">
        <div
          data-reveal
          style={{
            maxWidth: 860, margin: "0 auto", textAlign: "center",
            background: "var(--card)", backgroundImage: "var(--sheen)",
            border: "1px solid var(--border)", borderRadius: 24,
            boxShadow: "0 30px 90px rgba(8,12,18,0.18)",
            padding: "52px 48px",
          }}
        >
          <div className="kicker" style={{ marginBottom: 16 }}>GET IN TOUCH</div>
          <h2 style={{ margin: "0 0 18px", fontSize: 36, letterSpacing: "-0.02em" }}>
            Need a Mobile Welder in Tunbridge Wells?
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.8, maxWidth: 640, margin: "0 auto 32px" }}>
            If you're searching for a mobile welder in Tunbridge Wells or any of the surrounding
            areas, get in touch today. Whether it's an urgent breakdown or a planned repair, I'll
            provide a prompt, professional service and get the job done right.
          </p>

          <div className="contactBar" style={{ marginBottom: 32 }}>
            <a className="contactPill" href="tel:+15551234567">
              📞 (555) 123-4567
            </a>
            <a className="contactPill" href="mailto:info@blighwelding.co.uk">
              ✉️ info@blighwelding.co.uk
            </a>
            {onOpenQuote && (
              <button className="heroQuoteBtn" type="button" onClick={onOpenQuote}>
                ✉ Request a Quote
              </button>
            )}
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24 }}>
            <div className="kicker" style={{ marginBottom: 14 }}>AREAS COVERED</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {areas.map((t) => (
                <span key={t} className="badge" style={{ fontSize: 12, padding: "7px 12px", fontWeight: 700 }}>
                  📍 {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}