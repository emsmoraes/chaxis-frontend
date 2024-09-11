"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LuSearch } from "react-icons/lu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

const formSchema = z.object({
  search: z.string().trim().optional(),
});

interface SearchProps {
  defaultValues: z.infer<typeof formSchema>;
}

export default function Search({ defaultValues }: SearchProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data.search);
  };

  return (
    <Form {...form}>
      <form
        className="flex w-2/3 items-center gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="flex w-full items-center py-4">
                  <LuSearch
                    size={21}
                    className="relative left-9 text-muted-foreground"
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
