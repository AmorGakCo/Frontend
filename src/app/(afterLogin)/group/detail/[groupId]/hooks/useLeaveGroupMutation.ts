import { fetchWithAuth } from '@/app/(afterLogin)/_lib/FetchWithAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchLeaveGroup } from '../_lib/fetchLeaveGroup';

export function useLeaveGroupMutation(groupId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // 그룹 탈퇴 API 요청
      return await fetchLeaveGroup(groupId); // 그룹 탈퇴 API 호출
    },
    onSuccess: (data) => {
      if (data.status === 204) {
        queryClient.removeQueries({queryKey:['groupDetail', groupId]});
        queryClient.invalidateQueries({queryKey: ['currentGroups']});
        queryClient.invalidateQueries({queryKey: ['previousGroups']});
      }
    }
  });
}
