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

const formSchema = z.object({
  search: z.string().trim().optional(),
});

interface SearchProps {
  defaultValues: z.infer<typeof formSchema>;
  onClickFilter: () => void;
  emphasisFilterButton: boolean;
}

export default function Search({
  defaultValues,
  onClickFilter,
  emphasisFilterButton,
}: SearchProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const buttonRef = useRef<HTMLButtonElement>(null);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data.search);
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
