import React from "react";

const capabilities = [
  {
    tag: "Agentic Systems",
    title: "End-to-end AI agents",
    body: "AI agents that don't just respond — they act. They use tools, make decisions, and complete multi-step tasks autonomously. No human in the loop."
  },
  {
    tag: "LLM Evaluation",
    title: "LLM-as-judge frameworks",
    body: "Most AI teams ship on vibes. I build frameworks that actually measure whether your AI is working — structured, repeatable, and honest about failure."
  },
  {
    tag: "MCP Architecture",
    title: "MCP-based agent design",
    body: "Multiple AI agents working together, each with a job, coordinated through a shared protocol. Systems that scale without falling apart."
  },
  {
    tag: "Automation",
    title: "Real automation pipelines",
    body: "End-to-end workflows across n8n, Make, and Zapier — connecting APIs, transforming data, and replacing manual work with systems that run on schedule."
  },
  {
    tag: "AI Content Systems",
    title: "AI-powered content at scale",
    body: "Automated content pipelines that produce, format, and publish on a schedule. Built on LLM APIs with no human required on delivery."
  },
  {
    tag: "Stack",
    title: "Tools I work in",
    body: "Claude, Claude Code, Claude Console, OpenAI APIs, Python, n8n, Make, Zapier, MCP, GitHub, HubSpot API, Apollo API, Microsoft 365, Copilot — and more."
  }
];

const audience = [
  {
    icon: "👤",
    title: "Individuals",
    body: "Drowning in repetitive tasks — tracking expenses, reminders, summaries, scheduling, meal planning, shopping lists. Things that have to get done but eat up your time."
  },
  {
    icon: "🏪",
    title: "Small Businesses",
    body: "Want to cut costs without cutting corners — automate the daily grind, improve efficiency, and let your team focus on work that actually matters."
  },
  {
    icon: "🤔",
    title: "New to AI",
    body: "Not sure where to start and want an honest picture of what AI actually is and where it's heading — no hype, no jargon."
  }
];

const services = [
  {
    tag: "Strategy Sessions",
    title: "Where does AI fit in your business?",
    body: "A focused session to map out where AI can have the biggest impact — and where it can't. You leave with clarity, not a sales pitch."
  },
  {
    tag: "Workshops",
    title: "Teaching teams how to use AI tools",
    body: "Hands-on workshops for teams who want to actually use AI day-to-day. Practical, relevant, and built around your tools and workflows."
  },
  {
    tag: "Advisory",
    title: "Ongoing guidance as you build",
    body: "Ongoing support as you implement AI in your business. Someone in your corner who's done it before and can steer you away from the mistakes."
  }
];

export default function WhatIBuild() {
  return (
    <div id="builds" style={{ scrollMarginTop: "70px" }}>

      {/* ── SECTION A — BUILDING ─────────────────────────────────── */}
      <section
        className="section"
        style={{
          paddingLeft: "clamp(1.5rem, 8vw, 8rem)",
          paddingRight: "clamp(1.5rem, 8vw, 8rem)",
          borderTop: "1px solid #252A40"
        }}
      >
        <div className="mb-16" style={{ maxWidth: "52ch" }}>
          <p className="eyebrow mb-4">What I Build</p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#F0F0EC",
              lineHeight: 1.1
            }}
          >
            Stop imagining what AI could do.<br />
            <span style={{ color: "#5B8DEF" }}>Start using it.</span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "#8A8AB0",
              marginTop: "1rem",
              lineHeight: 1.7
            }}
          >
            You don't know what AI could automate in your life yet. Let's find out.
          </p>
        </div>

        <div
          className="grid gap-5"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            alignItems: "stretch"
          }}
        >
          {capabilities.map((cap) => (
            <div key={cap.tag} className="card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column" }}>
              <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>{cap.tag}</p>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  color: "#F0F0EC",
                  marginBottom: "0.6rem",
                  letterSpacing: "-0.01em"
                }}
              >
                {cap.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  color: "#8A8AB0",
                  lineHeight: 1.65,
                  flexGrow: 1
                }}
              >
                {cap.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION B — CONSULTING ───────────────────────────────── */}
      <section
        id="consulting"
        className="section"
        style={{
          paddingLeft: "clamp(1.5rem, 8vw, 8rem)",
          paddingRight: "clamp(1.5rem, 8vw, 8rem)",
          borderTop: "1px solid #252A40",
          scrollMarginTop: "80px"
        }}
      >
        <div className="mb-16" style={{ maxWidth: "52ch" }}>
          <p className="eyebrow mb-4">Consulting</p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#F0F0EC",
              lineHeight: 1.1
            }}
          >
            Stop doing things<br />
            <span style={{ color: "#5B8DEF" }}>AI can handle for you.</span>
          </h2>
        </div>

        <p className="eyebrow mb-6">This is for you if —</p>
        <div
          className="grid gap-5 mb-16"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            alignItems: "stretch"
          }}
        >
          {audience.map((a) => (
            <div key={a.title} className="card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "1.5rem", marginBottom: "1rem", display: "block" }}>{a.icon}</span>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  color: "#F0F0EC",
                  marginBottom: "0.6rem",
                  letterSpacing: "-0.01em"
                }}
              >
                {a.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  color: "#8A8AB0",
                  lineHeight: 1.65,
                  flexGrow: 1
                }}
              >
                {a.body}
              </p>
            </div>
          ))}
        </div>

        <p className="eyebrow mb-6">What I offer</p>
        <div
          className="grid gap-5 mb-12"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
            alignItems: "stretch"
          }}
        >
          {services.map((s) => (
            <div key={s.tag} className="card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column" }}>
              <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>{s.tag}</p>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  color: "#F0F0EC",
                  marginBottom: "0.6rem",
                  letterSpacing: "-0.01em"
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  color: "#8A8AB0",
                  lineHeight: 1.65,
                  flexGrow: 1
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA — TODO: Replace href="#" with your Calendly URL before launch */}
        <div
          className="card"
          style={{
            padding: "2rem 2.5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            borderColor: "rgba(91, 141, 239, 0.15)"
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "#F0F0EC",
                marginBottom: "0.25rem"
              }}
            >
              Not sure where to start?
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.9rem",
                color: "#8A8AB0"
              }}
            >
              Book a free discovery call. No pitch, no pressure.
            </p>
          </div>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "0.95rem",
              background: "#5B8DEF",
              color: "#1B1F35",
              padding: "0.75rem 1.75rem",
              borderRadius: "0.375rem",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "opacity 0.15s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Book a free discovery call →
          </a>
        </div>
      </section>
    </div>
  );
}
