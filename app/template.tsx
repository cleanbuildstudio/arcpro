"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="page-transition-container w-full min-h-full flex flex-col flex-1"
    >
      {children}
    </div>
  );
}
