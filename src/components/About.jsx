import React from "react";

export default function About() {
  return (
    <section
      id="about"
      className="section"
      style={{
        paddingLeft: "clamp(1.5rem, 8vw, 8rem)",
        paddingRight: "clamp(1.5rem, 8vw, 8rem)",
        borderTop: "1px solid #1E1E2E",
        scrollMarginTop: "70px"
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: "clamp(2rem, 4vw, 4rem)",
          alignItems: "start"
        }}
        className="about-grid"
      >
        {/* Left — image */}
        <div
          style={{
            width: "100%"
          }}
        >
          <img
            src="/yair.jpg"
            alt="Yair Berger"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "0.75rem",
              display: "block"
            }}
          />
        </div>

        {/* Right — text */}
        <div style={{ paddingTop: "1rem" }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#F0F0EC",
              lineHeight: 1.1,
              marginBottom: "2rem"
            }}
          >
            I didn't want to work harder.<br />
            <span style={{ color: "#5B8DEF" }}>So I built AI that works for me.</span>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              "I'm Yair. Husband to the most amazing wife, father to the most energetic and perfect little girl Mia, and dog dad to the goofiest dog Krembo.",
              "Life gets busy. Like really busy. Between work, daycare runs, bedtime routines, and trying to actually show up for the people you love, the days just disappear.",
              "I've been building AI systems for a while now, always for the companies I worked for. And at some point I just thought, why am I not using this for myself?",
              "So I did. I started automating the stuff that was eating my time. And it worked. Like actually worked. So I started helping other individuals do the same, and that worked well too.",
              "Now, drawing on years of experience working across startups and with leadership teams, I help individuals, business owners, and startups use AI to get their time back, cut costs, and move faster.",
              "Nobody should be drowning in their to-do list when AI can handle half of it."
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.95rem",
                  color: i === 5 ? "#F0F0EC" : "#C8C8DC",
                  lineHeight: 1.75,
                  fontWeight: i === 5 ? 500 : 400
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
