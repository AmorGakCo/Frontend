import { fetchWithAuth } from "@/app/(afterLogin)/_lib/FetchWithAuth";
import { getCurrentPosition } from "@/app/(afterLogin)/_lib/getCurrentPosition";

interface tardinessinfo {
  minute: number;
  groupId: number;
}
export async function fetchTardiness(tardinessinfo: tardinessinfo) {
  const response = await fetchWithAuth(
    `/group-participants/groups/${tardinessinfo.groupId}/tardiness`,
    {
      method: 'POST',
      credentials: 'include',
      cache: 'no-cache',
      body: JSON.stringify({minute:tardinessinfo.minute}),
    },
  );
  if (response.status === 'success') {
    alert('지각 요청을 보냈습니다.');
  } else {
    alert(response.message);
  }
  return response.data;
}