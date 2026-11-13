"use client";

import React, { useEffect, useState } from "react";

export default function MinimalPageLoader() {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isCurtainLifting, setIsCurtainLifting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Skip loader if already played in the current tab session
    const hasSeen = typeof window !== "undefined" && sessionStorage.getItem("archpro_entry_seen");
    if (hasSeen) {
      setIsComplete(true);
      return;
    }
    sessionStorage.setItem("archpro_entry_seen", "true");

    // Ensure smooth entry: lock scroll while initial curtain is present
    document.body.style.overflow = "hidden";

    const startTime = performance.now();
    // Fast, crisp duration matching arcprojects.build & minimal.gallery standards
    const duration = 1200;

    let frameId: number;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(1, elapsed / duration);

      // Arc Projects custom curve: swift start, subtle mid easing, clean snap to 100
      let eased = progressRatio;
      if (progressRatio < 0.5) {
        eased = 2 * progressRatio * progressRatio;
      } else {
        eased = 1 - Math.pow(-2 * progressRatio + 2, 2) / 2;
      }

      const val = Math.round(eased * 100);
      setProgress(val);

      if (progressRatio < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);

        // Phase 1: Fade out bottom text and counter gracefully
        setTimeout(() => {
          setIsFadingOut(true);

          // Phase 2: Slide curtain upward cleanly
          setTimeout(() => {
            setIsCurtainLifting(true);
            document.body.style.overflow = "";

            // Phase 3: Unmount loader completely
            setTimeout(() => {
              setIsComplete(true);
            }, 800);
          }, 240);
        }, 120);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = "";
    };
  }, []);

  if (isComplete) return null;

  return (
    <aside
      className={`fixed inset-0 z-[99999] bg-[#0c0c0c] text-white select-none pointer-events-auto will-change-transform transition-transform duration-[750ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isCurtainLifting ? "-translate-y-full" : "translate-y-0"
      }`}
      aria-label="Initial Page Entrance"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="relative w-full h-full flex flex-col justify-between px-5 sm:px-10 lg:px-16 py-6 sm:py-8 lg:py-10">
        {/* Top Header Row — Positioned identically to the site Header for zero-jump continuity */}
        <div className="w-full flex items-center justify-between">
          <div className="text-[20px] sm:text-[22px] font-bold tracking-[-0.03em] leading-none select-none">
            <span className="text-[#4ec86e]">Arch</span>
            <span className="text-white">Pro.</span>
          </div>

          <div className="text-[11px] sm:text-[12px] font-mono tracking-[0.2em] uppercase text-white/40">
            (2026)
          </div>
        </div>

        {/* Center: Subtle architectural crosshair accent (Minimal Gallery aesthetic) */}
        <div className="pointer-events-none opacity-20 hidden sm:flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="12" y1="4" x2="12" y2="20" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="4" y1="12" x2="20" y2="12" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        </div>

        {/* Bottom Editorial Row (Arc Projects style) */}
        <div
          className={`w-full flex items-end justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isFadingOut ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"
          }`}
        >
          <div className="text-[13px] sm:text-[14px] font-normal tracking-[-0.01em] text-white/70 max-w-xs sm:max-w-md">
            Architecture, Built for Life.
          </div>

          <div className="text-[13px] sm:text-[14px] font-mono font-medium tracking-wider text-white">
            {progress}%
          </div>
        </div>

        {/* Micro-hairline progress indicator at the absolute bottom edge */}
        <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white/10 overflow-hidden pointer-events-none">
          <div
            className="h-full bg-white will-change-[width] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
