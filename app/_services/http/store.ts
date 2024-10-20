import { Store } from "@/app/_models/store.model";
import { Vehicle } from "@/app/_models/vehicle.model";

export type StoreResponse = Store;

export type StoreVehiclesResponse = {
  vehicles: Vehicle[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
};

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function showStore(id: string): Promise<StoreResponse> {
  const response = await fetch(`${apiUrl}/stores/${id}`);

  if (!response.ok) {
    throw new Error(
      `Error fetching store with id ${id}: ${response.statusText}`,
    );
  }

  const store: StoreResponse = await response.json();
  return store;
}

export async function indexStoreVehicles(
  storeId: string,
  page?: number,
): Promise<StoreVehiclesResponse> {
  const response = await fetch(
    `${apiUrl}/store-vehicles?storeId=${storeId}&page=${page}`,
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching vehicles for store with id ${storeId}: ${response.statusText}`,
    );
  }

  const storeVehicles: StoreVehiclesResponse = await response.json();
  return storeVehicles;
}
