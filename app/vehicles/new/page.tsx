import React from "react";
import PageClient from "./_components/PageClient";
import { indexBodyTypes } from "@/app/_services/http/bodyType";
import { indexStores } from "@/app/_services/http/store";
import { getVehicleTypes } from "@/app/_services/http/vehicleType";

async function NewVehicle() {
  const bodyTypes = await indexBodyTypes();
  const allStores = await indexStores();
  const vehicleTypes = await getVehicleTypes();

  return (
    <PageClient
      bodyTypes={bodyTypes}
      allStores={allStores}
      vehicleTypes={vehicleTypes}
    />
  );
}

export default NewVehicle;
