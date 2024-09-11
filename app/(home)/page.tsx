"use client";
import HomeBanner from "./_components/HomeBanner";
import { Button } from "../_components/ui/button";
import { useLocation } from "../_contexts/LocationContext";
import useGeolocation from "../_hooks/useGeolocation";
import Search from "../_components/Search";

export default function Home() {
  useGeolocation();
  const { location } = useLocation();

  return (
    <div className="w-full">
      <HomeBanner />
      <div className="flex w-full items-center justify-center">
        <div className="mt-4 min-h-[500px] w-[95%] max-w-desktop rounded-3xl bg-foreground p-6 pt-3">
          <div className="flex w-full items-center justify-center">
            <Search
              defaultValues={{
                search: "",
              }}
            />
          </div>
        </div>
      </div>

      <Button>Botão inicial</Button>
      {location && (
        <p>
          {location.latitude}/{location.longitude}
        </p>
      )}
    </div>
  );
}
