import { fetchWithAuth } from "../../_lib/FetchWithAuth";

export async function fetchJoinGroup(groupId:number) {
  const response = await fetchWithAuth(
    `/groups/${groupId}/applications `,
    {
      method:'POST',
      credentials: 'include',
      cache: "no-cache",
    },
  );
  return await response;
  }