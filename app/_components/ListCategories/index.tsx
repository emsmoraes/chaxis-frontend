"use client";

import {
  getFamousBodyTypes,
  translateAliasToPortuguese,
} from "@/app/_services/http/bodyType";
import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { BodyType } from "@/app/_models/bodyType.model";

function ListCategories() {
  const [categories, setCategories] = useState<BodyType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getFamousBodyTypes();
      console.log(data);
      setCategories(data);
    };
    getData();
  }, []);

  return (
    <div className="flex w-full items-center gap-2 overflow-x-auto px-2 md:px-0 [&&::-webkit-scrollbar]:hidden">
      {categories.map((e) => (
        <Badge
          className="flex min-w-[90px] cursor-pointer items-center justify-center border-[2px] border-muted-foreground/30 bg-transparent py-[6px] text-[13px] font-semibold text-font-primary shadow-sm transition-all duration-300 hover:border-font-primary hover:bg-background md:min-w-[115px] md:border-[2px] md:border-transparent md:bg-muted-foreground/10 md:py-[8px] md:text-[14px]"
          key={e.id}
        >
          {translateAliasToPortuguese(e.alias)}
        </Badge>
      ))}
    </div>
  );
}

export default ListCategories;
