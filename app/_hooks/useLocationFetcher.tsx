import { useCallback, useEffect } from "react";
import { useLocationStore } from "../_stores/locationStore";
import { getAddressFromCoords } from "../_utils/geocode";

const parseAddress = (address: string) => {
  const parts = address.split(", ");
  return {
    street: parts[0] || null,
    city: parts[1] || null,
    state: parts[2] || null,
    postalCode: parts[3] || null,
    country: parts[4] || null,
  };
};

export const useLocationFetcher = () => {
  const { location, setLocation, loadLocationFromStorage } = useLocationStore();

  const fetchLocation = useCallback(async () => {
    if (!location.latitude || !location.longitude) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            if (
              !location.latitude ||
              !location.longitude ||
              location.latitude !== latitude ||
              location.longitude !== longitude
            ) {
              try {
                const address = await getAddressFromCoords(latitude, longitude);
                const addressParts = parseAddress(address);

                setLocation({
                  latitude,
                  longitude,
                  address: addressParts,
                });
              } catch (error) {
                console.error("Erro ao obter o endereço:", error);
              }
            }
          },
          (error) => {
            console.error("Erro ao obter a localização", error);
          },
        );
      }
    }
  }, [location.latitude, location.longitude, setLocation]);

  useEffect(() => {
    loadLocationFromStorage();
    fetchLocation();
  }, [fetchLocation, loadLocationFromStorage]);

  return {
    fetchLocation,
    location,
  };
};
