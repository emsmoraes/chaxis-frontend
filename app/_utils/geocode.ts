const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export const getAddressFromCoords = async (
  latitude: number,
  longitude: number,
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API key is missing");
  }

  const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data.status === "OK" && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      throw new Error("No address found for the provided coordinates");
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Unknown address";
  }
};
