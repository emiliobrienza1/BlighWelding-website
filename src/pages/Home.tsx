// src/pages/Home.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

type Service = {
  title: string;
  desc: string;
  image: string;
};

const services: Service[] = [
  {
    title: "Mobile Welding",
    desc: "On-site welding repairs wherever you need us — homes, farms, worksites, and commercial sites.",
    image: "/assets/service-mobile.jpg",
  },
  {
    title: "MOT Failure Repairs",
    desc: "Failed your MOT due to corrosion or damage? We can repair and reinforce safely and correctly.",
    image: "/assets/service-mot.jpg",
  },
  {
    title: "Agricultural & Industrial",
    desc: "Heavy-duty welding and fabrication for machinery, equipment, and structural work.",
    image: "/assets/service-agri.jpg",
  },
  {
    title: "In-House Fabrication",
    desc: "Custom fabrication in our workshop — gates, railings, brackets, frames and more.",
    image: "/assets/service-agri.jpg",
  },
  {
    title: "Emergency Callout",
    desc: "Need urgent repairs? Fast response for critical fixes and breakdowns.",
    image: "/assets/service-agri.jpg",
  },
  {
    title: "Other Work",
    desc: "If you can't see it listed, it doesn't mean we don't do it — get in touch for a quote.",
    image: "/assets/service-agri.jpg",
  },
];

const recentWorkImports = import.meta.glob("/src/assets/recentwork/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
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

// Reusable Web3Forms submission hook
function useQuoteForm() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", location: "", service: "", message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const reset = () => {
    setForm({ name: "", email: "", phone: "", location: "", service: "", message: "" });
    setStatus("idle");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          service: form.service,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", location: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return { form, status, update, submit, reset, setStatus };
}

// Reusable form body — used in both hero card and modal
function QuoteFormBody({
  form,
  status,
  update,
  submit,
  onReset,
}: {
  form: ReturnType<typeof useQuoteForm>["form"];
  status: FormStatus;
  update: ReturnType<typeof useQuoteForm>["update"];
  submit: ReturnType<typeof useQuoteForm>["submit"];
  onReset: () => void;
}) {
  if (status === "success") {
    return (
      <div style={{ padding: "40px 22px", textAlign: "center", display: "grid", gap: 12, placeItems: "center" }}>
        <div style={{ fontSize: 40 }}>✅</div>
        <div style={{ fontWeight: 900, fontSize: 16, color: "rgba(20,24,31,0.96)" }}>Message Sent!</div>
        <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
          Thanks for getting in touch. I'll get back to you as soon as possible.
        </p>
        <button className="heroQuoteBtn" type="button" style={{ marginTop: 8, width: "100%" }} onClick={onReset}>
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="heroQuoteBody" onSubmit={submit}>
      <div className="formRow2">
        <div className="field">
          <label>Full Name *</label>
          <input required value={form.name} onChange={(e) => update("name", e.target.value)}
            placeholder="Your name" disabled={status === "submitting"} />
        </div>
        <div className="field">
          <label>Email *</label>
          <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
            placeholder="your@email.com" disabled={status === "submitting"} />
        </div>
      </div>

      <div className="formRow2">
        <div className="field">
          <label>Phone *</label>
          <input required value={form.phone} onChange={(e) => update("phone", e.target.value)}
            placeholder="07xxx xxxxxx" disabled={status === "submitting"} />
        </div>
        <div className="field">
          <label>Location *</label>
          <input required value={form.location} onChange={(e) => update("location", e.target.value)}
            placeholder="e.g. Tunbridge Wells" disabled={status === "submitting"} />
        </div>
      </div>

      <div className="field">
        <label>Service Needed *</label>
        <select required value={form.service} onChange={(e) => update("service", e.target.value)}
          disabled={status === "submitting"}>
          <option value="" disabled>Select a service</option>
          <option>Mobile Welding</option>
          <option>In-House Fabrication</option>
          <option>MOT Failure Repairs</option>
          <option>Agricultural & Industrial</option>
          <option>Emergency Callout</option>
        </select>
      </div>

      <div className="field">
        <label>Message *</label>
        <textarea required rows={3} value={form.message} onChange={(e) => update("message", e.target.value)}
          placeholder="How can we help?" disabled={status === "submitting"} />
      </div>

      {status === "error" && (
        <p style={{
          margin: 0, padding: "10px 14px", borderRadius: 10,
          background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.20)",
          color: "rgba(185,28,28,0.90)", fontSize: 13, fontWeight: 700,
        }}>
          ⚠️ Something went wrong. Please try again or call us directly.
        </p>
      )}

      <button className="heroQuoteBtn" type="submit"
        disabled={status === "submitting"} style={{ opacity: status === "submitting" ? 0.7 : 1 }}>
        {status === "submitting" ? "Sending..." : "✈ Send Message"}
      </button>
    </form>
  );
}

// Inline quote modal (slides down when "Get a Quote" is clicked)
function QuoteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { form, status, update, submit, reset, setStatus } = useQuoteForm();

  const handleReset = () => { reset(); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
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
          {/* LEFT */}
          <div className="modalLeft">
            <div className="modalKicker">FREE QUOTE</div>
            <div className="modalTitle">Get a<br />Quote</div>
            <p className="modalText">
              Fill in your details and I'll get back to you promptly with a price.
              No obligation, no fuss.
            </p>
            <ul className="modalBullets">
              <li>City & Guilds qualified welder</li>
              <li>Mobile or in-house — your choice</li>
              <li>Domestic & commercial welcome</li>
              <li>Tunbridge Wells & surrounding areas</li>
            </ul>
          </div>
          {/* RIGHT */}
          <div className="modalRight">
            <QuoteFormBody form={form} status={status} update={update} submit={submit} onReset={handleReset} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Scroll reveal hook
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

export default function Home(props: { onOpenQuote: (service?: string) => void }) {
  const { onOpenQuote } = props;

  // Hero form (separate instance for hero card)
  const heroFormHook = useQuoteForm();

  // Quote modal state
  const [modalOpen, setModalOpen] = useState(false);

  const openQuote = (service?: string) => setModalOpen(true);

  const recentWorkImages = useMemo(() => {
    const all = Object.values(recentWorkImports);
    const selected = shuffle(all).slice(0, Math.min(5, all.length));
    return selected.map((src, i) => ({ src, alt: `Recent welding project ${i + 1}` }));
  }, []);

  const [current, setCurrent] = useState(0);
  const timerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const startTimer = () => {
    clearTimer();
    if (recentWorkImages.length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setCurrent((c) => (c + 1) % recentWorkImages.length);
    }, 5000);
  };

  const goTo = (idx: number) => {
    if (recentWorkImages.length === 0) return;
    setCurrent((idx + recentWorkImages.length) % recentWorkImages.length);
  };

  const nextSlide = () => { goTo(current + 1); startTimer(); };
  const prevSlide = () => { goTo(current - 1); startTimer(); };

  useEffect(() => {
    startTimer();
    return () => clearTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentWorkImages.length]);

  const onSliderKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  };

  const pageRef = useReveal();

  return (
    <div ref={pageRef}>

      {/* QUOTE MODAL */}
      <QuoteModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* HERO */}
      <section className="hero heroTall">
        <div className="heroBg" />

        <div className="heroInner heroSplit">
          {/* LEFT */}
          <div className="heroLeft">
            <h1 className="heroTitle">
              Mobile Welding &<br />
              Fabrication in <span className="accent">Tunbridge Wells</span>
            </h1>

            <p className="heroSub">
              On-site repairs, fabrication, and structural welding. Fast, reliable, professional.
            </p>

            <div className="heroCtas">
              <button className="primaryCta" type="button" onClick={() => setModalOpen(true)}>
                Get a Quote
              </button>
              <NavLink className="secondaryCta" to="/recent-work">
                View Recent Work
              </NavLink>
            </div>

            <div className="heroFoot">
              <span className="dot" />
              Serving Tunbridge Wells and surrounding towns, Kent.
            </div>
          </div>

          {/* RIGHT: hero form */}
          <aside className="heroQuoteCard heroQuoteClamp" aria-label="Quick quote">
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
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="sectionHead" data-reveal>
          <div className="kicker">WHAT WE DO</div>
          <h2>Our Services</h2>
          <p>From emergency repairs to custom fabrication — professional welding solutions for every need.</p>
        </div>

        <div className="cardGrid">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="serviceCard"
              data-reveal
              style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
            >
              <div className="serviceImgWrap">
                <img className="serviceImg" src={s.image} alt={s.title} />
                <div className="serviceIcon" aria-hidden="true">🧰</div>
              </div>
              <div className="serviceBody">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <button className="learnMoreBtn" type="button" onClick={() => setModalOpen(true)}>
                  Learn More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* RECENT WORK */}
      <section className="section">
        <div className="sectionHead" data-reveal>
          <div className="kicker">OUR PORTFOLIO</div>
          <h2>Recent Work</h2>
          <p>A selection of welding and fabrication projects.</p>
        </div>

        <div
          className="recentSlider"
          data-reveal
          style={{ "--d": "100ms" } as React.CSSProperties}
          role="region"
          aria-label="Recent work slideshow"
          tabIndex={0}
          onKeyDown={onSliderKeyDown}
          onMouseEnter={clearTimer}
          onMouseLeave={startTimer}
        >
          <button className="recentArrow recentArrowLeft" type="button" aria-label="Previous slide" onClick={prevSlide}>
            ‹
          </button>
          <div className="recentSlides" aria-live="polite">
            {recentWorkImages.map((img, idx) => (
              <img
                key={img.src}
                className={`recentSlide ${idx === current ? "isActive" : ""}`}
                src={img.src}
                alt={img.alt}
                loading={idx === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            ))}
          </div>
          <button className="recentArrow recentArrowRight" type="button" aria-label="Next slide" onClick={nextSlide}>
            ›
          </button>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section alt">
        <div className="sectionHead" data-reveal>
          <div className="kicker">GET IN TOUCH</div>
          <h2>Request a Quote</h2>
          <p>Call, text, or fill in the form above.</p>
        </div>
        <div className="contactBar" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          <a className="contactPill" href="tel:+15551234567">
            📞 (555) 123-4567
          </a>
          <a className="contactPill" href="mailto:info@blighwelding.co.uk">
            ✉️ info@blighwelding.co.uk
          </a>
          <button className="heroQuoteBtn" type="button" onClick={() => setModalOpen(true)}>
            ✉ Send Message
          </button>
        </div>
      </section>

    </div>
  );
}