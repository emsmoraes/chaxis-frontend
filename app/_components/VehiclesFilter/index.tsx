/* eslint-disable @typescript-eslint/no-explicit-any */
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
  transmissionType: z.string().optional(),
});

export type IFilters = z.infer<typeof filtersSchema>;

interface VehiclesFilterProps {
  defaultValues?: IFilters;
  onApplyFilters: (filters: IFilters) => void;
  onClearFilters: () => void;
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

function VehiclesFilter({
  defaultValues,
  onApplyFilters,
  onClearFilters,
}: VehiclesFilterProps) {
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

  const form = useForm<IFilters>({
    resolver: zodResolver(filtersSchema),
    defaultValues,
  });

  const onSubmit = (data: IFilters) => {
    const transformedData = Object.entries(data).reduce((acc, [key, value]) => {
      const typedKey = key as keyof IFilters;

      if (
        typeof value === "string" &&
        (value.toLowerCase() === "all" || value.toLowerCase() === "todas")
      ) {
        acc[typedKey] = "";
      } else if (typeof value === "object" && value !== null) {
        acc[typedKey] = Object.entries(value).reduce(
          (subAcc, [subKey, subValue]) => {
            (subAcc as any)[subKey] = subValue === "all" ? "" : subValue;
            return subAcc;
          },
          {} as typeof value,
        );
      } else {
        acc[typedKey] = value;
      }

      return acc;
    }, {} as IFilters);

    console.log(transformedData);
    onApplyFilters(transformedData);
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

  const handleClearFilters = () => {
    form.reset({
      state: "",
      city: undefined,
      brand: undefined,
      price: {
        min: undefined,
        max: undefined,
      },
      mileage: {
        min: undefined,
        max: undefined,
      },
      year: {
        min: undefined,
        max: undefined,
      },
      transmissionType: "all",
    });
    setUf("");
    setCities([]);
    setSearchCities("");
    setSearchBrands("");
    setSelectedTransmission("all");

    onClearFilters();
  };

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  useEffect(() => {
    if (defaultValues) {
      const fieldsToUpdate: { [key: string]: (value: any) => void } = {
        city: (value: string) => form.setValue("city", value),
        state: (value: string) => {
          setUf(value);
          form.setValue("state", value);
        },
        transmissionType: (value: string) => setSelectedTransmission(value),
        price: (value: any) => form.setValue("price", value),
        mileage: (value: any) => form.setValue("mileage", value),
        year: (value: any) => form.setValue("year", value),
        brand: (value: string) => form.setValue("brand", value),
      };

      (Object.keys(fieldsToUpdate) as (keyof any)[]).forEach((key) => {
        if (defaultValues[key]) {
          fieldsToUpdate[key]?.(defaultValues[key] as string);
        }
      });
    }
  }, [defaultValues, form, setUf, setSelectedTransmission]);

  return (
    <Form {...form}>
      <form className="flex max-h-full w-full flex-col items-center gap-4">
        <div className="flex flex-1 flex-col gap-3 overflow-y-scroll pb-10 lg:pr-2 [&&::-webkit-scrollbar]:hidden md:[&&::-webkit-scrollbar]:block">
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
                    disabled={uf === "all" || uf === "" || cities.length < 0}
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
                type="button"
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
                  type="button"
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
            type="button"
            onClick={handleClearFilters}
            className="w-1/2 rounded-[24px] px-3 py-4 text-[13px] font-medium"
            variant={"outline"}
          >
            Limpar
          </Button>
          <Button
            type="button"
            onClick={() => form.handleSubmit(onSubmit)()}
            className="w-1/2 rounded-[24px] px-3 py-4 text-[13px] font-medium"
          >
            Aplicar
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default memo(VehiclesFilter);
