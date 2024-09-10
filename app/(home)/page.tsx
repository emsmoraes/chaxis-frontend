"use client";
import HandleTheme from "../_components/HandleTheme";
import { Button } from "../_components/ui/button";
import { useLocation } from "../_contexts/LocationContext";
import useGeolocation from "../_hooks/useGeolocation";

export default function Home() {
  useGeolocation();
  const { location } = useLocation();

  return (
    <div>
      <HandleTheme />
      <Button>Botão inicial</Button>
      {location && (
        <p>
          {location.latitude}/{location.longitude}
        </p>
      )}
    </div>
  );
}
