import { fetchWithAuth } from '@/app/(afterLogin)/_lib/FetchWithAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchRejectParticipation } from '../_lib/fetchRejectParticipation';

export function useRejectPariticipationMutation(groupId: number, memberId:number, notificationId:number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // 그룹 탈퇴 API 요청
      return await fetchRejectParticipation(groupId, memberId,notificationId); // 그룹 탈퇴 API 호출
    },
    onSuccess: (data) => {
      if (data.status === 'success') {
        alert('참여를 거절했습니다.');
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'notification',
        });
      } else {
        alert('참여 거절중 오류가 발생했습니다');
      }
    }
  });
}
