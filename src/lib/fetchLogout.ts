import { fetchWithAuth } from "@/app/(afterLogin)/_lib/FetchWithAuth"
import Cookies from "js-cookie";
export const fetchLogout = async () => {
  try {
  await fetch(`${process.env.NEXT_PUBLIC_API_LOCATION}/tokens`, {
    method: 'DELETE',
    cache: "no-cache",
    credentials:'include',
    headers: {
      Authorization: `Bearer ${Cookies.get('accessToken')}`,
    }
  })
}
catch(error) {
  throw new Error('로그아웃 실패');
}
}