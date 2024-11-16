import { Vehicle } from "@/app/_models/vehicle.model";
import { formatCurrency } from "@/app/_utils/formatCurrency";
import React from "react";

interface VehicleResumeProps {
  vehicle: Vehicle;
}

function VehicleResume({ vehicle }: VehicleResumeProps) {
  return (
    <>
      <div className="block sm:hidden">
        <div className="grid grid-cols-1 items-center justify-center gap-4 rounded-3xl bg-foreground p-4 py-7">
          <VehicleResume.Item title="Modelo" value={vehicle.model} />
          <div className="grid grid-cols-2 gap-4 gap-x-7">
            <VehicleResume.Item title="Ano" value={vehicle.year} />
            <VehicleResume.Item
              title="KM"
              value={vehicle.mileage.toLocaleString("pt-BR")}
            />
            <VehicleResume.Item
              title="Transmissão"
              value={vehicle.transmission}
            />
            <VehicleResume.Item
              title="Preço"
              value={`R$ ${formatCurrency(Number(vehicle.price))}`}
            />
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="grid grid-cols-6 items-center justify-center gap-4 rounded-3xl bg-foreground p-4 py-7">
          <VehicleResume.Item title="Modelo" value={vehicle.model} />
          <VehicleResume.Item title="Versão" value={vehicle.version} />
          <VehicleResume.Item title="Ano" value={vehicle.year} />
          <VehicleResume.Item
            title="Transmissão"
            value={vehicle.transmission}
          />
          <VehicleResume.Item
            title="KM"
            value={vehicle.mileage.toLocaleString("pt-BR")}
          />
          <VehicleResume.Item
            title="Preço"
            value={`R$ ${formatCurrency(Number(vehicle.price))}`}
          />
        </div>
      </div>
    </>
  );
}

function Item({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex flex-col items-start md:items-center">
      <h4 className="font-semibold text-font-primary/60">{title}</h4>
      <h3 className="text-base font-semibold text-font-primary md:text-xl">
        {value}
      </h3>
    </div>
  );
}

VehicleResume.Item = Item;

export { VehicleResume };
