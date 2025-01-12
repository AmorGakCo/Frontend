import { fetchWithAuth } from '@/app/(afterLogin)/_lib/FetchWithAuth';
import { groupPost } from '@/app/_types/Api';

export async function fetchGroupRegister(data: groupPost) {
  try {
    console.log(data);
    const response = await fetchWithAuth(
      `/groups`,
      {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        cache: "no-cache",
      },
    );
    const result = await response;
    if (result.status === 'success') {
      alert('그룹이 등록되었습니다.');
      
    } else {
      console.error('Error:', result.message);
      alert(result.message);
    }

    return result.data.groupId;
  } catch (error) {
    console.error('Error submitting the form:', error);
  }
}
