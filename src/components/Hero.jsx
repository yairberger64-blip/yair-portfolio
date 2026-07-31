import React, { useState } from "react";
import PrivacyPolicy from "./PrivacyPolicy";

/* ── Compass needle ────────────────────────────────────────────────
   Starts spinning erratically, then settles into a steady point,
   visualizing the headline's own arc: overwhelming, then clear.
   Hovering sets it spinning again, and it re-settles on mouse leave.
───────────────────────────────────────────────────────────────────── */
function SignalPulse() {
  return (
    <>
      <style>{`
        @keyframes needleSettle {
          0%   { transform: rotate(0deg); }
          8%   { transform: rotate(320deg); }
          16%  { transform: rotate(140deg); }
          24%  { transform: rotate(410deg); }
          32%  { transform: rotate(205deg); }
          40%  { transform: rotate(300deg); }
          50%  { transform: rotate(248deg); }
          62%  { transform: rotate(268deg); }
          74%  { transform: rotate(255deg); }
          86%  { transform: rotate(261deg); }
          100% { transform: rotate(258deg); }
        }
        @keyframes needleDrift {
          0%, 100% { transform: rotate(258deg); }
          50%      { transform: rotate(262deg); }
        }
        @keyframes needleSpin {
          from { transform: rotate(258deg); }
          to   { transform: rotate(618deg); }
        }
        .compass-needle {
          transform-origin: 60px 60px;
          animation: needleSettle 3.2s cubic-bezier(0.22, 0.61, 0.36, 1) 1,
                     needleDrift 4s ease-in-out 3.2s infinite;
        }
        .compass-wrapper:hover .compass-needle {
          animation: needleSpin 1.2s linear infinite !important;
        }
        .compass-ring {
          animation: ringFadeIn 1.4s ease forwards;
          opacity: 0;
        }
        @keyframes ringFadeIn {
          to { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .compass-needle {
            animation: none;
            transform: rotate(258deg);
            transform-origin: 60px 60px;
          }
          .compass-wrapper:hover .compass-needle {
            animation: none !important;
          }
          .compass-ring {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
      <div className="compass-wrapper" style={{ display: "inline-block", cursor: "pointer" }}>
        <svg
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ width: "110px", height: "110px" }}
        >
          {/* Outer ring */}
          <circle
            className="compass-ring"
            cx="60" cy="60" r="54"
            fill="none"
            stroke="#5B8DEF"
            strokeWidth="1.5"
            opacity="0.35"
          />
          {/* Inner ring */}
          <circle
            className="compass-ring"
            cx="60" cy="60" r="44"
            fill="none"
            stroke="#5B8DEF"
            strokeWidth="1"
            opacity="0.2"
          />
          {/* Cardinal ticks */}
          {[0, 90, 180, 270].map((deg) => (
            <line
              key={deg}
              x1="60" y1="8" x2="60" y2="16"
              stroke="#5B8DEF"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.5"
              transform={`rotate(${deg} 60 60)`}
            />
          ))}
          {/* Minor ticks */}
          {[45, 135, 225, 315].map((deg) => (
            <line
              key={deg}
              x1="60" y1="10" x2="60" y2="15"
              stroke="#5B8DEF"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.25"
              transform={`rotate(${deg} 60 60)`}
            />
          ))}
          {/* Cardinal labels */}
          {[
            { label: "N", x: 60, y: 26 },
            { label: "E", x: 94, y: 60 },
            { label: "S", x: 60, y: 98 },
            { label: "W", x: 26, y: 60 }
          ].map((c) => (
            <text
              key={c.label}
              x={c.x}
              y={c.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="'JetBrains Mono', monospace"
              fontSize="10"
              fontWeight="700"
              fill="#5B8DEF"
              opacity="0.6"
            >
              {c.label}
            </text>
          ))}
          {/* Needle */}
          <g className="compass-needle">
            <path d="M60,18 L67,60 L60,102 L53,60 Z" fill="#5B8DEF" opacity="0.9" />
            <path d="M60,18 L67,60 L60,60 Z" fill="#7AA5F5" opacity="0.95" />
          </g>
          {/* Center pivot */}
          <circle cx="60" cy="60" r="4" fill="#0A0A0F" stroke="#5B8DEF" strokeWidth="1.5" />
        </svg>
      </div>
    </>
  );
}

/* ── Contact overlay ───────────────────────────────────────────────── */
function ContactOverlay({ onClose, onPrivacyOpen }) {
  const [submitted, setSubmitted] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    reason: "",
    message: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("https://formspree.io/f/meebzpqd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <style>{`
        select option {
          background: #151520;
          color: #F0F0EC;
        }
      `}</style>
      <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#0A0A0F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        overflowY: "auto"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "540px",
          position: "relative"
        }}
      >
        {/* Close button, fixed right side, X */}
        <button
          onClick={onClose}
          style={{
            position: "fixed",
            top: "1.5rem",
            right: "1.5rem",
            background: "none",
            border: "none",
            color: "#8A8AB0",
            cursor: "pointer",
            fontSize: "1.5rem",
            lineHeight: 1,
            padding: "0.25rem",
            transition: "color 0.15s ease",
            zIndex: 300
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#F0F0EC"}
          onMouseLeave={e => e.currentTarget.style.color = "#8A8AB0"}
          aria-label="Close"
        >
          ✕
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", paddingTop: "3rem" }}>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#5B8DEF",
                marginBottom: "1.5rem"
              }}
            >
              Message sent
            </p>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "2rem",
                fontWeight: 700,
                color: "#F0F0EC",
                letterSpacing: "-0.025em",
                marginBottom: "1rem"
              }}
            >
              Got it. I'll be in touch.
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.95rem",
                color: "#8A8AB0"
              }}
            >
              I read every message personally and respond within 24 hours.
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: "2.5rem",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                background: "#5B8DEF",
                color: "#0A0A0F",
                padding: "0.75rem 2rem",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer"
              }}
            >
              Back to site
            </button>
          </div>
        ) : (
          <>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "#F0F0EC",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                marginBottom: "0.5rem"
              }}
            >
              Let's build something that runs.
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                color: "#8A8AB0",
                marginBottom: "1.25rem",
                lineHeight: 1.65
              }}
            >
              I read every message personally and respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label style={labelStyle}>Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#5B8DEF"}
                  onBlur={e => e.target.style.borderColor = "#1E1E2E"}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#5B8DEF"}
                  onBlur={e => e.target.style.borderColor = "#1E1E2E"}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label style={labelStyle}>Why are you reaching out?</label>
                <select
                  name="reason"
                  required
                  value={form.reason}
                  onChange={handleChange}
                  style={{ ...inputStyle, color: form.reason ? "#F0F0EC" : "#8A8AB0" }}
                  onFocus={e => e.target.style.borderColor = "#5B8DEF"}
                  onBlur={e => e.target.style.borderColor = "#1E1E2E"}
                >
                  <option value="" disabled>Select a reason</option>
                  <option value="consult">Explore AI consulting</option>
                  <option value="education">Learn about AI</option>
                  <option value="build">Request a custom AI build</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message field, optional by default, required for Other */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label style={labelStyle}>
                  Tell me more{form.reason !== "other" && <span style={{ color: "#4A4A5E", marginLeft: "0.4rem" }}>(optional)</span>}
                </label>
                <textarea
                  name="message"
                  required={form.reason === "other"}
                  placeholder="What are you working on? What do you need?"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
                  onFocus={e => e.target.style.borderColor = "#5B8DEF"}
                  onBlur={e => e.target.style.borderColor = "#1E1E2E"}
                />
              </div>

              {/* Privacy checkbox */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  checked={privacyChecked}
                  onChange={e => setPrivacyChecked(e.target.checked)}
                  style={{ marginTop: "0.2rem", accentColor: "#5B8DEF", flexShrink: 0 }}
                />
                <label
                  htmlFor="privacy"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8rem",
                    color: "#8A8AB0",
                    lineHeight: 1.5,
                    cursor: "pointer"
                  }}
                >
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={onPrivacyOpen}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#5B8DEF",
                      cursor: "pointer",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.8rem",
                      padding: 0,
                      textDecoration: "underline"
                    }}
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>

              <button
                type="submit"
                disabled={!privacyChecked}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  background: privacyChecked ? "#5B8DEF" : "#2E2E4E",
                  color: privacyChecked ? "#F0F0EC" : "#8A8AB0",
                  padding: "0.85rem 2rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  cursor: privacyChecked ? "pointer" : "not-allowed",
                  marginTop: "0.5rem",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={e => { if (privacyChecked) e.currentTarget.style.opacity = "0.88"; }}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                Send message →
              </button>

            </form>
          </>
        )}
      </div>
      </div>
    </>
  );
}

/* ── Shared input styles ───────────────────────────────────────────── */
const labelStyle = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.65rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#8A8AB0"
};

const inputStyle = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.9rem",
  color: "#F0F0EC",
  background: "#151520",
  border: "1px solid #1E1E2E",
  borderRadius: "0.375rem",
  padding: "0.75rem 1rem",
  outline: "none",
  transition: "border-color 0.15s ease",
  width: "100%"
};

/* ── Nav bar ───────────────────────────────────────────────────────── */
function Nav({ onContactOpen }) {
  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#demos", label: "Demos" },
    { href: "#testimonials", label: "Testimonials" }
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12"
      style={{
        height: "60px",
        background: "rgba(10, 10, 15, 0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1E1E2E"
      }}
    >
      {/* Wordmark */}
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          letterSpacing: "-0.01em",
          color: "#F0F0EC"
        }}
      >
        Compass Forge <span style={{ color: "#5B8DEF" }}>AI</span>
      </span>

      {/* Nav links */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="nav-link">{l.label}</a>
          </li>
        ))}
      </ul>

      {/* Contact CTA */}
      <button
        onClick={onContactOpen}
        style={{
          background: "#5B8DEF",
          border: "none",
          borderRadius: "0.375rem",
          cursor: "pointer",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#F0F0EC",
          padding: "0.4rem 0.875rem",
          transition: "opacity 0.15s ease"
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
      >
        Contact →
      </button>
    </nav>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────── */
export default function Hero({ overlayOpen, setOverlayOpen }) {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <Nav onContactOpen={() => setOverlayOpen(true)} />

      {overlayOpen && (
        <ContactOverlay
          onClose={() => setOverlayOpen(false)}
          onPrivacyOpen={() => setPrivacyOpen(true)}
        />
      )}

      {privacyOpen && (
        <PrivacyPolicy onClose={() => setPrivacyOpen(false)} />
      )}

      <section
        id="hero"
        className="section flex flex-col justify-center"
        style={{
          minHeight: "100vh",
          paddingTop: "8rem",
          paddingLeft: "clamp(1.5rem, 8vw, 8rem)",
          paddingRight: "clamp(1.5rem, 8vw, 8rem)"
        }}
      >
        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2rem, 4.5vw, 3.8rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#F0F0EC",
            paddingBottom: "0.3em"
          }}
        >
          AI can seem overwhelming.<br />
          <span style={{ color: "#5B8DEF" }}>Until it's saving you time and money.</span>
        </h1>

        {/* Signal pulse */}
        <div className="my-8">
          <SignalPulse />
        </div>

        {/* Subline */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
            color: "#8A8AB0",
            maxWidth: "52ch",
            lineHeight: 1.6
          }}
        >
          Whether you're an individual trying to ride the AI wave, a small business looking to cut costs, or a startup ready to move fast, let's figure it out together.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap gap-4 mt-10">
          <button
            onClick={() => setOverlayOpen(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "0.95rem",
              background: "#5B8DEF",
              color: "#0A0A0F",
              padding: "0.75rem 1.75rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              transition: "opacity 0.15s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Get in touch →
          </button>
        </div>

        {/* Scroll nudge */}
        <div
          className="absolute bottom-10 left-1/2"
          style={{ transform: "translateX(-50%)" }}
          aria-hidden="true"
        >
          <div
            style={{
              width: "1px",
              height: "48px",
              background: "linear-gradient(to bottom, #1E1E2E, transparent)",
              margin: "0 auto"
            }}
          />
        </div>
      </section>
    </>
  );
}
