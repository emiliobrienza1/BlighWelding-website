// src/pages/About.tsx
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
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

const services = [
  { icon: "🚛", label: "Trailer Repairs" },
  { icon: "🚗", label: "Vehicle & Car Sales Repairs" },
  { icon: "🔩", label: "General Fabrication" },
  { icon: "🏗️", label: "Structural & Repair Work" },
  { icon: "📍", label: "On-Site Mobile Welding" },
];

const quals = [
  { level: "Level 1", body: "City & Guilds", detail: "MIG Welding" },
  { level: "Level 2", body: "City & Guilds", detail: "MIG Welding" },
  { level: "Level 3", body: "City & Guilds", detail: "MIG Welding" },
];

export default function About(props: { onOpenQuote?: () => void }) {
  const { onOpenQuote } = props;
  const pageRef = useReveal();

  return (
    <div ref={pageRef}>

      {/* PAGE HERO */}
      <section className="pageHero" style={{ minHeight: 320 }}>
        <div className="pageHeroBg" />
        <div className="pageHeroInner" style={{ gridTemplateColumns: "1fr", padding: "80px 18px" }}>
          <div data-reveal>
            <div className="kicker" style={{ color: "rgba(238,241,245,0.70)", marginBottom: 14 }}>
              ABOUT BLIGH WELDING
            </div>
            <h1 className="pageHeroTitle">
              Qualified Welding &<br />
              Fabrication in <span className="accent">Tunbridge Wells</span>
            </h1>
            <p className="pageHeroSub">
              Mobile welding and in-house fabrication — carried out to a high professional standard,
              first time, every time.
            </p>
            {onOpenQuote && (
              <button className="primaryCta" type="button" onClick={onOpenQuote} style={{ marginTop: 4 }}>
                Get a Quote
              </button>
            )}
          </div>
        </div>
      </section>

      {/* MAIN BIO SPLIT */}
      <section className="section">
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 28, alignItems: "center" }}>

          <div data-reveal style={{ "--d": "0ms" } as React.CSSProperties}>
            <div className="kicker" style={{ marginBottom: 14 }}>WHO WE ARE</div>
            <h2 style={{ margin: "0 0 18px", fontSize: 36, letterSpacing: "-0.02em" }}>
              About Bligh Welding
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7, marginBottom: 14 }}>
              I'm a qualified welder based in Tunbridge Wells, offering both mobile welding services
              and in-house fabrication from my workshop. I take pride in producing strong, clean welds
              and carrying out work to a high professional standard.
            </p>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
              Whether the job is carried out at your location or in my workshop, I focus on
              reliability, quality workmanship and getting the job done properly the first time.
            </p>

            <div className="kicker" style={{ marginBottom: 12 }}>QUALIFICATIONS</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {quals.map((q) => (
                <div key={q.level} style={{ background: "var(--card)", backgroundImage: "var(--sheen)", border: "1px solid var(--border)", borderRadius: 14, padding: "12px 16px", boxShadow: "var(--shadow)", minWidth: 130 }}>
                  <div style={{ fontWeight: 900, fontSize: 15, color: "rgba(20,24,31,0.96)", marginBottom: 2 }}>{q.level}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 700 }}>{q.detail}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{q.body}</div>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE SLOT */}
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid var(--border)", boxShadow: "0 30px 90px rgba(8,12,18,0.22)", background: "var(--card)", position: "relative", minHeight: 400 }}>
              <img
                src="/assets/about.jpg"
                alt="Bligh Welding — welder at work"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "saturate(0.93) contrast(1.05)" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center", padding: 24, color: "var(--muted)", background: "var(--card)", pointerEvents: "none" }}>
                <div>
                  <div style={{ fontSize: 42, marginBottom: 12 }}>🔧</div>
                  <div style={{ fontWeight: 900, letterSpacing: "0.06em", fontSize: 14 }}>YOUR PHOTO HERE</div>
                  <div style={{ fontSize: 12, marginTop: 8, opacity: 0.7 }}>Place image at <code>/public/assets/about.jpg</code></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="section alt">
        <div className="sectionHead" data-reveal>
          <div className="kicker">WHAT WE COVER</div>
          <h2>Services Provided</h2>
          <p>Welding for domestic and commercial clients across Tunbridge Wells and surrounding towns.</p>
        </div>
        <div style={{ maxWidth: 1100, margin: "28px auto 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16 }}>
          {services.map((s, i) => (
            <div key={s.label} className="whyCard" data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
              <div className="whyIcon" style={{ fontSize: 22 }}>{s.icon}</div>
              <div className="whyTitle">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="section">
        <div className="sectionHead" data-reveal>
          <div className="kicker">OUR PROMISE</div>
          <h2>Why Choose Bligh Welding</h2>
        </div>
        <div style={{ maxWidth: 1100, margin: "28px auto 0", display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 18 }}>
          {[
            { icon: "🏅", title: "City & Guilds Qualified", desc: "Holding Level 1, 2 and 3 MIG Welding qualifications — your job is always in professional hands." },
            { icon: "📍", title: "Mobile or In-House", desc: "We come to you, or you bring the work to our workshop. Whatever suits your project best." },
            { icon: "✅", title: "Done Right First Time", desc: "Strong, clean welds and reliable workmanship. No shortcuts, no excuses." },
          ].map((v, i) => (
            <div key={v.title} className="whyCard" data-reveal style={{ "--d": `${i * 100}ms` } as React.CSSProperties}>
              <div className="whyIcon" style={{ fontSize: 22 }}>{v.icon}</div>
              <div className="whyTitle">{v.title}</div>
              <div className="whyDesc">{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section alt">
        <div className="sectionHead" data-reveal>
          <div className="kicker">GET IN TOUCH</div>
          <h2>Ready to Get Started?</h2>
          <p>Based in Tunbridge Wells. Serving the surrounding towns and beyond.</p>
        </div>
        <div className="contactBar" data-reveal style={{ "--d": "100ms" } as React.CSSProperties}>
          <a className="contactPill" href="tel:+15551234567">📞 (555) 123-4567</a>
          <a className="contactPill" href="mailto:info@blighwelding.co.uk">✉️ info@blighwelding.co.uk</a>
          {onOpenQuote && (
            <button className="heroQuoteBtn" type="button" onClick={onOpenQuote} style={{ height: 46, padding: "0 22px", fontSize: 14 }}>
              ✉ Request a Quote
            </button>
          )}
        </div>
      </section>

    </div>
  );
}