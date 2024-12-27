import { fetchWithAuth } from "@/app/(afterLogin)/_lib/FetchWithAuth";
import { noticationApiType } from "@/app/_types/Api";
import { fetchWithAuthServer } from "../../_lib/FetchWithAuthServer";

export const fetchNotificationServer = async () => {
  try {
    const response = await fetchWithAuthServer(
      `/notifications?page=0`,
      { method: "GET" }
    );
    if (response.status !== "success") {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.data // 반환할 데이터
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error; // 에러를 던져서 React Query가 처리할 수 있도록 함
  }
};