"use client";

import { Button } from "@/app/_components/ui/button";
import React from "react";

interface ContactButtonProps {
  vehicleId: string;
  contactNumber: string;
}

function ContactButton({ contactNumber, vehicleId }: ContactButtonProps) {
  function redirectToWhatsApp() {
    const url = `https://wa.me/${contactNumber}`;
    console.log(vehicleId);
    window.open(url, "_blank");
  }

  return (
    <Button onClick={redirectToWhatsApp} className="w-[80%] rounded-full">
      Entrar em contato
    </Button>
  );
}

export default ContactButton;
