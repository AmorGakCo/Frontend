import { fetchWithAuth } from "../../_lib/FetchWithAuth";

export async function fetchRejectParticipation(groupId:number, memberId:number) {
  const response = await fetchWithAuth(
    `/groups/${groupId}/applications/${memberId}`,
    {
      method:'PATCH',
      credentials: 'include',
      cache: "no-cache",
    },
  );
  return await response;
  }