import React, { useState, useRef } from "react";

const testimonials = [
  {
    quote: "Before my session with Yair, I was using AI tools like Claude and ChatGPT mostly for search and organization. I knew the basics, but I hadn't scratched the surface of what was possible. That single one-on-one session changed everything.\n\nYair has a rare ability to meet you where you are and open your eyes to what you didn't know you were missing. He didn't just teach me new techniques, he shifted my entire mindset about what AI can do. I left the session genuinely inspired, and that inspiration translated into action fast.\n\nWithin a short time, I went from a casual AI user to building automation workflows, creating agents, and working across multiple AI platforms with real confidence. Today, I'm the go-to person at my company for AI operations, something I genuinely would not have predicted before that session.\n\nIf you're sitting on a moderate understanding of AI and wondering whether there's more, there is, and Yair will show you exactly where to find it.",
    name: "Amit Netanel",
    title: "Registration and VIP Services Representative"
  },
  {
    quote: "I wasn't sure what to expect going into Yair's AI course, but it genuinely exceeded my expectations. The course was practical, easy to understand, and felt very personalized to my needs. Throughout the session, Yair asked questions about my business and tailored the content based on my answers, even giving live examples of how I could implement AI into my day-to-day operations.\n\nWhat I appreciated most was that it wasn't just a presentation, it was hands-on, relevant, and immediately actionable. I've already started using several of the tools and techniques in my business, saving time, improving efficiency, and discovering new ways to automate tasks I used to do manually.\n\nIf you're looking to learn how to actually use AI to improve your work or business, I highly recommend Yair's course. It's one of those courses where you walk away with real value from day one.",
    name: "Marty Weisel",
    title: "CEO and Founder, Effect Production Studios"
  },
  {
    quote: "I took Yair's intro to AI masterclass and really enjoyed it. He covered everything from different models to tools and practical use cases, all in a way that was clear and easy to follow. I came in not knowing much and left with a solid understanding of how AI actually works. Would definitely recommend it to anyone curious about the topic.",
    name: "Meirav Goldman",
    title: "SEO and GEO Strategist"
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

  const total = testimonials.length;

  function goTo(i) {
    setIndex(((i % total) + total) % total);
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  }
  function handleTouchMove(e) {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }
  function handleTouchEnd() {
    if (Math.abs(touchDeltaX.current) > 50) {
      if (touchDeltaX.current < 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  }

  const current = testimonials[index];

  return (
    <section
      id="testimonials"
      className="section"
      style={{
        paddingLeft: "clamp(1.5rem, 8vw, 8rem)",
        paddingRight: "clamp(1.5rem, 8vw, 8rem)",
        borderTop: "1px solid #1E1E2E",
        scrollMarginTop: "70px"
      }}
    >
      <div className="mb-12" style={{ maxWidth: "44ch" }}>
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
          Don't just take my word for it.
        </h2>
      </div>

      {/* Carousel */}
      <div style={{ maxWidth: "780px", margin: "0 auto", position: "relative" }}>
        {/* Glow border wrapper, matching Services card treatment */}
        <div
          style={{
            borderRadius: "0.875rem",
            padding: "2px",
            background: "linear-gradient(135deg, rgba(91,141,239,0.4) 0%, rgba(30,30,46,1) 50%, rgba(91,141,239,0.4) 100%)",
            boxShadow: "0 0 50px rgba(91, 141, 239, 0.1)"
          }}
        >
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              background: "#0A0A0F",
              borderRadius: "0.8rem",
              padding: "clamp(2rem, 5vw, 3rem)",
              minHeight: "340px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "1.5rem"
            }}
          >
            {/* Quote mark */}
            <div
              aria-hidden="true"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "4rem",
                lineHeight: 1,
                color: "#5B8DEF",
                opacity: 0.35,
                userSelect: "none"
              }}
            >
              "
            </div>

            {/* Quote body */}
            <blockquote
              key={index}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: "#C8C8DC",
                lineHeight: 1.8,
                whiteSpace: "pre-line",
                flexGrow: 1,
                maxHeight: "340px",
                overflowY: "auto",
                paddingRight: "0.5rem"
              }}
            >
              {current.quote}
            </blockquote>

            {/* Attribution */}
            <div
              style={{
                paddingTop: "1.25rem",
                borderTop: "1px solid #1E1E2E",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem"
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#F0F0EC"
                  }}
                >
                  {current.name}
                </p>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    letterSpacing: "0.08em",
                    color: "#5B8DEF",
                    marginTop: "0.25rem"
                  }}
                >
                  {current.title}
                </p>
              </div>

              {/* Arrow nav */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: "1px solid #1E1E2E",
                    background: "#151520",
                    color: "#5B8DEF",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    transition: "border-color 0.15s ease, background 0.15s ease"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(91,141,239,0.5)"; e.currentTarget.style.background = "rgba(91,141,239,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1E1E2E"; e.currentTarget.style.background = "#151520"; }}
                >
                  ←
                </button>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: "1px solid #1E1E2E",
                    background: "#151520",
                    color: "#5B8DEF",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    transition: "border-color 0.15s ease, background 0.15s ease"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(91,141,239,0.5)"; e.currentTarget.style.background = "rgba(91,141,239,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1E1E2E"; e.currentTarget.style.background = "#151520"; }}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dot indicators — position only, no numbers */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: i === index ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                border: "none",
                background: i === index ? "#5B8DEF" : "#1E1E2E",
                cursor: "pointer",
                transition: "all 0.25s ease",
                padding: 0
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
