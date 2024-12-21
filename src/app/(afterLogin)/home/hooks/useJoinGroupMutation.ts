'use client'
import { groupModalApiData } from '@/app/_types/Api';
// import { groupModalData } from '@/app/_types/Api';
import { useMutation, useQueryClient } from  '@tanstack/react-query';
import { fetchWithAuth } from '../../_lib/FetchWithAuth';
import { fetchJoinGroup } from '../_lib/fetchJoinGroup';
export function useJoinGroupMutation(groupId: number) {
  
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:  async () => {
      return await fetchJoinGroup(groupId);
    },
    onError: (err) => {
      alert(`오류가 발생했습니다: ${err.message}`);
    },
    onSuccess: () => {
      alert('참여요청을 보냈습니다');
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupDetail', groupId] });
    }
  });
}
