import { Brand } from "@/app/_models/brand.model";

export type BrandsResponse = Brand[];

export async function getBrands(): Promise<BrandsResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${apiUrl}/brands`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar as marcas: ${response.statusText}`);
  }

  const data: BrandsResponse = await response.json();

  return data;
}
