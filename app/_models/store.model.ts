import { File } from "./file.model";

export interface Store {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  dealershipId: string;
  createdAt: string;
  updatedAt: string;
  phone: string;
  file?: File[];
}
