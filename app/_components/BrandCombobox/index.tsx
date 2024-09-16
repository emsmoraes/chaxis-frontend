import React, { useState, useCallback } from "react";
import { cn } from "@/app/_lib/utils";
import { Button } from "../ui/button";
import { FormControl } from "../ui/form";
import { IoMdCheckmark } from "react-icons/io";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface BrandComboboxProps {
  brands: { id: string; name: string; code: string; alias: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  onBrandChange: (name: string) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  disabled: boolean;
}

function BrandCombobox({
  brands,
  field,
  onBrandChange,
  search,
  setSearch,
  disabled,
}: BrandComboboxProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback(
    (name: string) => {
      if (name === field.value) {
        onBrandChange("");
      } else {
        onBrandChange(name);
      }
      setOpen(false);
    },
    [field.value, onBrandChange],
  );

  const allBrandsOption = { id: "all", name: "Todas", code: "", alias: "" };
  const filteredBrands = [allBrandsOption, ...brands].filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedBrands = field.value
    ? [
        filteredBrands.find((brand) => brand.name === field.value)!,
        ...filteredBrands.filter((brand) => brand.name !== field.value),
      ]
    : filteredBrands;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl className="w-full">
          <Button
            disabled={disabled}
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between rounded-[24px] px-3 py-4 text-[13px] font-medium text-font-primary hover:bg-background",
              !field.value && "text-font-primary",
            )}
          >
            {field.value
              ? filteredBrands.find((brand) => brand.name === field.value)?.name
              : "Selecione uma marca"}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Buscar marca..."
            className="h-9"
            value={search}
            onValueChange={(value) => setSearch(value)}
          />
          <CommandList>
            <CommandEmpty>Sem resultados para {search}</CommandEmpty>
            <CommandGroup>
              {sortedBrands.map((brand) => (
                <CommandItem
                  key={brand.id}
                  onSelect={() => handleSelect(brand.name)}
                  className="text-font-primary"
                >
                  {brand.name}
                  <IoMdCheckmark
                    className={cn(
                      "ml-auto h-4 w-4",
                      brand.name === field.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default BrandCombobox;
