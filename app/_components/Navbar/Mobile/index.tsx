"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import DarkLogo from "@/app/_assets/images/logo-dark.png";
import LightLogo from "@/app/_assets/images/logo-white.png";
import Link from "next/link";
import { useTheme } from "next-themes";
import MenuSheet from "./MenuSheet";
import SearchSheet from "./SearchSheet";
import { IFilters } from "../../VehiclesFilter";
import { usePathname, useSearchParams } from "next/navigation";

function Mobile() {
  const { theme } = useTheme();
  const [filters, setFilters] = useState<IFilters | null>(null);
  const isDark = theme && theme === "dark";
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const pathname = usePathname();

  useEffect(() => {
    const params: IFilters = {
      city: searchParams.get("city") || undefined,
      state:
        searchParams.get("state") ||
        (pathname === "/vehicles" ? "" : undefined),
      brand: searchParams.get("brand") || undefined,
      model: searchParams.get("model") || undefined,
      price: {
        min: searchParams.get("priceMin")
          ? Number(searchParams.get("priceMin"))
          : undefined,
        max: searchParams.get("priceMax")
          ? Number(searchParams.get("priceMax"))
          : undefined,
      },
      mileage: {
        min: searchParams.get("mileageMin")
          ? Number(searchParams.get("mileageMin"))
          : undefined,
        max: searchParams.get("mileageMax")
          ? Number(searchParams.get("mileageMax"))
          : undefined,
      },
      year: {
        min: searchParams.get("yearMin") || undefined,
        max: searchParams.get("yearMax") || undefined,
      },
      transmissionType: searchParams.get("transmissionType") || undefined,
    };

    setFilters(params);
  }, [searchParams]);

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

export default Mobile;
