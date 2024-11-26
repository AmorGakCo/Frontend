import { fetchWithAuth } from "@/app/(afterLogin)/_lib/FetchWithAuth";

export async function fetchGroupHistory({pageParam}:{pageParam:number}) {
  try {
    const response = await fetchWithAuth(`/participants/histories?page=${pageParam}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
   
    const {data} = await response; // response.json()에서 data 추출
    return data;  // data 속성만 반환
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}