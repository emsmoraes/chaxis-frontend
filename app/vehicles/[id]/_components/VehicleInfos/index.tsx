import { Separator } from "@/app/_components/ui/separator";
import { Vehicle } from "@/app/_models/vehicle.model";
import React from "react";
import { BsFuelPump } from "react-icons/bs";
import { GiCarDoor } from "react-icons/gi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoCarOutline } from "react-icons/io5";
import { MdOutlinePropaneTank } from "react-icons/md";
import { PiCarProfile, PiEngineBold, PiSteeringWheel } from "react-icons/pi";
import { PiKeyboard } from "react-icons/pi";
import { TbArrowsDownUp, TbColorPicker } from "react-icons/tb";
interface VehicleInfosProps {
  vehicle: Vehicle;
}

function VehicleInfos({ vehicle }: VehicleInfosProps) {
  return (
    <div className="h-full w-full rounded-3xl bg-foreground p-4 md:p-14">
      <h2 className="text-[15px] text-font-primary/80">
        Informações do veículo
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-4 gap-x-7 gap-y-9 md:grid-cols-4 md:gap-x-4">
        <div>
          <span className="flex items-center gap-1 text-[15px] text-font-primary/60">
            <HiOutlineLocationMarker />
            Cidade
          </span>
          <span className="block text-base font-semibold text-font-primary md:text-[17px]">
            {vehicle.store?.city}, {vehicle.store?.state}
          </span>
        </div>
        <div>
          <span className="flex items-center gap-1 text-[15px] text-font-primary/60">
            <IoCarOutline />
            Tipo de veículo
          </span>
          <span className="block text-base font-semibold text-font-primary md:text-[17px]">
            {vehicle.vehicleType?.name}
          </span>
        </div>
        <div>
          <span className="flex items-center gap-1 text-[15px] text-font-primary/60">
            <PiEngineBold />
            Potência
          </span>
          <span className="block text-base font-semibold text-font-primary md:text-[17px]">
            {vehicle.enginePower}
          </span>
        </div>
        <div>
          <span className="flex items-center gap-1 text-[15px] text-font-primary/60">
            <PiKeyboard />
            Final da placa
          </span>
          <span className="block text-base font-semibold text-font-primary md:text-[17px]">
            {vehicle.licensePlateEnd}
          </span>
        </div>
        <div>
          <span className="flex items-center gap-1 text-[15px] text-font-primary/60">
            <TbArrowsDownUp />
            Aceita troca
          </span>
          <span className="block text-base font-semibold text-font-primary md:text-[17px]">
            {vehicle.acceptsTrade ? "Sim" : "Não"}
          </span>
        </div>
        <div>
          <span className="flex items-center gap-1 text-[15px] text-font-primary/60">
            <PiCarProfile />
            Tipo de carroceria
          </span>
          <span className="block text-base font-semibold text-font-primary md:text-[17px]">
            {vehicle.bodyType?.name}
          </span>
        </div>
        <div>
          <span className="flex items-center gap-1 text-[15px] text-font-primary/60">
            <PiSteeringWheel />
            Direção
          </span>

          <span className="block text-base font-semibold text-font-primary md:text-[17px]">
            {vehicle.steeringType && vehicle.steeringType}
          </span>
        </div>
        <div>
          <span className="flex items-center gap-1 text-[15px] text-font-primary/60">
            <BsFuelPump />
            Combustível
          </span>

          <span className="block text-base font-semibold text-font-primary md:text-[17px]">
            {vehicle.fuelType}
          </span>
        </div>
        <div>
          <span className="flex items-center gap-1 text-[15px] text-font-primary/60">
            <TbColorPicker />
            Cor
          </span>
          <span className="block text-base font-semibold text-font-primary md:text-[17px]">
            {vehicle.color}
          </span>
        </div>
        <div>
          <span className="flex items-center gap-1 text-[15px] text-font-primary/60">
            <MdOutlinePropaneTank />
            Possue GNV
          </span>
          <span className="block text-base font-semibold text-font-primary md:text-[17px]">
            {vehicle.hasGnvKit && vehicle.hasGnvKit ? "Sim" : "Não"}
          </span>
        </div>
        <div>
          <span className="flex items-center gap-1 text-[15px] text-font-primary/60">
            <GiCarDoor />
            Portas
          </span>
          <span className="block text-base font-semibold text-font-primary md:text-[17px]">
            {vehicle.doors && vehicle.doors}
          </span>
        </div>
      </div>

      <Separator className="my-10 bg-font-primary/10" />

      <h2 className="text-[15px] text-font-primary/80">Itens inclusos</h2>

      <div className="mt-5 grid grid-cols-2 gap-6 gap-x-7 gap-y-9 md:grid-cols-4 md:gap-x-4">
        {vehicle.features.map((feature, index) => (
          <span
            className="block text-base font-semibold text-font-primary md:text-[17px]"
            key={feature + index}
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
}

export default VehicleInfos;
