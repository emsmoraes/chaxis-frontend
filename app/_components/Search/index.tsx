"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LuSearch, LuSettings2 } from "react-icons/lu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useRef } from "react";
import { IFilters } from "../VehiclesFilter";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  search: z.string().trim().optional(),
});

interface SearchProps {
  defaultValues: z.infer<typeof formSchema>;
  onClickFilter: () => void;
  emphasisFilterButton: boolean;
  filters?: IFilters | null;
}

export default function Search({
  defaultValues,
  onClickFilter,
  emphasisFilterButton,
  filters = null,
}: SearchProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isFilled = (value: any) => {
      return (
        value !== null && value !== undefined && value !== "" && value !== "all"
      );
    };

    const queryParams: string[] = [];

    if (isFilled(data.search)) {
      queryParams.push(`search=${data.search}`);
    }

    if (filters) {
      if (isFilled(filters.city)) queryParams.push(`city=${filters.city}`);
      if (isFilled(filters.state)) queryParams.push(`state=${filters.state}`);
      if (isFilled(filters.brand)) queryParams.push(`brand=${filters.brand}`);

      if (isFilled(filters.price?.min))
        queryParams.push(`priceMin=${filters.price?.min}`);
      if (isFilled(filters.price?.max))
        queryParams.push(`priceMax=${filters.price?.max}`);

      if (isFilled(filters.year?.min))
        queryParams.push(`yearMin=${filters.year?.min}`);
      if (isFilled(filters.year?.max))
        queryParams.push(`yearMax=${filters.year?.max}`);

      if (isFilled(filters.mileage?.min))
        queryParams.push(`mileageMin=${filters.mileage?.min}`);
      if (isFilled(filters.mileage?.max))
        queryParams.push(`mileageMax=${filters.mileage?.max}`);

      if (isFilled(filters.transmissionType))
        queryParams.push(`transmissionType=${filters.transmissionType}`);
    }

    const queryString = `?${queryParams.join("&")}`;

    router.push(`/vehicles${queryString}`);
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full items-center gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Button
          ref={buttonRef}
          type="button"
          className={`flex h-[45px] min-w-[45px] items-center justify-center rounded-full bg-background p-0 shadow-sm ${emphasisFilterButton ? "bg-font-primary text-card hover:bg-font-primary/50" : "bg-background text-font-primary hover:bg-font-primary/40"}`}
          onClick={() => {
            if (buttonRef.current && !emphasisFilterButton) {
              buttonRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
            onClickFilter();
          }}
        >
          <LuSettings2 size={20} />
        </Button>
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="relative w-full py-4">
                  <LuSearch
                    size={21}
                    className="absolute left-4 top-1/2 -translate-y-1/2 transform text-muted-foreground"
                  />

                  <Input
                    placeholder="Pesquise um modelo de carro..."
                    className="w-full rounded-[24px] py-5 pl-12 text-[15px] font-medium"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="rounded-[24px] px-7">Buscar</Button>
      </form>
    </Form>
  );
}
