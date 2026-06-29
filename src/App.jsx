import React, { useState } from "react";
import "./index.css";

import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Demos from "./components/Demos";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";

export default function App() {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <div
      style={{
        background: "#0A0A0F",
        minHeight: "100vh",
        overflowX: "hidden"
      }}
    >
      <Hero overlayOpen={overlayOpen} setOverlayOpen={setOverlayOpen} />
      <About />
      <Services />
      <Demos />
      <Testimonials />
      <Contact onContactOpen={() => setOverlayOpen(true)} />
    </div>
  );
}
