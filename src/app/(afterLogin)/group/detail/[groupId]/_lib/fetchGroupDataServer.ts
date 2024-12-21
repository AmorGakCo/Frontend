import { fetchWithAuthServer } from "@/app/(afterLogin)/_lib/FetchWithAuthServer";

export async function fetchGroupDataServer({queryKey}:{queryKey:[string,number]}) {
  try {
    const [_,groupId] = queryKey;
    const response = await fetchWithAuthServer(`/groups/${groupId}/detail`, {
      method: "GET",
      cache:'no-cache',
    });

    if (response.status !== 'success') {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.data
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}