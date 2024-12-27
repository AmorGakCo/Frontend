import { fetchWithAuth } from "../../_lib/FetchWithAuth";

export async function fetchDeleteNotification(notificationId:number) {
  const response = await fetchWithAuth(
    `/notifications/${notificationId} `,
    {
      method:'DELETE',
      credentials: 'include',
      cache: "no-cache",
    },
  );
  return await response;
  }