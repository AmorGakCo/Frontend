import { groupModalApiData } from "@/app/_types/Api";

export async function fetchGroupData(groupId: number): Promise<groupModalApiData | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_LOCATION}/groups/${groupId}/basic`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json() as groupModalApiData;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}