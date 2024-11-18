'use client'
import { groupModalApiData } from '@/app/_types/Api';
// import { groupModalData } from '@/app/_types/Api';
import { useMutation, useQueryClient } from  '@tanstack/react-query';
export async function fetchjoinGroup(groupId:number) {
const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_LOCATION!}/groups/${groupId}/participation`,
  {
    method:'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    cache: "no-cache",
  },
);
const result = await response.json();
return result;
}
export function useJoinGroupMutation(groupId: number) {
  
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:  () => {
      return fetchjoinGroup(groupId);
    },
    onSuccess: (data) => {
      // 그룹 참가 성공 시 실행
      // queryClient.setQueryData(['group', groupId], (oldData: groupModalApiData | undefined) => {
      //   if (!oldData) {
      //     return {
      //       path: '',
      //       status: '',
      //       data: {
      //         address: '',
      //         beginAt: '',
      //         endAt: '',
      //         currentParticipants: 0,
      //         groupCapacity: 0,
      //         hostImgUrl: '',
      //         hostNickname: '',
      //         isParticipated: false,
      //         isParticipationRequested: true, // isParticipationRequested 속성만 true로 설정
      //       }
      //     };
      //   }
      //   return {
      //     ...oldData,
      //     data: {
      //       ...oldData.data,
      //       isParticipationRequested: true, // isParticipationRequested 속성만 true로 설정
      //     }
      //   };
      // });
      console.log(data);
      // group, groupHistory, groupDetail 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupDetail', groupId] });
      alert('참여 요청을 보냈습니다.');
    },
  });
}
