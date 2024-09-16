"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { states } from "./utils/states";
import CitiesCombobox from "../CitiesCombobox";
import { useBrandStore } from "@/app/_stores/brandStore";
import BrandCombobox from "../BrandCombobox";
import MoneyInput from "../form/MoneyInput";
import { Button } from "../ui/button";
import KilometersInput from "../form/KilometersInput";
import MaskedInput from "../form/MaskedInput";
import { transmissions } from "@/app/_models/transmitions.model";

const filtersSchema = z.object({
  city: z.string().optional(),
  state: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  price: z
    .object({
      min: z.number().min(0).optional(),
      max: z.number().optional(),
    })
    .optional(),
  mileage: z
    .object({
      min: z.number().min(0).optional(),
      max: z.number().optional(),
    })
    .optional(),
  year: z
    .object({
      min: z.string().optional(),
      max: z.string().optional(),
    })
    .optional(),
  manufacturingYear: z
    .object({
      min: z.number().min(1900).optional(),
      max: z.number().optional(),
    })
    .optional(),
  transmissionType: z.string().optional(),
});

interface VehiclesFilterProps {
  defaultValues?: z.infer<typeof filtersSchema>;
}

const getUfCities = async (uf: string) => {
  try {
    const response = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

function VehiclesFilter({ defaultValues }: VehiclesFilterProps) {
  const [uf, setUf] = useState("all");
  const [cities, setCities] = useState([]);
  const [searchCities, setSearchCities] = useState("");
  const [searchBrands, setSearchBrands] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("all");

  const { brands, fetchBrands, loading } = useBrandStore();

  useEffect(() => {
    if (!brands) {
      fetchBrands();
    }
  }, [brands, fetchBrands]);

  const form = useForm<z.infer<typeof filtersSchema>>({
    resolver: zodResolver(filtersSchema),
    defaultValues,
  });

  const onSubmit = (data: z.infer<typeof filtersSchema>) => {
    console.log(data);
  };

  const handleUfChange = (value: string) => {
    form.setValue("city", undefined);
    setUf(value);
  };

  const fetchCities = useCallback(async () => {
    if (uf !== "all") {
      const fetchedCities = await getUfCities(uf);
      setCities(fetchedCities);
    }
  }, [uf]);

  const handleChangeTransmission = (transmission: string) => {
    if (selectedTransmission === transmission) {
      setSelectedTransmission("all");
    }

    setSelectedTransmission(transmission);
    form.setValue("transmissionType", transmission);
  };

  const isTransmissionSelected = useCallback(
    (transmission: string) => {
      return transmission === selectedTransmission ? true : false;
    },
    [selectedTransmission],
  );

  const selectedTransmissionStyle = (selected: boolean) => {
    return selected
      ? "shadow-md w-fit rounded-[24px] px-3 py-4 text-[13px] capitalize"
      : "bg-background text-font-primary shadow-md w-fit rounded-[24px] px-3 py-4 text-[13px] capitalize hover:bg-font-primary/10";
  };

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  return (
    <Form {...form}>
      <form
        className="flex max-h-full w-full flex-col items-center gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-1 flex-col gap-3 overflow-y-scroll pb-10 lg:pr-2">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    defaultValue="all"
                    onValueChange={(e) => {
                      handleUfChange(e);
                      field.onChange(e);
                    }}
                  >
                    <SelectTrigger className="w-full rounded-[24px] px-3 py-4 text-[13px] font-medium">
                      <SelectValue placeholder="Selecione um estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os estados</SelectItem>
                      {states.map((state) => (
                        <SelectItem key={state.id} value={state.sigla}>
                          {state.nome} ({state.sigla})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <CitiesCombobox
                    cities={cities}
                    field={field}
                    search={searchCities}
                    setSearch={setSearchCities}
                    disabled={uf === "all" || cities.length < 0}
                    onCityChange={(value) => form.setValue("city", value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <BrandCombobox
                    field={field}
                    search={searchBrands}
                    setSearch={setSearchBrands}
                    disabled={loading}
                    onBrandChange={(value) => form.setValue("brand", value)}
                    brands={brands ?? []}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <>
            <FormLabel className="w-full text-start">Preço</FormLabel>
            <div className="flex items-center gap-2">
              <MoneyInput
                form={form}
                name="price.min"
                placeholder="Preço Min."
              />
              <MoneyInput
                form={form}
                name="price.max"
                placeholder="Preço Max."
              />
            </div>
          </>
          <>
            <FormLabel className="w-full text-start">Quilometragem</FormLabel>
            <div className="flex items-center gap-2">
              <KilometersInput
                form={form}
                name="mileage.min"
                placeholder="Km Min."
              />
              <KilometersInput
                form={form}
                name="mileage.max"
                placeholder="Km Max."
              />
            </div>
          </>
          <>
            <FormLabel className="w-full text-start">
              Ano de Fabricação
            </FormLabel>
            <div className="flex items-center gap-2">
              <MaskedInput
                form={form}
                name="year.min"
                placeholder="Ano Min."
                mask="xxxx"
              />
              <MaskedInput
                form={form}
                name="year.max"
                placeholder="Ano Max."
                mask="xxxx"
              />
            </div>
          </>
          <>
            <FormLabel className="w-full text-start">Tipo de Câmbio</FormLabel>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  handleChangeTransmission("all");
                }}
                className={selectedTransmissionStyle(
                  isTransmissionSelected("all"),
                )}
              >
                Todos
              </Button>
              {transmissions.map((transmission) => (
                <Button
                  onClick={() => handleChangeTransmission(transmission.alias)}
                  key={transmission.alias}
                  className={selectedTransmissionStyle(
                    isTransmissionSelected(transmission.alias),
                  )}
                >
                  {transmission.alias}
                </Button>
              ))}
            </div>
          </>
        </div>
        <div className="flex w-full items-center gap-2">
          <Button
            className="w-1/2 rounded-[24px] px-3 py-4 text-[13px] font-medium"
            variant={"outline"}
          >
            Limpar
          </Button>
          <Button className="w-1/2 rounded-[24px] px-3 py-4 text-[13px] font-medium">
            Aplicar
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default memo(VehiclesFilter);
