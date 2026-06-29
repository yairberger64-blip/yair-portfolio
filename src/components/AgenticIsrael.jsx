import React from "react";

export default function AgenticIsrael() {
  return (
    <section
      id="agentic-israel"
      className="section"
      style={{
        paddingLeft: "clamp(1.5rem, 8vw, 8rem)",
        paddingRight: "clamp(1.5rem, 8vw, 8rem)",
        borderTop: "1px solid #2C2C3E"
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "3rem",
          maxWidth: "800px"
        }}
      >
        {/* Eyebrow */}
        <p className="eyebrow">Community</p>

        {/* Main content block */}
        <div
          className="card"
          style={{
            padding: "clamp(2rem, 5vw, 3.5rem)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Accent line on left */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              top: "2rem",
              bottom: "2rem",
              width: "2px",
              background: "#C8FF57",
              borderRadius: "0 1px 1px 0",
              opacity: 0.5
            }}
          />

          <div style={{ paddingLeft: "1.5rem" }}>
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.5rem"
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#C8FF57",
                  background: "rgba(200, 255, 87, 0.08)",
                  border: "1px solid rgba(200, 255, 87, 0.2)",
                  padding: "0.25rem 0.65rem",
                  borderRadius: "0.25rem"
                }}
              >
                Founding Cohort Member
              </span>
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: "#F0F0EC",
                lineHeight: 1.1,
                marginBottom: "1.25rem"
              }}
            >
              Agentic Israel
            </h2>

            {/* Body */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  color: "#8A8A9A",
                  lineHeight: 1.75,
                  maxWidth: "52ch"
                }}
              >
                Agentic Israel is one of the earliest communities in Israel focused
                specifically on agentic AI — systems that act, plan, and execute
                autonomously, not just generate text.
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  color: "#8A8A9A",
                  lineHeight: 1.75,
                  maxWidth: "52ch"
                }}
              >
                As a founding cohort member, I was among the first practitioners
                in the community building real agentic systems: not theorizing about
                the future of AI, but shipping agents and pipelines that solve actual
                business problems.
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  color: "#8A8A9A",
                  lineHeight: 1.75,
                  maxWidth: "52ch"
                }}
              >
                The community connects builders, researchers, and practitioners
                working at the edge of what's possible with autonomous AI systems.
              </p>
            </div>

            {/* Stats row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2.5rem",
                marginTop: "2.5rem",
                paddingTop: "2rem",
                borderTop: "1px solid #2C2C3E"
              }}
            >
              {[
                { value: "Founding", label: "Cohort status" },
                { value: "2+ yrs", label: "Building in production" },
                { value: "Israel", label: "AI builder community" }
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: "#F0F0EC",
                      letterSpacing: "-0.02em"
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#4A4A5E",
                      marginTop: "0.2rem"
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
