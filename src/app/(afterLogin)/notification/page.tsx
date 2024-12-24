'use client';
import { notificationMessage } from '@/app/_types/Api';
import { NotificationItem } from './_components/NotificationItem';
import useNotificationQuery from './_hooks/useNotificationQuery';
import { Spinner } from '@/components/ui/spinner';
import { useCallback, useRef } from 'react';

export default function Page() {
  const { notifications, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useNotificationQuery();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef: React.RefCallback<HTMLElement> = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  return (
    <main className="flex flex-col gap-2 items-center justify-between p-6">
      <div className="flex w-full justify-center flex-col items-center">
        {notifications?.map((data: notificationMessage, index) => {
          const isLastElement = index == notifications.length - 1;
          return (
            <NotificationItem
              ref={isLastElement ? lastElementRef : null}
              key={index}
              data={data}
            />
          );
        })}
        {notifications.length === 0 && (
          <div className="flex w-full justify-center text-blue-500">
            알림이 없습니다
          </div>
        )}
        {isFetchingNextPage && <Spinner />}
      </div>
    </main>
  );
}
