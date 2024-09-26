"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import React, { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import FiltersSheet from "../FiltersSheet";
import { z } from "zod";
import { IFilters } from "@/app/_components/VehiclesFilter";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { useLocationFetcher } from "@/app/_hooks/useLocationFetcher";

const formSchema = z.object({
  search: z.string().trim().optional(),
});

const getLastItemAfterHyphen = (state: string): string => {
  const parts = state.split("-");
  return parts.length > 1 ? parts[parts.length - 1].trim() : "";
};

interface SearchSheetProps {
  defaultValues: z.infer<typeof formSchema>;
  setFilters: React.Dispatch<React.SetStateAction<IFilters | null>>;
  filters: IFilters | null;
}

function SearchSheet({ defaultValues, filters, setFilters }: SearchSheetProps) {
  const { location } = useLocationFetcher();
  const [defaultState, setDefaultState] = useState<undefined | string>(
    getLastItemAfterHyphen(location.address.state ?? ""),
  );
  const [open, setOpen] = useState(false);
  const [openSheetSearch, setOpenSheetSearch] = useState(false);

  useEffect(() => {
    setDefaultState(getLastItemAfterHyphen(location.address.state ?? ""));
  }, [location]);

  const onApplyFilters = (filters: IFilters) => {
    setFilters(filters);
    setOpen(false);
  };

  const onClearFilters = () => {
    setFilters(null);
    setDefaultState(undefined);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

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

    if (queryParams.length !== 0) {
      router.push(`/vehicles${queryString}`);
      setOpenSheetSearch(false);
    }
  };

  return (
    <Sheet onOpenChange={setOpenSheetSearch} open={openSheetSearch}>
      <SheetTrigger asChild>
        <Button className="bg-transparent px-[10px] hover:bg-transparent">
          <LuSearch size={21} className="text-muted-foreground" />
        </Button>
      </SheetTrigger>

      <SheetContent
        className="min-h-[500px] rounded-t-[24px] bg-input p-4"
        side={"bottom"}
      >
        <SheetTitle className="pl-2 font-medium text-font-primary">
          Pesquisar
        </SheetTitle>
        <Form {...form}>
          <form
            className="mt-2 flex w-full items-center gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormControl className="w-full">
                    <Input
                      placeholder="Pesquise um modelo de carro..."
                      className="w-full rounded-[24px] py-5 text-[15px] font-medium"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FiltersSheet
              defaultState={defaultState}
              filters={filters}
              onApplyFilters={onApplyFilters}
              onClearFilters={onClearFilters}
              open={open}
              setOpen={setOpen}
            />
            <Button
              className="h-[35px] w-[35px] rounded-[24px] p-0"
              type="submit"
            >
              <LuSearch size={21} className="text-background" />
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default SearchSheet;
