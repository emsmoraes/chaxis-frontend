"use client";

import HomeBanner from "./_components/HomeBanner";
import { Button } from "../_components/ui/button";
import Search from "../_components/Search";
import ListCategories from "../_components/ListCategories";
import { useState } from "react";
import VerticalCarCard from "../_components/VerticalCarCard";
import { Vehicle } from "../_models/vehicle.model";
import HorizontalCarCard from "../_components/HorizontalCarCard";
import { useResponsive } from "../_hooks/useResponsive";
import useVehicleStore from "../_stores/vehicleStore";

interface ClientPageProps {
  recentAddedVehicles?: Vehicle[];
}

export default function ClientPage({
  recentAddedVehicles = [],
}: ClientPageProps) {
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const recentAccessVehicles = useVehicleStore((state) => state.vehicles);

  const { isSmall } = useResponsive();

  const toggleOpenFilters = () => {
    setIsOpenFilters((oldValue) => !oldValue);
  };

  return (
    <div className="w-full">
      <HomeBanner />
      <div className="flex w-full items-center justify-center">
        <div className="mt-4 flex min-h-[1000px] w-full max-w-desktop gap-10 rounded-3xl bg-transparent p-0 pt-0 md:w-[95%] md:bg-foreground md:p-6 md:pt-3">
          {!isSmall && isOpenFilters && (
            <div
              className={`none sticky top-5 h-[500px] w-[300px] overflow-hidden bg-red-500 transition-all duration-300`}
            >
              Abriu
            </div>
          )}

          <div className="flex w-full flex-1 flex-col items-center space-y-2">
            <div
              className={`hidden items-center justify-center md:flex ${isOpenFilters ? "w-[100%]" : "w-2/3"}`}
            >
              <Search
                onClickFilter={toggleOpenFilters}
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
                  className={`grid w-full grid-cols-1 gap-3 px-2 sm:grid-cols-2 md:grid-cols-3 md:px-0 ${
                    isOpenFilters ? "lg:grid-cols-4" : "lg:grid-cols-5"
                  }`}
                >
                  {recentAccessVehicles.map((vehicle) =>
                    isSmall ? (
                      <HorizontalCarCard vehicle={vehicle} key={vehicle.id} />
                    ) : (
                      <VerticalCarCard vehicle={vehicle} key={vehicle.id} />
                    ),
                  )}
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

      <Button>Botão inicial</Button>
    </div>
  );
}
