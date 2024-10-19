"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { VehicleImage } from "@/app/_models/vehicle.model";
import Image from "next/image";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";

interface VehiclesCarouselProps {
  images: VehicleImage[];
}

function VehiclesCarousel({ images }: VehiclesCarouselProps) {
  return (
    <Dialog>
      <div className="h-full w-full">
        <Swiper
          slidesPerView={3}
          spaceBetween={5}
          breakpoints={{
            150: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            625: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative aspect-square h-[45vh] w-full lg:h-[55vh]">
                <DialogTrigger asChild>
                  <Image
                    src={image.url}
                    alt={`Slide ${index + 1}`}
                    sizes="100%"
                    fill
                    className="object-cover shadow-md"
                  />
                </DialogTrigger>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Dialog>
  );
}

export default VehiclesCarousel;
