"use client";

import React, { useRef, useState, useEffect } from "react";
import Header from "./Header";

const WORDS = [
  "spaces",
  "homes",
  "interiors",
  "villas",
  "apartments",
  "resorts",
  "hotels",
  "offices",
  "workplaces",
  "projects",
];

const HERO_PROJECTS = [
  {
    id: "ojas-24",
    tag: "(OJAS 24)",
    title: "OJAS 24",
    location: "Mysore, Karnataka",
    type: "video" as const,
    src: "/hero.mp4",
    link: "https://youtu.be/PHgGsJIZ4V4",
  },
  {
    id: "casa-terra",
    tag: "(CASA TERRA)",
    title: "Casa Terra",
    location: "Alibaug, Maharashtra",
    type: "image" as const,
    src: "/hero-casa-terra.jpg",
    link: "#casa-terra",
  },
  {
    id: "block-west",
    tag: "(BLOCK WEST)",
    title: "Block West",
    location: "Jalgaon, Maharashtra",
    type: "image" as const,
    src: "/hero-block-west.jpg",
    link: "#block-west",
  },
  {
    id: "glass-house",
    tag: "(THE GLASS HOUSE)",
    title: "The Glass House",
    location: "Coimbatore, Tamil Nadu",
    type: "image" as const,
    src: "/hero-glass-house.jpg",
    link: "#glass-house",
  },
];

interface OhViewProjectLinkProps {
  href: string;
  label: string;
  target?: string;
  rel?: string;
  className?: string;
}

function OhViewProjectLink({ href, label, target, rel, className = "" }: OhViewProjectLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`group relative inline-flex items-center gap-x-2.5 cursor-pointer select-none text-[13px] sm:text-[14px] font-medium uppercase tracking-[0.04em] text-white ${className}`}
    >
      {/* 1. Rolling Elevator Text Container */}
      <span className="relative inline-block overflow-hidden h-[1.15em] leading-[1.15em]">
        <span
          className="inline-block transition-transform duration-[545ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
          style={{
            textShadow: "0 1.15em 0 currentColor",
          }}
        >
          {label}
        </span>
      </span>

      {/* 2. Circle Morph (Hollow 8px ring resting -> scales to 60% and fills solid white on hover) */}
      <span
        className="w-[8px] h-[8px] rounded-full border border-white bg-transparent transition-all duration-[545ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[0.6] group-hover:bg-white shrink-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* 3. Dual-Layer Underline Wipe (zips out to right, wipes in from left) */}
      <span
        className="absolute left-0 -bottom-[3px] w-full h-[1px] bg-white pointer-events-none origin-left transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[180ms] scale-x-100 group-hover:origin-right group-hover:scale-x-0 group-hover:delay-0"
        aria-hidden="true"
      />
      <span
        className="absolute left-0 -bottom-[3px] w-full h-[1px] bg-white pointer-events-none origin-right transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-0 scale-x-0 group-hover:origin-left group-hover:scale-x-100 group-hover:delay-[180ms]"
        aria-hidden="true"
      />
    </a>
  );
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const middleRowRef = useRef<HTMLDivElement>(null);

  // Progressive project slider state
  const [activeProject, setActiveProject] = useState(0);
  const [progress, setProgress] = useState(0);

  /**
   * SPEED CONTROLLER:
   * Duration in milliseconds each project stays visible before advancing.
   * - 8000  = 8 seconds
   * - 10000 = 10 seconds (current - smooth & relaxed)
   * - 12000 = 12 seconds (slower)
   * - 15000 = 15 seconds (very slow / leisurely)
   */
  const PROJECT_DURATION = 10000;

  // Cycling words animation
  const [index, setIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    // Ensure autoplay starts reliably
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy handled by muted
      });
    }
  }, []);

  // Progressive timer for hero projects
  useEffect(() => {
    let lastTime = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      setProgress((prev) => {
        const next = prev + (delta / PROJECT_DURATION) * 100;
        if (next >= 100) {
          setActiveProject((curr) => (curr + 1) % HERO_PROJECTS.length);
          return 0;
        }
        return next;
      });

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Parallax downward sink on scroll
  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;

        // Apply downward translation as user scrolls towards next section
        if (scrollY <= heroHeight * 1.2) {
          const headlineY = scrollY * 0.28; // moves downward smoothly
          const middleY = scrollY * 0.18; // moves downward at secondary depth
          const opacity = Math.max(0, 1 - scrollY / (heroHeight * 0.65));

          if (headlineRef.current) {
            headlineRef.current.style.transform = `translate3d(0, ${headlineY.toFixed(1)}px, 0)`;
            headlineRef.current.style.opacity = opacity.toFixed(2);
          }
          if (middleRowRef.current) {
            middleRowRef.current.style.transform = `translate3d(0, ${middleY.toFixed(1)}px, 0)`;
            middleRowRef.current.style.opacity = opacity.toFixed(2);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const intervalId = setInterval(() => {
      setIsSliding(true);

      timeoutId = setTimeout(() => {
        setIndex((prev) => (prev + 1) % WORDS.length);
        setIsSliding(false);
      }, 500);
    }, 2400);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  const nextIndex = (index + 1) % WORDS.length;
  const currentWord = WORDS[index];
  const nextWord = WORDS[nextIndex];
  // Determine widest word between current and next to prevent clipping during slide
  const sizerWord = currentWord.length >= nextWord.length ? currentWord : nextWord;

  return (
    <section
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] bg-black text-white font-['Helvetica_Neue',Helvetica,Arial,sans-serif] z-10"
      aria-label="ArchPro Hero Section"
    >
      {/* ---------------- BACKGROUND MEDIA (CROSS-FADING) ---------------- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        {/* Project 1 (OJAS 24): Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none select-none transition-opacity duration-1000 ease-in-out ${
            activeProject === 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Projects 2, 3, 4: High-Res Hero Images with slow cinematic drift */}
        {HERO_PROJECTS.slice(1).map((proj, idx) => {
          const projectIndex = idx + 1;
          const isActive = activeProject === projectIndex;
          return (
            <div
              key={proj.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={proj.src}
                alt={proj.title}
                className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              />
            </div>
          );
        })}

        {/* Ambient Overlay for text readability */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        {/* Subtle top gradient for header clarity */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

        {/* Subtle bottom gradient for headline & progress bar clarity */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />
      </div>

      {/* ---------------- MAIN FOREGROUND CONTENT ---------------- */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between px-5 sm:px-10 lg:px-16 py-6 sm:py-8 lg:py-10">
        {/* TOP: NAVIGATION BAR (REUSABLE HEADER COMPONENT) */}
        <Header theme="dark" />

        {/* MIDDLE ROW: (PROJECT NAME) on the left & View Project on the right */}
        {/* With mix-blend-difference so both project name & view project dynamically invert over the hero background image/video */}
        <div
          ref={middleRowRef}
          className="w-full flex items-center justify-between py-12 will-change-transform mix-blend-difference text-white"
        >
          {/* Left Tag with Project Name Transition 
          <div className="flow-hidden h-[24px] sm:text-[8px] flex items-center">
            {HERO_PROJECTS.map((proj, idx) => (
              <span
                key={proj.id}
                className={`text-[14px] sm:text-[8px] font-normal tracking-wide text-white select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  idx === activeProject
                    ? "opacity-100 translate-y-0"
                    : "absolute left-0 opacity-0 translate-y-3 pointer-events-none"
                }`}
              >
                {proj.tag}
              </span>
            ))}
          </div>    */}

          {/* Right Action: OH Architecture style View Project Link with rolling text & circle morph */}
          <OhViewProjectLink
          
            key={HERO_PROJECTS[activeProject].id}    
            href={HERO_PROJECTS[activeProject].link}
            label="View Project"
            target={HERO_PROJECTS[activeProject].type === "video" ? "_blank" : undefined}
            rel={HERO_PROJECTS[activeProject].type === "video" ? "noopener noreferrer" : undefined}
          />
        </div>

        {/* BOTTOM SECTION: Typography Headline */}
        <div
          ref={headlineRef}
          className="w-full pb-4 sm:pb-6 will-change-transform"
        >
          <h1 className="max-w-5xl text-[25px] min-[380px]:text-[28px] min-[420px]:text-[32px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[70px] font-bold tracking-[-0.03em] leading-[1.08] text-white select-none">
            <span className="block">
              <span>Your beautiful </span>
              <span className="inline-grid grid-cols-1 grid-rows-1 overflow-hidden align-top h-[1.18em] relative">
                {/* Sizer for dynamic width & height */}
                <span
                  className="col-start-1 row-start-1 invisible pointer-events-none select-none"
                  aria-hidden="true"
                >
                  {isSliding ? sizerWord : currentWord}
                </span>

                {/* Exiting word */}
                <span
                  className="col-start-1 row-start-1 inline-block whitespace-nowrap will-change-transform"
                  style={{
                    transform: isSliding ? "translateY(-105%)" : "translateY(0%)",
                    opacity: isSliding ? 0 : 1,
                    filter: isSliding ? "blur(3px)" : "blur(0px)",
                    transition: isSliding
                      ? "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 450ms ease, filter 450ms ease"
                      : "none",
                  }}
                >
                  {currentWord}
                </span>

                {/* Entering word */}
                <span
                  className="col-start-1 row-start-1 inline-block whitespace-nowrap will-change-transform"
                  style={{
                    transform: isSliding ? "translateY(0%)" : "translateY(105%)",
                    opacity: isSliding ? 1 : 0,
                    filter: isSliding ? "blur(0px)" : "blur(3px)",
                    transition: isSliding
                      ? "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 450ms ease, filter 450ms ease"
                      : "none",
                  }}
                >
                  {nextWord}
                </span>
              </span>
            </span>
            <span className="block">begin with ArchPro.</span>
          </h1>
        </div>
      </div>

      {/* ---------------- SINGLE BOTTOM PROGRESS BAR (PDA.ARCHI STYLE) ---------------- */}
      <div
        className="absolute bottom-0 left-0 w-full h-[2px] sm:h-[3px] bg-white/20 overflow-hidden z-20 pointer-events-none"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-white will-change-[width]"
          style={{ width: `${progress.toFixed(2)}%` }}
        />
      </div>
    </section>
  );
}
