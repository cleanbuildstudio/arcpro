import React from "react";

export default function About() {
  return (
    <section className="relative z-20 w-full bg-white text-black py-26 px-12 flex justify-center items-center overflow-hidden">
      <div className="max-w-[1600] w-full">
        <p className="font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-black font-normal text-[19px] min-[480px]:text-[22px] sm:text-[25px] md:text-[28px] lg:text-[2.4rem] leading-tight tracking-[-0.015em] indent-24 sm:indent-24 md:indent-28 lg:indent-[140px] origin-top-left [transform:scaleY(1.45)] select-none">
          ArchPro brings every aspect of designing and building spaces into one
          seamless experience. From first ideas to final handovers, it empowers homeowners
          and professionals to explore, collaborate, and bring ambitious projects to life.
        </p>
      </div>
    </section>
  );
}
