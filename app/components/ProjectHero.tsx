"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Header from "./Header";

interface Collaborator {
  role: string;
  name: string;
}

interface ProjectHeroProps {
  title: string;
  displayTitle?: string;
  heroImage: string;
  location: string;
  area: string;
  dateCompleted: string;
  collaborators: Collaborator[];
  hasBakedInOverlay?: boolean;
}

export default function ProjectHero({
  title,
  displayTitle,
  heroImage,
  location,
  area,
  dateCompleted,
  collaborators,
  hasBakedInOverlay = false,
}: ProjectHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateTransform = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const heroHeight = rect.height;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1.2, scrolled / heroHeight);

      // Calculate scroll progress through and away from the hero:
      // heroHeight is 140vh. As user scrolls down, scrolled goes from 0 up to heroHeight and beyond.
      const rawProgress = scrolled / heroHeight;

      // Noticeable, cinematic scroll zoom:
      // Starts right away at 1.0, reaches ~1.15 halfway, and smoothly zooms to ~1.30-1.35
      // as the user scrolls away from the hero image.
      const scale = 1 + Math.min(0.35, Math.pow(Math.max(0, rawProgress), 0.8) * 0.32);

      // Parallax translation to maintain visual depth and composition
      const translateY = scrolled * 0.22;

      // Text Overlay Opacity:
      // The Title scrolls naturally with slight upward float.
      // Collaborators and Specs remain 100% visible while reading the hero.
      // They only fade gently as the bottom of the hero scrolls away out of view.
      const exitProgress = Math.max(0, (scrolled - (heroHeight - window.innerHeight * 0.8)) / (window.innerHeight * 0.8));
      const bottomOpacity = Math.max(0, 1 - exitProgress * 1.5);

      if (imageWrapperRef.current) {
        imageWrapperRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      }
      if (textOverlayRef.current) {
        textOverlayRef.current.style.opacity = `${bottomOpacity}`;
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateTransform();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransform(); // Initial sync

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[140vh] min-h-[140vh] overflow-hidden bg-neutral-900 select-none"
    >
      {/* ---------------- SCROLL-DRIVEN ZOOM IMAGE WRAPPER ---------------- */}
      <div
        id="hero-zoom-wrapper"
        ref={imageWrapperRef}
        className="absolute inset-0 w-full h-full will-change-transform origin-center"
      >
        <Image
          src={heroImage}
          alt={displayTitle || title.replace("\n", " ")}
          fill
          priority
          quality={100}
          unoptimized
          sizes="100vw"
          className="object-cover object-center scale-100"
        />

        {/* Editorial contrast gradient */}
        {hasBakedInOverlay ? (
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20 pointer-events-none" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60 pointer-events-none" />
        )}
      </div>

      {/* ---------------- SITE HEADER OVERLAYED ON HERO (DARK THEME) ---------------- */}
      <div className="absolute top-0 inset-x-0 z-30 pt-7 sm:pt-9 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto">
        <Header theme="dark" />
      </div>

      {/* ---------------- HERO TYPOGRAPHY & COLLABORATORS OVERLAY ---------------- */}
      {!hasBakedInOverlay && (
        <div
          ref={textOverlayRef}
          className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-between pt-36 sm:pt-48 pb-16 sm:pb-24 pointer-events-none will-change-transform"
        >
          {/* Upper Left Title (Matches Desktop - 25 positioning) */}
          <div className="max-w-3xl pt-8 sm:pt-16">
            <h1 className="text-[44px] sm:text-[64px] md:text-[80px] lg:text-[92px] font-bold tracking-tight text-white leading-[0.98] drop-shadow-md whitespace-pre-line">
              {title}
            </h1>
          </div>

          {/* Lower Metadata: Collaborators + Project Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 lg:gap-12 items-end text-white drop-shadow-md pb-4">
            {/* Collaborators (Positioned ~Cols 6-9 in Figma) */}
            <div className="sm:col-start-6 sm:col-span-4 flex flex-col space-y-1.5">
              <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.1em] uppercase text-white/90 mb-1">
                COLLABORATORS
              </span>
              {collaborators.map((c, i) => (
                <div
                  key={i}
                  className="text-[12px] sm:text-[13.5px] text-white/85 leading-snug"
                >
                  <span className="font-normal text-white/70">{c.role} : </span>
                  <span className="font-semibold text-white">{c.name}</span>
                </div>
              ))}
            </div>

            {/* Location & Area Specs (Positioned ~Cols 10-12 in Figma) */}
            <div className="sm:col-start-10 sm:col-span-3 flex flex-col space-y-4">
              <div>
                <span className="text-[11px] sm:text-[12px] text-white/70 block uppercase tracking-wider">
                  Location
                </span>
                <span className="text-[13.5px] sm:text-[15px] font-medium text-white">
                  {location}
                </span>
              </div>

              <div>
                <span className="text-[11px] sm:text-[12px] text-white/70 block uppercase tracking-wider">
                  Build-up Area
                </span>
                <span className="text-[13.5px] sm:text-[15px] font-medium text-white">
                  {area}
                </span>
              </div>

              <div>
                <span className="text-[11px] sm:text-[12px] text-white/70 block uppercase tracking-wider">
                  Date Completed
                </span>
                <span className="text-[13.5px] sm:text-[15px] font-medium text-white">
                  {dateCompleted}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
