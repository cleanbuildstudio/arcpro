"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";

const PDA_MENU_ITEMS = [
  {
    name: "Projects",
    href: "/projects",
    image: "/live-projects/the-skewed-house-hd.png",
    subtitle: "The Skewed House",
    location: "Palakkad, Kerala",
  },
  {
    name: "Expertise",
    href: "/#products",
    image: "/live-projects/ojas-24-hd.jpg",
    subtitle: "OJAS 24",
    location: "Shoolagiri, Tamil Nadu",
  },
  {
    name: "Studio",
    href: "/#studio",
    image: "/live-projects/the-crimped-roof-house-hd.png",
    subtitle: "The Crimped Roof House",
    location: "Bengaluru, Karnataka",
  },
  {
    name: "Products",
    href: "/#products",
    image: "/live-projects/the-observatory-hd.png",
    subtitle: "The Observatory",
    location: "Kochi, Kerala",
  },
  {
    name: "Gallery",
    href: "/#gallery",
    image: "/live-projects/the-palagiri-house-hd.png",
    subtitle: "The Palagiri House",
    location: "Kochi, Kerala",
  },
  {
    name: "Contact",
    href: "/contact",
    image: "/live-projects/ameer-residence-hd.png",
    subtitle: "Ameer Residence",
    location: "Vadakara, Kerala",
  },
];

interface PdaLinkProps {
  href: string;
  label: string;
  target?: string;
  rel?: string;
  className?: string;
  light?: boolean;
}

export function PdaLink({
  href,
  label,
  target,
  rel,
  className = "",
  light = false,
}: PdaLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`group relative inline-flex items-center gap-x-2 cursor-pointer select-none text-[14px] sm:text-[15px] font-normal ${
        light ? "text-black" : "text-white"
      } ${className}`}
    >
      {/* Circle container with arrow */}
      <span
        className={`relative flex items-center justify-center w-[24px] h-[24px] rounded-full border-[5px] ${
          light ? "border-black group-hover:bg-black group-hover:border-black" : "border-white group-hover:bg-white group-hover:border-white"
        } bg-transparent origin-left transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-100 group-hover:border scale-[0.28] pointer-events-none`}
        aria-hidden="true"
      >
        <span
          className={`flex items-center justify-center w-[12px] h-[12px] ${
            light ? "text-white" : "text-black"
          } -translate-x-full opacity-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0 group-hover:opacity-100`}
        >
          <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3">
            <path
              d="M8.0858 6.50054L5.4038 9.18254L6.1109 9.88965L10 6.00054L6.1109 2.11149L5.4038 2.81859L8.0858 5.50054L2 5.50054V6.50054L8.0858 6.50054Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </span>

      {/* Text label with collapsing underline */}
      <span className="relative inline-block transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] -translate-x-[1.35rem] group-hover:translate-x-0">
        <span>{label}</span>
        <span
          className={`absolute left-0 -bottom-[3px] w-full h-[1px] ${
            light ? "bg-black" : "bg-white"
          } origin-right transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] delay-150 group-hover:scale-x-0 group-hover:delay-0`}
          aria-hidden="true"
        />
      </span>
    </a>
  );
}

interface HeaderProps {
  theme?: "dark" | "light";
  className?: string;
  showFloatingNav?: boolean;
}

export default function Header({
  theme = "dark",
  className = "",
  showFloatingNav = true,
}: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInFooter, setIsInFooter] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMenuOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  // Detect scroll state and footer intersection for floating navigation
  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Toggle floating header appearance after passing initial hero area
        setIsScrolled((prev) => (prev ? scrollY > 280 : scrollY > 380));

        // Check if footer is in view
        const footer = document.querySelector("footer");
        if (footer) {
          const rect = footer.getBoundingClientRect();
          setIsInFooter(rect.top < window.innerHeight);
        } else {
          setIsInFooter(false);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Observe footer with IntersectionObserver for instant visibility syncing
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsInFooter(entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight);
        }
      },
      { threshold: [0, 0.05, 0.1] }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const isLight = theme === "light";

  return (
    <>
      {/* ---------------- PORTALLED FLOATING NAV & FULL-SCREEN MENU (BREAKS FREE FROM ANY PARENT STACKING CONTEXT) ---------------- */}
      {mounted &&
        createPortal(
          <>
            {/* FIXED FLOATING NAV (OH ARCHITECTURE MASKED ENTRANCE) */}
            {showFloatingNav && (
              <div
                className="fixed top-5 right-5 sm:top-6 sm:right-8 md:top-7 md:right-12 z-[90] flex items-center gap-2.5 sm:gap-3 overflow-hidden p-1 pointer-events-none"
                aria-hidden={!isScrolled || isInFooter}
              >
                {/* Book Consultation button with relaxed elevator slide-up */}
                <div
                  className={`overflow-hidden transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isScrolled && !isInFooter
                      ? "translate-y-0 delay-[80ms] pointer-events-auto"
                      : "translate-y-[125%] delay-[50ms]"
                  }`}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center h-[42px] sm:h-[44px] bg-[#080807] text-white text-[13px] sm:text-[14px] font-medium px-5 sm:px-6 rounded-full border border-white/20 shadow-2xl backdrop-blur-md transition-transform duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer select-none"
                  >
                    <span>Book Consultation</span>
                  </Link>
                </div>

                {/* MENU button with staggered relaxed elevator slide-up */}
                <div
                  className={`overflow-hidden transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isScrolled && !isInFooter
                      ? "translate-y-0 delay-[220ms] pointer-events-auto"
                      : "translate-y-[125%] delay-[0ms]"
                  }`}
                >
                  <button
                    onClick={() => setIsMenuOpen(true)}
                    className="inline-flex items-center justify-center h-[42px] sm:h-[44px] bg-[#F2F0EB] hover:bg-white text-[#080807] px-4.5 sm:px-5 rounded-full shadow-2xl transition-transform duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer select-none"
                    aria-label="Open menu"
                  >
                    {/* Extended architectural editorial 2-bar menu icon */}
                    <svg
                      width="30"
                      height="10"
                      viewBox="0 0 30 10"
                      fill="currentColor"
                      className="w-[28px] sm:w-[30px] h-[9px] sm:h-[10px]"
                    >
                      <rect y="0" width="30" height="2.2" />
                      <rect y="7.5" width="30" height="2.2" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* FULL-SCREEN ARCHITECTURAL MENU (PDA ARCHITECTURE STYLE) */}
            <div
              className={`fixed inset-0 z-[100] bg-black text-white font-['Helvetica_Neue',Helvetica,Arial,sans-serif] flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-6 sm:py-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isMenuOpen
                  ? "translate-y-0 pointer-events-auto"
                  : "-translate-y-full pointer-events-none"
              }`}
              aria-modal="true"
              role="dialog"
            >
              {/* Top Bar: Logo on left, NAVIGATION in center, Morphing Close Button on right */}
              <div className="w-full flex items-center justify-between z-10">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center text-[26px] md:text-[28px] font-bold tracking-[-0.03em] select-none"
                >
                  <span className="text-[#59B72F]">Arch</span>
                  <span className="text-white">Pro.</span>
                </Link>

                

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="group relative flex items-center justify-center w-12 h-10 sm:w-14 sm:h-11 rounded-full bg-[#161615] hover:bg-neutral-800 text-white border border-white/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Close menu"
                >
                  <div className="relative w-5 h-3 flex items-center justify-center">
                    <span className="absolute w-5 h-[2px] bg-white transform rotate-45 transition-transform duration-300" />
                    <span className="absolute w-5 h-[2px] bg-white transform -rotate-45 transition-transform duration-300" />
                  </div>
                </button>
              </div>

              {/* Main Content Area */}
              <div className="relative w-full flex-1 flex flex-col md:flex-row items-start justify-between py-6 sm:py-8 z-10 overflow-hidden">
                {/* Left Column: Agency Editorial Info 
                <div
                  className={`w-full md:w-1/4 xl:w-1/5 flex flex-col justify-between py-2 text-white/80 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isMenuOpen ? "translate-y-0 opacity-100 delay-[220ms]" : "translate-y-8 opacity-0"
                  }`}
                >
                  <div className="flex flex-col gap-5 text-[13px] sm:text-[14px]">
                    <div>
                      <span className="block text-white/40 uppercase tracking-widest text-[11px] mb-1">
                        Agency
                      </span>
                      <a
                        href="mailto:hello@archpro.live"
                        className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                      >
                        <span>hello@archpro.live</span>
                        <span className="text-xs">↗</span>
                      </a>
                    </div>

                    <div>
                      <span className="block text-white/40 uppercase tracking-widest text-[11px] mb-1">
                        Recruitment
                      </span>
                      <a
                        href="mailto:careers@archpro.live"
                        className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                      >
                        <span>careers@archpro.live</span>
                        <span className="text-xs">↗</span>
                      </a>
                    </div>

                    <div>
                      <span className="block text-white/40 uppercase tracking-widest text-[11px] mb-1">
                        Phone
                      </span>
                      <a
                        href="tel:+919880123456"
                        className="hover:text-white transition-colors"
                      >
                        +91 98801 23456
                      </a>
                    </div>
                  </div>

                  <div className="mt-8 text-[12px] sm:text-[13px] text-white/40">
                    <span className="block text-white/70">Studio Locations</span>
                    <span>Mysore • Bengaluru • Mumbai</span>
                  </div>
                </div>  */}

                {/* Center Column: Big Masked Elevator Navigation with PDA Sibling Dimming */}
                <div className="flex-1 md:pl-10 lg:pl-16 max-w-2xl">
                  <nav className="flex flex-col group/modal-nav">
                    {PDA_MENU_ITEMS.map((item, idx) => (
                      <div
                        key={item.name}
                        className="overflow-hidden py-0.5 sm:py-1"
                      >
                        <div
                          className={`transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isMenuOpen ? "translate-y-0" : "translate-y-[115%]"
                          }`}
                          style={{
                            transitionDelay: isMenuOpen ? `${160 + idx * 45}ms` : "0ms",
                          }}
                        >
                          <Link
                            href={item.href}
                            onMouseEnter={() => setHoveredMenuIndex(idx)}
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-[34px] sm:text-[44px] md:text-[50px] lg:text-[58px] font-bold tracking-[-0.03em] leading-[1.1] transition-opacity duration-[250ms] ease-out group-hover/modal-nav:opacity-30 hover:!opacity-100 select-none w-fit cursor-pointer text-white"
                          >
                            {item.name}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Bottom-Right Corner: Dynamic Architectural Photograph Preview Card (PDA Style) */}
                <div
                  className={`hidden lg:block absolute bottom-2 right-0 xl:bottom-4 xl:right-4 w-[280px] xl:w-[320px] aspect-[4/3] rounded-[4px] overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl group/card transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isMenuOpen ? "translate-y-0 opacity-100 delay-[280ms]" : "translate-y-10 opacity-0"
                  }`}
                >
                  {PDA_MENU_ITEMS.map((item, idx) => (
                    <div
                      key={item.name}
                      className={`absolute inset-0 transition-opacity duration-300 ease-out ${
                        hoveredMenuIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.subtitle}
                        fill
                        sizes="320px"
                        className="object-cover group-hover/card:scale-105 transition-transform duration-1000 ease-out"
                        priority={idx === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-4">
                        <span className="text-[10px] uppercase tracking-widest text-[#59B72F] font-semibold mb-0.5">
                          {item.name}
                        </span>
                        <span className="text-[13px] font-bold text-white tracking-tight leading-tight">
                          {item.subtitle}
                        </span>
                        <span className="text-[11px] text-white/70">
                          {item.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

                {/* Bottom Footer Row */}
                <div
                  className={`w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[12px] sm:text-[13px] text-white/50 z-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isMenuOpen ? "translate-y-0 opacity-100 delay-[340ms]" : "translate-y-6 opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-6 sm:gap-8">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      Instagram 
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      YouTube 
                    </a>
                    <a
                      href="https://x.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      X.com 
                    </a>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="text-white/80">English</span>
                    <span>© 2026 ArchPro.</span>
                  </div>
                </div>
            </div>
          </>,
          document.body
        )}

      {/* ---------------- TOP STATIC NAVIGATION BAR ---------------- */}
      <header className={`w-full flex items-center justify-between ${className}`}>
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center text-[26px] md:text-[28px] font-bold tracking-[-0.03em] select-none"
        >
          <span className="text-[#59B72F]">Arch</span>
          <span className={isLight ? "text-black" : "text-white"}>Pro.</span>
        </Link>

        {/* Nav Items (PDA Architecture Focus Spotlight) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 group/nav">
          {[
            { name: "Projects", href: "/projects" },
            { name: "Studio", href: "/#studio" },
            { name: "Products", href: "/#products" },
            { name: "Gallery", href: "/#gallery" },
            { name: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-[14px] lg:text-[15px] font-normal transition-opacity duration-[350ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/nav:opacity-30 hover:!opacity-100 ${
                isLight ? "text-black" : "text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-7">
          <PdaLink href="/contact" label="Become a pro" light={isLight} />

          <Link
            href="/contact"
            className={`inline-flex items-center justify-center bg-black active:scale-95 text-white text-[13px] md:text-[14px] font-medium px-5 py-2.5 rounded-full border ${
              isLight ? "border-black/10" : "border-white/20"
            } transition-transform duration-200 hover:scale-[1.03] shadow-md cursor-pointer`}
          >
            Book Consultation
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/contact"
            className={`sm:hidden inline-flex items-center justify-center whitespace-nowrap bg-black text-white text-[11px] min-[380px]:text-[12px] font-medium px-3 min-[380px]:px-3.5 py-1.5 rounded-full border ${
              isLight ? "border-black/10" : "border-white/20"
            } active:scale-95 hover:scale-[1.03] transition-transform duration-200 cursor-pointer`}
          >
            Book Consultation
          </Link>
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`p-2 focus:outline-none ${isLight ? "text-black" : "text-white/90 hover:text-white"} hover:scale-[1.05] active:scale-95 transition-transform duration-200`}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-3"
              viewBox="0 0 24 10"
              fill="currentColor"
            >
              <rect y="0" width="24" height="2.2" />
              <rect y="7.5" width="24" height="2.2" />
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
