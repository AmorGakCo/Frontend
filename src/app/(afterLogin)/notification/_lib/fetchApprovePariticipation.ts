import { fetchWithAuth } from "../../_lib/FetchWithAuth";

export async function fetchApprovePariticipation(groupId:number, memberId:number,notificationId:number) {
  const response = await fetchWithAuth(
    `/groups/${groupId}/applications/${memberId}/notifications/${notificationId}`,
    {
      method:'POST',
      credentials: 'include',
      cache: "no-cache",
    },
  );
  return await response;
  }