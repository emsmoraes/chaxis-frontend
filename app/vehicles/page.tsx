"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import VehiclesFilter, { IFilters } from "../_components/VehiclesFilter";
import { useResponsive } from "../_hooks/useResponsive";
import Search from "../_components/Search";
import { Vehicle } from "../_models/vehicle.model";
import { getVehicles } from "../_services/http/vehicles";
import HorizontalCarCard from "../_components/HorizontalCarCard";
import VerticalCarCard from "../_components/VerticalCarCard";

function Vehicles() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<IFilters | null>(null);
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [recentAddedVehicles, setRecentAddedVehicles] = useState<Vehicle[]>([]);
  const search = searchParams.get("search");

  const { isSmall } = useResponsive();

  const toggleOpenFilters = () => {
    setIsOpenFilters((oldValue) => !oldValue);
  };

  const onApplyFilters = (filters: IFilters) => {
    setFilters(filters);
    setIsOpenFilters(false);
  };

  const onClearFilters = () => {
    setFilters(null);
  };

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

  useEffect(() => {
    const getCars = async () => {
      const { vehicles } = await getVehicles();
      setRecentAddedVehicles(vehicles);
    };
    getCars();
  }, []);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center">
        <div className="mt-4 flex min-h-[1000px] w-full max-w-desktop gap-4 md:w-[95%]">
          {!isSmall && (
            <div
              className={`${isOpenFilters ? "sticky" : "hidden"} top-6 h-[92vh] w-[320px] rounded-3xl bg-foreground p-4 lg:pr-2`}
            >
              <VehiclesFilter
                onApplyFilters={onApplyFilters}
                onClearFilters={onClearFilters}
                defaultValues={{ ...filters }}
              />
            </div>
          )}

          <div className="flex w-full flex-1 flex-col items-center space-y-2 rounded-3xl bg-transparent p-0 pt-0 md:bg-foreground md:p-6 md:pt-3">
            <div
              className={`hidden items-center justify-center md:flex ${isOpenFilters ? "w-[100%]" : "w-2/3"}`}
            >
              <Search
                onClickFilter={toggleOpenFilters}
                filters={filters}
                emphasisFilterButton={isOpenFilters || filters !== null}
                defaultValues={{
                  search: search ?? "",
                }}
              />
            </div>

            <h2 className="w-full px-2 pb-6 pt-10 text-start text-[17px] font-semibold dark:text-[#6A6A6A] md:px-0">
              Publicados recentemente
            </h2>
            <div
              className={`grid w-full grid-cols-1 gap-3 px-2 sm:grid-cols-2 md:grid-cols-3 md:px-0 ${
                isOpenFilters ? "lg:grid-cols-4" : "lg:grid-cols-5"
              }`}
            >
              {recentAddedVehicles.map((vehicle) =>
                isSmall ? (
                  <HorizontalCarCard vehicle={vehicle} key={vehicle.id} />
                ) : (
                  <VerticalCarCard vehicle={vehicle} key={vehicle.id} />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vehicles;
