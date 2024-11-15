import {
  getRelatedVehicles,
  getVehicleById,
} from "@/app/_services/http/vehicles";
import React from "react";
import VehiclesCarousel from "./_components/VehiclesCarousel";
import BackButton from "./_components/BackButton";
import moment from "moment";
import { VehicleResume } from "./_components/VehicleResume";
import VehicleInfos from "./_components/VehicleInfos";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/app/_components/ui/separator";
import LIstRelatedVehicles from "./_components/LIstRelatedVehicles";
import ContactButton from "./_components/ContactButton";

interface VehicleProps {
  params: {
    id: string;
  };
}

async function Vehicle({ params }: VehicleProps) {
  const vehicle = await getVehicleById(params.id);
  const relatedVehicles = await getRelatedVehicles(params.id);

  return (
    <>
      <VehiclesCarousel images={vehicle.VehicleImage} />

      <div className="w-full">
        <div className="flex w-full items-center justify-center">
          <div className="mt-4 min-h-[1000px] w-full max-w-desktop gap-4 md:w-[95%]">
            <div className="flex h-fit w-full items-center justify-between">
              <div className="flex h-fit items-center gap-2">
                <BackButton />
                <h4 className="w-[80%] font-medium md:w-[100%] md:text-xl">
                  {vehicle.make.name} {vehicle.model} {vehicle.version}
                </h4>
              </div>

              <h4 className="hidden text-[13px] font-medium text-font-primary/50 md:block">
                Publicado em {moment(vehicle.createdAt).format("DD/MM/YYYY")}
              </h4>
            </div>
            <div className="p-2 md:p-0">
              <div className="mb-4 mt-6">
                <VehicleResume vehicle={vehicle} />
              </div>

              <div className="mb-4 flex flex-col items-center justify-center rounded-3xl bg-foreground p-4 md:hidden">
                <h2 className="mb-3 text-lg text-font-primary">
                  Ficou interessado?
                </h2>
                <ContactButton
                  contactNumber="31982623783"
                  vehicleId={vehicle.id}
                />
              </div>

              <div className="flex w-full flex-col gap-4 md:flex-row">
                <div className="md:w-[70%]">
                  <VehicleInfos vehicle={vehicle} />
                </div>

                <div className="md:w-[30%]">
                  <div className="hidden flex-col items-center justify-center rounded-3xl bg-foreground p-4 md:flex">
                    <h2 className="mb-3 text-lg text-font-primary">
                      Ficou interessado?
                    </h2>
                    <ContactButton
                      contactNumber="31982623783"
                      vehicleId={vehicle.id}
                    />
                  </div>

                  <div className="mt-4 flex flex-col justify-center rounded-3xl bg-foreground py-6">
                    <h2 className="px-6 text-[15px] text-font-primary/80">
                      Sobre a loja
                    </h2>

                    <div className="mt-6 flex items-center gap-3 px-6">
                      {vehicle.store && vehicle.store.file && (
                        <div
                          style={{
                            position: "relative",
                            width: "70px",
                            height: "70px",
                          }}
                        >
                          <Image
                            src={vehicle.store?.file?.[0].url ?? ""}
                            layout="fill"
                            objectFit="cover"
                            alt="teste"
                            className="rounded-xl"
                          />
                        </div>
                      )}

                      <div>
                        <h2 className="font-semibold text-font-primary">
                          {vehicle.store?.name}
                        </h2>
                        <Link
                          href={`/stores/${vehicle.store!.id}`}
                          className="text-xs text-font-primary underline"
                        >
                          Ver perfil completo
                        </Link>
                      </div>
                    </div>

                    <Separator className="my-7 bg-font-primary/10" />

                    <div className="space-y-4 px-6">
                      <div>
                        <span className="block text-[15px] text-font-primary/60">
                          Contato
                        </span>
                        <span className="block text-[17px] font-semibold text-font-primary">
                          {vehicle.store?.phone}
                        </span>
                      </div>

                      <div className="flex items-center gap-6">
                        <div>
                          <span className="block text-[15px] text-font-primary/60">
                            Membro desde
                          </span>
                          <span className="block text-[17px] font-semibold text-font-primary">
                            {vehicle.store?.createdAt
                              ? moment(vehicle.store.createdAt).format(
                                  "DD/MM/YYYY",
                                )
                              : "Data não disponível"}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[15px] text-font-primary/60">
                            Atividade
                          </span>
                          <span className="block text-[17px] font-semibold text-font-primary">
                            {vehicle.store?.publishedVehicleCount} anuncios
                            publicados
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {relatedVehicles.length > 0 && (
                <div className="mt-4 rounded-3xl bg-foreground py-6">
                  <h2 className="mb-6 px-6 text-[17px] font-semibold text-font-primary/80">
                    Veículos similares
                  </h2>
                  <LIstRelatedVehicles relatedVehicles={relatedVehicles} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Vehicle;
