import { useEffect, useState } from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RecentWork from "./pages/RecentWork";
import Fabrication from "./pages/Fabrication";
import MobileWelding from "./pages/MobileWelding";

import logo from "./assets/logo.png";

type FormStatus = "idle" | "submitting" | "success" | "error";

type QuoteFormData = {
  name: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  message: string;
};

// Unified form hook used across all quote forms
function useQuoteForm() {
  const [form, setForm] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const update = (key: keyof QuoteFormData, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const reset = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      location: "",
      service: "",
      message: "",
    });
    setStatus("idle");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

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
  onReset,
}: {
  form: QuoteFormData;
  status: FormStatus;
  update: (key: keyof QuoteFormData, value: string) => void;
  submit: (e: React.FormEvent) => Promise<void>;
  onReset: () => void;
}) {
  if (status === "success") {
    return (
      <div className="formSuccess">
        <div className="formSuccessTick">✓</div>
        <div className="formSuccessTitle">Message Sent!</div>
        <p className="formSuccessBody">
          Thanks for getting in touch. I'll get back to you as soon as possible.
        </p>
        <button
          className="btnSolid"
          type="button"
          style={{ width: "100%", marginTop: 16 }}
          onClick={onReset}
        >
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
            onChange={(e) => update("name", e.target.value)}
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
            onChange={(e) => update("email", e.target.value)}
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
            onChange={(e) => update("phone", e.target.value)}
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
            onChange={(e) => update("location", e.target.value)}
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
          onChange={(e) => update("service", e.target.value)}
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
          onChange={(e) => update("message", e.target.value)}
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
          cursor: status === "submitting" ? "not-allowed" : "pointer",
        }}
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

function QuoteModal(props: {
  open: boolean;
  onClose: () => void;
  defaultService?: string;
}) {
  const { open, onClose, defaultService } = props;
  const { form, status, update, submit, reset } = useQuoteForm();

  useEffect(() => {
    if (open && defaultService) {
      update("service", defaultService);
    }
  }, [open, defaultService]);

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
        <button className="modalClose" type="button" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="modalGrid">
          <div className="modalLeft">
            <div className="modalKicker">FREE QUOTE</div>
            <div className="modalTitle">
              Get a<br />
              Quote
            </div>
            <p className="modalText">
              Fill in your details and I'll get back to you promptly with a price. No obligation, no fuss.
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "16px 0 0",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <li style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "rgba(0, 0, 0, 0.25)", fontWeight: "bold" }}>✓</span>
                <span style={{ color: "rgba(0, 0, 0, 0.25)", fontSize: "14px" }}>
                  City & Guilds qualified welder
                </span>
              </li>
              <li style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "rgba(0, 0, 0, 0.25)", fontWeight: "bold" }}>✓</span>
                <span style={{ color: "rgba(0, 0, 0, 0.25)", fontSize: "14px" }}>
                  Mobile or in-house — your choice
                </span>
              </li>
              <li style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "rgba(0, 0, 0, 0.25)", fontWeight: "bold" }}>✓</span>
                <span style={{ color: "rgba(0, 0, 0, 0.25)", fontSize: "14px" }}>
                  Domestic & commercial welcome
                </span>
              </li>
              <li style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "rgba(0, 0, 0, 0.25)", fontWeight: "bold" }}>✓</span>
                <span style={{ color: "rgba(0, 0, 0, 0.25)", fontSize: "14px" }}>
                  Tunbridge Wells & surrounding areas
                </span>
              </li>
            </ul>
          </div>
          <div className="modalRight">
            <QuoteFormBody form={form} status={status} update={update} submit={submit} onReset={reset} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mobile nav drawer ─────────────────────────────────────
function MobileMenu(props: { open: boolean; onClose: () => void; onOpenQuote: () => void }) {
  const { open, onClose, onOpenQuote } = props;
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`mobileMenuBackdrop${open ? " mobileMenuBackdropOpen" : ""}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div className={`mobileMenu${open ? " mobileMenuOpen" : ""}`}>
        <nav className="mobileMenuLinks">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "mobileMenuLink mobileMenuLinkActive" : "mobileMenuLink"
            }
          >
            Home
          </NavLink>
          <div className="mobileMenuSection">
            <span className="mobileMenuSectionLabel">Services</span>
            <NavLink
              to="/services/fabrication"
              className={({ isActive }) =>
                isActive
                  ? "mobileMenuLink mobileMenuLinkSub mobileMenuLinkActive"
                  : "mobileMenuLink mobileMenuLinkSub"
              }
            >
              In-House Fabrication
            </NavLink>
            <NavLink
              to="/services/mobile"
              className={({ isActive }) =>
                isActive
                  ? "mobileMenuLink mobileMenuLinkSub mobileMenuLinkActive"
                  : "mobileMenuLink mobileMenuLinkSub"
              }
            >
              Mobile Welding
            </NavLink>
          </div>
          <NavLink
            to="/recent-work"
            className={({ isActive }) =>
              isActive ? "mobileMenuLink mobileMenuLinkActive" : "mobileMenuLink"
            }
          >
            Recent Work
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "mobileMenuLink mobileMenuLinkActive" : "mobileMenuLink"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "mobileMenuLink mobileMenuLinkActive" : "mobileMenuLink"
            }
          >
            Contact
          </NavLink>
        </nav>
        <div className="mobileMenuFooter">
          <button
            className="callBtn"
            style={{ width: "100%", borderRadius: 12, height: 50 }}
            onClick={() => {
              onOpenQuote();
              onClose();
            }}
          >
            Get a Free Quote
          </button>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [servicePrefill, setServicePrefill] = useState<string | undefined>();
  const [menuOpen, setMenuOpen] = useState(false);

  const openQuote = (service?: string) => {
    setServicePrefill(service);
    setQuoteOpen(true);
  };

  useEffect(() => {
    document.body.style.overflow = quoteOpen ? "hidden" : "";
  }, [quoteOpen]);

  return (
    <>
      {/* ── NAVBAR ── */}
      <header className="nav">
        <div className="navInner">
          {/* Logo — links to home */}
          <div className="logo">
            <NavLink to="/" aria-label="Go to homepage">
              <img src={logo} alt="Bligh Welding Logo" className="logoImage" />
            </NavLink>
          </div>

          {/* Desktop links */}
          <nav className="navLinks">
            <NavLink to="/">Home</NavLink>

            <div className="navDropdown">
              <button className="navDropdownBtn" type="button">
                Services <span className="navCaret">▾</span>
                <span className="navBtnUnderline" />
              </button>
              <div className="navDropdownMenu">
                <NavLink to="/services/fabrication" className="dropdownItem">
                  In-House Fabrication
                </NavLink>
                <NavLink to="/services/mobile" className="dropdownItem">
                  Mobile Welding
                </NavLink>
              </div>
            </div>

            <NavLink to="/recent-work">Recent Work</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          {/* Right side */}
          <div className="navRight">
            {/* Desktop quote button */}
            <button className="callBtn navDesktopOnly" onClick={() => openQuote()}>
              Quote
            </button>

            {/* Mobile hamburger */}
            <button
              className="navHamburger"
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`navHamLine${menuOpen ? " navHamLineOpen" : ""}`} />
              <span className={`navHamLine${menuOpen ? " navHamLineOpen" : ""}`} />
              <span className={`navHamLine${menuOpen ? " navHamLineOpen" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenQuote={openQuote}
      />

      {/* ── ROUTES ── */}
      <Routes>
        <Route path="/" element={<Home onOpenQuote={openQuote} />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/fabrication" element={<Fabrication />} />
        <Route path="/services/mobile" element={<MobileWelding />} />
        <Route path="/recent-work" element={<RecentWork />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <QuoteModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        defaultService={servicePrefill}
      />
    </>
  );
}