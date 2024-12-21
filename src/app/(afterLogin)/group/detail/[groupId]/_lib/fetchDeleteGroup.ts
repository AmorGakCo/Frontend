import { fetchWithAuth } from '@/app/(afterLogin)/_lib/FetchWithAuth';

export async function fetchDeleteGroup(groupId: number) {
  try {
    const response = await fetchWithAuth(`/groups/${groupId}`, {
      method: 'DELETE',
      credentials: 'include',
      cache: 'no-cache',
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}
