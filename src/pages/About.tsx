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
  {
    label: "Trailer Repairs",
    desc: "Structural and cosmetic repairs to trailers of all types — from light commercial to heavy haulage. Keeping your vehicles roadworthy and safe.",
  },
  {
    label: "Vehicle & Car Sales Repairs",
    desc: "Welding and fabrication repairs for car dealerships and private owners. Chassis work, body repairs and custom modifications carried out to a high finish.",
  },
  {
    label: "General Fabrication",
    desc: "Custom brackets, frames, gates, guards and metalwork fabricated to your exact specification — whether a one-off piece or a repeat production run.",
  },
  {
    label: "Structural & Repair Work",
    desc: "Load-bearing repairs and structural fabrication for buildings, plant equipment and machinery. Work assessed, quoted and completed properly.",
  },
  {
    label: "On-Site Mobile Welding",
    desc: "Fully equipped to come to you. Ideal for breakdowns, large items that can't be moved, or jobs that need to be completed in situ.",
  },
];

const quals = [
  { level: "Level 1", body: "City & Guilds", detail: "MIG Welding" },
  { level: "Level 2", body: "City & Guilds", detail: "MIG Welding" },
  { level: "Level 3", body: "City & Guilds", detail: "MIG Welding" },
];

const values = [
  {
    title: "City & Guilds Qualified",
    desc: "Holding Level 1, 2 and 3 City & Guilds MIG Welding qualifications. Every job is carried out by a trained professional — not an apprentice, not a subcontractor.",
  },
  {
    title: "Mobile or In-House",
    desc: "Whether you need us at your site or prefer to drop work off at the workshop, we accommodate both. No job is too awkward to reach.",
  },
  {
    title: "Done Right First Time",
    desc: "Strong, clean welds and reliable workmanship on every job. We don't cut corners and we don't leave until the work meets our standard.",
  },
  {
    title: "Honest Pricing",
    desc: "Clear quotes before any work begins. No hidden costs, no surprises on the invoice. Just straightforward pricing for straightforward work.",
  },
  {
    title: "Local & Responsive",
    desc: "Based in Tunbridge Wells, we respond quickly and keep work local where possible. Most jobs are booked and completed within a short turnaround.",
  },
  {
    title: "Commercial & Domestic",
    desc: "From one-off repairs for homeowners to ongoing fabrication contracts for businesses — we handle both with the same level of care and attention.",
  },
];

export default function About(props: { onOpenQuote?: () => void }) {
  const { onOpenQuote } = props;
  const pageRef = useReveal();

  return (
    <div ref={pageRef}>

      {/* PAGE HERO */}
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

      {/* BIO SPLIT */}
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
                  <div className="aboutQualDetail" dangerouslySetInnerHTML={{ __html: q.detail }} />
                  <div className="aboutQualBody" dangerouslySetInnerHTML={{ __html: q.body }} />
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE */}
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            <div className="aboutImgWrap">
              <img
                src="/assets/about.jpg"
                alt="Bligh Welding — welder at work"
                className="aboutImg"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div className="aboutImgPlaceholder">
                <div className="aboutImgPlaceholderText">
                  <span>YOUR PHOTO HERE</span>
                  <span className="aboutImgPlaceholderSub">Place image at <code>/public/assets/about.jpg</code></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section alt">
        <div className="aboutServicesSplit">
          <div className="aboutServicesLeft" data-reveal>
            <div className="kicker">WHAT WE COVER</div>
            <h2 className="aboutServicesHeading">Services Provided</h2>
            <p className="aboutServicesSub">
              Welding and fabrication for domestic and commercial clients
              across Tunbridge Wells and the surrounding area. Available
              on-site or from our workshop.
            </p>
          </div>
          <div className="aboutServicesList">
            {services.map((s, i) => (
              <div
                key={s.label}
                className="aboutServiceRow"
                data-reveal
                style={{ "--d": `${i * 55}ms` } as React.CSSProperties}
              >
                <div className="aboutServiceRowInner">
                  <div className="aboutServiceRowLabel">{s.label}</div>
                  <div className="aboutServiceRowDesc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
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

      {/* CTA */}
      <section className="section alt">
        <div className="sectionHead" data-reveal>
          <div className="kicker">GET IN TOUCH</div>
          <h2>Ready to Get Started?</h2>
          <p>Based in Tunbridge Wells. Serving the surrounding towns and beyond.</p>
        </div>
        <div className="contactBar" data-reveal style={{ "--d": "100ms" } as React.CSSProperties}>
          <a className="contactPill" href="tel:01234567890">01234 567890</a>
          <a className="contactPill" href="mailto:info@blighwelding.co.uk">info@blighwelding.co.uk</a>
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