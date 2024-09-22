"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IFilters } from "../_components/VehiclesFilter";

function Vehicles() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<IFilters | null>(null);
  const search = searchParams.get("search");

  console.log(search);

  useEffect(() => {
    const params: IFilters = {
      city: searchParams.get("city") || undefined,
      state: searchParams.get("state") || undefined,
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
      manufacturingYear: {
        min: searchParams.get("manufacturingYearMin")
          ? Number(searchParams.get("manufacturingYearMin"))
          : undefined,
        max: searchParams.get("manufacturingYearMax")
          ? Number(searchParams.get("manufacturingYearMax"))
          : undefined,
      },
      transmissionType: searchParams.get("transmissionType") || undefined,
    };

    setFilters(params);
  }, [searchParams]);

  return (
    <div>
      <h1>Filters:</h1>
      <pre>{JSON.stringify(filters, null, 2)}</pre>
    </div>
  );
}

export default Vehicles;
