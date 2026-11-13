"use client";

import React, { useState } from "react";
import Link from "next/link";

interface BenefitItem {
  id: string;
  strongText: string;
  bodyText: string;
  icon: React.ReactNode;
}

const BENEFITS: BenefitItem[] = [
  {
    id: "searching",
    strongText: "No more endless searching -",
    bodyText: "Everything you need, all in one place.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 text-white"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    id: "experts",
    strongText: "Real projects, real experts -",
    bodyText: "Work with vetted architects, designers, and suppliers.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 text-white"
        aria-hidden="true"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "india",
    strongText: "Designed for India -",
    bodyText: "Projects, products, and professionals that meet local standards.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 text-white"
        aria-hidden="true"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: "inspiration",
    strongText: "From inspiration to reality -",
    bodyText: "Find your style and work with the experts behind it.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 text-white"
        aria-hidden="true"
      >
        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
      </svg>
    ),
  },
];

export default function Article() {
  const [hoveredCard, setHoveredCard] = useState<"project" | "pro" | null>(null);

  return (
    <section
      id="start-project-pro"
      className="relative w-full bg-white text-black font-['Helvetica_Neue',Helvetica,Arial,sans-serif] py-16 sm:py-20 lg:py-24 selection:bg-black selection:text-white"
      aria-label="Start your Project & Become a Pro"
    >
      <style>{`
        /* Mike Wilcock Directional Curtain Fill Animation */
        .article-curtain {
          position: absolute;
          inset: 0;
          transform-origin: center top;
          transform: scaleY(0);
          transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
          pointer-events: none;
          z-index: 1;
        }

        .article-card:hover .article-curtain {
          transform-origin: center bottom;
          transform: scaleY(1);
        }

        /* Title variable font width stretch + translate nudge (exact Mike Wilcock effect) */
        .article-title {
          font-family: 'Archivo', sans-serif !important;
          font-variation-settings: "wdth" 72, "wght" 800;
          letter-spacing: -0.02em;
          transform: translateX(0);
          transition: 
            font-variation-settings 0.85s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
            letter-spacing 0.85s cubic-bezier(0.16, 1, 0.3, 1),
            color 0.5s ease;
          will-change: font-variation-settings, transform;
        }

        .article-card:hover .article-title {
          font-variation-settings: "wdth" 125, "wght" 600;
          letter-spacing: 0.015em;
          transform: translateX(6px);
        }

        /* Arrow straight translation on hover */
        .article-card .article-arrow {
          display: inline-block;
          transform: translateX(0);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .article-card:hover .article-arrow {
          transform: translateX(5px);
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Dual Action Feature Cards: Start your Project & Become a Pro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: Start your Project (Green Base -> Dark Green Wipe) */}
          <article
            onMouseEnter={() => setHoveredCard("project")}
            onMouseLeave={() => setHoveredCard(null)}
            className={`article-card group relative w-full bg-[#34C25C] rounded-[4px] p-7 sm:p-9 md:p-10 flex flex-col justify-between shadow-sm overflow-hidden cursor-pointer transition-opacity duration-500 ${
              hoveredCard === "pro" ? "opacity-40" : "opacity-100"
            }`}
          >
            {/* The Curtain Fill layer (wipes up from bottom on hover, exits to top on leave) */}
            <div className="article-curtain bg-[#1B8036]" />

            {/* Content Layer (z-index above curtain) */}
            <div className="relative z-10 transition-colors duration-500">
              {/* Card Title */}
              <h3 className="article-title text-[28px] sm:text-[34px] text-black group-hover:text-white mb-3">
                Start your Project
              </h3>

              {/* Card Description */}
              <p className="text-[15px] sm:text-[16.5px] leading-relaxed text-black/85 group-hover:text-white/90 font-normal max-w-xl transition-colors duration-500">
                Start your project with clarity and confidence - ArchPro helps turn ideas into well-managed, beautifully executed spaces.
              </p>
            </div>

            {/* Bottom Row: Learn More (left) + Action Pill Button (right) */}
            <div className="relative z-10 mt-8 sm:mt-10 pt-2 flex items-center justify-between gap-4">
              <Link
                href="/contact"
                className="text-[14px] font-semibold text-black group-hover:text-white underline underline-offset-4 hover:opacity-80 transition-colors duration-500"
              >
                Learn More
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-[#1B8036] group-hover:bg-[#34C25C] text-white group-hover:text-black text-[13.5px] sm:text-[14px] font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-[4px] shadow-sm transition-all duration-500 active:scale-95"
              >
                <span>Start your Project</span>
                <span className="article-arrow text-base">→</span>
              </Link>
            </div>
          </article>

          {/* Card 2: Become a Pro (Light Grey Base -> Green Wipe) */}
          <article
            onMouseEnter={() => setHoveredCard("pro")}
            onMouseLeave={() => setHoveredCard(null)}
            className={`article-card group relative w-full bg-[#E6E6E6] rounded-[4px] p-7 sm:p-9 md:p-10 flex flex-col justify-between shadow-sm overflow-hidden cursor-pointer transition-opacity duration-500 ${
              hoveredCard === "project" ? "opacity-40" : "opacity-100"
            }`}
          >
            {/* The Curtain Fill layer (wipes up from bottom on hover, exits to top on leave) */}
            <div className="article-curtain bg-[#34C25C]" />

            {/* Content Layer (z-index above curtain) */}
            <div className="relative z-10 transition-colors duration-500">
              {/* Card Title */}
              <h3 className="article-title text-[28px] sm:text-[34px] text-black mb-3">
                Become a Pro
              </h3>

              {/* Card Description */}
              <p className="text-[15px] sm:text-[16.5px] leading-relaxed text-black/80 font-normal max-w-xl transition-colors duration-500">
                Join ArchPro&apos;s curated network of professionals and collaborate on thoughtfully designed, expertly executed projects across India.
              </p>
            </div>

            {/* Bottom Row: Learn More (left) + Action Pill Button (right) */}
            <div className="relative z-10 mt-8 sm:mt-10 pt-2 flex items-center justify-between gap-4">
              <Link
                href="/contact"
                className="text-[14px] font-semibold text-black underline underline-offset-4 hover:opacity-80 transition-colors duration-500"
              >
                Learn More
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-[#34C25C] group-hover:bg-[#1B8036] text-black group-hover:text-white text-[13.5px] sm:text-[14px] font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-[4px] shadow-sm transition-all duration-500 active:scale-95"
              >
                <span>Become a Pro</span>
                <span className="article-arrow text-base">→</span>
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
