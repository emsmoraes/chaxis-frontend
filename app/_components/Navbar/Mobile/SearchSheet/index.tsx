import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import React from "react";
import { LuSearch } from "react-icons/lu";
import FiltersSheet from "../FiltersSheet";

function SearchSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-transparent px-[10px] hover:bg-transparent">
          <LuSearch size={21} className="text-muted-foreground" />
        </Button>
      </SheetTrigger>

      <SheetContent className="min-h-[500px] rounded-t-[24px]" side={"bottom"}>
        Filtros:
        <FiltersSheet />
      </SheetContent>
    </Sheet>
  );
}

export default SearchSheet;
