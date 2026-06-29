import React from "react";

/* ── Post card ───────────────────────────────────────────────────────
   Replace placeholder props with real post data.
   'link' opens the LinkedIn post in a new tab.
────────────────────────────────────────────────────────────────────── */
function PostCard({ title, excerpt, date, platform, link, placeholder = false }) {
  const inner = (
    <div
      className="card"
      style={{
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        height: "100%",
        textDecoration: "none",
        cursor: placeholder ? "default" : "pointer",
        transition: "transform 0.15s ease"
      }}
      onMouseEnter={e => {
        if (!placeholder) e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Top row: platform + date */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: placeholder ? "#3A3A5E" : "#5B8DEF"
          }}
        >
          {placeholder ? "Platform" : platform}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: "#3A3A5E"
          }}
        >
          {placeholder ? "Date" : date}
        </span>
      </div>

      {/* Title */}
      {placeholder ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <div
            style={{
              height: "1rem",
              borderRadius: "0.2rem",
              background: "#252A40",
              width: "90%"
            }}
          />
          <div
            style={{
              height: "1rem",
              borderRadius: "0.2rem",
              background: "#252A40",
              width: "65%"
            }}
          />
        </div>
      ) : (
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: "1rem",
            color: "#F0F0EC",
            letterSpacing: "-0.01em",
            lineHeight: 1.3
          }}
        >
          {title}
        </h3>
      )}

      {/* Excerpt */}
      {placeholder ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {[100, 88, 76].map((w, i) => (
            <div
              key={i}
              style={{
                height: "0.75rem",
                borderRadius: "0.15rem",
                background: "#242840",
                border: "1px solid #252A40",
                width: `${w}%`
              }}
            />
          ))}
        </div>
      ) : (
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
            color: "#8A8AB0",
            lineHeight: 1.65,
            flexGrow: 1
          }}
        >
          {excerpt}
        </p>
      )}

      {/* Footer */}
      <div
        style={{
          paddingTop: "0.875rem",
          borderTop: "1px solid #252A40"
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: placeholder ? "#3A3A5E" : "#8A8AB0"
          }}
        >
          {placeholder ? "Read post →" : "Read on LinkedIn →"}
        </span>
      </div>
    </div>
  );

  if (!placeholder && link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        {inner}
      </a>
    );
  }

  return inner;
}

/* ── Placeholder posts — swap with real LinkedIn post data ─────────── */
const posts = [
  { placeholder: true },
  { placeholder: true },
  { placeholder: true }
];

/* ── Real post example (uncomment and fill in):
{
  placeholder: false,
  platform: "LinkedIn",
  date: "Jun 2025",
  title: "Why LLM evaluation is the most under-rated skill in AI engineering",
  excerpt: "Everyone's focused on prompting. Almost nobody is measuring whether their prompts actually work...",
  link: "https://linkedin.com/posts/..."
}
───────────────────────────────────────────────────────────────────── */

export default function ThoughtLeadership() {
  return (
    <section
      id="thought-leadership"
      className="section"
      style={{
        paddingLeft: "clamp(1.5rem, 8vw, 8rem)",
        paddingRight: "clamp(1.5rem, 8vw, 8rem)",
        borderTop: "1px solid #252A40"
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "1.5rem",
          marginBottom: "3.5rem"
        }}
      >
        <div style={{ maxWidth: "42ch" }}>
          <p className="eyebrow mb-4">Thought Leadership</p>
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
            Writing about what I'm building.
          </h2>
        </div>

        <a
          href="https://linkedin.com/in/yairberger"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#8A8AB0",
            textDecoration: "none",
            border: "1px solid #252A40",
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            transition: "border-color 0.15s ease, color 0.15s ease",
            whiteSpace: "nowrap"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "#8A8AB0";
            e.currentTarget.style.color = "#F0F0EC";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "#252A40";
            e.currentTarget.style.color = "#8A8AB0";
          }}
        >
          Follow on LinkedIn →
        </a>
      </div>

      {/* Post grid */}
      <div
        className="grid gap-5"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))"
        }}
      >
        {posts.map((post, i) => (
          <PostCard key={i} {...post} />
        ))}
      </div>

      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.08em",
          color: "#3A3A5E",
          marginTop: "2.5rem"
        }}
      >
        // LinkedIn posts and articles will be linked here
      </p>
    </section>
  );
}
