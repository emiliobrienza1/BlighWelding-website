// src/pages/MobileWelding.tsx
import React, { useEffect, useRef } from "react";
import mobileWeld1 from "../assets/mobileweld1.jpg";

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

function ImgSlot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mwImgWrap">
      <img src={src} alt={alt} className="mwImg" />
    </div>
  );
}

const useCases = [
  {
    label: "Vehicle Repairs",
    desc: "Chassis work, cracks, reinforcement and structural welding.",
  },
  {
    label: "Farm Machinery",
    desc: "Repairs to agricultural equipment, brackets, arms and worn components.",
  },
  {
    label: "Structural Steel Repairs",
    desc: "On-site repair of damaged or weakened steel sections.",
  },
  {
    label: "Gates, Railings & Outdoor Metalwork",
    desc: "Breakages, hinge replacements, reinforcement and restoration.",
  },
  {
    label: "Plant Equipment & On-Site Machinery",
    desc: "Repairs to diggers, attachments, buckets and site equipment.",
  },
];

const whyUs = [
  "City & Guilds qualified — Level 1, 2 & 3 MIG Welding",
  "No transport needed — we come directly to you",
  "Ideal for urgent, time-sensitive repairs",
  "Strong, clean welds carried out to a high standard",
  "Domestic and commercial clients welcome",
  "Covering Tunbridge Wells and all surrounding areas",
];

const areas = [
  "Tunbridge Wells", "Tonbridge", "Sevenoaks", "Crowborough",
  "Uckfield", "Paddock Wood", "Maidstone", "& More",
];

export default function MobileWelding(props: { onOpenQuote?: () => void }) {
  const { onOpenQuote } = props;
  const pageRef = useReveal();

  return (
    <div ref={pageRef}>

      {/* HERO */}
      <section className="pageHero">
        <div className="pageHeroBg" />
        <div className="pageHeroInner" style={{ gridTemplateColumns: "1fr" }}>
          <div data-reveal>
            <div className="kicker">SERVICES / MOBILE WELDING</div>
            <h1 className="pageHeroTitle">
              Mobile Welding &mdash;<br />
              <span className="accent">Tunbridge Wells</span> &amp; Surrounding Areas
            </h1>
            <p className="pageHeroSub" style={{ maxWidth: 560 }}>
              Fully mobile welding service. We come directly to your home, yard,
              farm or worksite — so your equipment stays exactly where it is.
            </p>
            {onOpenQuote && (
              <button className="btnSolid" type="button" onClick={onOpenQuote}>
                Get a Free Quote
              </button>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 1 — INTRO + IMAGE */}
      <section className="section">
        <div className="ihfSplit">
          <div data-reveal style={{ "--d": "0ms" } as React.CSSProperties}>
            <div className="kicker">MOBILE WELDING</div>
            <h2 className="ihfHeading">
              Professional Mobile Welding in Tunbridge Wells
            </h2>
            <p className="ihfPara">
              We provide a fully mobile welding service across Tunbridge Wells
              and the surrounding areas, coming directly to your home, yard,
              site or premises. Mobile welding is ideal for repairs and projects
              that can't easily be transported.
            </p>
            <p className="ihfPara">
              Whether your vehicle has broken down on your drive, equipment has
              failed on site, or you have large machinery that can't be moved —
              we can carry out the welding work where it stands. We focus on
              strong, reliable welds and practical solutions that get you back
              up and running as quickly as possible.
            </p>
            {onOpenQuote && (
              <button className="btnSolid" type="button" onClick={onOpenQuote} style={{ marginTop: 8 }}>
                Get In Touch
              </button>
            )}
          </div>
          <div data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
            <ImgSlot src={mobileWeld1} alt="Mobile welder working on-site" />
          </div>
        </div>
      </section>

      {/* SECTION 2 — USE CASES + IMAGE */}
      <section className="section alt">
        <div className="ihfSplit ihfSplitReverse">
          <div data-reveal style={{ "--d": "0ms" } as React.CSSProperties}>
            <ImgSlot src={mobileWeld1} alt="Trailer welding repair" />
          </div>
          <div data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
            <div className="kicker">WHAT WE REPAIR</div>
            <h2 className="ihfHeading">Mobile Welding Services</h2>
            <p className="ihfPara">
              Our mobile welding service is ideal for urgent repairs and heavy
              equipment that would be difficult or costly to transport. We come
              to you with the tools and equipment needed to carry out strong,
              reliable repairs on-site. Common call-outs include:
            </p>
            <div className="ihfUseCases">
              {useCases.map((u) => (
                <div key={u.label} className="ihfUseCase">
                  <div className="ihfUseCaseLabel">{u.label}</div>
                  <div className="ihfUseCaseDesc">{u.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHY US + IMAGE */}
      <section className="section">
        <div className="ihfSplit">
          <div data-reveal style={{ "--d": "0ms" } as React.CSSProperties}>
            <div className="kicker">WHY CHOOSE US</div>
            <h2 className="ihfHeading">
              Why Choose Bligh Welding as Your Mobile Welder?
            </h2>
            <p className="ihfPara">
              We arrive fully equipped and ready to work. No call-out delays
              waiting for equipment to be delivered — everything needed to carry
              out a professional weld is brought directly to your location.
            </p>
            <ul className="ihfChecklist">
              {whyUs.map((item) => (
                <li key={item} className="ihfCheckItem">
                  <span className="ihfCheckMark">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
            <ImgSlot src={mobileWeld1} alt="On-site welding repair" />
          </div>
        </div>
      </section>

      {/* SECTION 4 — CTA */}
      <section className="section alt">
        <div className="ihfCtaBox" data-reveal>
          <div className="kicker">GET IN TOUCH</div>
          <h2 className="ihfCtaHeading">
            Need a Mobile Welder in Tunbridge Wells?
          </h2>
          <p className="ihfCtaPara">
            Get in touch today for a free, no-obligation quote. We cover
            Tunbridge Wells and all surrounding areas — domestic and commercial
            enquiries welcome.
          </p>
          <div className="contactBar" style={{ marginBottom: 32 }}>
            <a className="contactPill" href="tel:01234567890">01234 567890</a>
            <a className="contactPill" href="mailto:info@blighwelding.co.uk">info@blighwelding.co.uk</a>
            {onOpenQuote && (
              <button className="btnSolid" type="button" onClick={onOpenQuote}>
                Request a Quote
              </button>
            )}
          </div>
          <div className="ihfCtaAreas">
            <div className="kicker" style={{ marginBottom: 14 }}>AREAS COVERED</div>
            <div className="ihfAreaBadges">
              {areas.map((t) => (
                <span key={t} className="badge">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}