// src/pages/About.tsx
import React, { useEffect, useRef, useState } from "react";

// ── Weld photos ──────────────────────────────────────────
import weld1 from '../assets/weld1.png';
import weld2 from '../assets/weld2.png';
import weld3 from '../assets/weld3.png';
import weld4 from '../assets/weld4.png';
import weld5 from '../assets/weld5.png';
import weld6 from '../assets/weld6.png';
import weld7 from '../assets/weld7.png';
import weld8 from '../assets/weld8.png';
import weld9 from '../assets/weld9.png';
import about from '../assets/about.jpg';

const weldPhotos = [weld1, weld2, weld3, weld4, weld5, weld6, weld7, weld8, weld9];

// ── Reveal hook ──────────────────────────────────────────
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
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Lightbox ─────────────────────────────────────────────
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="aboutLightbox" onClick={onClose}>
      <div className="aboutLightboxInner" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt="Weld detail" className="aboutLightboxImg" />
        <button className="aboutLightboxClose" onClick={onClose} aria-label="Close">
          &#10005;
        </button>
      </div>
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────
const quals = [
  { level: "Level 1", body: "City & Guilds", detail: "MIG Welding" },
  { level: "Level 2", body: "City & Guilds", detail: "MIG Welding" },
  { level: "Level 3", body: "City & Guilds", detail: "MIG Welding" },
];

const values = [
  {
    title: "City & Guilds Qualified",
    desc: "Holding Level 1, 2 and 3 City & Guilds MIG Welding qualifications. Every job carried out by a trained professional.",
  },
  {
    title: "Mobile or In-House",
    desc: "We come to you or you drop off — whichever works best. No job is too awkward.",
  },
  {
    title: "Done Right First Time",
    desc: "Strong, clean welds on every job. We don't leave until the work meets our standard.",
  },
  {
    title: "Honest Pricing",
    desc: "Clear quotes before any work begins. No hidden costs, no surprises on the invoice.",
  },
  {
    title: "Local & Responsive",
    desc: "Based in Tunbridge Wells, quick response times, most jobs booked within short turnaround.",
  },
  {
    title: "Commercial & Domestic",
    desc: "One-off repairs for homeowners or ongoing contracts for businesses — same care and attention.",
  },
];

export default function About(props: { onOpenQuote?: () => void }) {
  const { onOpenQuote } = props;
  const pageRef = useReveal();
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <div ref={pageRef}>
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}

      {/* ── PAGE HERO ──────────────────────────────────────── */}
      <section className="pageHero">
        <div className="pageHeroBg" />
        <div className="pageHeroInner" style={{ gridTemplateColumns: "1fr" }}>
          <div data-reveal>
            <div className="kicker">ABOUT BLIGH WELDING</div>
            <h1 className="pageHeroTitle">
              Qualified Welding &amp; Fabrication<br />
              in <span className="accent">Tunbridge Wells</span>
            </h1>
            <p className="pageHeroSub">
              Mobile welding and in-house fabrication — carried out to a high professional
              standard, first time, every time.
            </p>
            {onOpenQuote && (
              <button className="btnSolid" type="button" onClick={onOpenQuote}>
                Get a Quote
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── BIO SPLIT ──────────────────────────────────────── */}
      <section className="section">
        <div className="aboutSplit">
          <div data-reveal style={{ "--d": "0ms" } as React.CSSProperties}>
            <div className="kicker">WHO WE ARE</div>
            <h2 className="aboutBioHeading">About Bligh Welding</h2>
            <p className="aboutBioPara">
              I'm a qualified welder based in Tunbridge Wells, offering both mobile welding
              services and in-house fabrication from my workshop. I take pride in producing
              strong, clean welds and carrying out work to a high professional standard.
            </p>
            <p className="aboutBioPara">
              Whether the job is carried out at your location or in my workshop, I focus on
              reliability, quality workmanship and getting the job done properly the first time.
            </p>
            <div className="kicker" style={{ marginTop: 32, marginBottom: 14 }}>QUALIFICATIONS</div>
            <div className="aboutQuals">
              {quals.map((q) => (
                <div key={q.level} className="aboutQualCard">
                  <div className="aboutQualLevel">{q.level}</div>
                  <div className="aboutQualDetail">{q.detail}</div>
                  <div className="aboutQualBody">{q.body}</div>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            <div className="aboutImgWrap">
              <img
                src="src/assets/about.jpg"
                alt="Bligh Welding — welder at work"
                className="aboutImg"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── WELD QUALITY SECTION ───────────────────────────── */}
      <section className="section alt aboutQualitySection">

        {/* Header */}
        <div className="aboutQualityHead" data-reveal>
          <div className="kicker">QUALITY ASSURANCE</div>
          <h2 className="aboutQualityTitle">City &amp; Guilds Standard — Every Weld</h2>
          <p className="aboutQualityIntro">
            Holding Level 1, 2 &amp; 3 City &amp; Guilds MIG Welding qualifications means every
            piece of work is held to a nationally recognised professional standard. It's not just
            a certificate — it's a method. Welds are assessed on penetration depth, bead
            consistency, structural integrity and surface finish. The qualification process demands
            that work is tested under real conditions to prove it performs.
          </p>
        </div>

        {/* 9-photo weld grid */}
        <div className="aboutWeldGrid">
          {weldPhotos.map((src, i) => (
            <button
              key={i}
              type="button"
              className="aboutWeldTile"
              data-reveal
              style={{ "--d": `${i * 55}ms` } as React.CSSProperties}
              onClick={() => setLightboxSrc(src)}
              aria-label={`View weld photo ${i + 1}`}
            >
              <img src={src} alt={`Weld sample ${i + 1}`} className="aboutWeldImg" />
              <div className="aboutWeldOverlay">
                <span className="aboutWeldZoom">&#8599;</span>
              </div>
            </button>
          ))}
        </div>

        {/* Statement bar — below the grid */}
        <div
          className="aboutTestStatement"
          data-reveal
          style={{ "--d": "80ms" } as React.CSSProperties}
        >
          <div className="aboutTestStatementInner">
            <p>
              All welds strength-tested, pressure-tested and acid-tested for reliability
              to pass City &amp; Guilds standard.
            </p>
          </div>
        </div>

      </section>

      {/* ── VALUES GRID ────────────────────────────────────── */}
      <section className="section">
        <div className="sectionHead" data-reveal>
          <div className="kicker">OUR PROMISE</div>
          <h2>Why Choose Bligh Welding</h2>
        </div>
        <div className="aboutValuesGrid">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="aboutValueCard"
              data-reveal
              style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
            >
              <div className="aboutValueTitle">{v.title}</div>
              <div className="aboutValueDesc">{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="section alt">
        <div className="sectionHead" data-reveal>
          <div className="kicker">GET IN TOUCH</div>
          <h2>Ready to Get Started?</h2>
          <p>Based in Tunbridge Wells. Serving the surrounding towns and beyond.</p>
        </div>
        <div
          className="contactBar"
          data-reveal
          style={{ "--d": "100ms" } as React.CSSProperties}
        >
          <a className="contactPill" href="tel:07399220338">07399 220 338</a>
          <a className="contactPill" href="mailto:info@blighwelding.co.uk">
            info@blighwelding.co.uk
          </a>
          {onOpenQuote && (
            <button className="btnSolid" type="button" onClick={onOpenQuote}>
              Request a Quote
            </button>
          )}
        </div>
      </section>

    </div>
  );
}