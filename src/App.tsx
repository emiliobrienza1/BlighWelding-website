import { useEffect, useState, type FormEvent } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RecentWork from "./pages/RecentWork";
import Fabrication from "./pages/Fabrication";
import MobileWelding from "./pages/MobileWelding";

import logo from "./assets/logo.png";

type QuoteForm = {
  phone: string;
  location: string;
  service: string;
  details: string;
};

function QuoteModal(props: {
  open: boolean;
  onClose: () => void;
  defaultService?: string;
}) {
  const { open, onClose, defaultService } = props;

  const [form, setForm] = useState<QuoteForm>({
    phone: "",
    location: "",
    service: defaultService ?? "",
    details: "",
  });

  useEffect(() => {
    if (open) {
      setForm((prev) => ({
        ...prev,
        service: defaultService ?? prev.service,
      }));
    }
  }, [open, defaultService]);

  if (!open) return null;

  const update = (key: keyof QuoteForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = encodeURIComponent("Quote Request");
    const body = encodeURIComponent(
      `Phone: ${form.phone}
Location: ${form.location}
Service: ${form.service}

Details:
${form.details}`
    );

    window.location.href = `mailto:info@blighwelding.co.uk?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <div className="modalOverlay">
      <div className="modalBackdrop" onClick={onClose} />
      <div className="modalCard">
        <button className="modalClose" onClick={onClose}>
          ✕
        </button>

        <div className="modalGrid">
          <div className="modalLeft">
            <div className="modalKicker">FREE QUOTE</div>
            <div className="modalTitle">Get a Quick Quote</div>
            <div className="modalText">
              Tell us about your project and we’ll get back to you with a competitive quote.
            </div>
          </div>

          <form className="modalRight" onSubmit={handleSubmit}>
            <div className="formRow2">
              <div className="field">
                <label>Phone *</label>
                <input required value={form.phone} onChange={(e) => update("phone", e.target.value)} />
              </div>

              <div className="field">
                <label>Location *</label>
                <input required value={form.location} onChange={(e) => update("location", e.target.value)} />
              </div>
            </div>

            <div className="field">
              <label>Service Needed *</label>
              <select required value={form.service} onChange={(e) => update("service", e.target.value)}>
                <option value="" disabled>
                  Select a service
                </option>
                <option>In-House Fabrication</option>
                <option>Mobile Welding</option>
              </select>
            </div>

            <div className="field">
              <label>Project Details *</label>
              <textarea required rows={4} value={form.details} onChange={(e) => update("details", e.target.value)} />
            </div>

            <button className="quoteSubmit" type="submit">
              Request Quote
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [servicePrefill, setServicePrefill] = useState<string | undefined>();

  const openQuote = (service?: string) => {
    setServicePrefill(service);
    setQuoteOpen(true);
  };

  useEffect(() => {
    document.body.style.overflow = quoteOpen ? "hidden" : "";
  }, [quoteOpen]);

  return (
    <>
      {/* NAVBAR */}
      <header className="nav">
        <div className="navInner">
          <div className="logo">
            <img src={logo} alt="Bligh Welding Logo" className="logoImage" />
          </div>

          <nav className="navLinks">
            <NavLink to="/">Home</NavLink>

            {/* SERVICES DROPDOWN */}
            <div className="navDropdown">
              <button className="navDropdownBtn" type="button">
                Services <span className="navCaret">▾</span>
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

          <div className="navRight">
            <button className="callBtn" onClick={() => openQuote()}>
              Call / Quote
            </button>
          </div>
        </div>
      </header>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home onOpenQuote={openQuote} />} />

        {/* optional parent route if you still want /services */}
        <Route path="/services" element={<Services />} />

        <Route path="/services/fabrication" element={<Fabrication />} />
        <Route path="/services/mobile" element={<MobileWelding />} />

        <Route path="/recent-work" element={<RecentWork />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} defaultService={servicePrefill} />
    </>
  );
}