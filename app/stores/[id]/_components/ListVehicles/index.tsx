"use client";
import {
  StoreVehiclesResponse,
  indexStoreVehicles,
} from "@/app/_services/http/store";
import React, { useEffect, useState } from "react";
import { GiCarWheel } from "react-icons/gi";
import { useInView } from "react-intersection-observer";
import styles from "./styles.module.css";
import { useResponsive } from "@/app/_hooks/useResponsive";
import HorizontalCarCard from "@/app/_components/HorizontalCarCard";
import VerticalCarCard from "@/app/_components/VerticalCarCard";

interface ListVehiclesProps {
  vehiclesResponse: StoreVehiclesResponse;
  storeId: string;
}

function ListVehicles({ vehiclesResponse, storeId }: ListVehiclesProps) {
  console.log("Initial vehicles", vehiclesResponse);
  const [vehicles, setVehicles] = useState(vehiclesResponse.vehicles);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { isSmall } = useResponsive();

  const { ref, inView } = useInView();

  useEffect(() => {
    const fetchMoreVehicles = async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const response = await indexStoreVehicles(storeId, page + 1);
        setVehicles((prevVehicles) => [...prevVehicles, ...response.vehicles]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(response.totalPages > page);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (inView) {
      fetchMoreVehicles();
    }
  }, [inView, loading, hasMore, page, storeId]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center">
        <div className="mt-4 flex min-h-[1000px] w-full max-w-desktop gap-4 md:w-[95%]">
          <div className="flex w-full flex-1 flex-col items-center space-y-2 rounded-3xl bg-transparent p-0 pt-0 md:bg-foreground md:p-6 md:pt-3">
            <h2 className="w-full px-2 pb-6 pt-10 text-start text-[16px] font-semibold dark:text-[#6A6A6A] md:px-0">
              Todos os veículos - {vehiclesResponse.totalItems}
            </h2>
            <div
              className={`grid w-full grid-cols-1 gap-3 px-2 sm:grid-cols-2 md:grid-cols-3 md:px-0 lg:grid-cols-5`}
            >
              {vehicles.map((vehicle) =>
                isSmall ? (
                  <HorizontalCarCard vehicle={vehicle} key={vehicle.id} />
                ) : (
                  <VerticalCarCard vehicle={vehicle} key={vehicle.id} />
                ),
              )}
            </div>
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

export default ListVehicles;
