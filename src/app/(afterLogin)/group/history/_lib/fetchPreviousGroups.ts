import { fetchWithAuth } from "@/app/(afterLogin)/_lib/FetchWithAuth";

export const fetchPreviousGroups = async ({
  pageParam = 0, // 기본값으로 1을 설정
}) => {
  try {
    const response = await fetchWithAuth(
      `/group-participants/past-history?page=${pageParam}`,
      { method: "GET" }
    );

    if (response.status !== "success") {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.data // 반환할 데이터
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error; // 에러를 던져서 React Query가 처리할 수 있도록 함
  }
};