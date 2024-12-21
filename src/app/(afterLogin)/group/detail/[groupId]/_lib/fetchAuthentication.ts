import { fetchWithAuth } from "@/app/(afterLogin)/_lib/FetchWithAuth";
import { getCurrentPosition } from "@/app/(afterLogin)/_lib/getCurrentPosition";

export async function fetchAuthentication(groupId: number) {
  const {currentLat,currentLon} = await getCurrentPosition();
  const location = {
    groupId: groupId,
    latitude:currentLat,
    longitude:currentLon
  }
  const response = await fetchWithAuth(
    `/group-participants/locations`,
    {
      method: 'PATCH',
      credentials: 'include',
      cache: 'no-cache',
      body: JSON.stringify(location),
    },
  );
  if (response.status === 'success') {
    alert('위치 인증이 완료되었습니다.');
  } else {
    alert(response.message);
  }
  return response.data;
}