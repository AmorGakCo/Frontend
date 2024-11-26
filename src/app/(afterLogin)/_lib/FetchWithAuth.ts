import Cookies from "js-cookie";
interface ApiFetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

/**
 * AccessToken이 포함된 fetch 요청 함수
 * @param endpoint - API 엔드포인트
 * @param options - fetch 옵션
 * @returns API 응답의 JSON 데이터
 */
export const fetchWithAuth = async <T = any>(endpoint: string, options: ApiFetchOptions = {}): Promise<T> => {
  const accessToken = Cookies.get('accessToken');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...options.headers,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_LOCATION}/api${endpoint}`, {
    ...options,
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.statusText}`);
  }
  const result = await response.json();
  return result;
};