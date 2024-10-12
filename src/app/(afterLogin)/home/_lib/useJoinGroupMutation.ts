'use client'
import { groupModalData } from '@/app/_types/Api';
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
console.log(response);
return response.json()
}
export function useJoinGroupMutation(groupId:number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // 그룹 참가 API 요청
      return await fetchjoinGroup(groupId); // group 참가 API 호출
    },
    // onSuccess: (newGroupData) => {
    //   // 그룹 참가 성공 시 실행
    //   queryClient.setQueryData(['group', groupId], (oldData:groupModalData | undefined) => {
    //     if (!oldData) {
    //       return {
    //         hostNickname: '',
    //         hostImgUrl: '',
    //         beginAt: '', // ISO 형식의 날짜 문자열
    //         endAt: '',   // ISO 형식의 날짜 문자열
    //         groupCapacity: 0,
    //         currentParticipants: 0,
    //         address: '',
    //       }
    //     }
    //     return {
    //       ...oldData, // 기존 데이터 유지
    //       currentParticipants: oldData.currentParticipants + 1, // 참가자 수 갱신
    //     };
    //   });
    //   // group,id 쿼리 무효화
    //   queryClient.invalidateQueries({queryKey:['group', groupId]});

    //   // groupHistory 쿼리 무효화
    //   queryClient.invalidateQueries({queryKey:['groupHistory']});

    //   queryClient.invalidateQueries({queryKey:['groupDetail',groupId]});


    

    //   // queryClient.setQueryData('groupHistory', (oldData) => {
    //   //   // 예: groupHistory에 새로운 그룹 추가
    //   //   return [...oldData, newGroupData];
    //   // });
    // },
  });
}
