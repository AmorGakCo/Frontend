'use client'
import { groupModalApiData } from '@/app/_types/Api';
// import { groupModalData } from '@/app/_types/Api';
import { useMutation, useQueryClient } from  '@tanstack/react-query';
import { fetchWithAuth } from '../../_lib/FetchWithAuth';
export async function fetchjoinGroup(groupId:number) {
const response = await fetchWithAuth(
  `/groups/${groupId}/participation`,
  {
    method:'POST',
    credentials: 'include',
    cache: "no-cache",
  },
);
return await response;
}
export function useJoinGroupMutation(groupId: number) {
  
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:  async () => {
      return await fetchjoinGroup(groupId);
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
