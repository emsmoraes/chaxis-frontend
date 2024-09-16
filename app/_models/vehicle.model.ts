import { Brand } from "./brand.model";
import { Store } from "./store.model";

export interface VehicleImage {
  id: string;
  extension: string;
  url: string;
  vehicleId: string;
  createdAt: string;
  updatedAt: string;
  position: number;
}

export interface Vehicle {
  id: string;
  model: string;
  code: string;
  searchTerm: string;
  version: string;
  year: string;
  mileage: number;
  transmission: string;
  fuelType: string;
  licensePlateEnd: string;
  color: string;
  price: string;
  acceptsTrade: boolean;
  features: string[];
  typeId: string;
  bodyTypeId: string;
  makeId: string;
  storeId: string;
  createdAt: string;
  updatedAt: string;
  VehicleImage: VehicleImage[];
  store: Store;
  make: Brand;
}
