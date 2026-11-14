"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PROCESS_STEPS = [
  {
    num: "I",
    title: "Discovery & Vision",
    text: "We begin by deeply understanding your vision, lifestyle, and project goals.",
  },
  {
    num: "II",
    title: "Team Alignment",
    text: "We align the ideal team tailored to your style, scale, and budget.",
  },
  {
    num: "III",
    title: "Design & Detailing",
    text: "From concepts to detailed drawings, we shape your space with creativity and precision.",
  },
  {
    num: "IIII",
    title: "Flawless Execution",
    text: "Our execution team brings the vision to life—on time, on budget, and to the highest standards.",
  },
];

interface ProjectItem {
  id: string;
  num: string;
  title: string;
  location: string;
  year: string;
  category: string;
  image: string;
  aspect: string;
  mobileWidth: string;
  mobileAlign: string;
}

const PROJECTS_COL_1: ProjectItem[] = [
  {
    id: "ojas-24",
    num: "01",
    title: "OJAS 24",
    location: "Mysore, Karnataka",
    year: "2026",
    category: "Architecture & Interior",
    image: "/projects/project-1.jpg",
    aspect: "aspect-[4/3]",
    mobileWidth: "w-[84%]",
    mobileAlign: "self-start",
  },
  {
    id: "casa-terra",
    num: "03",
    title: "Casa Terra",
    location: "Alibaug, Maharashtra",
    year: "2025",
    category: "Residential Villa",
    image: "/projects/project-4.jpg",
    aspect: "aspect-[3/4]",
    mobileWidth: "w-[74%]",
    mobileAlign: "self-start",
  },
  {
    id: "studio-nube",
    num: "05",
    title: "Studio Nube",
    location: "Bengaluru, Karnataka",
    year: "2025",
    category: "Workspace & Atelier",
    image: "/projects/project-5.jpg",
    aspect: "aspect-[4/3]",
    mobileWidth: "w-[84%]",
    mobileAlign: "self-start",
  },
  {
    id: "monolith-residence",
    num: "07",
    title: "The Monolith Residence",
    location: "Hyderabad, Telangana",
    year: "2024",
    category: "Contemporary Living",
    image: "/projects/project-7.jpg",
    aspect: "aspect-[3/4]",
    mobileWidth: "w-[74%]",
    mobileAlign: "self-start",
  },
];

const PROJECTS_COL_2: ProjectItem[] = [
  {
    id: "block-west",
    num: "02",
    title: "Block West",
    location: "Jalgaon, Maharashtra",
    year: "2026",
    category: "Timber Architecture",
    image: "/projects/project-2.jpg",
    aspect: "aspect-[3/4]",
    mobileWidth: "w-[74%]",
    mobileAlign: "self-end ml-auto",
  },
  {
    id: "glass-house",
    num: "04",
    title: "The Glass House",
    location: "Coimbatore, Tamil Nadu",
    year: "2025",
    category: "Pavilion Design",
    image: "/projects/project-3.jpg",
    aspect: "aspect-[4/3]",
    mobileWidth: "w-[84%]",
    mobileAlign: "self-end ml-auto",
  },
  {
    id: "komorebi-courtyard",
    num: "06",
    title: "Komorebi Courtyard",
    location: "Kochi, Kerala",
    year: "2025",
    category: "Landscape & Living",
    image: "/projects/project-6.jpg",
    aspect: "aspect-[4/3]",
    mobileWidth: "w-[80%]",
    mobileAlign: "self-end ml-auto",
  },
  {
    id: "horizon-atelier",
    num: "08",
    title: "Horizon Atelier",
    location: "Goa",
    year: "2024",
    category: "Design Studio",
    image: "/projects/project-8.jpg",
    aspect: "aspect-[3/4]",
    mobileWidth: "w-[74%]",
    mobileAlign: "self-end ml-auto",
  },
];

// Interleaved list for mobile view matching OH Architecture's asymmetric rhythm:
// 01 Left (84%), 02 Right (74%), 03 Left (74%), 04 Right (84%), 05 Left (84%), 06 Right (80%), 07 Left (74%), 08 Right (74%)
const ALL_MOBILE_PROJECTS: ProjectItem[] = [
  PROJECTS_COL_1[0], // 01 OJAS 24 (4/3, left)
  PROJECTS_COL_2[0], // 02 Block West (3/4, right)
  PROJECTS_COL_1[1], // 03 Casa Terra (3/4, left)
  PROJECTS_COL_2[1], // 04 The Glass House (4/3, right)
  PROJECTS_COL_1[2], // 05 Studio Nube (4/3, left)
  PROJECTS_COL_2[2], // 06 Komorebi Courtyard (4/3, right)
  PROJECTS_COL_1[3], // 07 The Monolith Residence (3/4, left)
  PROJECTS_COL_2[3], // 08 Horizon Atelier (3/4, right)
];

export default function Projects() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let animationFrameId: number;

    const handleScrollAndEffects = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenterY = viewportHeight / 2;

      // 1. Process Section Scroll Progress tracking
      if (sectionRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        if (sectionRect.top <= viewportHeight * 0.5 && sectionRect.bottom >= 0) {
          const scrolled = Math.max(0, -sectionRect.top + viewportHeight * 0.2);
          const totalScrollable = Math.max(1, sectionRect.height - viewportHeight * 0.6);
          const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));

          const stepIndex = Math.min(
            PROCESS_STEPS.length - 1,
            Math.floor(progress * PROCESS_STEPS.length)
          );
          setActiveStep(stepIndex);
        }
      }

      // 2. Center-Proximity Lens Scaling & Parallax Drift on each card (Desktop only)
      if (window.innerWidth >= 640) {
        cardRefs.current.forEach((cardEl) => {
          if (!cardEl) return;
          const rect = cardEl.getBoundingClientRect();
          const cardCenterY = rect.top + rect.height / 2;

          // Radial vertical distance from card center to viewport center
          const distance = Math.abs(cardCenterY - viewportCenterY);
          const maxThreshold = viewportHeight * 0.85;
          const ratio = Math.min(1, Math.max(0, distance / maxThreshold));

          // Scale: 1.02 at focal center, smooth contraction to 0.90 towards edges
          const scale = 1.02 - ratio * 0.12;

          // Subtle parallax displacement (drift)
          const driftY = (cardCenterY < viewportCenterY ? -1 : 1) * ratio * 14;

          // Soft optical depth fade: 1.0 at center, 0.75 near edges
          const opacity = 1 - ratio * 0.25;

          cardEl.style.transform = `scale(${scale.toFixed(3)}) translateY(${driftY.toFixed(1)}px)`;
          cardEl.style.opacity = opacity.toFixed(3);
        });
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScrollAndEffects);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    handleScrollAndEffects();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full bg-white text-black  font-['Helvetica_Neue',Helvetica,Arial,sans-serif]"
    >
      

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-5 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 xl:gap-20 items-start">
          
          {/* ---------------- LEFT COLUMN: STICKY ALL PROCESS STEPS ---------------- */}
          <aside className="w-full lg:w-[38%] xl:w-[26%] lg:sticky lg:top-28 self-start pt-2">
            <div className="flex flex-col pr-0 lg:pr-4">
              
              {/* Category Tag */}
              <p className="text-[12px] font-mono sm:text-[13px] font-bold uppercase text-black/80  select-none">
                (OUR PROCESS + PROJECTS)
              </p>

              {/* Main Headline */}
              <h2 className="text-[18px] sm:text-[20px] md:text-[22px] font-medium leading-[1.32] text-black tracking-[-0.015em] mb-8">
                Planning a build or renovation can feel overwhelming. ArchPro simplifies the process.
              </h2>

              {/* All 4 Process Steps visible at once */}
              <div className="flex flex-col gap-5 sm:gap-6 mb-8">
                {PROCESS_STEPS.map((step, idx) => {
                  const isActive = idx === activeStep;
                  return (
                    <div
                      key={step.num}
                      className={`flex items-start gap-3.5 sm:gap-4 transition-all duration-300 `}
                    >
                      {/* Green Circular Badge */}
                      <span
                        className={`w-6 h-6 rounded-full flex font-medium text-[13px] text-black/70 items-center justify-center text-[12px] text-black/60 font-bold transition-all duration-300 `}
                      >
                        ({step.num})
                      </span>

                      {/* Step Description */}
                      <p
                        className={`text-[14px] sm:text-[15px] leading-[1.45] tracking-[-0.01em] transition-colors duration-200`}
                      >
                        {step.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* CTA Link */}
              <div className="pt-1">
                <a
                  href="/projects"
                  className="group relative inline-flex items-center gap-2.5 text-black text-[14px] sm:text-[15px] font-medium tracking-tight transition-transform duration-200 hover:scale-[1.03] active:scale-95 origin-left cursor-pointer select-none py-1 w-fit"
                >
                  <span className="relative inline-block">
                    <span>View all projects</span>
                    {/* Animated passing underline */}
                    <span
                      className="absolute left-0 -bottom-[2px] w-full h-[1.5px] bg-black pointer-events-none origin-right transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] scale-x-100 group-hover:scale-x-0"
                      aria-hidden="true"
                    />
                    <span
                      className="absolute left-0 -bottom-[2px] w-full h-[1.5px] bg-black pointer-events-none origin-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] delay-[100ms] scale-x-0 group-hover:scale-x-100"
                      aria-hidden="true"
                    />
                  </span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>

            </div>
          </aside>

          {/* ---------------- RIGHT COLUMN: SCROLLING PROJECTS ---------------- */}
          <div className="w-full lg:w-[62%] xl:w-[66%]">
            
            {/* MOBILE ONLY: OH Architecture Asymmetric Editorial Staggered Feed */}
            <div className="flex flex-col gap-10 sm:hidden w-full">
              {ALL_MOBILE_PROJECTS.map((project) => (
                <a
                  key={`mobile-${project.id}`}
                  href={`/projects/${project.id}`}
                  className={`group flex flex-col ${project.mobileWidth} ${project.mobileAlign}`}
                >
                  <div
                    className={`relative w-full ${project.aspect} overflow-hidden bg-neutral-100 rounded-none shadow-sm`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="85vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  {/* OH-style Project Label: (01) TITLE on left, YEAR on right */}
                  <div className="pt-2.5 flex items-baseline justify-between select-none">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-[13px] text-black">
                        ({project.num})
                      </span>
                      <h3 className="font-bold text-[13px] uppercase text-black tracking-[-0.01em]">
                        {project.title}
                      </h3>
                    </div>
                    <span className="font-medium text-[13px] text-black/70">
                      {project.year}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* DESKTOP ONLY: Two-column Staggered Grid */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start w-full">
              {/* Staggered Column 1 */}
              <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
                {PROJECTS_COL_1.map((project, idx) => (
                  <a
                    key={project.id}
                    href={`/projects/${project.id}`}
                    ref={(el) => {
                      cardRefs.current[idx * 2] = el;
                    }}
                    className="group cursor-pointer flex flex-col will-change-transform"
                    style={{
                      transition:
                        "transform 0.4s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.4s ease-out",
                      transformOrigin: "center center",
                    }}
                  >
                    <div
                      className={`relative w-full ${project.aspect} overflow-hidden bg-neutral-100 rounded-none shadow-sm`}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 36vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    {/* OH-style Project Label */}
                    <div className="pt-3 flex items-baseline justify-between select-none">
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-bold text-[14px] text-black">
                          ({project.num})
                        </span>
                        <h3 className="font-bold text-[14px] uppercase text-black tracking-[-0.01em] group-hover:text-black/70 transition-colors duration-150">
                          {project.title}
                        </h3>
                      </div>
                      <span className="font-medium text-[13px] text-black/70 font-mono">
                        {project.year}
                      </span>
                    </div>
                  </a>
                ))}
              </div>  

              {/* Staggered Column 2 (Offset downward for architectural asymmetry) */}
              <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20 sm:mt-16 lg:mt-24">
                {PROJECTS_COL_2.map((project, idx) => (
                  <a
                    key={project.id}
                    href={`/projects/${project.id}`}
                    ref={(el) => {
                      cardRefs.current[idx * 2 + 1] = el;
                    }}
                    className="group cursor-pointer flex flex-col will-change-transform"
                    style={{
                      transition:
                        "transform 0.4s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.4s ease-out",
                      transformOrigin: "center center",
                    }}
                  >
                    <div
                      className={`relative w-full ${project.aspect} overflow-hidden bg-neutral-100 rounded-none shadow-sm`}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 36vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    {/* OH-style Project Label */}
                    <div className="pt-3 flex items-baseline justify-between select-none">
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-bold text-[14px] text-black">
                          ({project.num})
                        </span>
                        <h3 className="font-bold text-[14px] uppercase text-black tracking-[-0.01em] group-hover:text-black/70 transition-colors duration-150">
                          {project.title}
                        </h3>
                      </div>
                      <span className="font-medium text-[13px] text-black/70 font-mono">
                        {project.year}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
