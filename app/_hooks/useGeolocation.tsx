"use client";
import { useEffect } from "react";
import { useLocation } from "../_contexts/LocationContext";

const useGeolocation = () => {
  const { setLocation } = useLocation();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [setLocation]);
};

export default useGeolocation;
