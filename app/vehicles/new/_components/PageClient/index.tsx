/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Input } from "@/app/_components/ui/input";
import { BodyType } from "@/app/_models/bodyType.model";
import { Store } from "@/app/_models/store.model";
import { useBrandStore } from "@/app/_stores/brandStore";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/app/_components/ui/button";
import { GiStarFormation } from "react-icons/gi";
import { Badge } from "@/app/_components/ui/badge";
import Image from "next/image";
import { MdUpload } from "react-icons/md";
import { createVehicle } from "@/app/_services/http/vehicles";

interface PageClientProps {
  bodyTypes: BodyType[];
  allStores: Store[];
}

const createVehicleSchema = z.object({
  model: z.string(),
  version: z.string(),
  code: z.string(),
  makeId: z.string(),
  bodyTypeId: z.string(),
  storeId: z.string(),
  year: z.string(),
  mileage: z.string(),
  transmission: z.string(),
  fuelType: z.string(),
  licensePlateEnd: z.string(),
  color: z.string(),
  price: z.string(),
  acceptsTrade: z.string(),
  features: z.string(),
});

const defaultValues = {
  model: "Modelo Exemplo",
  version: "Versão Exemplo",
  code: "CÓDIGO123",
  makeId: "",
  bodyTypeId: "",
  storeId: "",
  year: "2024",
  mileage: "0",
  transmission: "Automático",
  fuelType: "Gasolina",
  licensePlateEnd: "ABC1234",
  color: "Preto",
  price: "50000",
  acceptsTrade: "true",
  features: "",
};

export type ICreateVehicleSchema = z.infer<typeof createVehicleSchema>;

function PageClient({ bodyTypes, allStores }: PageClientProps) {
  const { brands } = useBrandStore();
  const [autoFormat, setAutoFormat] = useState(true);
  const [currentFeatures, setCurrentFeatures] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<ICreateVehicleSchema>({
    resolver: zodResolver(createVehicleSchema),
    defaultValues,
  });

  const onSubmit = async (data: ICreateVehicleSchema) => {
    const formData = new FormData();

    formData.append("model", data.model);
    formData.append("version", data.version);
    formData.append("code", data.code);
    formData.append("makeId", data.makeId);
    formData.append("bodyTypeId", data.bodyTypeId);
    formData.append("storeId", data.storeId);
    formData.append("vehicleTypeId", "588618dd-5e98-4b4a-aee8-ab8c83da48bb");
    formData.append("year", data.year);
    formData.append("mileage", data.mileage);
    formData.append("transmission", data.transmission);
    formData.append("fuelType", data.fuelType);
    formData.append("licensePlateEnd", data.licensePlateEnd);
    formData.append("color", data.color);
    formData.append("price", data.price);
    formData.append("acceptsTrade", data.acceptsTrade);

    currentFeatures.forEach((feature) => {
      formData.append("features", feature);
    });
    files.forEach((file) => {
      formData.append("images", file);
    });

    for (const [key, value] of (formData as any).entries()) {
      if (value instanceof File) {
        console.log(`${key}: ${value.name}`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    await createVehicle(formData);
  };

  const handleFeaturesInput = (value: string) => {
    if (autoFormat) {
      const regex = /[A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]*(?:\s+[a-zà-öø-ÿ]+)*/g;
      const parsedWords = value.match(regex) || [];
      return parsedWords;
    } else {
      return [value];
    }
  };

  const addFeatures = () => {
    const featureValue = form.getValues("features");
    const parsedFeatures = handleFeaturesInput(featureValue);

    setCurrentFeatures((old) => [...old, ...parsedFeatures]);
    form.setValue("features", "");
  };

  const transformObjectUrl = (file: File) => {
    return URL.createObjectURL(file);
  };

  const removeImageFromArray = (currentImage: any) => {
    setFiles(files.filter((image) => image !== currentImage));
  };

  return (
    <div>
      <Form {...form}>
        <form className="flex max-h-full w-full flex-col gap-4 px-40">
          <FormField
            control={form.control}
            name="makeId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands!.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name} ({brand.alias})
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
            name="model"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Modelo</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Insira o modelo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="version"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Versão</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Insira a versão" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Código</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Insira o código" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bodyTypeId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Carroceria</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma carroceria" />
                    </SelectTrigger>
                    <SelectContent>
                      {bodyTypes!.map((bt) => (
                        <SelectItem key={bt.id} value={bt.id}>
                          {bt.name}
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
            name="storeId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Loja</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma loja" />
                    </SelectTrigger>
                    <SelectContent>
                      {allStores!.map((store) => (
                        <SelectItem key={store.id} value={store.id}>
                          {store.name}
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
            name="year"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Ano</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Insira o ano" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mileage"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Quilometragem</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Insira a quilometragem"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transmission"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Transmissão</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Insira o tipo de transmissão"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fuelType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Combustível</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Insira o tipo de combustível"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="licensePlateEnd"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Final da Placa</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Insira o final da placa"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Cor</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Insira a cor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Insira o preço" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptsTrade"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Aceita troca</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma loja" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"true"}>Sim</SelectItem>
                      <SelectItem value={"false"}>Não</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="flex items-center gap-3">
                  <FormLabel>Características</FormLabel>
                  <Button
                    variant={autoFormat ? "default" : "ghost"}
                    size={"icon"}
                    onClick={() => setAutoFormat(!autoFormat)}
                    type="button"
                  >
                    <GiStarFormation size={25} />
                  </Button>
                </div>
                <FormControl>
                  <>
                    <Textarea
                      placeholder="Digite as características separadas por espaços."
                      {...field}
                    />
                    <Button type="button" onClick={addFeatures}>
                      Add
                    </Button>

                    <div className="flex flex-wrap">
                      {currentFeatures.map((feature) => (
                        <Badge key={feature}>{feature}</Badge>
                      ))}
                    </div>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <label className="flex w-fit cursor-pointer items-center truncate rounded-md border-2 border-solid border-primary bg-transparent px-4 py-2 text-[14px] font-semibold text-primary hover:bg-transparent">
            <input
              className="hidden"
              type="file"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  const newFiles = Array.from(e.target.files);
                  setFiles((prevFiles) => [...prevFiles, ...newFiles]);
                }
              }}
            />
            <MdUpload fontSize={20} className="mr-2" />
            Adicionar imagens
          </label>

          <div className="flex w-full flex-wrap gap-3">
            {files.map((fileImg, index) => (
              <div
                key={index}
                className="relative h-40 w-40"
                onClick={() => removeImageFromArray(fileImg)}
              >
                <Image
                  src={transformObjectUrl(fileImg)}
                  alt={fileImg.name}
                  layout="fill"
                  className="cursor-pointer rounded-lg object-cover transition-transform duration-200 hover:scale-105 hover:shadow-md"
                  priority
                />
              </div>
            ))}
          </div>

          <Button
            className="mt-3"
            onClick={() => form.handleSubmit(onSubmit)()}
          >
            Salvar
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default PageClient;
