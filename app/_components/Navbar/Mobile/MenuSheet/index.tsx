import { Button } from "@/app/_components/ui/button";
import { Separator } from "@/app/_components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import React from "react";
import { LuMenu } from "react-icons/lu";
import { links } from "../../NavRoutes";
import NavLink from "../NavLink";

function MenuSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-transparent px-[10px] pr-0 hover:bg-transparent">
          <LuMenu size={21} className="text-muted-foreground" />
        </Button>
      </SheetTrigger>

      <SheetContent className="px-0">
        <h3 className="px-3">Menu</h3>
        <Separator className="my-3 bg-primary/10" />
        <div className="flex flex-col">
          {links.map((link, index) => (
            <NavLink link={link} key={index} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MenuSheet;
