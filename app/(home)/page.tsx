import { getVehicles } from "../_services/http/vehicles";
import ClientPage from "./ClientPage";

export default async function Home() {
  const { vehicles } = await getVehicles();

  return (
    <div className="w-full">
      <ClientPage recentAddedVehicles={vehicles} />
    </div>
  );
}
