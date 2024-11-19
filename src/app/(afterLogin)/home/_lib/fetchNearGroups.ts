import { postCurLocation,apiLocation } from "@/app/_types/Api";
import { fetchWithAuth } from "../../_lib/FetchWithAuth";

export async function fetchNearGroups(apiData:postCurLocation, setGroups:React.Dispatch<React.SetStateAction<apiLocation[] | []>>) {
  try {
    const queryParams = new URLSearchParams(
      Object.entries(apiData).map(([key, value]) => [key, value.toString()])
    ).toString();
    
    const response = await fetchWithAuth(`/group-locations?${queryParams}`, {
      method: "GET",
      cache: "no-cache",
    });



    setGroups(response.data.locations);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}