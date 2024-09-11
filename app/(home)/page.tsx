"use client";
import HomeBanner from "../_components/HomeBanner";
import { Button } from "../_components/ui/button";
import { useLocation } from "../_contexts/LocationContext";
import useGeolocation from "../_hooks/useGeolocation";

export default function Home() {
  useGeolocation();
  const { location } = useLocation();

  return (
    <div>
      <HomeBanner />
      <Button>Botão inicial</Button>
      {location && (
        <p>
          {location.latitude}/{location.longitude}
        </p>
      )}
    </div>
  );
}
