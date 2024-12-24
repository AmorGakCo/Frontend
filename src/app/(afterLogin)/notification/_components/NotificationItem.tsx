import { notificationMessage } from '@/app/_types/Api';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { forwardRef } from 'react';
import { useApprovePariticipationMutation } from '../_hooks/useApprovePariticipationMutation';
import { useRejectPariticipationMutation } from '../_hooks/useRejectPariticipationMutation';
import { useDeleteNotificationMutation } from '../_hooks/useDeleteNotificationMutation';
interface NotificationItemType {
  data: notificationMessage;
}
// forwardRef를 사용한 컴포넌트
export const NotificationItem = forwardRef<
  HTMLDivElement,
  NotificationItemType
>(({ data }, ref) => {
  const { mutate: approveGroup } = useApprovePariticipationMutation(
    data.groupId,
    data.senderMemberId,
    data.notificationId
  );
  const { mutate: rejectGroup } = useRejectPariticipationMutation(
    data.groupId,
    data.senderMemberId,
    data.notificationId
  );
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
      className="flex min-w-[312px] max-w-3xl w-full items-center gap-4 md:gap-8 py-[6px]"
    >
      <div className='h-full flex items-center'>
      <Image width={44} height={44} src="/coin.svg" alt="notify" />
      </div>
      <div className={`flex relative w-full flex-col ${data.notificationType === 'PARTICIPATION_REQUEST' && ('gap-2')} text-[#5D5D5D] sm:text-xs md:text-base lg:text-lg`}>
        {data.content}
        <div className='flex justify-between items-center'>
          {data.notificationType === 'PARTICIPATION_REQUEST' && (
            <div className="flex gap-2">
              <Button
                onClick={async () => {
                  handleApproveGroup();
                }}
                className="w-12 h-6 py-2"
              >
                승인
              </Button>
              <Button
                onClick={async () => {
                  handleRejectGroup();
                }}
                className="w-12 h-6 py-2 bg-red-500 hover:bg-red-400"
              >
                거절
              </Button>
            </div>
          )}
          
        </div>
        <Image className='absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer' width={20} height={20} src="/close.png" alt="알림 삭제" />
      </div>
    </div>
  );
});

// 디스플레이 네임 설정 (필수는 아니지만 디버깅에 유용)
NotificationItem.displayName = 'NotificationItem';
