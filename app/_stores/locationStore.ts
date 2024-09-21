import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LocationStoreState {
  location: {
    latitude: number | null;
    longitude: number | null;
    address: {
      street: string | null;
      city: string | null;
      state: string | null;
      postalCode: string | null;
      country: string | null;
    };
  };
  setLocation: (coords: {
    latitude: number;
    longitude: number;
    address: {
      street: string | null;
      city: string | null;
      state: string | null;
      postalCode: string | null;
      country: string | null;
    };
  }) => void;
  clearLocation: () => void;
  loadLocationFromStorage: () => void;
}

export const useLocationStore = create<LocationStoreState>()(
  persist(
    (set) => ({
      location: {
        latitude: null,
        longitude: null,
        address: {
          street: null,
          city: null,
          state: null,
          postalCode: null,
          country: null,
        },
      },
      setLocation: ({ latitude, longitude, address }) => {
        set({ location: { latitude, longitude, address } });
      },
      clearLocation: () =>
        set({
          location: {
            latitude: null,
            longitude: null,
            address: {
              street: null,
              city: null,
              state: null,
              postalCode: null,
              country: null,
            },
          },
        }),
      loadLocationFromStorage: () => {
        const savedLocation = localStorage.getItem("location");
        if (savedLocation) {
          set({ location: JSON.parse(savedLocation) });
        }
      },
    }),
    {
      name: "location-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        location: state.location,
      }),
    },
  ),
);
