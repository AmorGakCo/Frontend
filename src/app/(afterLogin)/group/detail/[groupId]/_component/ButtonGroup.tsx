'use client';
import { GroupDetailData } from '@/app/_types/Api';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { fetchGroupData } from '../_lib/fetchGroupData';
import { useLeaveGroupMutation } from '../hooks/useLeaveGroupMutation';
import { useRouter } from 'next/navigation';
import { useDeleteGroupMutation } from '../hooks/useDeleteGroup';
import { fetchAuthentication } from '../_lib/fetchAuthentication';
import TardinessDialog from './TardinessDialog';

export function ButtonGroup({ groupId }: { groupId: number }) {
  const { data, error } = useQuery<
    GroupDetailData, // 성공 시 반환될 데이터 타입
    Error, // 에러 타입 (여기서는 Error로 지정)
    GroupDetailData, // 캐시된 데이터를 사용할 때의 타입 (보통 첫 번째와 동일하게 사용)
    [string, number] // queryKey의 타입 (string과 number로 이루어진 튜플)
  >({
    queryKey: ['groupDetail', groupId],
    queryFn: fetchGroupData,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  const router = useRouter();
  const { mutateAsync: leaveGroup, isError: isErrorLeave } =
    useLeaveGroupMutation(groupId);
  const { mutateAsync: deleteGroup } = useDeleteGroupMutation(groupId);
  const handleLeaveGroup = async () => {
    if (!confirm(`정말로 ${data?.name} 그룹을 탈퇴하시겠습니까?`)) return;
    const { status } = await leaveGroup();
    if (status === 'success') {
      alert('그룹 탈퇴에 성공했습니다!');
      router.push('/group/history');
    } else {
      alert('그룹 탈퇴중 오류가 발생했습니다.');
    }
  };
  const handleDeleteGroup = async () => {
    if (!confirm(`정말로 ${data?.name} 그룹을 삭제하시겠습니까?`)) return;
    const { status } = await deleteGroup();
    if (status === 'success') {
      alert('그룹 삭제에 성공했습니다!');
      router.push('/group/history');
    } else {
      alert('그룹 삭제중 오류가 발생했습니다.');
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={async () => {
          await fetchAuthentication(groupId);
        }}
      >
        모임 위치 인증
      </Button>
      <TardinessDialog />
      <Button>장소 변경 요청</Button>
      {data?.isGroupHost ? (
        <Button
          className={`bg-[#FF2950] hover:bg-[#FF2950]/70`}
          onClick={() => {
            handleDeleteGroup();
          }}
        >
          {`'${data!.name}'`} 삭제
        </Button>
      ) : (
        <Button
          className={`bg-[#FF2950] hover:bg-[#FF2950]/70`}
          onClick={() => {
            handleLeaveGroup();
          }}
        >
          {`'${data!.name}'`} 탈퇴
        </Button>
      )}
    </div>
  );
}
