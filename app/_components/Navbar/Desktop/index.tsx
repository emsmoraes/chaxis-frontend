"use client";
import Image from "next/image";
import React from "react";
import LightLogo from "@/app/_assets/images/logo-white.png";
import NavLink from "./NavLink";
import Link from "next/link";
import ThemeToggle from "../../ThemeToggle";
import { links } from "../NavRoutes";
import { useTheme } from "next-themes";

function Desktop() {
  const { theme } = useTheme();

  const isDark = theme && theme === "dark";

  return (
    <div className="flex h-[58px] w-full items-center justify-center bg-foreground">
      <div className="flex h-full w-full max-w-desktop items-center justify-between px-[70px]">
        <div className="flex h-full items-center gap-20">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={LightLogo}
              alt="logo"
              className={`h-[25px] w-[25px] ${
                isDark ? "brightness-0 invert" : "brightness-0 hue-rotate-180"
              }`}
            />
            <span className="block font-jura text-xl font-bold text-font-primary">
              Chaxis
            </span>
          </Link>

          <div className="flex h-full items-center">
            {links.map((link, index) => (
              <NavLink link={link} key={index} />
            ))}
          </div>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Desktop;
