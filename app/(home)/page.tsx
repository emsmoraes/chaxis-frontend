"use client";

import HomeBanner from "./_components/HomeBanner";
import { Button } from "../_components/ui/button";
import Search from "../_components/Search";
import ListCategories from "../_components/ListCategories";
import { useState } from "react";

export default function Home() {
  const [isOpenFilters, setIsOpenFilters] = useState(false);

  const toggleOpenFilters = () => {
    setIsOpenFilters((oldValue) => !oldValue);
  };

  const cars = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 114, 234, 634, 45678, 435, 234,
    574, 5678,
  ];

  return (
    <div className="w-full">
      <HomeBanner />
      <div className="flex w-full items-center justify-center">
        <div className="mt-4 flex min-h-[1000px] w-full max-w-desktop gap-10 rounded-3xl bg-transparent p-0 pt-0 md:w-[95%] md:bg-foreground md:p-6 md:pt-3">
          <div
            className={`sticky top-5 h-[500px] overflow-hidden bg-red-500 transition-all duration-300 ease-in-out ${
              isOpenFilters ? "w-[300px] opacity-100" : "w-0 opacity-0"
            }`}
          >
            Abriu
          </div>
          <div className="flex w-full flex-1 flex-col items-center space-y-2">
            <div
              className={`hidden items-center justify-center md:flex ${isOpenFilters ? "w-[100%]" : "w-2/3"}`}
            >
              <Search
                onClickFilter={toggleOpenFilters}
                defaultValues={{
                  search: "",
                }}
              />
            </div>
            {!isOpenFilters && <ListCategories />}
            <div
              className={`grid w-full grid-cols-1 gap-5 ${isOpenFilters ? "md:grid-cols-3" : "md:grid-cols-4"} `}
            >
              {cars.map((car) => (
                <p className="w-full bg-slate-600" key={car}>
                  {car}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Button>Botão inicial</Button>
    </div>
  );
}
