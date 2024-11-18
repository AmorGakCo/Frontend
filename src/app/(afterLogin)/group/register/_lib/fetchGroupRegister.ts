import { groupPost } from '@/app/_types/Api';
import { useRouter } from 'next/router';

export async function fetchGroupRegister(data: groupPost) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_LOCATION!}/groups`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
        cache: "no-cache",
      },
    );
    const result = await response.json();
    if (response.ok) {
      alert('그룹이 등록되었습니다.');
      
    } else {
      console.error('Error:', result.message);
    }

    return result.data.id;
  } catch (error) {
    console.error('Error submitting the form:', error);
  }
}
