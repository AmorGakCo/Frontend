import { GroupHistoryData, notificationMessage, ParticipantsHistory } from '@/app/_types/Api';
import { useMemo } from 'react';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import { fetchNotification } from '../_lib/fetchNotification';

const useNotificationQuery = () => {
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage, hasPreviousPage } =
    useInfiniteQuery({
      queryKey: ['notification', { page:0 }],
      queryFn: fetchNotification,
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.page + 1 : undefined,
    });
  const notifications = useMemo(() => {
    if (!data?.pages) return [];
  
    // 각 페이지의 histories를 합치기
    return data?.pages.flatMap((page) => page.notificationMessages.map((notification:notificationMessage) => ({
      notificationId: notification.notificationId,
      title: notification.title,
      content: notification.content,
      groupId: notification.groupId,
      senderMemberId: notification.senderMemberId,
      receiverMemberId: notification.receiverMemberId,
      notificationType: notification.notificationType,
    })));
  }, [data]);
  

  return { notifications, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage};
};

export default useNotificationQuery;
