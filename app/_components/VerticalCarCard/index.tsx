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
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import styles from "./styles.module.css";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { LuMapPin } from "react-icons/lu";
import { Button } from "../ui/button";
import { BsArrowRightShort } from "react-icons/bs";
import { Vehicle } from "@/app/_models/vehicle.model";
import useVehicleStore from "@/app/_stores/vehicleStore";
import Link from "next/link";
import { formatCurrency } from "@/app/_utils/formatCurrency";

interface VerticalCarCardProps {
  vehicle: Vehicle;
}

function VerticalCarCard({ vehicle }: VerticalCarCardProps) {
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
    <Card className="group w-full cursor-pointer rounded-3xl dark:bg-[#161616]">
      <CardHeader className="relative h-[170px] w-full overflow-hidden rounded-t-3xl p-0">
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
      <Link href={`/vehicles/${vehicle.id}`}>
        <CardContent className="group p-3" onClick={addVehicleToStore}>
          <CardTitle className="text-sm font-bold text-font-primary">
            {vehicle.make.name} {vehicle.model}
          </CardTitle>
          <h2 className="group-hover:word-wrap-break-word truncate text-[13px] font-medium text-font-primary/80 group-hover:overflow-visible group-hover:whitespace-normal">
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

          <div className="mt-2 flex w-full items-center justify-between">
            <div className="w-full">
              <h2 className="overflow-hidden text-ellipsis text-nowrap text-lg font-bold text-font-primary">
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

            <Button
              size={"icon"}
              className="h-8 min-w-8 rounded-full opacity-0 transition duration-200 group-hover:opacity-100"
            >
              <BsArrowRightShort size={28} />
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default memo(VerticalCarCard);
