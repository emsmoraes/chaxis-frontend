import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import React from "react";
import { LuMenu } from "react-icons/lu";

function MenuSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-transparent px-[10px] pr-0 hover:bg-transparent">
          <LuMenu size={21} className="text-muted-foreground" />
        </Button>
      </SheetTrigger>

      <SheetContent>Contúdo do sheet</SheetContent>
    </Sheet>
  );
}

export default MenuSheet;
