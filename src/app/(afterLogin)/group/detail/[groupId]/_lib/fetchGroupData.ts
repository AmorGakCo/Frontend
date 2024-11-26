import { fetchWithAuth } from "@/app/(afterLogin)/_lib/FetchWithAuth";

export async function fetchGroupData({queryKey}:{queryKey:[string,number]}) {
  try {
    const [_,groupId] = queryKey;
    const response = await fetchWithAuth(`/groups/${groupId}/detail`, {
      method: "GET",
      cache:'no-cache',
    });
    // if (!response.ok) {
    //   throw new Error(`Error: ${response.statusText}`);
    // }
   console.log(response);
    return await response
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}