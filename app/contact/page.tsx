"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    projectType: "",
    timeline: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate brief network submission
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      location: "",
      projectType: "",
      timeline: "",
    });
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-white text-black font-['Helvetica_Neue',Helvetica,Arial,sans-serif] selection:bg-black selection:text-white flex flex-col justify-between">
      {/* ---------------- SITE HEADER (LIGHT THEME) ---------------- */}
      <div className="w-full pt-7 sm:pt-9 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto">
        <Header theme="light" />
      </div>

      {/* ---------------- MAIN CONTACT SECTION (FIGMA DESKTOP - 26) ---------------- */}
      <main className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-start">
          
          {/* ==================== LEFT COLUMN ==================== */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Main Headline */}
            <h1 className="text-[36px] sm:text-[44px] md:text-[50px] lg:text-[54px] font-bold text-black tracking-[-0.035em] leading-[1.08] mb-5 sm:mb-6">
              Let&apos;s get started with<br />
              your dream project
            </h1>

            {/* Intro Description */}
            <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-[1.6] text-neutral-600 max-w-[480px] mb-8 sm:mb-10 font-normal">
              We bring together design expertise, quality materials, and seamless execution
              to transform ideas into reality. Whether it&apos;s a residence, office, or custom
              project, you&apos;ll have a dedicated team guiding you every step of the way.
            </p>

            {/* Left Image Placeholder / Architectural Image */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-neutral-100 overflow-hidden mb-12 sm:mb-16 group">
              <Image
                src="/live-projects/the-crimped-roof-house-hd.png"
                alt="Architectural Residence Project"
                fill
                quality={95}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Contact Info Table */}
            <div className="w-full max-w-[540px]">
              <h2 className="text-[18px] sm:text-[20px] font-bold text-black tracking-tight mb-3">
                Contact Info
              </h2>

              <div className="border-t border-neutral-300 divide-y divide-neutral-200">
                {/* Email */}
                <div className="py-3 sm:py-3.5 flex items-baseline">
                  <span className="w-32 sm:w-44 text-[13px] sm:text-[14px] font-bold text-black shrink-0">
                    Email
                  </span>
                  <a
                    href="mailto:info@arcprojects.build"
                    className="text-[13px] sm:text-[14px] text-neutral-800 hover:text-black hover:underline transition-colors break-all"
                  >
                    info@arcprojects.build
                  </a>
                </div>

                {/* Phone */}
                <div className="py-3 sm:py-3.5 flex items-baseline">
                  <span className="w-32 sm:w-44 text-[13px] sm:text-[14px] font-bold text-black shrink-0">
                    Phone
                  </span>
                  <a
                    href="tel:0422751754"
                    className="text-[13px] sm:text-[14px] text-neutral-800 hover:text-black hover:underline transition-colors"
                  >
                    0422 751 754
                  </a>
                </div>

                {/* Address */}
                <div className="py-3 sm:py-3.5 flex items-baseline">
                  <span className="w-32 sm:w-44 text-[13px] sm:text-[14px] font-bold text-black shrink-0">
                    Address
                  </span>
                  <span className="text-[13px] sm:text-[14px] text-neutral-800">
                    175A Pitt St, Redfern, NSW 2016
                  </span>
                </div>

                {/* Licence No. */}
                <div className="py-3 sm:py-3.5 flex items-baseline">
                  <span className="w-32 sm:w-44 text-[13px] sm:text-[14px] font-bold text-black shrink-0">
                    Licence No.
                  </span>
                  <span className="text-[13px] sm:text-[14px] text-neutral-800">
                    294491C
                  </span>
                </div>

                {/* ABN */}
                <div className="py-3 sm:py-3.5 flex items-baseline">
                  <span className="w-32 sm:w-44 text-[13px] sm:text-[14px] font-bold text-black shrink-0">
                    ABN
                  </span>
                  <span className="text-[13px] sm:text-[14px] text-neutral-800">
                    89 607 106 052
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== RIGHT COLUMN ==================== */}
          <div className="lg:col-span-6 flex flex-col lg:pl-4 xl:pl-8">
            {/* Form Section */}
            <div className="w-full">
              <h2 className="text-[22px] sm:text-[26px] font-bold text-black tracking-tight mb-6 sm:mb-8">
                Your Personal Details
              </h2>

              {submitted ? (
                /* Success State */
                <div className="border border-neutral-200 bg-neutral-50 p-8 sm:p-10 text-left">
                  <div className="w-12 h-12 rounded-full bg-[#59B72F]/10 text-[#59B72F] flex items-center justify-center text-2xl font-bold mb-4">
                    ✓
                  </div>
                  <h3 className="text-[20px] font-bold text-black tracking-tight mb-2">
                    Thank You, {formData.name || "there"}!
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-neutral-600 leading-relaxed mb-6">
                    We&apos;ve received your project consultation details. Our team will review
                    your brief and reach out to you within 24 hours to schedule an initial discussion.
                  </p>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 text-[13px] font-bold text-black hover:text-[#59B72F] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>← Submit Another Request</span>
                  </button>
                </div>
              ) : (
                /* Main Form */
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
                  {/* Name */}
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-neutral-300 focus:border-black py-2.5 text-[15px] sm:text-[16px] text-black placeholder:text-neutral-500 outline-none transition-colors"
                    />
                  </div>

                  {/* Phone with Country Code Prefix */}
                  <div className="relative flex items-center border-b border-neutral-300 focus-within:border-black transition-colors">
                    <div className="flex items-center gap-1 pr-3 text-[15px] sm:text-[16px] font-medium text-black select-none shrink-0">
                      <span>IN +91</span>
                      <svg className="w-3.5 h-3.5 text-neutral-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent py-2.5 text-[15px] sm:text-[16px] text-black placeholder:text-neutral-500 outline-none"
                    />
                  </div>

                  {/* Email ID */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email ID"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-neutral-300 focus:border-black py-2.5 text-[15px] sm:text-[16px] text-black placeholder:text-neutral-500 outline-none transition-colors"
                    />
                  </div>

                  {/* Project Location */}
                  <div className="relative">
                    <input
                      type="text"
                      name="location"
                      required
                      placeholder="Project Location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-neutral-300 focus:border-black py-2.5 text-[15px] sm:text-[16px] text-black placeholder:text-neutral-500 outline-none transition-colors"
                    />
                  </div>

                  {/* Type of Project & Timeline (Side-by-side row) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
                    {/* Type of Project */}
                    <div className="relative border-b border-neutral-300 focus-within:border-black transition-colors">
                      <select
                        name="projectType"
                        required
                        value={formData.projectType}
                        onChange={handleChange}
                        className={`w-full bg-transparent py-2.5 pr-8 text-[15px] sm:text-[16px] outline-none appearance-none cursor-pointer ${
                          formData.projectType ? "text-black" : "text-neutral-500"
                        }`}
                      >
                        <option value="" disabled>Type of project</option>
                        <option value="Residential Architecture" className="text-black">Residential Architecture</option>
                        <option value="Commercial / Office" className="text-black">Commercial / Office</option>
                        <option value="Villa / Vacation Home" className="text-black">Villa / Vacation Home</option>
                        <option value="Interior Design" className="text-black">Interior Design</option>
                        <option value="Renovation & Restoration" className="text-black">Renovation & Restoration</option>
                        <option value="Hospitality / F&B" className="text-black">Hospitality / F&B</option>
                      </select>
                      <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-neutral-500">
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="relative border-b border-neutral-300 focus-within:border-black transition-colors">
                      <select
                        name="timeline"
                        required
                        value={formData.timeline}
                        onChange={handleChange}
                        className={`w-full bg-transparent py-2.5 pr-8 text-[15px] sm:text-[16px] outline-none appearance-none cursor-pointer ${
                          formData.timeline ? "text-black" : "text-neutral-500"
                        }`}
                      >
                        <option value="" disabled>Timeline</option>
                        <option value="Immediate (< 1 month)" className="text-black">Immediate (&lt; 1 month)</option>
                        <option value="1 - 3 Months" className="text-black">1 - 3 Months</option>
                        <option value="3 - 6 Months" className="text-black">3 - 6 Months</option>
                        <option value="Planning stage (> 6 months)" className="text-black">Planning stage (&gt; 6 months)</option>
                      </select>
                      <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-neutral-500">
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center gap-3 text-[16px] sm:text-[17px] font-bold text-black hover:text-[#59B72F] transition-colors cursor-pointer disabled:opacity-50 select-none py-1"
                    >
                      <span>{submitting ? "Submitting..." : "Submit"}</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 text-lg leading-none">
                        →
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Image Placeholder / Architectural Image - Appears cleanly below fold on scroll */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/12] bg-neutral-100 overflow-hidden group mt-24 sm:mt-36 lg:mt-64 xl:mt-80">
              <Image
                src="/live-projects/the-observatory-hd.png"
                alt="Contemporary Architecture Details"
                fill
                quality={95}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>

        </div>
      </main>

      {/* ---------------- SITE FOOTER ---------------- */}
      <Footer />
    </div>
  );
}
