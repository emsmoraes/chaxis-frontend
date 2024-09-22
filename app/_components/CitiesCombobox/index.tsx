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

interface CitiesComboboxProps {
  cities: { id: number; nome: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  onCityChange: (nome: string) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  disabled: boolean;
}

function CitiesCombobox({
  cities,
  field,
  onCityChange,
  search,
  setSearch,
  disabled,
}: CitiesComboboxProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback(
    (nome: string) => {
      if (nome === field.value) {
        onCityChange("");
      } else {
        onCityChange(nome);
      }
      setOpen(false);
    },
    [field.value, onCityChange],
  );

  const allCitiesOption = { id: -1, nome: "Todas" };
  const filteredCities = [allCitiesOption, ...cities].filter((city) =>
    city.nome.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedCities = field.value
    ? [
        ...(filteredCities.find((city) => city.nome === field.value)
          ? [filteredCities.find((city) => city.nome === field.value)!]
          : []),
        ...filteredCities.filter((city) => city.nome !== field.value),
      ]
    : filteredCities;

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
              ? filteredCities.find((city) => city.nome === field.value)?.nome
              : "Selecione uma cidade"}
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Buscar cidade..."
            className="h-9"
            value={search}
            onValueChange={(value) => setSearch(value)}
          />
          <CommandList>
            <CommandEmpty>Sem resultados para {search}</CommandEmpty>
            <CommandGroup>
              {sortedCities.map((city) => (
                <CommandItem
                  key={city.id}
                  onSelect={() => handleSelect(city.nome)}
                  className="text-font-primary"
                >
                  {city.nome}
                  <IoMdCheckmark
                    className={cn(
                      "ml-auto h-4 w-4",
                      city.nome === field.value ? "opacity-100" : "opacity-0",
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

export default CitiesCombobox;
