import React, { useState } from "react";

/* ── Signal pulse SVG ──────────────────────────────────────────────
   Continuous looping EKG animation.
───────────────────────────────────────────────────────────────────── */
function SignalPulse() {
  return (
    <>
      <style>{`
        @keyframes pulseLoop {
          0%   { stroke-dashoffset: 600; opacity: 0; }
          5%   { opacity: 1; }
          85%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.15; }
        }
        .signal-line-loop {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: pulseLoop 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .signal-line-loop {
            animation: none;
            stroke-dashoffset: 0;
            opacity: 0.3;
          }
        }
        select option {
          background: #151520;
          color: #F0F0EC;
        }
      `}</style>
      <svg
        viewBox="0 0 600 60"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-full max-w-2xl"
        style={{ height: "60px", overflow: "visible" }}
      >
        <polyline
          className="signal-line-loop"
          points="
            0,30
            120,30
            150,30
            165,8
            180,52
            195,15
            210,45
            225,30
            260,30
            600,30
          "
          fill="none"
          stroke="#5B8DEF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

/* ── Social icons ──────────────────────────────────────────────────── */
function SocialIcons() {
  const socials = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/dadbuildsai/",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
        </svg>
      )
    },
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@dadbuildsai",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
        </svg>
      )
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/yair-berger-4b9911177/",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      )
    }
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          aria-label={s.label}
          style={{
            color: "#F0F0EC",
            display: "flex",
            alignItems: "center",
            transition: "color 0.15s ease"
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#5B8DEF"}
          onMouseLeave={e => e.currentTarget.style.color = "#F0F0EC"}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}

/* ── Contact overlay ───────────────────────────────────────────────── */
function ContactOverlay({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
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
        {/* Close button — fixed right side, X */}
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
                  <option value="consult">I want to consult on an AI project</option>
                  <option value="build">I want you to build something for me</option>
                  <option value="hiring">I'm hiring</option>
                  <option value="education">I want to learn about AI</option>
                  <option value="connect">I just want to connect</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <label style={labelStyle}>Tell me more</label>
                <textarea
                  name="message"
                  required
                  placeholder="What are you working on? What do you need?"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
                  onFocus={e => e.target.style.borderColor = "#5B8DEF"}
                  onBlur={e => e.target.style.borderColor = "#1E1E2E"}
                />
              </div>

              <button
                type="submit"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  background: "#5B8DEF",
                  color: "#0A0A0F",
                  padding: "0.85rem 2rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "0.5rem",
                  transition: "opacity 0.15s ease"
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                Send message →
              </button>

            </form>
          </>
        )}
      </div>
    </div>
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
      {/* Social icons in place of name */}
      <SocialIcons />

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

  return (
    <>
      <Nav onContactOpen={() => setOverlayOpen(true)} />

      {overlayOpen && (
        <ContactOverlay onClose={() => setOverlayOpen(false)} />
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
