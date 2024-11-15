import React from "react";
import PageClient from "./_components/PageClient";
import { indexBodyTypes } from "@/app/_services/http/bodyType";
import { indexStores } from "@/app/_services/http/store";

async function NewVehicle() {
  const bodyTypes = await indexBodyTypes();
  const allStores = await indexStores();

  return <PageClient bodyTypes={bodyTypes} allStores={allStores} />;
}

export default NewVehicle;
