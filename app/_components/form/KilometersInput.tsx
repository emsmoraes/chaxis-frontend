"use client";

import { useReducer } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";

type KilometersInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  placeholder: string;
};

export default function KilometersInput({
  form,
  name,
  label,
  placeholder,
}: KilometersInputProps) {
  const initialValue = form.getValues()[name]?.toString() || "";

  const [value, setValue] = useReducer((_: string, next: string) => {
    const digits = next.replace(/\D/g, "");
    return digits ? `${Number(digits).toLocaleString("pt-BR")}` : "";
  }, initialValue);

  const handleChange = (
    realChangeFn: (value: number | undefined) => void,
    inputValue: string,
  ) => {
    const digits = inputValue.replace(/\D/g, "");
    if (!digits) {
      realChangeFn(undefined);
    } else {
      const realValue = Number(digits);
      realChangeFn(realValue);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div className="relative">
                <Input
                  className="w-full rounded-[24px] px-4 py-5 pr-12 text-[12px] font-medium"
                  placeholder={placeholder}
                  type="text"
                  {...field}
                  onChange={(ev) => {
                    setValue(ev.target.value);
                    handleChange(field.onChange, ev.target.value);
                  }}
                  value={value}
                />
                {value && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 transform text-sm text-primary">
                    KM
                  </span>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
