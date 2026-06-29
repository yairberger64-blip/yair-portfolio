import React from "react";

export default function Contact({ onContactOpen }) {
  return (
    <section
      id="contact"
      className="section"
      style={{
        paddingLeft: "clamp(1.5rem, 8vw, 8rem)",
        paddingRight: "clamp(1.5rem, 8vw, 8rem)",
        borderTop: "1px solid #1E1E2E"
      }}
    >
      {/* CTA block */}
      <div
        style={{
          background: "#151520",
          border: "1px solid rgba(91, 141, 239, 0.2)",
          borderRadius: "1rem",
          padding: "clamp(2.5rem, 6vw, 5rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "2rem",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Background glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(91, 141, 239, 0.08) 0%, transparent 70%)",
            pointerEvents: "none"
          }}
        />


        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#F0F0EC",
            lineHeight: 1.05,
            maxWidth: "16ch"
          }}
        >
          Ready to get started?{" "}
          <span style={{ color: "#5B8DEF" }}>Let's talk.</span>
        </h2>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            color: "#C8C8DC",
            lineHeight: 1.75,
            maxWidth: "46ch"
          }}
        >
          Whether you want something built, need guidance, or just want to explore what AI can do for you, I'm one message away.
        </p>

        <button
          onClick={onContactOpen}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "1.05rem",
            background: "#5B8DEF",
            color: "#F0F0EC",
            padding: "1rem 2.5rem",
            borderRadius: "0.5rem",
            border: "none",
            cursor: "pointer",
            transition: "opacity 0.15s ease",
            boxShadow: "0 0 32px rgba(91, 141, 239, 0.25)"
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          Get in touch →
        </button>
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: "4rem",
          paddingTop: "2rem",
          borderTop: "1px solid #1E1E2E",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem"
        }}
      >
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.06em",
            color: "#2E2E4E"
          }}
        >
          Yair Berger · AI Engineer · Consultant · {new Date().getFullYear()}
        </p>

        {/* Social links */}
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/dadbuildsai/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.06em",
              color: "#2E2E4E",
              textDecoration: "none",
              transition: "color 0.15s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#8A8AB0"}
            onMouseLeave={e => e.currentTarget.style.color = "#2E2E4E"}
          >
            Instagram →
          </a>
          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@dadbuildsai"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.06em",
              color: "#2E2E4E",
              textDecoration: "none",
              transition: "color 0.15s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#8A8AB0"}
            onMouseLeave={e => e.currentTarget.style.color = "#2E2E4E"}
          >
            TikTok →
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/yair-berger-4b9911177/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.06em",
              color: "#2E2E4E",
              textDecoration: "none",
              transition: "color 0.15s ease"
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#8A8AB0"}
            onMouseLeave={e => e.currentTarget.style.color = "#2E2E4E"}
          >
            LinkedIn →
          </a>
        </div>
      </footer>
    </section>
  );
}
