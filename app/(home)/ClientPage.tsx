"use client";

import HomeBanner from "./_components/HomeBanner";
import Search from "../_components/Search";
import ListCategories from "../_components/ListCategories";
import { useEffect, useState } from "react";
import VerticalCarCard from "../_components/VerticalCarCard";
import { Vehicle } from "../_models/vehicle.model";
import HorizontalCarCard from "../_components/HorizontalCarCard";
import { useResponsive } from "../_hooks/useResponsive";
import useVehicleStore from "../_stores/vehicleStore";
import VehiclesFilter, { IFilters } from "../_components/VehiclesFilter";
import { useLocationFetcher } from "../_hooks/useLocationFetcher";

interface ClientPageProps {
  recentAddedVehicles?: Vehicle[];
}

const getLastItemAfterHyphen = (state: string): string => {
  const parts = state.split("-");
  return parts.length > 1 ? parts[parts.length - 1].trim() : "";
};

export default function ClientPage({
  recentAddedVehicles = [],
}: ClientPageProps) {
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const recentAccessVehicles = useVehicleStore((state) => state.vehicles);
  const [filters, setFilters] = useState<IFilters | null>(null);
  const { location } = useLocationFetcher();
  const [defaultState, setDefaultState] = useState<undefined | string>(
    getLastItemAfterHyphen(location.address.state ?? ""),
  );

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
    setDefaultState(undefined);
  };

  const defaultFiltersValues = filters !== null ? filters : null;

  useEffect(() => {
    setDefaultState(getLastItemAfterHyphen(location.address.state ?? ""));
  }, [location]);

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
                  state: filters === null ? defaultState : filters.state,
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
            {!isOpenFilters && <ListCategories />}
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
