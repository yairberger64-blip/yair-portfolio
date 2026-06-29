import React from "react";

const demos = [
  {
    id: "aria",
    tag: "Local AI Assistant",
    name: "ARIA — Local AI Assistant",
    screenshot: "/aria.png",
    description:
      "A fully local agentic AI assistant that runs entirely on-device. No cloud, no data leaving your machine. ARIA uses tools, manages tasks, and acts autonomously — built to show what agentic AI looks like when privacy is non-negotiable."
  },
  {
    id: "car-finder",
    tag: "Decision Engine",
    name: "Used Car Evaluator",
    screenshot: "/car-finder.png",
    description:
      "Feed it your budget and preferences, then give it cars via web search, screenshots, or manual entry. It returns scored cards with km/year calculations, market valuations, deal classifications, and a suggested opening offer with negotiation range. A decision engine, not a search engine."
  },
  {
    id: "sdr",
    tag: "Sales Operations",
    name: "SDR Command Center",
    screenshot: "/sdr-command-center.jpeg",
    blur: false,
    description:
      "A full outbound sales system — from raw lead list to CRM-ready handoff. Enriches leads, guides SDRs through every call outcome with enforced next steps, auto-populates emails and scripts, and syncs only clean qualified data to the CRM. Every lead gets the right treatment."
  },
  {
    id: "qr",
    tag: "Marketing Tool",
    name: "Smart QR Code Generator",
    screenshot: "/qr-generator.jpeg",
    description:
      "Generates custom-designed QR codes with built-in UTM tracking. Works globally, supports multiple campaigns, and gives you clean attribution data every time someone scans."
  },
  {
    id: "morning-brief",
    tag: "Daily Automation",
    name: "Morning Brief Agent",
    screenshot: "/morning-brief.png",
    description:
      "Every morning, an AI agent checks your weather, calendar, tasks, and top news from the last 24 hours — then writes a personalised briefing and delivers it to your phone before you get out of bed. Fully automated, runs in the cloud, zero effort on your end."
  },
  {
    id: "weekly-digest",
    tag: "Content Automation",
    name: "Weekly AI Digest",
    screenshot: "/weekly-digest.png",
    description:
      "Every Sunday at 9am, this agent pulls from live AI and LLM news sources, runs the content through Gemini, and delivers a structured briefing straight to your inbox. Top 5 stories, one accelerating trend, one risk, one opportunity. Chief of staff format, under 500 words. You stay informed without spending a minute on it."
  }
];

function FlipCard({ tag, name, description, screenshot, blur }) {
  return (
    <div className="flip-card" style={{ height: "320px" }}>
      <div className="flip-card-inner">

        {/* ── FRONT ── */}
        <div
          className="flip-card-front card"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {screenshot ? (
            <>
              {/* Real screenshot */}
              <img
                src={screenshot}
                alt={name}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  borderRadius: "0.75rem",
                  opacity: 0.85,
                  filter: blur ? "blur(8px)" : "none",
                  transform: blur ? "scale(1.05)" : "none"
                }}
              />
              {/* Gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(17,19,32,0.2) 0%, transparent 50%)",
                  borderRadius: "0.75rem"
                }}
              />
            </>
          ) : (
            <>
              {/* Grid pattern placeholder */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(#1E1E2E 1px, transparent 1px), linear-gradient(90deg, #1E1E2E 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  opacity: 0.4
                }}
              />
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#5B8DEF",
                  background: "rgba(91, 141, 239, 0.08)",
                  border: "1px solid rgba(91, 141, 239, 0.2)",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "0.25rem",
                  zIndex: 1
                }}
              >
                {tag}
              </p>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.4rem",
                  color: "#F0F0EC",
                  letterSpacing: "-0.02em",
                  zIndex: 1,
                  textAlign: "center",
                  padding: "0 1rem"
                }}
              >
                {name}
              </h3>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#2E2E4E",
                  zIndex: 1
                }}
              >
                Screenshot coming
              </p>
            </>
          )}
        </div>

        {/* ── BACK ── */}
        <div
          className="flip-card-back card"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "2rem",
            borderColor: "rgba(91, 141, 239, 0.25)"
          }}
        >
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "#F0F0EC",
              letterSpacing: "-0.02em",
              marginBottom: "1rem"
            }}
          >
            {name}
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem",
              color: "#C8C8DC",
              lineHeight: 1.7
            }}
          >
            {description}
          </p>
        </div>
      </div>

      <style>{`
        .flip-card {
          cursor: pointer;
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          transform-origin: center center;
        }
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 0.75rem;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
        @media (prefers-reduced-motion: reduce) {
          .flip-card-inner {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}

export default function Demos() {
  return (
    <section
      id="demos"
      className="section"
      style={{
        paddingLeft: "clamp(1.5rem, 8vw, 8rem)",
        paddingRight: "clamp(1.5rem, 8vw, 8rem)",
        borderTop: "1px solid #1E1E2E",
        scrollMarginTop: "70px"
      }}
    >
      <div className="mb-14" style={{ maxWidth: "44ch" }}>
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
          Don't believe me?<br />
          <span style={{ color: "#5B8DEF" }}>See for yourself.</span>
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
          gap: "1.25rem"
        }}
      >
        {demos.map((demo) => (
          <FlipCard key={demo.id} {...demo} />
        ))}
      </div>
    </section>
  );
}
