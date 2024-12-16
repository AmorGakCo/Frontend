import { fetchWithAuth } from "@/app/(afterLogin)/_lib/FetchWithAuth";

export async function fetchLeaveGroup(groupId: number) {
  const response = await fetchWithAuth(
    `/group-participants/groups/${groupId}`,
    {
      method: 'DELETE',
      credentials: 'include',
      cache: 'no-cache',
    },
  );
  return response;
}