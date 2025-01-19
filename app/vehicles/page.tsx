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
import VehiclesSearchMenu from "./_components/VehiclesSearchMenu";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../_components/ui/pagination";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export type IExtendedFilters = IFilters & {
  page: string;
};

function Vehicles() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<IFilters | null>(null);
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const search = searchParams.get("search");
  const [pagination, setPagination] = useState<{
    currentPage: number;
    totalPages: number;
  }>({
    currentPage: JSON.parse(searchParams.get("page") ?? "1"),
    totalPages: 1,
  });
  const { isSmall } = useResponsive();
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: newPage,
    }));

    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", newPage.toString());

    router.push(`/vehicles?${queryParams.toString()}`);
  };

  const toggleOpenFilters = () => {
    setIsOpenFilters((oldValue) => !oldValue);
  };

  const onApplyFilters = (filters: IFilters) => {
    setFilters(filters);
    setIsOpenFilters(false);

    const isFilled = (value: any) =>
      value !== null && value !== undefined && value !== "" && value !== "all";

    const queryParams: string[] = [];
    const currentParams = new URLSearchParams(window.location.search);

    const searchParam = currentParams.get("search");
    if (searchParam) {
      queryParams.push(`search=${searchParam}`);
    }

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

    queryParams.push(`page=1`);

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

    const page = searchParams.get("page") || "1";

    setPagination((old) => ({
      ...old,
      currentPage: JSON.parse(page),
    }));

    fetchVehiclesForSearch(params, search);

    setFilters(params);
  }, [searchParams]);

  const fetchVehiclesForSearch = async (
    filters: IFilters | null,
    search: string | null,
  ) => {
    setLoading(true);
    setVehicles([]);

    try {
      const data = await getVehicles(
        15,
        filters,
        search,
        pagination.currentPage,
      );
      if (data) {
        setVehicles(data.vehicles);

        setPagination({
          ...pagination,
          totalPages: (data as any).totalPages,
        });
      }
    } catch (error) {
      console.error("Erro ao buscar veículos", error);
    } finally {
      setLoading(false);
    }
  };

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

            {loading ? (
              <div className="flex h-full w-full justify-center">
                <div className="flex h-fit w-full items-center justify-center gap-2">
                  <AiOutlineLoading3Quarters
                    className="animate-spin"
                    size={20}
                  />
                  <p className="text-lg">Carregando veículos...</p>
                </div>
              </div>
            ) : (
              <div
                className={`grid w-full grid-cols-1 gap-3 px-2 sm:grid-cols-2 md:grid-cols-3 md:px-0 ${
                  isOpenFilters ? "lg:grid-cols-4" : "lg:grid-cols-5"
                }`}
              >
                {vehicles.map((vehicle) =>
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

            <Pagination>
              <PaginationContent>
                {Array.from(
                  { length: pagination.totalPages },
                  (_, index) => index + 1,
                ).map((page: number) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(page)}
                      isActive={page === pagination.currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>
            </Pagination>
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
