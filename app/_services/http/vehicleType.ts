interface VehicleType {
  id: string;
  name: string;
  alias: string;
}

export type VehicleTypeResponse = VehicleType[];

export async function getVehicleTypes(): Promise<VehicleTypeResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${apiUrl}/vehicle-type`);

  if (!response.ok) {
    throw new Error(
      `Erro ao buscar as tipos de veiculo: ${response.statusText}`,
    );
  }

  const data: VehicleTypeResponse = await response.json();

  return data;
}
