import { groupModalApiData } from "@/app/_types/Api";
import { fetchWithAuth } from "../../_lib/FetchWithAuth";

export async function fetchGroupData(groupId: number): Promise<groupModalApiData | undefined> {
  try {
    const response = await fetchWithAuth(`/groups/${groupId}/basic`, {
      method: "GET",
      cache: "no-cache",
    })
    return await response.data as groupModalApiData;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}