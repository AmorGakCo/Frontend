import { notificationMessage } from '@/app/_types/Api';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Avatar } from '@radix-ui/react-avatar';
import Image from 'next/image';
import { forwardRef } from 'react';
import { useApprovePariticipationMutation } from '../_hooks/useApprovePariticipationMutation';
import { useRejectPariticipationMutation } from '../_hooks/useRejectPariticipationMutation';
interface NotificationItemType {
  data: notificationMessage;
}
// forwardRef를 사용한 컴포넌트
export const NotificationItem = forwardRef<
  HTMLDivElement,
  NotificationItemType
>(({ data }, ref) => {
  const {mutateAsync: approveGroup} = useApprovePariticipationMutation(data.groupId,data.senderMemberId);
  const {mutateAsync: rejectGroup} = useRejectPariticipationMutation(data.groupId,data.senderMemberId);
  const handleApproveGroup = async () => {
    if (!confirm(`정말로 참여를 승인하시겠습니까?`)) return;
    await approveGroup();
  };
  const handleRejectGroup = async () => {
    if (!confirm(`정말로 참여를 거절하시겠습니까?`)) return;
    await rejectGroup();
  };
  return (
    <div
      ref={ref}
      className="flex min-w-[312px] max-w-3xl w-full items-start gap-4 md:gap-8 py-[6px]"
    >
      <Image width={44} height={44} src="/coin.svg" alt="notify" />
      <div className="flex w-full flex-col gap-3 text-[#5D5D5D] sm:text-xs md:text-base lg:text-lg">
        {data.content}
        {data.notificationType === 'PARTICIPATION_REQUEST' && (
          <div className="flex gap-2 justify-end">
            <Button onClick={async () => {handleApproveGroup()}} className="w-12 h-6 py-2">승인</Button>
            <Button onClick={async () => {handleRejectGroup()}} className="w-12 h-6 py-2 bg-red-500 hover:bg-red-400">
              거절
            </Button>
          </div>
        )}
      </div>
    </div>
  );
});

// 디스플레이 네임 설정 (필수는 아니지만 디버깅에 유용)
NotificationItem.displayName = 'NotificationItem';
