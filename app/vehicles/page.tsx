/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import VehiclesFilter, { IFilters } from "../_components/VehiclesFilter";
import { useResponsive } from "../_hooks/useResponsive";
import Search from "../_components/Search";
import { Vehicle } from "../_models/vehicle.model";
import { getVehicles } from "../_services/http/vehicles";
import HorizontalCarCard from "../_components/HorizontalCarCard";
import VerticalCarCard from "../_components/VerticalCarCard";
import { useInView } from "react-intersection-observer";
import VehiclesSearchMenu from "./_components/VehiclesSearchMenu";
import { GiCarWheel } from "react-icons/gi";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

function Vehicles() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<IFilters | null>(null);
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [recentAddedVehicles, setRecentAddedVehicles] = useState<Vehicle[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const search = searchParams.get("search");
  const [page, setPage] = useState(1);
  const { isSmall } = useResponsive();
  const router = useRouter();

  const { ref, inView } = useInView();

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
      transmissionType: searchParams.get("transmissionType") || undefined,
    };

    fetchVehiclesForSearch(params, search);

    setFilters(params);
  }, [searchParams]);

  const fetchVehicles = async (
    filters: IFilters | null,
    search: string | null,
    page: number,
  ) => {
    setLoading(true);
    try {
      const data = await getVehicles(filters, search, page);
      if (data) {
        if (page === 1) {
          setTotalItems(data.totalItems);
          const uniqueVehicles = data.vehicles.filter(
            (vehicle: Vehicle) =>
              !recentAddedVehicles.some((v) => v.id === vehicle.id),
          );
          setRecentAddedVehicles(uniqueVehicles);
        } else {
          setRecentAddedVehicles((prevVehicles) => [
            ...prevVehicles,
            ...data.vehicles,
          ]);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar veículos", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVehiclesForSearch = async (
    filters: IFilters | null,
    search: string | null,
  ) => {
    setPage(1);
    setLoading(true);
    setRecentAddedVehicles([]);
    try {
      const data = await getVehicles(filters, search, 1);
      if (data) {
        setTotalItems(data.totalItems);
        setRecentAddedVehicles(data.vehicles);
      }
    } catch (error) {
      console.error("Erro ao buscar veículos", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreVehicles = () => {
    if (!loading && recentAddedVehicles.length < totalItems) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page !== 1) {
      fetchVehicles(filters, search, page);
    }
  }, [page]);

  useEffect(() => {
    if (inView) {
      loadMoreVehicles();
    }
  }, [inView]);

  return (
    <div className="w-full">
      {isSmall && (
        <VehiclesSearchMenu
          filters={filters}
          setFilters={setFilters}
          fetchVehiclesForSearch={fetchVehiclesForSearch}
          search={search}
        />
      )}
      <div className="flex w-full items-center justify-center">
        <div className="mt-4 flex min-h-[1000px] w-full max-w-desktop gap-4 md:w-[95%]">
          {!isSmall && (
            <div
              className={`${
                isOpenFilters ? "sticky" : "hidden"
              } top-6 h-[92vh] w-[320px] rounded-3xl bg-foreground p-4 lg:pr-2`}
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
              className={`hidden items-center justify-center md:flex ${
                isOpenFilters ? "w-[100%]" : "w-2/3"
              }`}
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

            <h2 className="w-full px-2 pb-6 pt-10 text-start text-[16px] font-semibold dark:text-[#6A6A6A] md:px-0">
              {totalItems} veículos encontrados
            </h2>

            {loading && page === 1 ? (
              <div className="flex w-full justify-center">
                <p>Carregando veículos...</p>
              </div>
            ) : (
              <div
                className={`grid w-full grid-cols-1 gap-3 px-2 sm:grid-cols-2 md:grid-cols-3 md:px-0 ${
                  isOpenFilters ? "lg:grid-cols-4" : "lg:grid-cols-5"
                }`}
              >
                {recentAddedVehicles.map((vehicle) =>
                  isSmall ? (
                    <HorizontalCarCard vehicle={vehicle} key={vehicle.id} />
                  ) : (
                    <div key={vehicle.id}>
                      <VerticalCarCard vehicle={vehicle} />
                    </div>
                  ),
                )}
              </div>
            )}

            <div ref={ref} className="flex w-full justify-center py-8">
              {loading && page > 1 ? (
                <GiCarWheel
                  size={40}
                  className={`animate-spin text-2xl text-font-primary ${styles.spinVariable}`}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Page = () => {
  return (
    <Suspense>
      <Vehicles />
    </Suspense>
  );
};

export default Page;
