import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Brand } from "@/app/_models/brand.model";
import { getBrands } from "../_services/http/brand";

interface BrandStoreState {
  brands: Brand[] | null;
  loading: boolean;
  error: string | null;
  fetchBrands: () => Promise<void>;
  clearBrands: () => void;
}

export const useBrandStore = create(
  persist<BrandStoreState>(
    (set) => ({
      brands: null,
      loading: false,
      error: null,
      fetchBrands: async () => {
        set({ loading: true, error: null });
        try {
          const { brands } = await getBrands();
          set({ brands, loading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Erro ao buscar marcas",
            loading: false,
          });
        }
      },
      clearBrands: () => set({ brands: null }),
    }),
    {
      name: "brand-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
