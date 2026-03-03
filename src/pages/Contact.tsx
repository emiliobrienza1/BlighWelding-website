// src/pages/Contact.tsx
import React, { useEffect, useRef, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

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

export default function Contact() {
  const pageRef = useReveal();

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", location: "", service: "", message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "e9d6add7-02a1-4b38-b2af-1a6af120ce64",
          subject: "New Website Enquiry — Bligh Welding",
          from_name: form.fullName,
          name: form.fullName,
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
        setForm({ fullName: "", email: "", phone: "", location: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div ref={pageRef}>

      {/* PAGE HERO */}
      <section className="pageHero" style={{ minHeight: 220 }}>
        <div className="pageHeroBg" />
        <div className="pageHeroInner" style={{ gridTemplateColumns: "1fr", padding: "72px 18px 60px" }}>
          <div data-reveal>
            <div className="kicker" style={{ color: "rgba(238,241,245,0.65)", marginBottom: 14 }}>
              CONTACT
            </div>
            <h1 className="pageHeroTitle" style={{ fontSize: 46 }}>
              Get In <span className="accent">Touch</span>
            </h1>
            <p className="pageHeroSub" style={{ maxWidth: 520 }}>
              Call, text or send a message — I'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="section">
        <div className="contactWrap">

          {/* LEFT: CONTACT DETAILS */}
          <aside className="contactLeft">

            <h2
              className="contactLeftTitle"
              data-reveal
              style={{ "--d": "0ms" } as React.CSSProperties}
            >
              Contact Details
            </h2>

            {[
              {
                icon: "☎",
                label: "Phone",
                value: "01234 567890",
                href: "tel:01234567890",
              },
              {
                icon: "✉",
                label: "Email",
                value: "info@blighwelding.co.uk",
                href: "mailto:info@blighwelding.co.uk",
              },
              {
                icon: "⌖",
                label: "Service Area",
                value: "Tunbridge Wells & surrounding areas, Kent",
                href: null,
              },
              {
                icon: "⏱",
                label: "Response Time",
                value: "Usually same day",
                href: null,
              },
            ].map((item, i) => (
              <div
                key={item.label}
                className="contactItem"
                data-reveal
                style={{ "--d": `${(i + 1) * 80}ms` } as React.CSSProperties}
              >
                <div className="contactIcon" aria-hidden="true">{item.icon}</div>
                <div>
                  <div className="contactLabel">{item.label}</div>
                  {item.href ? (
                    <a className="contactValue" href={item.href} style={{ textDecoration: "none" }}>
                      {item.value}
                    </a>
                  ) : (
                    <div className="contactValue">{item.value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Area badges */}
            <div
              data-reveal
              style={{ "--d": "440ms", marginTop: 28 } as React.CSSProperties}
            >
              <div className="kicker" style={{ marginBottom: 12 }}>AREAS COVERED</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Tunbridge Wells", "Tonbridge", "Sevenoaks", "Crowborough", "Uckfield", "Paddock Wood"].map((t) => (
                  <span key={t} className="badge" style={{ fontSize: 11, padding: "6px 10px", fontWeight: 700 }}>
                    📍 {t}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT: FORM CARD */}
          <div
            className="contactCard"
            data-reveal
            style={{ "--d": "120ms" } as React.CSSProperties}
          >
            {status === "success" ? (
              <div style={{ padding: "48px 24px", textAlign: "center", display: "grid", gap: 14, placeItems: "center" }}>
                <div style={{ fontSize: 48 }}>✅</div>
                <div style={{ fontWeight: 900, fontSize: 20, color: "rgba(20,24,31,0.96)" }}>
                  Message Sent!
                </div>
                <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6, margin: 0, maxWidth: 360 }}>
                  Thanks for getting in touch. I'll get back to you as soon as possible.
                </p>
                <button
                  className="contactSend"
                  type="button"
                  style={{ marginTop: 8, width: "100%" }}
                  onClick={() => setStatus("idle")}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="contactCardTitle">Send Us a Message</h2>

                <form className="contactForm" onSubmit={handleSubmit}>
                  <div className="contactGrid2">
                    <div className="fieldLight">
                      <label>Full Name <span>*</span></label>
                      <input
                        required
                        value={form.fullName}
                        onChange={(e) => update("fullName", e.target.value)}
                        placeholder="Your name"
                        disabled={status === "submitting"}
                      />
                    </div>
                    <div className="fieldLight">
                      <label>Email <span>*</span></label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="your@email.com"
                        disabled={status === "submitting"}
                      />
                    </div>
                  </div>

                  <div className="contactGrid2">
                    <div className="fieldLight">
                      <label>Phone <span>*</span></label>
                      <input
                        required
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="07xxx xxxxxx"
                        disabled={status === "submitting"}
                      />
                    </div>
                    <div className="fieldLight">
                      <label>Location <span>*</span></label>
                      <input
                        required
                        value={form.location}
                        onChange={(e) => update("location", e.target.value)}
                        placeholder="e.g. Tunbridge Wells"
                        disabled={status === "submitting"}
                      />
                    </div>
                  </div>

                  <div className="fieldLight">
                    <label>Service Needed <span>*</span></label>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => update("service", e.target.value)}
                      disabled={status === "submitting"}
                    >
                      <option value="" disabled>Select a service</option>
                      <option>Mobile Welding</option>
                      <option>MOT Failure Repairs</option>
                      <option>Agricultural & Industrial</option>
                      <option>In-House Fabrication</option>
                      <option>Emergency Callout</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="fieldLight">
                    <label>Message <span>*</span></label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="How can we help?"
                      disabled={status === "submitting"}
                    />
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

                  <button
                    className="contactSend"
                    type="submit"
                    disabled={status === "submitting"}
                    style={{ opacity: status === "submitting" ? 0.7 : 1 }}
                  >
                    {status === "submitting" ? "Sending..." : "✈ Send Message"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}