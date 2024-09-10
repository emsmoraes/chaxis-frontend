"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
  link: {
    name: string;
    path: string;
  };
}

function NavLink({ link }: NavLinkProps) {
  const pathname = usePathname();
  const isSelected = pathname === link.path;

  const linkStyle = isSelected
    ? "hover:bg-font-primary/5 text-font-primary font-lg flex h-full items-center bg-transparent px-3 font-medium transition-colors duration-300"
    : "hover:bg-font-primary/5 text-font-primary/40 font-lg flex h-full items-center bg-transparent px-3 font-medium transition-colors duration-300 hover:text-font-primary/75";

  return (
    <Link className={linkStyle} href={link.path}>
      {link.name}
    </Link>
  );
}

export default NavLink;
