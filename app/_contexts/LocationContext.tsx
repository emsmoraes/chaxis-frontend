"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LocationContextProps {
  location: {
    latitude: number | null;
    longitude: number | null;
  };
  setLocation: (coords: { latitude: number; longitude: number }) => void;
}

const LocationContext = createContext<LocationContextProps | undefined>(
  undefined,
);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  const updateLocation = (coords: { latitude: number; longitude: number }) => {
    setLocation(coords);
  };

  return (
    <LocationContext.Provider value={{ location, setLocation: updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextProps => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
