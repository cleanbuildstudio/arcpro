"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface ProjectItem {
  id: string;
  title: string;
  area: string;
  location: string;
  description: string;
  image: string;
  link: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "ojas-24",
    title: "OJAS 24",
    area: "3,470 Sq. Ft.",
    location: "Shoolagiri, Tamil Nadu",
    description: "Inside a 3,470 sq.ft Weekend Home Built from Earth and Debris | Home Tour",
    image: "/live-projects/ojas-24-hd.jpg",
    link: "https://archpro.live/projects/a-mud-and-stone-home-nestled-within-a-mango-grove-where-architecture-and-landscape-grow-as-one",
  },
  {
    id: "the-palagiri-house",
    title: "The Palagiri House",
    area: "9,000 Sq. Ft.",
    location: "Kochi, Kerala",
    description: "A 9,000 Sq. Ft. Urban Tropical Residence in Kochi | Built in Just 18 Months",
    image: "/live-projects/the-palagiri-house.png",
    link: "https://archpro.live/projects/9000-sqft-tropical-home-kochi-urban-plot-completed-in-18-months",
  },
  {
    id: "the-skewed-house",
    title: "The Skewed House",
    area: "3,861 Sq. Ft.",
    location: "Palakkad, Kerala",
    description: "A 3,861 Sq. Ft. Home from 2014 That Still Defines Contemporary Living | Home Tour",
    image: "/live-projects/the-skewed-house.png",
    link: "https://archpro.live/projects/3861-sqft-skewed-house-palakkad-tropical-home",
  },
  {
    id: "the-observatory",
    title: "The Observatory",
    area: "3,000 Sq. Ft.",
    location: "Nilgiris, Tamil Nadu",
    description: "Inside a 3000 Sqft Conservatory Home in Nilgiris Where the Hill Meet the Heart",
    image: "/live-projects/the-observatory.png",
    link: "https://archpro.live/projects/observatory-3000-sqft-hillside-second-home-nilgiris",
  },
  {
    id: "robusta-ranch",
    title: "Robusta Ranch",
    area: "9,000 Sq. Ft.",
    location: "Yercaud, Tamil Nadu",
    description: "Inside a 9000 Sq. Ft. Ranch Crafted for Luxury Living at Yercaud’s Most Iconic Estate",
    image: "/live-projects/robusta-ranch.png",
    link: "https://archpro.live/projects/brookwood-estate-horse-stable-riders-club-yercaud-hospitality-farmhouse",
  },
  {
    id: "kaizen",
    title: "Kaizen",
    area: "2,280 Sq. Ft.",
    location: "Kochi, Kerala",
    description: "Inside a 4-Cent Corner Plot Home in Kochi Where Design Embraces Density | Home Tour",
    image: "/live-projects/kaizen.png",
    link: "https://archpro.live/projects/4-cent-tropical-modern-home-kochi-2880-sqft-contemporary-home",
  },
  {
    id: "whispers-of-the-wild",
    title: "Whispers of the Wild",
    area: "2,400 Sq. Ft.",
    location: "Yercaud, Tamil Nadu",
    description: "Inside a 2400 Sq.ft. Nature-Blended Weekend Home in the Hills of Yercaud, Tamilnadu",
    image: "/live-projects/whispers-of-the-wild.png",
    link: "https://archpro.live/projects/2400-sqft-mountain-retreat-home-family-sanctuary-nature-weekend-home-design",
  },
  {
    id: "into-the-wild",
    title: "Into The Wild",
    area: "1,450 Sq. Ft.",
    location: "Mettupalayam, Tamil Nadu",
    description: "Inside 1450 Sq.Ft Self-Sustaining Home in the Wild of Tamilnadu | Built Without Columns",
    image: "/live-projects/into-the-wild.png",
    link: "https://archpro.live/projects/into-the-wild-fold-architecture-sustainable-farmhouse",
  },
  {
    id: "square-foot",
    title: "Square Foot",
    area: "6,000 Sq. Ft.",
    location: "Bangalore, Karnataka",
    description: "Inside 6,000 Sq. Ft. Square Foot’s Home-Like Experience Center in Bengaluru",
    image: "/live-projects/square-foot.png",
    link: "https://archpro.live/projects/square-foot-flagship-store-bengaluru-commerical-experience-center",
  },
  {
    id: "elsas-farmhouse",
    title: "Elsa’s FarmHouse",
    area: "1,950 Sq. Ft.",
    location: "Thrissur, Kerala",
    description: "A 2000 Sqft. French Farmhouse-Inspired Apartment in Thrissur | Home Tour",
    image: "/live-projects/elsas-farmhouse.png",
    link: "https://archpro.live/projects/1950-sqft-french-farmhouse-inspired-apartment-thrissur",
  },
  {
    id: "blr-brewing-co",
    title: "BLR Brewing Co.",
    area: "40,000 Sq. Ft.",
    location: "Whitefield, Bangalore",
    description: "BLR Brewing Co., Bengaluru: A 40,000 Sq.Ft. Restaurant & Brewpub Designed Around Nature",
    image: "/live-projects/blr-brewing-co.png",
    link: "https://archpro.live/projects/40000-sqft-fnb-design-blr-brewing-co-whitefield-bengaluru",
  },
  {
    id: "the-crimped-roof-house",
    title: "The Crimped Roof House",
    area: "6,800 Sq. Ft.",
    location: "Kottayam, Kerala",
    description: "A Contemporary Family Home Embracing Generational Living - The Crimped Roof House",
    image: "/live-projects/the-crimped-roof-house.png",
    link: "https://archpro.live/projects/6800-sqft-tropical-home-crimped-roof-house-pala-kerala",
  },
  {
    id: "base-eleven",
    title: "Base Eleven - Convention Centre",
    area: "75,000 Sq. Ft.",
    location: "Kottayam, Kerala",
    description: "Kerala's Biggest Convention Centre: 75,000 Sqft. of Architectural Mastery | Base Eleven",
    image: "/live-projects/base-eleven.png",
    link: "https://archpro.live/projects/75000-sqft-commercial-base-eleven-convention-centre-pala-kottayam",
  },
  {
    id: "ameer-residence",
    title: "Ameer Residence",
    area: "7,000 Sq. Ft.",
    location: "Vadakara, Kerala",
    description: "Inside 7000 Sq.Ft Contemporary Home Where Tradition Meets Modern Minimalism | Home Tour",
    image: "/live-projects/ameer-residence.png",
    link: "https://archpro.live/projects/7000-sqftmodern-tropical-residence-kerala",
  },
  {
    id: "house-of-bushra",
    title: "House of Bushra",
    area: "9,810 Sq. Ft.",
    location: "Kasaragod, Kerala",
    description: "Inside 8500 Sqft Family Home Where Architecture Meets Landscape in Kerala | Home Tour",
    image: "/live-projects/house-of-bushra.png",
    link: "https://archpro.live/projects/8500-sqft-luxury-riverside-home-kasaragod-kerala",
  },
  {
    id: "zikr",
    title: "ZIKR",
    area: "3,683 Sq. Ft.",
    location: "Palakkad, Kerala",
    description: "A 3,600 sq.ft. Courtyard Home in Palakkad Blending Kerala Tradition with Modern Comfort",
    image: "/live-projects/zikr.png",
    link: "https://archpro.live/projects/3600-sqft-courtyard-house-traditional-kerala-architecture-palakkad",
  },
  {
    id: "bemerii",
    title: "Bemerii - Concept Store",
    area: "780 Sq. Ft.",
    location: "Kochi, Kerala",
    description: "Bemerii’s cafe transforms 2.5 cents into a bold, modular Cubist space redefining ice cream retail design",
    image: "/live-projects/bemerii.png",
    link: "https://archpro.live/projects/bemerii-flagship-ice-cream-cafe-concept-store",
  },
  {
    id: "the-box-house",
    title: "The Box House",
    area: "9,500 Sq. Ft.",
    location: "Kochi, Kerala",
    description: "The Box House is located in a busy residential area in Edappally, Kerala. Its name comes from the rectangular shapes used in the design.",
    image: "/live-projects/the-box-house.jpg",
    link: "https://archpro.live/projects/the-box-house-a-7500-sq-ft-luxurious-masterpiece-in-kerala",
  },
];

/**
 * EXACT FIGMA WIREFRAME SPECIFICATION:
 * - Row 1: Box 1 (Cols 1-3), Box 2 (Cols 4-6), [HORIZONTAL VOID Cols 7-9], Box 3 (Cols 10-12)
 * - Row 2: Box 4 (Cols 1-3), [HORIZONTAL VOID Cols 4-6], Box 5 (Cols 7-12 Wide Landscape)
 * - Row 3: Box 6 (Cols 1-8 Huge Hero), Box 7 (Cols 9-12 Compact Card with VERTICAL VOID underneath)
 * - Row 4: Box 8 (Cols 1-4 Compact Card with VERTICAL VOID underneath), Box 9 (Cols 5-12 Huge Hero)
 */
function getFigmaCardPlacement(index: number) {
  const cycle = index % 18;
  switch (cycle) {
    // ==========================================
    // SECTION 1 (Rows 1 & 2): "The First One"
    // ==========================================
    case 0:
      // Row 1, Box 1 (Cols 1-3: 25% Square)
      return {
        wrapper: "col-span-12 md:col-start-1 md:col-span-3",
        aspect: "aspect-square",
        isHero: false,
      };
    case 1:
      // Row 1, Box 2 (Cols 4-6: 25% Square) - sits next to Box 1 with normal gutter
      return {
        wrapper: "col-span-12 md:col-start-4 md:col-span-3",
        aspect: "aspect-square",
        isHero: false,
      };
    case 2:
      // Row 1, Box 3 (Cols 10-12: 25% Square) - Cols 7-9 is an intentional 25% horizontal void!
      return {
        wrapper: "col-span-12 md:col-start-10 md:col-span-3",
        aspect: "aspect-square",
        isHero: false,
      };
    case 3:
      // Row 2, Box 4 (Cols 1-3: 25% Square)
      return {
        wrapper: "col-span-12 md:col-start-1 md:col-span-3",
        aspect: "aspect-square",
        isHero: false,
      };
    case 4:
      // Row 2, Box 5 (Cols 7-12: ~50% Wide Landscape) - Cols 4-6 is an intentional 25% horizontal void!
      return {
        wrapper: "col-span-12 md:col-start-7 md:col-span-6",
        aspect: "aspect-[16/9] sm:aspect-[1.98]",
        isHero: false,
      };

    // ==========================================
    // SECTION 2 (Rows 3 & 4): Hero / Compact Asymmetry
    // ==========================================
    case 5:
      // Row 3, Box 6 (Cols 1-8: ~62.5% Hero Card, Figma 520x432)
      return {
        wrapper: "col-span-12 md:col-start-1 md:col-span-8",
        aspect: "aspect-[1.20]",
        isHero: true,
      };
    case 6:
      // Row 3, Box 7 (Cols 9-12: ~33% Compact Card, Figma 272x172) - with vertical void underneath
      return {
        wrapper: "col-span-12 md:col-start-9 md:col-span-4",
        aspect: "aspect-[1.58]",
        isHero: false,
      };
    case 7:
      // Row 4, Box 8 (Cols 1-4: ~33% Compact Card, Figma 272x172) - with vertical void underneath
      return {
        wrapper: "col-span-12 md:col-start-1 md:col-span-4",
        aspect: "aspect-[1.58]",
        isHero: false,
      };
    case 8:
      // Row 4, Box 9 (Cols 5-12: ~62.5% Hero Card, Figma 520x432)
      return {
        wrapper: "col-span-12 md:col-start-5 md:col-span-8",
        aspect: "aspect-[1.20]",
        isHero: true,
      };

    // ==========================================
    // SECTION 3 (Rows 5 & 6): "The Third One" - EXACT OPPOSITE OF FIRST ONE
    // ==========================================
    case 9:
      // Row 5, Box 10 (Cols 1-3: 25% Square)
      return {
        wrapper: "col-span-12 md:col-start-1 md:col-span-3",
        aspect: "aspect-square",
        isHero: false,
      };
    case 10:
      // Row 5, Box 11 (Cols 7-9: 25% Square) - Cols 4-6 is an intentional 25% horizontal void!
      return {
        wrapper: "col-span-12 md:col-start-7 md:col-span-3",
        aspect: "aspect-square",
        isHero: false,
      };
    case 11:
      // Row 5, Box 12 (Cols 10-12: 25% Square) - sits next to Box 11 with normal gutter
      return {
        wrapper: "col-span-12 md:col-start-10 md:col-span-3",
        aspect: "aspect-square",
        isHero: false,
      };
    case 12:
      // Row 6, Box 13 (Cols 1-6: ~50% Wide Landscape on LEFT)
      return {
        wrapper: "col-span-12 md:col-start-1 md:col-span-6",
        aspect: "aspect-[16/9] sm:aspect-[1.98]",
        isHero: false,
      };
    case 13:
      // Row 6, Box 14 (Cols 10-12: 25% Square on RIGHT) - Cols 7-9 is an intentional 25% horizontal void!
      return {
        wrapper: "col-span-12 md:col-start-10 md:col-span-3",
        aspect: "aspect-square",
        isHero: false,
      };

    // ==========================================
    // SECTION 4 (Rows 7 & 8): Hero / Compact Asymmetry
    // ==========================================
    case 14:
      // Row 7, Box 15 (Cols 1-8: ~62.5% Hero Card, Figma 520x432)
      return {
        wrapper: "col-span-12 md:col-start-1 md:col-span-8",
        aspect: "aspect-[1.20]",
        isHero: true,
      };
    case 15:
      // Row 7, Box 16 (Cols 9-12: ~33% Compact Card, Figma 272x172) - with vertical void underneath
      return {
        wrapper: "col-span-12 md:col-start-9 md:col-span-4",
        aspect: "aspect-[1.58]",
        isHero: false,
      };
    case 16:
      // Row 8, Box 17 (Cols 1-6: 50% Wide Card on LEFT)
      return {
        wrapper: "col-span-12 md:col-start-1 md:col-span-6",
        aspect: "aspect-[16/9] sm:aspect-[1.75]",
        isHero: false,
      };
    case 17:
      // Row 8, Box 18 (Cols 7-12: 50% Wide Card on RIGHT)
      return {
        wrapper: "col-span-12 md:col-start-7 md:col-span-6",
        aspect: "aspect-[16/9] sm:aspect-[1.75]",
        isHero: false,
      };

    default:
      return {
        wrapper: "col-span-12 md:col-span-4",
        aspect: "aspect-square",
        isHero: false,
      };
  }
}

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredProjectId, setHoveredProjectId] = useState<string>(PROJECTS_DATA[0].id);

  const activeProject =
    PROJECTS_DATA.find((p) => p.id === hoveredProjectId) || PROJECTS_DATA[0];

  return (
    <div className="min-h-screen bg-white text-black font-['Helvetica_Neue',Helvetica,Arial,sans-serif] selection:bg-[#34C25C] selection:text-black">
      {/* ---------------- SITE HEADER ---------------- */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-7 sm:pt-9 pb-4">
        <Header theme="light" />
      </div>

      {/* ---------------- FIGMA WIREFRAME HEADER: TITLE + LINE + VIEW TOGGLE ---------------- */}
      <section className="pt-6 sm:pt-10 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto">
        {/* Main Headline: "Projects" */}
        <h1 className="text-[52px] sm:text-[68px] md:text-[80px] font-bold tracking-[-0.04em] leading-[0.95] text-black select-none">
          Projects
        </h1>

        {/* Clean Full-Width Divider Line from Figma */}
        <div className="w-full h-[1px] bg-black mt-4 mb-2" />

        {/* Right-Aligned "View:\nList/Grid" exactly as sketched */}
        <div className="w-full flex justify-end pb-8 sm:pb-12">
          <div className="flex flex-col items-end text-right select-none">
            <span className="text-[12px] sm:text-[13px] font-normal text-black leading-tight">
              View:
            </span>
            <div className="flex items-center text-[12px] sm:text-[13px] font-medium text-black">
              <button
                onClick={() => setViewMode("list")}
                className={`cursor-pointer transition-colors ${
                  viewMode === "list"
                    ? "font-bold text-black underline underline-offset-[2px]"
                    : "text-neutral-500 hover:text-black"
                }`}
              >
                List
              </button>
              <span className="mx-0.5 text-black">/</span>
              <button
                onClick={() => setViewMode("grid")}
                className={`cursor-pointer transition-colors ${
                  viewMode === "grid"
                    ? "font-bold text-black underline underline-offset-[2px]"
                    : "text-neutral-500 hover:text-black"
                }`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- VIEW 1: EXACT FIGMA ASYMMETRIC GRID WITH INTENTIONAL VOIDS (ALL 18 PROJECTS) ---------------- */}
      {viewMode === "grid" && (
        <section className="px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto pb-32 sm:pb-44">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-16 sm:gap-y-20 lg:gap-y-28 items-start">
            {PROJECTS_DATA.map((project, idx) => {
              const placement = getFigmaCardPlacement(idx);

              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className={`group flex flex-col cursor-pointer ${placement.wrapper}`}
                >
                  {/* Photo Container with subtle zoom & clean minimal aesthetics */}
                  <div
                    className={`relative w-full ${placement.aspect} overflow-hidden bg-[#EAE8E3]`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes={
                        placement.isHero
                          ? "(max-width: 768px) 100vw, 50vw"
                          : "(max-width: 768px) 100vw, 25vw"
                      }
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />

                    {/* Subtle Dark Vignette on Hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />

                    {/* Floating Corner Arrow on Hover */}
                    <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm pointer-events-none">
                      <span className="text-xs font-bold">↗</span>
                    </div>
                  </div>

                  {/* Clean understated caption (matches editorial gallery look & live site metadata) */}
                  <div className="mt-3.5 flex flex-col gap-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[16px] sm:text-[18px] font-bold tracking-tight text-black group-hover:text-[#34C25C] transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <span className="text-[12px] sm:text-[13px] font-mono text-neutral-500 flex-shrink-0">
                        {project.area}
                      </span>
                    </div>

                    <p className="text-[12.5px] sm:text-[13px] text-neutral-500 font-normal">
                      {project.location}
                    </p>

                    <p className="text-[12px] text-neutral-400 line-clamp-1 font-normal mt-0.5">
                      {project.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ---------------- VIEW 2: TYPOGRAPHY LIST VIEW (VIEW: LIST) ---------------- */}
      {viewMode === "list" && (
        <section className="px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto pb-32 sm:pb-44">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pt-2">
            {/* Left Column: Dynamic Sticky Photo Preview (swaps smoothly on hover) */}
            <div className="lg:col-span-5 hidden lg:block sticky top-28">
              <div className="relative aspect-[4/5] w-full max-w-[460px] overflow-hidden bg-neutral-200 shadow-xl">
                <Image
                  key={activeProject.id}
                  src={activeProject.image}
                  alt={activeProject.title}
                  fill
                  sizes="460px"
                  priority
                  className="object-cover transition-all duration-700 ease-out scale-100"
                />
                {/* Project Badge on Preview */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/85 via-black/45 to-transparent text-white">
                  <div className="text-[11px] font-mono tracking-wider uppercase text-[#34C25C] mb-1">
                    {activeProject.area}
                  </div>
                  <div className="text-[20px] font-bold leading-tight">
                    {activeProject.title}
                  </div>
                  <div className="text-[13px] text-neutral-300 mt-0.5">
                    {activeProject.location}
                  </div>
                  <p className="text-[11.5px] text-neutral-400 mt-1 line-clamp-2">
                    {activeProject.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Large Typography Stacked List with Sibling Dimming */}
            <div className="lg:col-span-7 flex flex-col space-y-1">
              {PROJECTS_DATA.map((project) => {
                const isHovered = hoveredProjectId === project.id;
                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    onMouseEnter={() => setHoveredProjectId(project.id)}
                    className="group flex flex-col sm:flex-row sm:items-baseline justify-between py-3 sm:py-3.5 border-b border-black/10 cursor-pointer transition-all duration-300"
                  >
                    {/* Project Title (enormous neo-grotesque font) */}
                    <div className="flex-1">
                      <h3
                        className={`text-[28px] sm:text-[36px] lg:text-[42px] font-bold tracking-tight leading-[1.08] transition-all duration-300 ${
                          isHovered
                            ? "text-black translate-x-2"
                            : "text-neutral-300 hover:text-neutral-600"
                        }`}
                      >
                        {project.title}
                      </h3>
                    </div>

                    {/* Meta aligned with title (shows location & link on hover) */}
                    <div
                      className={`flex items-center gap-5 mt-2 sm:mt-0 transition-opacity duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <span className="text-[13px] text-neutral-500 font-medium">
                        {project.location} • {project.area}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-black group-hover:text-[#34C25C] transition-colors whitespace-nowrap">
                        <span>View</span>
                        <span>→</span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- SITE FOOTER ---------------- */}
      <Footer />
    </div>
  );
}
