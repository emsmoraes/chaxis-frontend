import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Vehicle } from "../_models/vehicle.model";

interface VehicleStore {
  vehicles: Vehicle[];
  addVehicle: (vehicle: Vehicle) => void;
  removeVehicle: (id: string) => void;
  clearVehicles: () => void;
}

const useVehicleStore = create<VehicleStore>()(
  persist(
    (set, get) => ({
      vehicles: [],

      addVehicle: (newVehicle: Vehicle) => {
        const { vehicles } = get();

        const vehicleIndex = vehicles.findIndex(
          (vehicle) => vehicle.id === newVehicle.id,
        );

        const updatedVehicles = [...vehicles];

        if (vehicleIndex !== -1) {
          updatedVehicles.splice(vehicleIndex, 1);
        }

        updatedVehicles.unshift(newVehicle);

        if (updatedVehicles.length > 7) {
          updatedVehicles.pop();
        }

        set({ vehicles: updatedVehicles });
      },

      removeVehicle: (id: string) => {
        set((state) => ({
          vehicles: state.vehicles.filter((vehicle) => vehicle.id !== id),
        }));
      },

      clearVehicles: () => set({ vehicles: [] }),
    }),
    {
      name: "recent-vehicles",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useVehicleStore;
