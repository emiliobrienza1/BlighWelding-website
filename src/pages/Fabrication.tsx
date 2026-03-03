// src/pages/InHouseFabrication.tsx
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
          <div style={{ fontSize: 38, marginBottom: 10 }}>🏭</div>
          <div style={{ fontWeight: 900, fontSize: 13, letterSpacing: "0.08em" }}>YOUR PHOTO HERE</div>
          <div style={{ fontSize: 11, marginTop: 8, opacity: 0.6 }}><code>{hint}</code></div>
        </div>
      </div>
    </div>
  );
}

const useCases = [
  { icon: "🔩", label: "Fabrication Projects" },
  { icon: "🚗", label: "Vehicle Restoration & Repair" },
  { icon: "🚛", label: "Trailer Rebuilds" },
  { icon: "🏗️", label: "Structural Fabrication" },
  { icon: "⚙️", label: "Custom Metalwork" },
  { icon: "🎯", label: "Jobs Requiring Precision" },
];

const whyUs = [
  "City & Guilds qualified — Level 1, 2 & 3 MIG Welding",
  "Workshop environment for more complex, detailed work",
  "Collection and return of vehicles or items available",
  "Drop-off welcome — flexible to suit you",
  "Quality workmanship, structural integrity, attention to detail",
  "Domestic and commercial clients welcome",
];

const areas = ["Tunbridge Wells", "Tonbridge", "Sevenoaks", "Crowborough", "Uckfield", "Paddock Wood", "Maidstone", "& More"];

export default function InHouseFabrication(props: { onOpenQuote?: () => void }) {
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
              SERVICES / IN-HOUSE FABRICATION
            </div>
            <h1 className="pageHeroTitle" style={{ fontSize: 52 }}>
              In-House Welding &<br />
              <span className="accent">Fabrication</span> Workshop
            </h1>
            <p className="pageHeroSub" style={{ maxWidth: 580, fontSize: 16 }}>
              Workshop-based welding and fabrication for larger, more detailed or long-term
              projects — carried out with the same focus on quality and precision.
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
            <div className="kicker" style={{ marginBottom: 14 }}>IN-HOUSE FABRICATION</div>
            <h2 style={{ margin: "0 0 20px", fontSize: 36, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Professional Workshop Welding & Fabrication
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              For larger, more detailed or long-term projects, work can be carried out in my
              workshop. This option is ideal for fabrication projects, vehicle restoration, trailer
              rebuilds and custom metalwork that requires more time and precision.
            </p>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
              Workshop-based work allows for more involved projects that may take longer to complete
              or require additional fabrication and preparation. Every project is completed with the
              same focus on quality workmanship, structural integrity and attention to detail.
            </p>
            {onOpenQuote && (
              <button className="primaryCta" type="button" onClick={onOpenQuote}>
                Get In Touch
              </button>
            )}
          </div>

          <div data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
            <ImgSlot src="/assets/service-fabrication.jpg" alt="In-house fabrication workshop" hint="/public/assets/service-fabrication.jpg" />
          </div>
        </div>
      </section>

      {/* ── SECTION 2: USE CASES + IMAGE ── */}
      <section className="section alt">
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "center" }}>

          <div data-reveal style={{ "--d": "0ms" } as React.CSSProperties}>
            <ImgSlot src="/assets/service-fabrication2.jpg" alt="Workshop fabrication project" hint="/public/assets/service-fabrication2.jpg" />
          </div>

          <div data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
            <div className="kicker" style={{ marginBottom: 14 }}>WHAT WE WORK ON</div>
            <h2 style={{ margin: "0 0 20px", fontSize: 34, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              In-House Fabrication Services
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7, marginBottom: 22 }}>
              The workshop is set up to handle a wide variety of projects. This option is
              particularly suited to:
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

      {/* ── SECTION 3: COLLECTION / DROP-OFF + IMAGE ── */}
      <section className="section">
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "center" }}>

          <div data-reveal style={{ "--d": "0ms" } as React.CSSProperties}>
            <div className="kicker" style={{ marginBottom: 14 }}>WHY CHOOSE US</div>
            <h2 style={{ margin: "0 0 20px", fontSize: 34, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Why Choose Bligh Welding for Workshop Fabrication?
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>
              If required, I can arrange collection and return of vehicles, trailers or metalwork
              items. Alternatively, you're welcome to drop items off directly at the workshop —
              whichever works best for you.
            </p>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.75, marginBottom: 24 }}>
              Here's why customers choose Bligh Welding for their fabrication work:
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
            <ImgSlot src="/assets/service-fabrication3.jpg" alt="Workshop welding detail" hint="/public/assets/service-fabrication3.jpg" />
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
            Need Workshop Fabrication in Tunbridge Wells?
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.8, maxWidth: 640, margin: "0 auto 32px" }}>
            Whether you have a vehicle, trailer or fabrication project that needs workshop
            attention, get in touch today. Collection and return can be arranged, or simply drop
            your item off. I'll get the job done properly, to a high standard.
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