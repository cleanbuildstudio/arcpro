"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
  useEffect(() => {
    // Pure physics damping (lerp) for weightless, buttery-smooth glide
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.08, // Buttery soft inertia (lower = smoother/floatier, 0.08 is the sweet spot)
      wheelMultiplier: 1.15, // Responsive effortless scroll without resistance
      smoothWheel: true,
      syncTouch: false, // Let mobile touch screens retain native 120Hz responsive feel
    });

    (window as unknown as { lenis: Lenis }).lenis = lenis;

    return () => {
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return null;
}
