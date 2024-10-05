import { postCurLocation,apiLocation } from "@/app/_types/Api";

export async function fetchNearGroups(apiData:postCurLocation, setGroups:React.Dispatch<React.SetStateAction<apiLocation[] | []>>) {
  try {
    const queryParams = new URLSearchParams(
      Object.entries(apiData).map(([key, value]) => [key, value.toString()])
    ).toString();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_LOCATION}/groups/locations?${queryParams}`, {
      method: "GET",
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const {data} = await response.json();  
    setGroups(data.locations);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}