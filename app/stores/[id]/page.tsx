import { indexStoreVehicles, showStore } from "@/app/_services/http/store";
import React from "react";
import { formatPhoneNumber } from "@/app/_utils/formatPhoneNumber";
import ShareButton from "./_components/ShareButton";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import ListVehicles from "./_components/ListVehicles";

interface StoreProps {
  params: {
    id: string;
  };
}

async function Store({ params }: StoreProps) {
  const store = await showStore(params.id);
  const storeVehicles = await indexStoreVehicles(params.id, 1);
  const storeAvatar =
    store && store.file?.find((file) => file.fileType === "STORE_PHOTO")?.url;
  const storeBanner =
    store && store.file?.find((file) => file.fileType === "STORE_BANNER")?.url;
  const storeAddress =
    store &&
    `${store.address}, ${store.city} - ${store.state} ${store.postalCode}`;

  return (
    <div>
      {/* Estilização Mobile */}
      <div className="block md:hidden">
        <div
          className="relative h-[180px] max-h-[180px] w-full bg-cover"
          style={{
            backgroundImage: `url(${storeBanner})`,
            backgroundPosition: "center center",
          }}
        >
          <ShareButton storeId={store.id} />
        </div>
        <div className="px-2">
          <div className="relative z-50 my-4 flex w-full flex-col gap-4 rounded-xl bg-font-primary/5 p-4 shadow-sm">
            <div className="flex gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={storeAvatar}
                  className="h-full w-full object-cover"
                />
                <AvatarFallback>{store.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-md font-medium">{store.name}</h1>
                <p className="text-[12px] font-medium text-font-primary/60">
                  {store.description}
                </p>
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-font-primary/70">
                {storeAddress}
              </p>
              <p className="text-xs font-medium text-font-primary">
                {formatPhoneNumber(store.phone)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Estilização Desktop */}
      <div
        className="hidden h-[400px] max-h-[400px] w-full items-end bg-cover p-10 md:flex"
        style={{
          backgroundImage: `url(${storeBanner})`,
          backgroundPosition: "center center",
        }}
      >
        <div className="relative z-50 flex w-full gap-5 rounded-xl bg-card/95 p-6 shadow-sm">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={storeAvatar}
              className="h-full w-full object-cover"
            />
            <AvatarFallback>{store.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-medium">{store.name}</h1>
            <p className="text-md mb-2 font-medium text-font-primary/60">
              {store.description}
            </p>
            <p className="mb-1 text-sm font-medium text-font-primary/70">
              {storeAddress}
            </p>
            <p className="text-sm font-medium text-font-primary">
              {formatPhoneNumber(store.phone)}
            </p>
          </div>
          <ShareButton storeId={store.id} />
        </div>
      </div>

      <ListVehicles vehiclesResponse={storeVehicles} storeId={store.id} />
    </div>
  );
}

export default Store;
