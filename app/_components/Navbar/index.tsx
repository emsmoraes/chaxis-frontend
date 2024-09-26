"use client";

import React from "react";
import Mobile from "./Mobile";
import Desktop from "./Desktop";
import { useResponsive } from "@/app/_hooks/useResponsive";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const { isSmall } = useResponsive();

  if (isSmall && pathname === "/vehicles") {
    return null;
  }

  return (
    <div>
      <div className="block sm:hidden">
        <Mobile />
      </div>

      <div className="hidden sm:block">
        <Desktop />
      </div>
    </div>
  );
}

export default Navbar;
