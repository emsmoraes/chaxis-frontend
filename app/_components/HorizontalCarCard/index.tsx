/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useCallback, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.css";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { LuMapPin } from "react-icons/lu";
import { Vehicle } from "@/app/_models/vehicle.model";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import useVehicleStore from "@/app/_stores/vehicleStore";
import ClientRedirect from "../ClientRedirect";
import Link from "next/link";
import { formatCurrency } from "@/app/_utils/formatCurrency";

interface HorizontalCarCardProps {
  vehicle: Vehicle;
}

function HorizontalCarCard({ vehicle }: HorizontalCarCardProps) {
  const sliderRef = useRef(null);
  const addVehicle = useVehicleStore((state) => state.addVehicle);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    (sliderRef as any).current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    (sliderRef as any).current.swiper.slideNext();
  }, []);

  const addVehicleToStore = () => {
    addVehicle(vehicle);
  };

  return (
    <Card className="flex w-full flex-row rounded-3xl dark:bg-[#161616]">
      <CardHeader className="relative h-[170px] w-[50%] overflow-hidden rounded-bl-3xl rounded-tl-3xl p-0">
        <ClientRedirect to={`/vehicles/${vehicle.id}`}>
          <Swiper
            ref={sliderRef}
            spaceBetween={0}
            slidesPerView={1}
            className="h-full w-full"
            modules={[Pagination]}
            pagination={{
              clickable: true,
              bulletActiveClass: `${styles.bulletActive}`,
              renderBullet: (index, className) =>
                `<span class="${className} ${styles.customBullet}"></span>`,
            }}
          >
            {vehicle.VehicleImage.map((image, index) => (
              <SwiperSlide key={image.id}>
                <Link href={`/vehicles/${vehicle.id}`}>
                  <Image
                    src={image.url}
                    alt={`imagem ${index} do veìculo`}
                    fill
                    className="transform object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </ClientRedirect>

        <button
          onClick={handlePrev}
          className={`${styles.customPrev} swiper-button-prev invisible transition-all duration-100 group-hover:visible`}
        >
          <SlArrowLeft size={5} />
        </button>
        <button
          onClick={handleNext}
          className={`${styles.customNext} swiper-button-next invisible transition-all duration-100 group-hover:visible`}
        >
          <SlArrowRight size={5} />
        </button>
      </CardHeader>

      <Link href={`/vehicles/${vehicle.id}`} className="w-full">
        <CardContent
          className="flex w-full flex-col justify-between p-3"
          onClick={addVehicleToStore}
        >
          <div className="w-full">
            <CardTitle className="text-sm font-bold text-font-primary">
              {vehicle.make.name} {vehicle.model}
            </CardTitle>
            <h2 className="text-[13px] font-medium text-font-primary/80">
              {vehicle.version}
            </h2>
            <div className="flex items-center gap-1">
              <h3 className="text-[11px] font-medium text-font-primary/60">
                Ano {vehicle.year}
              </h3>
              <div className="h-1 w-1 rounded-full bg-font-primary/60" />
              <h3 className="text-[11px] font-medium text-font-primary/60">
                {vehicle.mileage} km
              </h3>
            </div>
          </div>

          <div className="mt-2 flex w-full items-center justify-between">
            <div className="w-full">
              <h2 className="overflow-hidden text-ellipsis text-nowrap text-base font-bold text-font-primary">
                <span className="text-[14px]">R$</span>{" "}
                {formatCurrency(Number(vehicle.price))}
              </h2>
              <div className="flex gap-1">
                <LuMapPin className="text-font-primary/60" />
                <h2 className="text-[11px]">
                  {vehicle.store!.city}, {vehicle.store!.state}
                </h2>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default memo(HorizontalCarCard);
