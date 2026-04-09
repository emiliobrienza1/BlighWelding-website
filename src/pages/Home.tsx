// src/pages/Home.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import heroBg from '../assets/homebg.png';
import Callout from '../assets/24hr.png';
import Agriculture from '../assets/agriculture.png';
import MOT from '../assets/MOT.png';
import Mobile from '../assets/mobileweld.jpg';
import Other from '../assets/other.png';
import { NavLink } from "react-router-dom";

type Service = { title: string; desc: string; image: string; };

const services: Service[] = [
  { title: "Mobile Welding",            desc: "On-site welding repairs wherever you need us — homes, farms, worksites, and commercial sites.", image: Mobile },
  { title: "MOT Failure Repairs",       desc: "Failed your MOT due to corrosion or damage? We can repair and reinforce safely and correctly.",  image: MOT },
  { title: "Agricultural & Industrial", desc: "Heavy-duty welding and fabrication for machinery, equipment, and structural work.",              image: Agriculture },
  { title: "In-House Fabrication",      desc: "Custom fabrication in our workshop — gates, railings, brackets, frames and more.",              image: Agriculture},
  { title: "Emergency Callout",         desc: "Need urgent repairs? Fast response for critical fixes and breakdowns.",                         image: Callout },
  { title: "Other Work",                desc: "If you can't see it listed, it doesn't mean we don't do it — get in touch for a quote.",        image: Other },
];

const recentWorkImports = import.meta.glob("/src/assets/recentwork/*.{png,jpg,jpeg,webp}", {
  eager: true, import: "default",
}) as Record<string, string>;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

// Unified form hook
function useQuoteForm() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    location: "", 
    service: "", 
    message: "" 
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const update = (key: keyof typeof form, value: string) => 
    setForm(p => ({ ...p, [key]: value }));

  const reset = () => {
    setForm({ name: "", email: "", phone: "", location: "", service: "", message: "" });
    setStatus("idle");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!form.name || !form.email || !form.phone || !form.location || !form.message) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "e9d6add7-02a1-4b38-b2af-1a6af120ce64",
          subject: "New Quote Request — Bligh Welding",
          from_name: form.name,
          name: form.name,
          email: form.email,
          phone: form.phone,
          location: form.location,
          service: form.service || "Not specified",
          message: form.message,
        }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      const data = await res.json();
      
      if (data.success) {
        setStatus("success");
        // Keep success state visible, then reset after delay
        setTimeout(() => {
          reset();
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
    }
  };

  return { form, status, update, submit, reset };
}

function QuoteFormBody({ 
  form, 
  status, 
  update, 
  submit, 
  onReset 
}: {
  form: ReturnType<typeof useQuoteForm>["form"];
  status: FormStatus;
  update: ReturnType<typeof useQuoteForm>["update"];
  submit: ReturnType<typeof useQuoteForm>["submit"];
  onReset: () => void;
}) {
  if (status === "success") {
    return (
      <div className="formSuccess">
        <div className="formSuccessTick">✓</div>
        <div className="formSuccessTitle">Message Sent!</div>
        <p className="formSuccessBody">Thanks for getting in touch. I'll get back to you as soon as possible.</p>
        <button className="btnSolid" type="button" style={{ width: "100%", marginTop: 16 }} onClick={onReset}>
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="heroQuoteBody" onSubmit={submit}>
      <div className="formRow2">
        <div className="field">
          <label>Full Name</label>
          <input 
            required 
            value={form.name} 
            onChange={e => update("name", e.target.value)} 
            placeholder="Your name" 
            disabled={status === "submitting"}
            type="text"
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input 
            required 
            type="email" 
            value={form.email} 
            onChange={e => update("email", e.target.value)} 
            placeholder="your@email.com" 
            disabled={status === "submitting"}
          />
        </div>
      </div>

      <div className="formRow2">
        <div className="field">
          <label>Phone</label>
          <input 
            required 
            value={form.phone} 
            onChange={e => update("phone", e.target.value)} 
            placeholder="07xxx xxxxxx" 
            disabled={status === "submitting"}
            type="tel"
          />
        </div>
        <div className="field">
          <label>Location</label>
          <input 
            required 
            value={form.location} 
            onChange={e => update("location", e.target.value)} 
            placeholder="e.g. Tunbridge Wells" 
            disabled={status === "submitting"}
            type="text"
          />
        </div>
      </div>

      <div className="field">
        <label>Service Needed</label>
        <select 
          value={form.service} 
          onChange={e => update("service", e.target.value)} 
          disabled={status === "submitting"}
        >
          <option value="">Select a service (optional)</option>
          <option>Mobile Welding</option>
          <option>In-House Fabrication</option>
          <option>MOT Failure Repairs</option>
          <option>Agricultural & Industrial</option>
          <option>Emergency Callout</option>
          <option>Other</option>
        </select>
      </div>

      <div className="field">
        <label>Message</label>
        <textarea 
          required 
          rows={3} 
          value={form.message} 
          onChange={e => update("message", e.target.value)} 
          placeholder="How can we help? Tell us about your project..." 
          disabled={status === "submitting"}
        />
      </div>

      {status === "error" && (
        <div className="formError">
          ⚠ Something went wrong — please check your details and try again, or call us at 07399 220 338.
        </div>
      )}

      <button 
        className="btnSolid" 
        type="submit" 
        disabled={status === "submitting"} 
        style={{ 
          width: "100%", 
          opacity: status === "submitting" ? 0.65 : 1,
          cursor: status === "submitting" ? "not-allowed" : "pointer"
        }}
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

function QuoteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { form, status, update, submit, reset } = useQuoteForm();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { 
      if (e.key === "Escape") onClose(); 
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modalOverlay">
      <div className="modalBackdrop" onClick={onClose} />
      <div className="modalCard">
        <button className="modalClose" type="button" onClick={onClose} aria-label="Close">✕</button>
        <div className="modalGrid">
          <div className="modalLeft">
            <div className="modalKicker">FREE QUOTE</div>
            <div className="modalTitle">Get a<br />Quote</div>
            <p className="modalText">Fill in your details and I'll get back to you promptly with a price. No obligation, no fuss.</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "rgba(0, 0, 0, 0.25)", fontWeight: "bold" }}>✓</span>
                <span style={{ color: "rgba(0, 0, 0, 0.25)", fontSize: "14px" }}>City & Guilds qualified welder</span>
              </li>
              <li style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "rgba(0, 0, 0, 0.25)", fontWeight: "bold" }}>✓</span>
                <span style={{ color: "rgba(0, 0, 0, 0.25)", fontSize: "14px" }}>Mobile or in-house — your choice</span>
              </li>
              <li style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "rgba(0, 0, 0, 0.25)", fontWeight: "bold" }}>✓</span>
                <span style={{ color: "rgba(0, 0, 0, 0.25)", fontSize: "14px" }}>Domestic & commercial welcome</span>
              </li>
              <li style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "rgba(0, 0, 0, 0.25)", fontWeight: "bold" }}>✓</span>
                <span style={{ color: "rgba(0, 0, 0, 0.25)", fontSize: "14px" }}>Tunbridge Wells & surrounding areas</span>
              </li>
            </ul>
          </div>
          <div className="modalRight">
            <QuoteFormBody 
              form={form} 
              status={status} 
              update={update} 
              submit={submit} 
              onReset={reset} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const els = el.querySelectorAll<HTMLElement>("[data-reveal]");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { 
          e.target.classList.add("isVisible"); 
          obs.unobserve(e.target); 
        }
      }),
      { threshold: 0.07 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

const trustItems = ["City & Guilds Qualified", "Mobile & In-House", "Domestic & Commercial", "Same-Day Response", "Kent & Sussex"];

/* ── Recent Work Slideshow ───────────────────────────────── */
function RecentWorkStrip({ images }: { images: { src: string; alt: string }[] }) {
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const count = images.length;

  const clear = () => { 
    if (timerRef.current) clearInterval(timerRef.current); 
  };

  const advance = (dir: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setActive(c => (c + dir + count) % count);
      setTransitioning(false);
    }, 320);
  };

  const start = () => {
    clear();
    if (count <= 1) return;
    timerRef.current = window.setInterval(() => advance(1), 5000);
  };

  const go = (n: number) => {
    if (transitioning || n === active) return;
    setTransitioning(true);
    setTimeout(() => {
      setActive(n);
      setTransitioning(false);
    }, 320);
    start();
  };

  useEffect(() => { 
    start(); 
    return clear; 
  }, [count]);

  if (count === 0) return null;

  const prev = (active - 1 + count) % count;
  const next = (active + 1) % count;

  return (
    <div
      className="rwStrip"
      onMouseEnter={clear}
      onMouseLeave={start}
      role="region"
      aria-label="Recent work"
    >
      <div className="rwStripStage">
        {/* Prev peek */}
        <div className="rwPeek rwPeekLeft" onClick={() => { advance(-1); start(); }}>
          <img src={images[prev].src} alt={images[prev].alt} draggable={false} />
          <div className="rwPeekOverlay" />
        </div>

        {/* Centre main image */}
        <div className={`rwMain${transitioning ? " rwMainFading" : ""}`}>
          <img src={images[active].src} alt={images[active].alt} draggable={false} />
          <button
            className="rwArrow rwArrowLeft"
            type="button"
            aria-label="Previous"
            onClick={() => { advance(-1); start(); }}
          >‹</button>
          <button
            className="rwArrow rwArrowRight"
            type="button"
            aria-label="Next"
            onClick={() => { advance(1); start(); }}
          >›</button>
        </div>

        {/* Next peek */}
        <div className="rwPeek rwPeekRight" onClick={() => { advance(1); start(); }}>
          <img src={images[next].src} alt={images[next].alt} draggable={false} />
          <div className="rwPeekOverlay" />
        </div>
      </div>

      {/* Dot indicators */}
      <div className="rwDots">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`rwDot${i === active ? " rwDotActive" : ""}`}
            aria-label={`Go to image ${i + 1}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home(props: { onOpenQuote?: (service?: string) => void }) {
  const heroFormHook = useQuoteForm();
  const [modalOpen, setModalOpen] = useState(false);
  const pageRef = useReveal();

  const recentWorkImages = useMemo(() => {
    const all = shuffle(Object.values(recentWorkImports));
    return all.map((src, i) => ({ src, alt: `Recent welding project ${i + 1}` }));
  }, []);

  return (
    <div ref={pageRef}>
      <QuoteModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="homeHero"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="heroBg" />

        <div className="homeHeroInner">
          <div className="homeHeroLeft">
            <div className="homeEyebrow" data-reveal style={{ "--d": "0ms" } as React.CSSProperties}>
              <span className="homeEyebrowDot" />
              Tunbridge Wells &amp; Surrounding Areas, Kent
            </div>
            <h1 className="homeHeroTitle" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
              Mobile Welding &amp;<br />
              Fabrication in{" "}
              <span className="heroAccent">Tunbridge Wells</span>
            </h1>
            <p className="homeHeroSub" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
              On-site repairs, fabrication, and structural welding.<br />
              Fast, reliable, professional.
            </p>
            <div className="homeHeroCtas" data-reveal style={{ "--d": "240ms" } as React.CSSProperties}>
              <button className="btnSolid heroCtaSolid" type="button" onClick={() => setModalOpen(true)}>
                Get a Free Quote
              </button>
              <NavLink className="btn heroCtaGhost" to="/recent-work">
                View Recent Work
              </NavLink>
            </div>
          </div>

          <aside
            className="heroQuoteCard"
            aria-label="Quick quote"
            data-reveal
            style={{ "--d": "120ms" } as React.CSSProperties}
          >
            <div className="heroQuoteHeader">SEND US A MESSAGE</div>
            <QuoteFormBody
              form={heroFormHook.form}
              status={heroFormHook.status}
              update={heroFormHook.update}
              submit={heroFormHook.submit}
              onReset={heroFormHook.reset}
            />
          </aside>
        </div>

        <div className="trustBar" data-reveal style={{ "--d": "300ms" } as React.CSSProperties}>
          <div className="trustInner">
            {trustItems.map((t, i) => (
              <React.Fragment key={t}>
                <span className="trustItem">{t}</span>
                {i < trustItems.length - 1 && <span className="trustSep" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────── */}
      <section className="section">
        <div className="sectionHead" data-reveal>
          <div className="kicker">WHAT WE DO</div>
          <h2>Our Services</h2>
          <p>From emergency repairs to custom fabrication — professional welding solutions for every need.</p>
        </div>
        <div className="cardGrid">
          {services.map((s, i) => (
            <article key={s.title} className="serviceCard" data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
              <div className="serviceImgWrap">
                <img className="serviceImg" src={s.image} alt={s.title} />
              </div>
              <div className="serviceBody">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="sectionCta" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          <button className="btnSolid" type="button" onClick={() => setModalOpen(true)}>
            Get a Quote for Any Service
          </button>
        </div>
      </section>

      {/* ── RECENT WORK ───────────────────────────────────────── */}
      <section className="section alt">
        <div className="sectionHead" data-reveal>         
          <h2>Recent Work</h2>
        </div>
        <div data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          <RecentWorkStrip images={recentWorkImages} />
        </div>
        <div className="sectionCta" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
          <NavLink className="rwViewAll" to="/recent-work">
            View all recent work →
          </NavLink>
        </div>
      </section>

      {/* ── CONTACT BAR ───────────────────────────────────────── */}
      <section className="section">
        <div className="sectionHead" data-reveal>
          <div className="kicker">GET IN TOUCH</div>
          <h2>Request a Quote</h2>
          <p>Call, text, or send a message — I'll get back to you as soon as possible.</p>
        </div>
        <div className="contactBar" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          <a className="btnGhost" href="tel:07399220338">Call 07399 220 338</a>         
          <button className="btnSolid" type="button" onClick={() => setModalOpen(true)}>Send a Message</button>
        </div>
      </section>

    </div>
  );
}