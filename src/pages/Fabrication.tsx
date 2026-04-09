// src/pages/InHouseFabrication.tsx
import React, { useEffect, useRef } from "react";
import inhouse1 from "../assets/inhouse1.png";
import inhouse2 from "../assets/inhouse2.png";
import inhouse3 from "../assets/inhouse3.png";


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
    <div className="ihfImgWrap">
      <img src={src} alt={alt} className="ihfImg" />
    </div>
  );
}

const useCases = [
  {
    label: "Fabrication Projects",
    desc: "From brackets and frames to complete custom builds.",
  },
  {
    label: "Vehicle Restoration & Repair",
    desc: "Chassis repairs, rust removal, reinforcement work and structural welding.",
  },
  {
    label: "Trailer Rebuilds & Repairs",
    desc: "Axles, floors, drawbars, strengthening and full refurbishments.",
  },
  {
    label: "Custom Metalwork",
    desc: "Bespoke parts made to order for domestic, commercial or agricultural use.",
  },
  {
    label: "Precision-Based Work",
    desc: "Projects requiring accurate measurements, clean welds and a professional finish.",
  },
];

const whyUs = [
  "City & Guilds qualified — Level 1, 2 & 3 MIG Welding",
  "Workshop environment for more complex, detailed work",
  "Collection and return of vehicles or items available",
  "Drop-off welcome — flexible to suit you",
  "Quality workmanship, structural integrity, attention to detail",
  "Domestic and commercial clients welcome",
];

const areas = [
  "Tunbridge Wells", "Tonbridge", "Sevenoaks", "Crowborough",
  "Uckfield", "Paddock Wood", "Maidstone", "& More",
];

export default function InHouseFabrication(props: { onOpenQuote?: () => void }) {
  const { onOpenQuote } = props;
  const pageRef = useReveal();

  return (
    <div ref={pageRef}>

      {/* HERO */}
      <section className="pageHero">
        <div className="pageHeroBg" />
        <div className="pageHeroInner" style={{ gridTemplateColumns: "1fr" }}>
          <div data-reveal>
            <div className="kicker">SERVICES / IN-HOUSE FABRICATION</div>
            <h1 className="pageHeroTitle">
              In-House Welding &amp;<br />
              <span className="accent">Fabrication</span> Workshop
            </h1>
            <p className="pageHeroSub" style={{ maxWidth: 560 }}>
              Workshop-based welding and fabrication for larger, more detailed or
              long-term projects — carried out with the same focus on quality and precision.
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
            <div className="kicker">IN-HOUSE FABRICATION</div>
            <h2 className="ihfHeading">
              Professional Workshop Welding &amp; Fabrication
            </h2>
            <p className="ihfPara">
              For larger, more detailed or long-term projects, work can be carried out in
              our workshop. This option is ideal for fabrication projects, vehicle
              restoration, trailer rebuilds and custom metalwork that requires more time
              and precision.
            </p>
            <p className="ihfPara">
              Our fully equipped workshop allows us to take on a wide range of fabrication
              and repair projects. Working in-house means better precision, controlled
              conditions, and high-quality finishes.
            </p>
            {onOpenQuote && (
              <button className="btnSolid" type="button" onClick={onOpenQuote} style={{ marginTop: 8 }}>
                Get In Touch
              </button>
            )}
          </div>
          <div data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
            <ImgSlot src={inhouse1} alt="In-house fabrication workshop" />
          </div>
        </div>
      </section>

      {/* SECTION 2 — USE CASES + IMAGE */}
      <section className="section alt">
        <div className="ihfSplit ihfSplitReverse">
          <div data-reveal style={{ "--d": "0ms" } as React.CSSProperties}>
            <ImgSlot src={inhouse2} alt="Workshop fabrication project" />
          </div>
          <div data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
            <div className="kicker">WHAT WE WORK ON</div>
            <h2 className="ihfHeading">This Service Is Ideal For</h2>
            <p className="ihfPara">
              The workshop is set up to handle a wide variety of projects. Each is completed
              with the same focus on structural integrity and a clean, professional finish.
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
              Why Choose Bligh Welding for Workshop Fabrication?
            </h2>
            <p className="ihfPara">
              If required, we can arrange collection and return of vehicles, trailers or
              metalwork items. Alternatively, you're welcome to drop items off directly at
              the workshop — whichever works best for you.
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
            <ImgSlot src={inhouse3} alt="Workshop welding detail" />
          </div>
        </div>
      </section>

      {/* SECTION 4 — CTA */}
      <section className="section alt">
        <div className="ihfCtaBox" data-reveal>
          <div className="kicker">GET IN TOUCH</div>
          <h2 className="ihfCtaHeading">
            Need Workshop Fabrication in Tunbridge Wells?
          </h2>
          <p className="ihfCtaPara">
            Whether you have a vehicle, trailer or fabrication project that needs
            workshop attention, get in touch today. Collection and return can be
            arranged, or simply drop your item off. We'll get the job done properly,
            to a high standard.
          </p>

          <div className="contactBar" style={{ marginBottom: 32 }}>
            <a className="contactPill" href="tel:07399220338">07399 220 338</a>
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