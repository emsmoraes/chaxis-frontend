import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import VehiclesFilter, { IFilters } from "@/app/_components/VehiclesFilter";
import React from "react";
import { LuSettings2 } from "react-icons/lu";

interface FiltersSheetProps {
  filters: IFilters | null;
  onApplyFilters: (filters: IFilters) => void;
  onClearFilters: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

function FiltersSheet({
  filters,
  onApplyFilters,
  onClearFilters,
  open,
  setOpen,
}: FiltersSheetProps) {
  const defaultFiltersValues = filters !== null ? filters : null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-transparent px-[10px] hover:bg-transparent">
          <LuSettings2 size={21} className="text-muted-foreground" />
        </Button>
      </SheetTrigger>

      <SheetContent side={"left"} className="flex w-screen flex-col gap-2">
        <VehiclesFilter
          onApplyFilters={onApplyFilters}
          onClearFilters={onClearFilters}
          defaultValues={{
            ...defaultFiltersValues,
          }}
        />
      </SheetContent>
    </Sheet>
  );
}

export default FiltersSheet;
