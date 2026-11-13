"use client";

import React, { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer
      id="footer"
      className="relative w-full bg-white text-black font-['Helvetica_Neue',Helvetica,Arial,sans-serif] pt-16 sm:pt-20 lg:pt-24 pb-8 selection:bg-black selection:text-white"
      aria-label="Site Footer"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-between min-h-[700px]">
        {/* 1. Top Row: (ACKNOWLEDGEMENT) [Left] & NEWSLETTER [Right] */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Top Left: (ACKNOWLEDGEMENT) */}
          <div className="md:col-span-6 lg:col-span-5">
            <div className="text-[12px] font-bold tracking-[0.06em] uppercase text-black mb-3">
              (ACKNOWLEDGEMENT)
            </div>
            <p className="text-[13px] sm:text-[14px] font-bold leading-[1.35] text-black max-w-[320px]">
              ArchPro is your trusted partner for end-to-end design and execution, delivering seamless,
              transparent, and expertly crafted spaces to match your style and budget.
            </p>
          </div>

          <div className="col-span-2"></div>

          {/* Top Right: NEWSLETTER */}
          <div className="md:col-span-6 lg:col-span-5 md:ml-auto w-full max-w-[360px]">
            <div className="text-[12px] font-bold tracking-[0.06em] uppercase text-black mb-3">
              NEWSLETTER
            </div>
            <p className="text-[13px] sm:text-[14px] font-bold leading-[1.35] text-black mb-4">
              Subscribe to our Newsletter to stay up-to-date on latest projects, updates and news from us.
            </p>

            <form onSubmit={handleSubscribe}>
              <div className="bg-[#CCCCCC] flex items-center justify-between h-[42px] px-3.5 w-full">
                <input
                  type="email"
                  required
                  placeholder="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-[11px] font-bold tracking-wider uppercase text-black placeholder-black outline-none flex-1 min-w-0"
                />
                <button
                  type="submit"
                  className="text-[11px] font-bold tracking-wider uppercase text-black hover:opacity-60 transition-opacity whitespace-nowrap ml-3"
                >
                  {subscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 2. Middle Section: NAVIGATION & SOCIAL (Large Architectural Typography) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 lg:gap-16 pt-24 sm:pt-36 lg:pt-44 pb-20 sm:pb-28 items-start">
          {/* Column 1: NAVIGATION */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="text-[12px] font-bold tracking-[0.06em] uppercase text-black mb-6">
              NAVIGATION
            </div>
            <ul className="flex flex-col space-y-2.5 sm:space-y-3">
              {[
                { label: "Studio", href: "/#about" },
                { label: "Process", href: "/#process" },
                { label: "Projects", href: "/projects" },
                { label: "Gallery", href: "/#products" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="rolling-link"
                  >
                    <span className="rolling-link-text text-[34px] sm:text-[40px] lg:text-[46px] font-bold tracking-[-0.03em] text-black">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: SOCIAL */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="text-[12px] font-bold tracking-[0.06em] uppercase text-black mb-6">
              SOCIAL
            </div>
            <ul className="flex flex-col space-y-2.5 sm:space-y-3">
              {[
                { label: "INSTAGRAM", href: "https://instagram.com" },
                { label: "YOUTUBE", href: "https://youtube.com" },
                { label: "FACEBOOK", href: "https://facebook.com" },
                { label: "X.COM", href: "https://x.com" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rolling-link"
                  >
                    <span className="rolling-link-text text-[32px] sm:text-[38px] lg:text-[44px] font-bold tracking-[-0.03em] text-black">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Bottom Row: © 2026 ArchPro. | TERMS OF SERVICE | PRIVACY POLICY | SITE BY CLEANBUILD */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center text-[11px] font-bold tracking-wider uppercase text-black">
          {/* Left: Brand Copyright */}
          <div>
            © 2026 <span className="normal-case font-bold">ArchPro.</span>
          </div>

          {/* Center-Left: Terms of Service */}
          <div className="sm:text-center md:text-left">
            <a href="#terms" className="hover:opacity-60 transition-opacity">
              TERMS OF SERVICE
            </a>
          </div>

          {/* Center-Right: Privacy Policy */}
          <div className="sm:text-left md:text-left">
            <a href="#privacy" className="hover:opacity-60 transition-opacity">
              PRIVACY POLICY
            </a>
          </div>

          {/* Right: Site Credit */}
          <div className="sm:text-right">
            SITE BY{" "}
            <span className="animated-underline">
              CLEANBUILD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
