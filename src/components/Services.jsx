import React, { useState } from "react";

const services = [
  {
    tag: "Develop",
    title: "I'll develop it for you.",
    summary: "You bring the problem. I design and build the AI system that solves it.",
    details: [
      { label: "Agentic Systems", text: "AI agents that act autonomously, use tools, and complete tasks without you in the loop." },
      { label: "Automation Pipelines", text: "End-to-end workflows across n8n, Make, and Zapier that replace manual, repetitive work." },
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
    cta: "Book a free discovery call",
    ctaType: "calendly"
  }
];

export default function Services() {
  const [expanded, setExpanded] = useState(null);

  function toggle(i) {
    setExpanded(expanded === i ? null : i);
  }

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
      {/* Header */}
      <div className="mb-12" style={{ maxWidth: "48ch" }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            color: "#F0F0EC",
            lineHeight: 1.1,
            marginBottom: "2rem"
          }}
        >
          You don't have to figure this out alone.
        </h2>
      </div>

      {/* Service cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {services.map((s, i) => (
          <div
            key={s.tag}
            className="card"
            style={{
              padding: "0",
              overflow: "hidden",
              borderColor: expanded === i ? "rgba(91, 141, 239, 0.35)" : "#1E1E2E",
              transition: "border-color 0.2s ease"
            }}
          >
            {/* Card header */}
            <button
              onClick={() => toggle(i)}
              style={{
                width: "100%",
                padding: "2rem 2.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1.5rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#5B8DEF",
                    background: "rgba(91, 141, 239, 0.08)",
                    border: "1px solid rgba(91, 141, 239, 0.2)",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "0.25rem",
                    flexShrink: 0
                  }}
                >
                  {s.tag}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                      color: "#F0F0EC",
                      letterSpacing: "-0.02em",
                      marginBottom: "0.25rem"
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                      color: "#C8C8DC"
                    }}
                  >
                    {s.summary}
                  </p>
                </div>
              </div>

              {/* Expand icon — plus when closed, minus when open */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: `1px solid ${expanded === i ? "rgba(91, 141, 239, 0.3)" : "#1E1E2E"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "border-color 0.2s ease"
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  {/* Horizontal line — always visible */}
                  <line x1="1" y1="7" x2="13" y2="7" stroke="#5B8DEF" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Vertical line — only visible when collapsed */}
                  {expanded !== i && (
                    <line x1="7" y1="1" x2="7" y2="13" stroke="#5B8DEF" strokeWidth="1.5" strokeLinecap="round" />
                  )}
                </svg>
              </div>
            </button>

            {/* Expanded content */}
            {expanded === i && (
              <div
                style={{
                  padding: "0 2.5rem 2rem",
                  borderTop: "1px solid #1E1E2E"
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1rem",
                    marginTop: "1.5rem",
                    marginBottom: "1rem"
                  }}
                >
                  {s.details.slice(0, 3).map((d) => (
                    <div
                      key={d.label}
                      style={{
                        padding: "1.25rem",
                        background: "#0A0A0F",
                        border: "1px solid #1E1E2E",
                        borderRadius: "0.5rem"
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.65rem",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#5B8DEF",
                          marginBottom: "0.5rem"
                        }}
                      >
                        {d.label}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.875rem",
                          color: "#C8C8DC",
                          lineHeight: 1.65
                        }}
                      >
                        {d.text}
                      </p>
                    </div>
                  ))}
                </div>
                {s.details.length > 3 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "1rem",
                      marginBottom: "2rem"
                    }}
                  >
                    {s.details.slice(3).map((d) => (
                      <div
                        key={d.label}
                        style={{
                          padding: "1.25rem",
                          background: "#0A0A0F",
                          border: "1px solid #1E1E2E",
                          borderRadius: "0.5rem",
                          width: "calc(33.333% - 0.5rem)"
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.65rem",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: "#5B8DEF",
                            marginBottom: "0.5rem"
                          }}
                        >
                          {d.label}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.875rem",
                            color: "#C8C8DC",
                            lineHeight: 1.65
                          }}
                        >
                          {d.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                {s.ctaType === "contact" ? (
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent("openContact"))}
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      background: "transparent",
                      color: "#5B8DEF",
                      padding: "0.75rem 1.75rem",
                      borderRadius: "0.375rem",
                      border: "1px solid rgba(91, 141, 239, 0.4)",
                      cursor: "pointer",
                      transition: "all 0.15s ease"
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
                    {s.cta} →
                  </button>
                ) : (
                  /* TODO: Replace # with your Calendly URL before launch */
                  <a
                    href="https://calendly.com/d/dtm3-823-jsv"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      background: "transparent",
                      color: "#5B8DEF",
                      padding: "0.75rem 1.75rem",
                      borderRadius: "0.375rem",
                      border: "1px solid rgba(91, 141, 239, 0.4)",
                      textDecoration: "none",
                      transition: "all 0.15s ease"
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
                    {s.cta} →
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
