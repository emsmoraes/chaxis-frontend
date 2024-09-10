import Image from "next/image";
import React from "react";
import DarkLogo from "@/app/_assets/images/logo-dark.png";
import NavLink from "./NavLink";
import Link from "next/link";
import ThemeToggle from "../../ThemeToggle";

const links = [
  {
    name: "Início",
    path: "/",
  },
  {
    name: "Veículos",
    path: "/vehicles",
  },
  {
    name: "Concessionárias",
    path: "/dealers",
  },
];

function Desktop() {
  return (
    <div className="flex h-[58px] w-full items-center bg-foreground">
      <div className="flex h-full w-full max-w-desktop items-center justify-between px-[70px]">
        <div className="flex h-full items-center gap-20">
          <Link href="/" className="flex items-center gap-3">
            <Image src={DarkLogo} alt="logo" className="h-[25px] w-[25px]" />
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
