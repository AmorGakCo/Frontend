import { fetchWithAuth } from '@/app/(afterLogin)/_lib/FetchWithAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApprovePariticipation } from '../_lib/fetchApprovePariticipation';

export function useApprovePariticipationMutation(groupId: number, memberId:number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // 그룹 탈퇴 API 요청
      return await fetchApprovePariticipation(groupId, memberId); // 그룹 탈퇴 API 호출
    },
    onSuccess: (data) => {
      if (data.status === 'success') {
        alert('참여를 승인했습니다.');
        queryClient.invalidateQueries({queryKey: ['group',groupId]});
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === 'notification',
        })
      } else {
        alert('참여 승인중 오류가 발생했습니다');
      }
    }
  });
}
