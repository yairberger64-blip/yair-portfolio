import React from "react";

export default function PrivacyPolicy({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#0A0A0F",
        overflowY: "auto",
        padding: "clamp(2rem, 8vw, 6rem)"
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: "1.5rem",
          right: "1.5rem",
          background: "none",
          border: "none",
          color: "#8A8AB0",
          cursor: "pointer",
          fontSize: "1.5rem",
          lineHeight: 1,
          padding: "0.25rem",
          transition: "color 0.15s ease",
          zIndex: 300
        }}
        onMouseEnter={e => e.currentTarget.style.color = "#F0F0EC"}
        onMouseLeave={e => e.currentTarget.style.color = "#8A8AB0"}
        aria-label="Close"
      >
        ✕
      </button>

      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        {/* Header */}
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#5B8DEF",
            marginBottom: "1rem"
          }}
        >
          Legal
        </p>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 700,
            color: "#F0F0EC",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            paddingBottom: "0.3em",
            marginBottom: "0.5rem"
          }}
        >
          Privacy Policy
        </h1>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem",
            color: "#8A8AB0",
            marginBottom: "3rem"
          }}
        >
          Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        {/* Sections */}
        {[
          {
            title: "Who I am",
            body: "This website is operated by Yair Berger, an independent AI engineer and consultant. If you have any questions about this policy, you can reach me at yairberger64@gmail.com."
          },
          {
            title: "What data I collect",
            body: "When you fill in the contact form on this site, I collect your name, email address, the reason you're reaching out, and any message you choose to include. I do not collect any other personal data. I do not use cookies, analytics tools, or tracking of any kind."
          },
          {
            title: "How I use your data",
            body: "Your details are used solely to respond to your enquiry. I will not use your information for marketing purposes, share it with third parties, or sell it under any circumstances."
          },
          {
            title: "Where your data is stored",
            body: "Contact form submissions are processed and stored by Formspree (formspree.io), a third-party form service. Formspree's own privacy policy applies to how they handle your data. I retain your submission for up to 12 months, after which it is deleted."
          },
          {
            title: "Your rights",
            body: "You have the right to request access to the personal data I hold about you, ask me to correct or delete it, or withdraw consent at any time. To exercise any of these rights, contact me at yairberger64@gmail.com and I will respond within 30 days."
          },
          {
            title: "Changes to this policy",
            body: "I may update this policy from time to time. Any changes will be posted on this page with an updated date. Continued use of this site after changes are posted constitutes your acceptance of the updated policy."
          }
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#F0F0EC",
                marginBottom: "0.75rem",
                letterSpacing: "-0.01em"
              }}
            >
              {section.title}
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.95rem",
                color: "#C8C8DC",
                lineHeight: 1.75
              }}
            >
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
