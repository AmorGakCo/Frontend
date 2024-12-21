import { fetchWithAuth } from "@/app/(afterLogin)/_lib/FetchWithAuth";

export async function fetchCurrentGroups() {
  try {
    const response = await fetchWithAuth(`/group-participants/current-history?page=0`, {
      method: "GET",
    });
    if (response.status !== 'success') {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.data;  // data 속성만 반환
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}