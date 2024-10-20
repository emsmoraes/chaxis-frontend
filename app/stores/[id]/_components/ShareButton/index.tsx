"use client";

import { Button } from "@/app/_components/ui/button";
import React from "react";
import { FiShare2 } from "react-icons/fi";
import { toast } from "sonner";

interface ShareButtonProps {
  storeId: string;
}

function ShareButton({ storeId }: ShareButtonProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(storeId);
    toast.success("Link copiado!");
  };

  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      className="absolute bottom-4 right-4 rounded-full bg-background text-font-primary md:bg-transparent"
      onClick={() => copyToClipboard()}
    >
      <FiShare2 className="-ml-[2px] text-xl" />
    </Button>
  );
}

export default ShareButton;
