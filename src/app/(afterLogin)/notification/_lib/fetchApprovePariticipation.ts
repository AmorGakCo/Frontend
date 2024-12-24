import { fetchWithAuth } from "../../_lib/FetchWithAuth";

export async function fetchApprovePariticipation(groupId:number, memberId:number) {
  const response = await fetchWithAuth(
    `/groups/${groupId}/applications/${memberId}`,
    {
      method:'POST',
      credentials: 'include',
      cache: "no-cache",
    },
  );
  return await response;
  }