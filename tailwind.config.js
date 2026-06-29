/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        void: "#111320",
        surface: "#1A1D2E",
        border: "#252A40",
        offwhite: "#F0F0EC",
        muted: "#8A8AB0",
        lime: "#5B8DEF",
        "lime-dim": "#7AA5F5"
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"]
      },
      fontSize: {
        "hero": ["clamp(2.8rem, 7vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "section": ["clamp(1.8rem, 4vw, 2.8rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }]
      }
    }
  },
  plugins: []
};
