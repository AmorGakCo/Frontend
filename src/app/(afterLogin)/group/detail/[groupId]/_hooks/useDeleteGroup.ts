import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDeleteGroup } from '../_lib/fetchDeleteGroup';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';

export function useDeleteGroupMutation(groupId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // 그룹 탈퇴 API 요청
      return await fetchDeleteGroup(groupId); // 그룹 탈퇴 API 호출
    },
    onSuccess: (data) => {
      if (data.status === 'success') {
        window.location.href = '/group/history';
      }
    }
  });
}
