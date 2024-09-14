import { Vehicle } from "@/app/_models/vehicle.model";

export interface VehiclesResponse {
  vehicles: Vehicle[];
}

export async function getVehicles(): Promise<VehiclesResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${apiUrl}/vehicles`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar os veículos: ${response.statusText}`);
  }

  const data: VehiclesResponse = await response.json();
  return data;
}
