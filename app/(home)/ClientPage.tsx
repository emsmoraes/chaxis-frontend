"use client";

import HomeBanner from "./_components/HomeBanner";
import Search from "../_components/Search";
import { useState } from "react";
import VerticalCarCard from "../_components/VerticalCarCard";
import { Vehicle } from "../_models/vehicle.model";
import HorizontalCarCard from "../_components/HorizontalCarCard";
import { useResponsive } from "../_hooks/useResponsive";
import useVehicleStore from "../_stores/vehicleStore";
import VehiclesFilter, { IFilters } from "../_components/VehiclesFilter";
import { useRouter } from "next/navigation";

interface ClientPageProps {
  recentAddedVehicles?: Vehicle[];
}

export default function ClientPage({
  recentAddedVehicles = [],
}: ClientPageProps) {
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const recentAccessVehicles = useVehicleStore((state) => state.vehicles);
  const [filters, setFilters] = useState<IFilters | null>(null);

  const { isSmall } = useResponsive();

  const toggleOpenFilters = () => {
    setIsOpenFilters((oldValue) => !oldValue);
  };

  const onApplyFilters = (filters: IFilters) => {
    setFilters(filters);
    setIsOpenFilters(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isFilled = (value: any) => {
      return (
        value !== null && value !== undefined && value !== "" && value !== "all"
      );
    };

    const queryParams: string[] = [];

    if (filters) {
      if (isFilled(filters.city)) queryParams.push(`city=${filters.city}`);
      if (isFilled(filters.state)) queryParams.push(`state=${filters.state}`);
      if (isFilled(filters.brand)) queryParams.push(`brand=${filters.brand}`);

      if (isFilled(filters.price?.min))
        queryParams.push(`priceMin=${filters.price?.min}`);
      if (isFilled(filters.price?.max))
        queryParams.push(`priceMax=${filters.price?.max}`);

      if (isFilled(filters.year?.min))
        queryParams.push(`yearMin=${filters.year?.min}`);
      if (isFilled(filters.year?.max))
        queryParams.push(`yearMax=${filters.year?.max}`);

      if (isFilled(filters.mileage?.min))
        queryParams.push(`mileageMin=${filters.mileage?.min}`);
      if (isFilled(filters.mileage?.max))
        queryParams.push(`mileageMax=${filters.mileage?.max}`);

      if (isFilled(filters.transmissionType))
        queryParams.push(`transmissionType=${filters.transmissionType}`);
    }

    const queryString = `?${queryParams.join("&")}`;

    router.push(`/vehicles${queryString}`);
  };

  const onClearFilters = () => {
    setFilters(null);
  };

  const defaultFiltersValues = filters !== null ? filters : null;

  const router = useRouter();

  return (
    <div className="w-full">
      <HomeBanner />
      <div className="flex w-full items-center justify-center">
        <div className="mt-4 flex min-h-[1000px] w-full max-w-desktop gap-4 md:w-[95%]">
          {!isSmall && (
            <div
              className={`${isOpenFilters ? "sticky" : "hidden"} top-6 h-[92vh] w-[320px] rounded-3xl bg-foreground p-4 lg:pr-2`}
            >
              <VehiclesFilter
                onApplyFilters={onApplyFilters}
                onClearFilters={onClearFilters}
                defaultValues={{
                  ...defaultFiltersValues,
                }}
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
                  search: "",
                }}
              />
            </div>
            {/* {!isOpenFilters && <ListCategories />} */}
            {recentAccessVehicles && recentAccessVehicles.length > 0 && (
              <>
                <h2 className="w-full px-2 pb-6 pt-10 text-start text-[17px] font-semibold dark:text-[#6A6A6A] md:px-0">
                  Suas ultimas visualizações
                </h2>
                <div
                  className={`w-full gap-3 px-2 sm:grid sm:grid-cols-2 md:grid-cols-3 md:px-0 [&&::-webkit-scrollbar]:hidden ${
                    isOpenFilters ? "lg:grid-cols-4" : "lg:grid-cols-5"
                  } flex flex-nowrap overflow-x-auto sm:overflow-visible`}
                >
                  {recentAccessVehicles.map((vehicle) => (
                    <VerticalCarCard vehicle={vehicle} key={vehicle.id} />
                  ))}
                </div>
              </>
            )}

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
