"use client";

import { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";

type MaskedInputProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  placeholder: string;
  mask: string;
};

const applyMask = (value: string, mask: string): string => {
  let i = 0;
  return mask.replace(/x/g, () => (i < value.length ? value[i++] : ""));
};

export default function MaskedInput({
  form,
  name,
  label,
  placeholder,
  mask,
}: MaskedInputProps) {
  const [value, setValue] = useState("");

  const handleChange = (
    realChangeFn: (value: string) => void,
    newValue: string,
  ) => {
    realChangeFn(newValue);
  };

  const formData = form.watch(name);

  useEffect(() => {
    const formattedValue = formData ? `${Number(formData)}` : "";
    if (formattedValue !== value) {
      setValue(formattedValue);
    }
  }, [formData, value]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
          const inputValue = ev.target.value.replace(/\D/g, "");
          const maskedValue = applyMask(inputValue, mask);
          setValue(maskedValue);
          handleChange(field.onChange, maskedValue);
        };

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input
                className="w-full rounded-[24px] px-4 py-5 text-[12px] font-medium"
                placeholder={placeholder}
                type="text"
                {...field}
                onChange={handleInputChange}
                value={value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
