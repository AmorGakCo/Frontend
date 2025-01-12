import { fetchWithAuth } from '@/app/(afterLogin)/_lib/FetchWithAuth';
import { memberPatchInfo } from '@/app/_types/Api';

export async function fetchMemberInfo(data: memberPatchInfo) {
  try {
    const response = await fetchWithAuth(`/members`, {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(data),
      cache: 'no-cache',
    });
    const result = await response;
    if (result.status === 'success') {
      alert('추가정보를 등록했습니다.');
    } else {
      console.error(result.message);
      alert(result.message);
    }

    return result.data;
  } catch (error) {
    console.error('Error submitting the form:', error);
  }
}
