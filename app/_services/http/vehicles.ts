"use server";

import { IFilters } from "@/app/_components/VehiclesFilter";
import { Vehicle } from "@/app/_models/vehicle.model";
import { revalidatePath } from "next/cache";

export interface VehiclesResponse {
  vehicles: Vehicle[];
  totalPages: number;
  totalItems: number;
}

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getVehicles(
  filters?: IFilters | null,
  searchTerm?: string | null,
  page: number = 1,
): Promise<VehiclesResponse> {
  const queryParams = new URLSearchParams();

  if (filters) {
    if (filters.city) queryParams.append("city", filters.city);
    if (filters.state) queryParams.append("state", filters.state);
    if (filters.brand) queryParams.append("brand", filters.brand);
    if (filters.model) queryParams.append("model", filters.model);

    if (filters.price) {
      if (filters.price.min !== undefined)
        queryParams.append("priceMin", filters.price.min.toString());
      if (filters.price.max !== undefined)
        queryParams.append("priceMax", filters.price.max.toString());
    }

    if (filters.mileage) {
      if (filters.mileage.min !== undefined)
        queryParams.append("mileageMin", filters.mileage.min.toString());
      if (filters.mileage.max !== undefined)
        queryParams.append("mileageMax", filters.mileage.max.toString());
    }

    if (filters.year) {
      if (filters.year.min) queryParams.append("yearMin", filters.year.min);
      if (filters.year.max) queryParams.append("yearMax", filters.year.max);
    }

    if (filters.transmissionType)
      queryParams.append("transmissionType", filters.transmissionType);
  }

  if (searchTerm) {
    queryParams.append("searchTerm", searchTerm);
  }

  queryParams.append("page", page.toString());

  const response = await fetch(`${apiUrl}/vehicles?${queryParams.toString()}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar os veículos: ${response.statusText}`);
  }

  const data: VehiclesResponse = await response.json();
  return data;
}

export async function getVehicleById(vehicleId: string): Promise<Vehicle> {
  const response = await fetch(`${apiUrl}/vehicles/${vehicleId}`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar o veículo: ${response.statusText}`);
  }

  const data: Vehicle = await response.json();
  return data;
}

export async function getRelatedVehicles(
  vehicleId: string,
  limit: number = 10,
): Promise<Vehicle[]> {
  const response = await fetch(
    `${apiUrl}/related-vehicles/${vehicleId}?limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error(
      `Erro ao buscar veículos relacionados: ${response.statusText}`,
    );
  }

  const data: Vehicle[] = await response.json();
  return data;
}

export async function createVehicle(vehicleData: FormData): Promise<Vehicle> {
  const response = await fetch(`${apiUrl}/vehicles`, {
    method: "POST",
    body: vehicleData,
  });

  if (!response.ok) {
    throw new Error(`Erro ao criar o veículo: ${response.statusText}`);
  }

  const data: Vehicle = await response.json();

  revalidatePath("/");

  return data;
}
