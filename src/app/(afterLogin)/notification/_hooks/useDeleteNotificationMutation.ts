import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDeleteNotification } from "../_lib/fetchDeleteNotification";

export function useDeleteNotificationMutation(notificationId:number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // 그룹 탈퇴 API 요청
      return await fetchDeleteNotification(notificationId); // 그룹 탈퇴 API 호출
    },
    onSuccess: (data) => {
      if (data.status === 'success') {
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'notification',
        });
      } else {
        alert('참여 거절중 오류가 발생했습니다');
      }
    }
  });
}
