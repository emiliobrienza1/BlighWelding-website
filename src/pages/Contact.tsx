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
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("isVisible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.07 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

const details = [
  { icon: "📞", label: "Phone",         value: "07399 220 338",                              href: "tel:07399220338" },
  { icon: "✉️", label: "Email",         value: "info@blighwelding.co.uk",                   href: "mailto:info@blighwelding.co.uk" },
  { icon: "⚡", label: "Response Time", value: "Same day",                           href: null },
];

const areas = [
  "Tunbridge Wells", "Tonbridge",      "Sevenoaks",      "Crowborough",
  "Uckfield",        "Paddock Wood",   "Maidstone",      "Pembury",
  "East Grinstead", "Edenbridge",     "Westerham",
  "Hastings", "& More"
];

export default function Contact() {
  const pageRef = useReveal();
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", location: "", service: "", message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const update = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

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

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="cpHero">
        <div className="cpHeroBg" />
        <div className="cpHeroInner">
          <div className="cpReveal" data-reveal>
            <div className="cpHeroEyebrow">Contact</div>
            <h1 className="cpHeroTitle">
              Get In<br /><em>Touch</em>
            </h1>
            <p className="cpHeroSub">
              Call, text or send a message — I'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN ────────────────────────────────────────────────── */}
      <section className="cpSection">
        <div className="cpWrap">

          {/* LEFT */}
          <aside>
            <div
              className="cpReveal"
              data-reveal
              style={{ "--d": "0ms" } as React.CSSProperties}
            >
              <h2 className="cpLeftHeading">Contact Details</h2>
              <p className="cpLeftSub">Reach out through any of the channels below.</p>
            </div>

            {details.map((item, i) => (
              <div
                key={item.label}
                className="cpDetail cpReveal"
                data-reveal
                style={{ "--d": `${(i + 1) * 90}ms` } as React.CSSProperties}
              >
                <div className="cpDetailIcon">{item.icon}</div>
                <div>
                  <div className="cpDetailLabel">{item.label}</div>
                  <div className="cpDetailValue">
                    {item.href
                      ? <a href={item.href}>{item.value}</a>
                      : item.value
                    }
                  </div>
                </div>
              </div>
            ))}

            <hr className="cpDivider" />

            <div
              className="cpReveal"
              data-reveal
              style={{ "--d": "460ms" } as React.CSSProperties}
            >
              <div className="cpAreasLabel">Areas Covered</div>
              <div className="cpAreas">
                {areas.map((a) => (
                  <span key={a} className="cpBadge">{a}</span>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT */}
          <div
            className="cpCard cpReveal"
            data-reveal
            style={{ "--d": "140ms" } as React.CSSProperties}
          >
            {status === "success" ? (
              <div className="cpSuccess">
                <div className="cpSuccessTick">✔</div>
                <div className="cpSuccessTitle">Message Sent!</div>
                <p className="cpSuccessBody">
                  Thanks for getting in touch. I'll get back to you as soon as possible — usually the same day.
                </p>
                <button
                  className="cpSubmit"
                  type="button"
                  style={{ marginTop: 8, maxWidth: 280 }}
                  onClick={() => setStatus("idle")}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="cpCardHeading">Send a Message</h2>
                <p className="cpCardSub">Fill in the form below and I'll be in touch.</p>

                <form onSubmit={handleSubmit}>
                  <div className="cpGrid2">
                    <div className="cpField">
                      <label>Full Name <span>*</span></label>
                      <input required value={form.fullName} onChange={e => update("fullName", e.target.value)} placeholder="Your name" disabled={status === "submitting"} />
                    </div>
                    <div className="cpField">
                      <label>Email <span>*</span></label>
                      <input required type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="your@email.com" disabled={status === "submitting"} />
                    </div>
                  </div>

                  <div className="cpGrid2">
                    <div className="cpField">
                      <label>Phone <span>*</span></label>
                      <input required value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="07xxx xxxxxx" disabled={status === "submitting"} />
                    </div>
                    <div className="cpField">
                      <label>Location <span>*</span></label>
                      <input required value={form.location} onChange={e => update("location", e.target.value)} placeholder="e.g. Tunbridge Wells" disabled={status === "submitting"} />
                    </div>
                  </div>

                  <div className="cpField">
                    <label>Service Needed <span>*</span></label>
                    <select required value={form.service} onChange={e => update("service", e.target.value)} disabled={status === "submitting"}>
                      <option value="" disabled>Select a service</option>
                      <option>Mobile Welding</option>
                      <option>MOT Failure Repairs</option>
                      <option>Agricultural &amp; Industrial</option>
                      <option>In-House Fabrication</option>
                      <option>Emergency Callout</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="cpField">
                    <label>Message <span>*</span></label>
                    <textarea required rows={6} value={form.message} onChange={e => update("message", e.target.value)} placeholder="How can we help?" disabled={status === "submitting"} />
                  </div>

                  {status === "error" && (
                    <div className="cpError">
                      <span>⚠</span>
                      Something went wrong — please try again or call us directly.
                    </div>
                  )}

                  <button
                    className="cpSubmit"
                    type="submit"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting"
                      ? <><span className="cpSpinner" />Sending…</>
                      : "   Send Message"
                    }
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