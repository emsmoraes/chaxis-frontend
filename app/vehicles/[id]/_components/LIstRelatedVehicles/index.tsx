"use client";

import VerticalCarCard from "@/app/_components/VerticalCarCard";
import { Vehicle } from "@/app/_models/vehicle.model";
import React from "react";

interface LIstRelatedVehiclesProps {
  relatedVehicles: Vehicle[];
}

function LIstRelatedVehicles({ relatedVehicles }: LIstRelatedVehiclesProps) {
  return (
    <div className="flex items-center gap-3 overflow-auto px-6 pb-4 [&&::-webkit-scrollbar]:hidden lg:[&&::-webkit-scrollbar]:block">
      {relatedVehicles.map((vehicle) => (
        <div className="w-[200px]" key={vehicle.id}>
          <VerticalCarCard vehicle={vehicle} />
        </div>
      ))}
    </div>
  );
}

export default LIstRelatedVehicles;
