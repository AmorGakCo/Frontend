import { GroupHistoryData, participantsHistory } from '@/app/_types/Api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
async function fetchDeleteGroup(groupId: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_LOCATION!}/groups/${groupId}`,
    {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      cache: 'no-cache',
    },
  );
  console.log(response);
  return response.json();
}
export function useDeleteGroupMutation(groupId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // 그룹 탈퇴 API 요청
      return await fetchDeleteGroup(groupId); // 그룹 탈퇴 API 호출
    },
    onSuccess: () => {
      // 1. group, id 쿼리 무효화
      // 2. groupHistory 쿼리 무효화 (히스토리 갱신)

      // // 3. 또는 데이터를 수동으로 업데이트 자신 정보 받아올 때 구현
      // queryClient.setQueryData(['groupDetail', groupId], (oldData:GroupDetailData) => {
      //   if (!oldData) return undefined; // oldData가 없으면 기본적으로 undefined 반환
      //   return {
      //     ...oldData,
      //     groupMembers: oldData.groupMembers.filter(item => item.memberId), // 참가자 수 줄임
      //   };
      // });

      queryClient.setQueryData(
        ['groupHistory'],
        (oldData: GroupHistoryData | undefined) => {
          if (!oldData) return undefined; // oldData가 없으면 undefined
          const { activatedGroup, inactivatedGroup, ...restData } = oldData;
          const removedGroup = activatedGroup.find(
            (item) => item.groupId === groupId,
          );
          // activatedGroup에서 해당 그룹 제거
          const updatedActivatedGroup = activatedGroup.filter(
            (item) => item.groupId !== groupId,
          );

          // removedGroup이 존재하면 inactivatedGroup에 추가
          const updatedInactivatedGroup = removedGroup
            ? [...inactivatedGroup, removedGroup]
            : inactivatedGroup;
          return {
            restData,
            updatedActivatedGroup,
            updatedInactivatedGroup
          }; // 탈퇴한 그룹 제거
        },
      );
      queryClient.invalidateQueries({queryKey: ['groupHistory']});
    },
  });
}
