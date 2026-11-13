"use client";

import React, { useState } from "react";

interface FaqItem {
  id: string;
  tag: string;
  question: string;
  answer: string;
  ctaText: string;
  ctaHref: string;
  activeNode: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "overview",
    tag: "OVERVIEW",
    question: "What is ArchPro?",
    answer:
      "ArchPro brings every aspect of designing and building spaces into one seamless experience. We unite architecture, interior design, material sourcing, and turnkey construction under a single accountable team—eliminating the friction between separate designers and contractors.",
    ctaText: "Start a Project",
    ctaHref: "#book-consultation",
    activeNode: "ARCHITECTURE",
  },
  {
    id: "process",
    tag: "WORKFLOW",
    question: "How does ArchPro work?",
    answer:
      "We operate through four disciplined phases: Pre-Design (site and lifestyle analysis), Design (3D spatial concepts and material palettes), Pre-Execution (engineering drawings and fixed cost contracts), and Execution (supervised build with milestone inspections).",
    ctaText: "View Workflow",
    ctaHref: "#process",
    activeNode: "PROCESS",
  },
  {
    id: "difference",
    tag: "DIFFERENTIATOR",
    question: "How are you different from an architect or contractor?",
    answer:
      "Traditional architects rarely take accountability for final build costs, while independent contractors build without architectural fidelity. ArchPro pairs award-winning design directors with vetted construction engineers, delivering single-point accountability and guaranteed pricing.",
    ctaText: "Compare Difference",
    ctaHref: "#book-consultation",
    activeNode: "ACCOUNTABILITY",
  },
  {
    id: "services",
    tag: "CAPABILITIES",
    question: "What services does ArchPro offer?",
    answer:
      "From bespoke private residences and luxury villas to commercial headquarters and turnkey renovations. We handle architectural planning, structural engineering, statutory permits, MEP, custom cabinetry, material procurement, and interior styling.",
    ctaText: "Explore Services",
    ctaHref: "#products",
    activeNode: "CAPABILITIES",
  },
  {
    id: "cost",
    tag: "INVESTMENT",
    question: "How much do your services cost?",
    answer:
      "We design across budget scales—from cost-efficient builds to super-luxury estates. Our pricing is 100% transparent: itemized bill-of-quantities, no hidden contractor markups, and structured payments tied strictly to physical site verification milestones.",
    ctaText: "Pricing Guide",
    ctaHref: "#book-consultation",
    activeNode: "BUDGET",
  },
  {
    id: "coverage",
    tag: "REACH",
    question: "Where does ArchPro operate in India?",
    answer:
      "ArchPro operates pan-India with active projects across Mumbai, Delhi NCR, Bangalore, Hyderabad, Pune, and Goa. Every build is managed on-site by dedicated licensed project managers adhering to our unified quality protocol.",
    ctaText: "Check Your Region",
    ctaHref: "#contact",
    activeNode: "EXECUTION",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default first item open

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faqs"
      className="relative w-full text-black font-['Helvetica_Neue',Helvetica,Arial,sans-serif] py-20 sm:py-24 lg:py-20 selection:bg-black selection:text-black overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-[1440px] mx-auto px-0">
        {/* Main Layout: Free space on left side, Heading + Accordion together on the right side */}
        <div className="flex flex-col lg:flex-row justify-end items-start w-full">
          {/* Right Column: Heading + Accordion */}
          <div className="w-full lg:w-[78%] xl:w-[60%] max-w-[980px] lg:ml-auto">
            {/* FAQ Heading on the right side above the accordion */}
            <div className="mb-6 sm:mb-8">
              <span className="text-[11px] sm:text-[12px] text-black/80 font-medium tracking-[0.02em] uppercase  select-none">
                FAQS
              </span>
            </div>

            <ul className="w-full divide-y border-t border-black/15 divide-black/15 border-b border-black/15">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <li key={item.id} className="group transition-colors duration-200">
                    <div
                      onClick={() => toggleItem(idx)}
                      className="w-full py-5 sm:py-6 lg:py-4 cursor-pointer select-none focus:outline-none"
                      role="button"
                      tabIndex={0}
                      aria-expanded={isOpen}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggleItem(idx);
                        }
                      }}
                    >
                      {/* Desktop Layout: Question on left (single line), Answer at the end with dedicated width, Indicator on right */}
                      <div className="flex items-start justify-between gap-5 sm:gap-7 w-full">
                        {/* Column 1: Question Title (Single line) */}
                        <div className="flex-1">
                          <h3
                            className={`text-[17.5px] sm:text-[18.5px] lg:text-[18px] xl:text-[18px] font-medium tracking-[-0.015em] leading-tight transition-colors duration-200 lg:blackspace-nowrap ${
                              isOpen ? "text-black" : "text-black/90 group-hover:text-black"
                            }`}
                          >
                            {item.question}
                          </h3>
                        </div>

                        {/* Column 2 (Desktop): Answer Paragraph positioned at the end with generous width */}
                        {isOpen && (
                          <div className="hidden min-[1150px]:block w-[320px] xl:w-[350px] shrink-0">
                            <p className="text-[12.5px] sm:text-[13px] leading-[1.65] text-black/80 font-normal text-left">
                              {item.answer}
                            </p>
                          </div>
                        )}

                        {/* Column 3: Tactile Minimal Plus / Minus Indicator */}
                        <div className="w-6 shrink-0 flex items-center justify-end pt-1">
                          <span
                            className="relative w-4 h-4 shrink-0 flex items-center justify-center text-black"
                            aria-hidden="true"
                          >
                            {/* Horizontal Line */}
                            <span className="absolute w-3.5 h-[1.5px] bg-black rounded-full transition-transform duration-300" />
                            {/* Vertical Line: Collapses to zero scale when open */}
                            <span
                              className={`absolute w-[1.5px] h-3.5 bg-black rounded-full transition-all duration-300 ${
                                isOpen ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
                              }`}
                            />
                          </span>
                        </div>
                      </div>

                      {/* Tablet / Mobile Accordion Body (Collapsible underneath when screen < 1150px) */}
                      <div className="min-[1150px]:hidden">
                        <div
                          className={`grid transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isOpen
                              ? "grid-rows-[1fr] opacity-100 mt-4 pt-2"
                              : "grid-rows-[0fr] opacity-0 pointer-events-none"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="text-[13px] sm:text-[14px] leading-relaxed text-black/80 font-normal">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}