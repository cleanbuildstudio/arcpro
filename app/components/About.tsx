import React from "react";

export default function About() {
  return (
    <section className="relative z-20 w-full bg-white text-black py-12 sm:py-16 md:py-24 px-5 sm:px-8 md:px-12 flex justify-center items-center overflow-hidden">
      <div className="max-w-[1600px] w-full">
        <p className="font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-black font-normal text-[20px] min-[400px]:text-[22px] sm:text-[25px] md:text-[28px] lg:text-[2.4rem] leading-[1.35] md:leading-tight tracking-[-0.015em] indent-0 sm:indent-12 md:indent-24 lg:indent-[140px] origin-top-left transform-none md:[transform:scaleY(1.45)] select-none">
          ArchPro brings every aspect of designing and building spaces into one
          seamless experience. From first ideas to final handovers, it empowers homeowners
          and professionals to explore, collaborate, and bring ambitious projects to life.
        </p>
      </div>
    </section>
  );
}
