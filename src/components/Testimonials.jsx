import React from "react";

const testimonials = [
  {
    placeholder: false,
    quote: "Before my session with Yair, I was using AI tools like Claude and ChatGPT mostly for search and organization. I knew the basics, but I hadn't scratched the surface of what was possible. That single one-on-one session changed everything.\n\nYair has a rare ability to meet you where you are and open your eyes to what you didn't know you were missing. He didn't just teach me new techniques, he shifted my entire mindset about what AI can do. I left the session genuinely inspired, and that inspiration translated into action fast.\n\nWithin a short time, I went from a casual AI user to building automation workflows, creating agents, and working across multiple AI platforms with real confidence. Today, I'm the go-to person at my company for AI operations, something I genuinely would not have predicted before that session.\n\nIf you're sitting on a moderate understanding of AI and wondering whether there's more, there is, and Yair will show you exactly where to find it.",
    name: "Amit Netanel",
    title: "Registration and VIP Services Representative"
  },
  {
    placeholder: false,
    quote: "I wasn't sure what to expect going into Yair's AI course, but it genuinely exceeded my expectations. The course was practical, easy to understand, and felt very personalized to my needs. Throughout the session, Yair asked questions about my business and tailored the content based on my answers, even giving live examples of how I could implement AI into my day-to-day operations.\n\nWhat I appreciated most was that it wasn't just a presentation, it was hands-on, relevant, and immediately actionable. I've already started using several of the tools and techniques in my business, saving time, improving efficiency, and discovering new ways to automate tasks I used to do manually.\n\nIf you're looking to learn how to actually use AI to improve your work or business, I highly recommend Yair's course. It's one of those courses where you walk away with real value from day one.",
    name: "Marty Weisel",
    title: "CEO and Founder, Effect Production Studios"
  },
  {
    placeholder: false,
    quote: "I took Yair's intro to AI masterclass and really enjoyed it. He covered everything from different models to tools and practical use cases, all in a way that was clear and easy to follow. I came in not knowing much and left with a solid understanding of how AI actually works. Would definitely recommend it to anyone curious about the topic.",
    name: "Meirav Goldman",
    title: "SEO and GEO Strategist"
  }
];

function TestimonialCard({ quote, name, title, placeholder }) {
  return (
    <div
      className="card"
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        height: "100%"
      }}
    >
      <div
        aria-hidden="true"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "3rem",
          lineHeight: 1,
          color: "#5B8DEF",
          opacity: 0.4,
          userSelect: "none"
        }}
      >
        "
      </div>

      <blockquote
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.9rem",
          color: "#C8C8DC",
          lineHeight: 1.75,
          flexGrow: 1,
          whiteSpace: "pre-line"
        }}
      >
        {quote}
      </blockquote>

      <div
        style={{
          paddingTop: "1rem",
          borderTop: "1px solid #1E1E2E"
        }}
      >
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: "0.875rem",
            color: "#F0F0EC"
          }}
        >
          {name}
        </p>
        {title && (
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.08em",
              color: "#8A8AB0",
              marginTop: "0.2rem"
            }}
          >
            {title}
          </p>
        )}
      </div>
    </div>
  );
}

export default function Testimonials() {
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
          Don't just take my word for it.
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
          gap: "1.25rem",
          alignItems: "start"
        }}
      >
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </section>
  );
}
