import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import React from "react";
import { LuSettings2 } from "react-icons/lu";

function FiltersSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-transparent px-[10px] hover:bg-transparent">
          <LuSettings2 size={21} className="text-muted-foreground" />
        </Button>
      </SheetTrigger>

      <SheetContent side={"left"}>Filtros:</SheetContent>
    </Sheet>
  );
}

export default FiltersSheet;
