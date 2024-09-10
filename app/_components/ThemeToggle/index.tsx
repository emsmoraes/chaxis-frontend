"use client";
import { useTheme } from "next-themes";
import React from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { Button } from "../ui/button";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    if (isDark) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button
      onClick={toggleTheme}
      className="bg-transparent text-font-primary hover:bg-transparent"
    >
      {isDark ? <MdLightMode fontSize={25} /> : <MdDarkMode fontSize={25} />}
    </Button>
  );
}

export default ThemeToggle;
