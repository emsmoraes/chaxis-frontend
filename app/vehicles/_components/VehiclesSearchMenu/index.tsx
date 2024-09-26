"use client";

import Image from "next/image";
import React from "react";
import DarkLogo from "@/app/_assets/images/logo-dark.png";
import LightLogo from "@/app/_assets/images/logo-white.png";
import Link from "next/link";
import { useTheme } from "next-themes";
import SearchSheet from "./SearchSheet";
import { IFilters } from "@/app/_components/VehiclesFilter";
import MenuSheet from "@/app/_components/Navbar/Mobile/MenuSheet";

interface VehiclesSearchMenuProps {
  fetchVehiclesForSearch: (
    filters: IFilters | null,
    search: string | null,
  ) => Promise<void>;
  setFilters: React.Dispatch<React.SetStateAction<IFilters | null>>;
  filters: IFilters | null;
  search: string | null;
}

function VehiclesSearchMenu({
  filters,
  setFilters,
  search,
}: VehiclesSearchMenuProps) {
  const { theme } = useTheme();
  const isDark = theme && theme === "dark";
  return (
    <div className="flex h-[58px] items-center justify-between bg-foreground px-4">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={isDark ? LightLogo : DarkLogo}
          alt="logo"
          className="h-[20px] w-[20px]"
        />
        <span className="block font-jura text-[17px] font-bold text-font-primary">
          Chaxis
        </span>
      </Link>

      <div className="flex items-center">
        <SearchSheet
          filters={filters}
          setFilters={setFilters}
          defaultValues={{
            search: search ?? "",
          }}
        />
        <MenuSheet />
      </div>
    </div>
  );
}

export default VehiclesSearchMenu;
