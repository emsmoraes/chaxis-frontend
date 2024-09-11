import Image from "next/image";
import React from "react";
import Banner from "@/app/_assets/images/banner.png";

export default function HomeBanner() {
  return (
    <div>
      <Image
        src={Banner}
        alt="Banner"
        className="max-h-[500px] w-full max-w-desktop object-cover"
      />
    </div>
  );
}
