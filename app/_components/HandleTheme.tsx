"use client";
import React from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

function HandleTheme() {
  const { setTheme } = useTheme();

  return (
    <div className="space-x-2">
      <Button
        onClick={() => {
          setTheme("light");
        }}
      >
        Ligth
      </Button>
      <Button
        onClick={() => {
          setTheme("dark");
        }}
      >
        Dark
      </Button>
    </div>
  );
}

export default HandleTheme;
