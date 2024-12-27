import { fetchWithAuth } from "../../_lib/FetchWithAuth";

export async function fetchRejectParticipation(groupId:number, memberId:number,notificationId:number) {
  const response = await fetchWithAuth(
    `/groups/${groupId}/applications/${memberId}/notifications/${notificationId}`,
    {
      method:'PATCH',
      credentials: 'include',
      cache: "no-cache",
    },
  );
  return await response;
  }