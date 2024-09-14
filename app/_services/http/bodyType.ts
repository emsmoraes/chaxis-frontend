import { BodyType } from "@/app/_models/bodyType.model";

export function translateAliasToPortuguese(alias: string): string {
  const traducaoMap: { [key: string]: string } = {
    sedan: "Sedã",
    hatchback: "Hatchback",
    suv: "SUV",
    coupe: "Coupé",
    convertible: "Conversível",
    station_wagon: "Perua",
    pickup: "Picape",
    van: "Van",
    minivan: "Minivan",
    crossover: "Crossover",
    roadster: "Roadster",
    utility: "Utilitário",
    sport: "Esportivo",
    liftback: "Liftback",
    fastback: "Fastback",
  };

  return traducaoMap[alias] || alias;
}

export async function getFamousBodyTypes(): Promise<BodyType[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const famousBodyTypes = [
    "sedan",
    "hatchback",
    "suv",
    "coupe",
    "convertible",
    "pickup",
    "van",
    "minivan",
    "sport",
  ];

  try {
    const response = await fetch(`${apiUrl}/body-types`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar os body types: ${response.statusText}`);
    }

    const bodyTypes: BodyType[] = await response.json();

    const filteredBodyTypes = bodyTypes.filter((bodyType) =>
      famousBodyTypes.includes(bodyType.alias),
    );

    return filteredBodyTypes;
  } catch (error) {
    console.error("Erro ao buscar os body types:", error);
    return [];
  }
}
