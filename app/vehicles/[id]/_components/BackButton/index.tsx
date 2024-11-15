"use client";

import { Button } from "@/app/_components/ui/button";
import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Button
      onClick={handleBackClick}
      size={"icon"}
      className="items-center bg-transparent hover:bg-transparent md:items-center"
    >
      <IoArrowBackOutline size={25} className="text-font-primary" />
    </Button>
  );
}

export default BackButton;
