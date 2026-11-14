"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ProductCategory {
  id: string;
  badge?: string;
  brand: string;
  title: string;
  packshot: string;
  lifestyle: string;
  subcategories: string[];
}

const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "bathroom",
    badge: "NEW ARRIVAL",
    brand: "ARCHPRO COLLECTION",
    title: "Bathroom",
    packshot: "/products/bathroom-packshot.jpg",
    lifestyle: "/products/bathroom.jpg",
    subcategories: ["Basins", "Bathroom Accessibility", "Bathroom Accessories", "Tapware"],
  },
  {
    id: "building",
    badge: "NEW ARRIVAL",
    brand: "STRUCTURAL & EXTERIOR",
    title: "Building",
    packshot: "/products/building-packshot.jpg",
    lifestyle: "/products/building.jpg",
    subcategories: [
      "Building Supplies",
      "Car Parking Solutions",
      "Cladding & Facades",
      "Construction 4.0",
      "Equipment & Supplies",
    ],
  },
  {
    id: "finishes",
    badge: "NEW ARRIVAL",
    brand: "SURFACES & TEXTURES",
    title: "Finishes",
    packshot: "/products/finishes-packshot.jpg",
    lifestyle: "/products/finishes.jpg",
    subcategories: [
      "Acoustic Systems",
      "Hardwood Flooring",
      "Natural Mineral Paints",
      "Stains & Treatments",
      "Tiles & Raw Stone",
    ],
  },
  {
    id: "furnitures",
    badge: "NEW ARRIVAL",
    brand: "STUDIO SELECTION",
    title: "Furnitures",
    packshot: "/products/furniture-packshot.jpg",
    lifestyle: "/products/furniture.jpg",
    subcategories: [
      "Living Room",
      "Dining Furniture",
      "Home Office & Atelier",
      "Bedroom & Suites",
      "Sculptural Seating",
    ],
  },
  {
    id: "heating-cooling",
    badge: "NEW ARRIVAL",
    brand: "CLIMATE & WELLNESS",
    title: "Heating, Cooling & Ventilation",
    packshot: "/products/climate-packshot.jpg",
    lifestyle: "/products/climate.jpg",
    subcategories: [
      "Heat Pumps",
      "Central HVAC & Air",
      "Architectural Fans",
      "Linear Fireplaces",
      "Hot Water Systems",
    ],
  },
];

export default function Products() {
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [counterStep, setCounterStep] = useState(0); // 0: 999, 1: 1,000+
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);
  const hasAnimatedRef = useRef(false);

  // Mouse drag-to-scroll handlers so user can click & drag on photos/cards to scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || !scrollContainerRef.current) return;
    isDownRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 3) {
      hasMovedRef.current = true;
      scrollContainerRef.current.style.scrollSnapType = "none";
      scrollContainerRef.current.style.scrollBehavior = "auto";
      scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
    }
  };

  const handleMouseUpOrLeave = () => {
    if (isDownRef.current && scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollSnapType = "";
      scrollContainerRef.current.style.scrollBehavior = "";
    }
    isDownRef.current = false;
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.stopPropagation();
      e.preventDefault();
      hasMovedRef.current = false;
    }
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || hasAnimatedRef.current) return;

    let timer: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          // Play once on first view: holds 999 briefly, then rolls to 1,000+
          hasAnimatedRef.current = true;
          observer.unobserve(el);
          timer = setTimeout(() => {
            setCounterStep(1); // 1,000+
          }, 600); // 600ms comfortable pause so 999 is clearly visible
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of section enters viewport
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative w-full bg-white text-black font-['Helvetica_Neue',Helvetica,Arial,sans-serif] py-20 sm:py-24 lg:py-24"
      aria-label="Products Section"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
        {/* Top Header: Matching archpro.live with architectural elegance */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-18 lg:mb-20">
          <h2 className="text-[32px] sm:text-[44px] md:text-[52px] lg:text-[58px] font-bold text-black select-none">
            <span>Explore </span>
            <span className="relative inline-flex items-center justify-center px-3.5 sm:px-4 py-0.5 mx-1 sm:mx-1.5 border border-black/80 rounded-full font-normal text-[26px] sm:text-[38px] md:text-[44px] align-middle overflow-hidden h-[1.3em] leading-none">
              {/* Invisible sizer to lock pill width and eliminate layout jitter */}
              <span className="invisible pointer-events-none select-none px-0.5">
                1,000+
              </span>

              {/* Rolling Counter: 999 -> 1,000+ */}
              <span
                className="absolute inset-0 flex flex-col items-center transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `translateY(-${counterStep * 100}%)` }}
              >
                <span className="h-full w-full flex items-center justify-center shrink-0">
                  999
                </span>
                <span className="h-full w-full flex items-center justify-center shrink-0">
                  1,000+
                </span>
              </span>
            </span>
            <span> Products</span>
          </h2>

          <p className="mt-4 sm:mt-5 text-[14px] leading-5 sm:text-[16px] text-neutral-600 font-normal max-w-xl">
            No matter how big or small your building, renovation or redecoration project may be,
            you&apos;ll find plenty of high-quality products to choose from.
          </p>
        </div>

        {/* Product Cards: Swipable on mobile screens, responsive grid on desktop */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onClickCapture={handleClickCapture}
          className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory scroll-smooth sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-5 items-start pb-4 sm:pb-0 -mx-4 px-6 sm:mx-0 sm:px-0 scroll-pl-6 sm:scroll-pl-0 no-scrollbar cursor-grab active:cursor-grabbing sm:cursor-default"
        >
          {PRODUCT_CATEGORIES.map((cat) => {
            const isSaved = savedItems.has(cat.id);

            return (
              <article
                key={cat.id}
                className="group flex flex-col cursor-pointer select-none shrink-0 sm:shrink w-[76vw] max-w-[320px] sm:w-auto sm:max-w-none snap-start"
              >
                {/* Gulled-style Card Image Box */}
                <div className="relative w-full aspect-[3/4] bg-[#ECECEC] rounded-none overflow-hidden border border-neutral-200/60 transition-all duration-300">
                  {/* 1. Resting Primary Packshot (Studio Cutout, object-contain, mix-blend-multiply) */}
                  <div className="absolute inset-0 p-5 sm:p-6 flex items-center justify-center transition-opacity duration-300 ease-out group-hover:opacity-0">
                    <div className="relative w-full h-full">
                      <Image
                        src={cat.packshot}
                        alt={`${cat.title} Packshot`}
                        fill
                        draggable={false}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none select-none"
                      />
                    </div>
                  </div>

                  {/* 2. Hover Secondary Lifestyle Image (Full-bleed In-situ, object-cover) */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 z-[1]">
                    <Image
                      src={cat.lifestyle}
                      alt={`${cat.title} Lifestyle in-situ`}
                      fill
                      draggable={false}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] pointer-events-none select-none"
                    />
                  </div>

                  
                  {/* 4. Bottom-Right Wishlist Bookmark Button (Appears on hover like Gulled) */}
                  <button
                    onClick={(e) => toggleSave(cat.id, e)}
                    className={`absolute bottom-3 right-3 z-[3] w-7 h-7 rounded-none shadow-md flex items-center justify-center transition-all duration-200 ease-out cursor-pointer focus:outline-none ${
                      isSaved
                        ? "opacity-100 translate-y-0 bg-black text-white"
                        : "opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 bg-white text-black hover:bg-neutral-100 active:scale-95"
                    }`}
                    aria-label={`Save ${cat.title} to wishlist`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill={isSaved ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth={1.8}
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Text Info Below Card: Gulled Architectural Hierarchy */}
                <div className="pt-3 flex flex-col">
                  {/* Brand / Category Eyebrow */}
                  <span className="text-[10px] sm:text-[10.5px] font-medium uppercase text-black/50 mb-0.5">
                    {cat.brand}
                  </span>

                  {/* Product Title */}
                  <h3 className="text-[13.5px] sm:text-[14.5px] font-medium text-black group-hover:text-black/70 transition-colors">
                    {cat.title}
                  </h3>

                  {/* Subcategory Links */}
                  <ul className="mt-2 flex flex-col gap-0.5 text-[11.5px] sm:text-[12px] text-neutral-500">
                    {cat.subcategories.map((sub) => (
                      <li  
                        key={sub}
                        className="hover:text-black transition-colors duration-150 cursor-pointer"
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
          {/* Trailing spacer to preserve comfortable right padding on mobile swipe */}
          <div className="shrink-0 w-6 sm:hidden pointer-events-none" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
