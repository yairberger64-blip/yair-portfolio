import React, { useEffect, useRef, useState } from "react";

const services = [
  {
    tag: "Develop",
    title: "I'll develop it for you.",
    summary: "You bring the problem. I design and build the AI system that solves it.",
    details: [
      { label: "Agentic Systems", text: "AI agents that act autonomously, use tools, and complete tasks without you in the loop." },
      { label: "Automation Pipelines", text: "End-to-end workflows across n8n, Make, Zapier, HubSpot, Salesforce, and more — replacing manual, repetitive work across your entire stack." },
      { label: "MCP Architecture", text: "Multi-agent systems built on the Model Context Protocol, designed to scale." },
      { label: "AI Content Systems", text: "Automated pipelines that produce, format, and publish content on a schedule." },
      { label: "LLM Evaluation", text: "Frameworks that measure whether your AI is actually working, structured and repeatable." }
    ],
    cta: "Get in touch",
    ctaType: "contact"
  },
  {
    tag: "Consult",
    title: "I'll guide you through it.",
    summary: "Not sure where to start? I'll help you figure out where AI fits and how to make it work for you.",
    details: [
      { label: "Strategy Sessions", text: "A focused session to map out where AI can have the biggest impact in your business. You leave with clarity, not a sales pitch." },
      { label: "Workshops", text: "Hands-on sessions for teams who want to actually use AI day-to-day. Practical, relevant, built around your tools." },
      { label: "Advisory", text: "Ongoing support as you implement AI. Someone who's done it before, in your corner." }
    ],
    cta: "Book a discovery call",
    ctaType: "calendly"
  }
];

function ServiceCard({ tag, title, summary, details, cta, ctaType, delay }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes dotPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(91, 141, 239, 0.4); }
          50% { box-shadow: 0 0 0 4px rgba(91, 141, 239, 0); }
        }
      `}</style>
      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          borderRadius: "0.875rem",
          padding: "2px",
          background: hovered
            ? "linear-gradient(135deg, #5B8DEF 0%, rgba(91,141,239,0.4) 50%, #5B8DEF 100%)"
            : "linear-gradient(135deg, rgba(91,141,239,0.25) 0%, rgba(30,30,46,1) 50%, rgba(91,141,239,0.25) 100%)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, background 0.3s ease, box-shadow 0.3s ease`,
          boxShadow: hovered ? "0 0 60px rgba(91, 141, 239, 0.3), 0 0 120px rgba(91, 141, 239, 0.15)" : "none"
        }}
      >
        <div
          style={{
            background: "#0A0A0F",
            borderRadius: "0.8rem",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            height: "100%"
          }}
        >
          {/* Tag */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#5B8DEF",
                background: "rgba(91, 141, 239, 0.08)",
                border: "1px solid rgba(91, 141, 239, 0.25)",
                padding: "0.25rem 0.75rem",
                borderRadius: "2rem",
                boxShadow: "0 0 12px rgba(91, 141, 239, 0.15)"
              }}
            >
              {tag}
            </span>
          </div>

          {/* Title + summary */}
          <div>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.6rem, 2.8vw, 2.1rem)",
                color: "#F0F0EC",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                paddingBottom: "0.3em",
                marginBottom: "0.75rem"
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.05rem",
                color: "#8A8AB0",
                lineHeight: 1.65
              }}
            >
              {summary}
            </p>
          </div>

          {/* Divider with label */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ height: "1px", background: "linear-gradient(to right, #5B8DEF, #1E1E2E)", flexGrow: 1 }} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                color: "#5B8DEF",
                opacity: 0.6,
                textTransform: "uppercase"
              }}
            >
              Services
            </span>
            <div style={{ height: "1px", background: "linear-gradient(to left, #5B8DEF, #1E1E2E)", flexGrow: 1 }} />
          </div>

          {/* Timeline details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0", flexGrow: 1 }}>
            {details.map((d, i) => (
              <div key={d.label} style={{ display: "flex", gap: "1rem" }}>
                {/* Timeline line + dot */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#5B8DEF",
                      border: "2px solid #0A0A0F",
                      outline: "1px solid rgba(91, 141, 239, 0.4)",
                      flexShrink: 0,
                      marginTop: "4px"
                    }}
                  />
                  {i < details.length - 1 && (
                    <div
                      style={{
                        width: "1px",
                        flexGrow: 1,
                        background: "linear-gradient(to bottom, rgba(91,141,239,0.4), rgba(91,141,239,0.1))",
                        margin: "4px 0"
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingBottom: i < details.length - 1 ? "1.25rem" : "0" }}>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.85rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#5B8DEF",
                      marginBottom: "0.25rem"
                    }}
                  >
                    {d.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.95rem",
                      color: "#C8C8DC",
                      lineHeight: 1.6
                    }}
                  >
                    {d.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ paddingTop: "1rem", borderTop: "1px solid #1E1E2E" }}>
            {ctaType === "contact" ? (
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("openContact"))}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  background: "transparent",
                  color: "#5B8DEF",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "0.375rem",
                  border: "1px solid rgba(91, 141, 239, 0.4)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  width: "100%"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(91, 141, 239, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(91, 141, 239, 0.7)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(91, 141, 239, 0.4)";
                }}
              >
                {cta} →
              </button>
            ) : (
              <a
                href="https://calendly.com/d/dtm3-823-jsv"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  background: "transparent",
                  color: "#5B8DEF",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "0.375rem",
                  border: "1px solid rgba(91, 141, 239, 0.4)",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                  width: "100%",
                  boxSizing: "border-box"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(91, 141, 239, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(91, 141, 239, 0.7)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(91, 141, 239, 0.4)";
                }}
              >
                {cta} →
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="section"
      style={{
        paddingLeft: "clamp(1.5rem, 8vw, 8rem)",
        paddingRight: "clamp(1.5rem, 8vw, 8rem)",
        borderTop: "1px solid #1E1E2E",
        scrollMarginTop: "70px"
      }}
    >
      <div style={{ marginBottom: "3rem" }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            color: "#F0F0EC",
            lineHeight: 1.1,
            paddingBottom: "0.3em"
          }}
        >
          You don't have to figure this out alone.
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "1.25rem",
          alignItems: "stretch"
        }}
      >
        {services.map((s, i) => (
          <ServiceCard key={s.tag} {...s} delay={i * 200} />
        ))}
      </div>
    </section>
  );
}
