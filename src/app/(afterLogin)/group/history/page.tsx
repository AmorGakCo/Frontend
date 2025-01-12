'use client';
import Image from 'next/image';
// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from '@tanstack/react-query';
import { fetchCurrentGroups } from './_lib/fetchCurrentGroups';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import GroupCard from './_components/GroupCard';
import { ParticipantsHistory, GroupHistoryData } from '@/app/_types/Api';
import usePreviousGroupsQuery from './_hooks/usePreviousGroupsQuery';
import { Spinner } from '@/components/ui/spinner';


export default function Page() {
  const { data: currentGroups } = useQuery<
    ParticipantsHistory, // 성공 시 반환될 데이터 타입
    Error, // 에러 타입 (여기서는 Error로 지정)
    ParticipantsHistory, // 캐시된 데이터를 사용할 때의 타입 (보통 첫 번째와 동일하게 사용)
    [string] // queryKey의 타입 (string과 number로 이루어진 튜플)
  >({
    queryKey: ['currentGroups'],
    queryFn: fetchCurrentGroups,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  const {
    previousGroups,
    isLoading,
    fetchNextPage,
    isError,
    isFetchingNextPage,
    hasNextPage,
  } = usePreviousGroupsQuery();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [more, setMore] = useState(false);
  const lastElementRef: React.RefCallback<HTMLElement> = useCallback(
    (node) => {
      if (!more || isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [more, isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  return (
    <>
      <main className="flex flex-col w-full items-center">
        <div className="w-[312px]">
          <div className="w-full mt-4 flex gap-4">
            <Image
              width={14}
              height={18}
              src="/activated_group.svg"
              alt="activated group"
            />
            <div className="font-bold text-[#4A8EF7] text-base md:text-lg">
              현재 참여중인 모각코
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 py-6">
            {currentGroups?.histories.map((group) => (
              <GroupCard
                key={group.groupId}
                groupId={group.groupId}
                name={group.name}
                address={group.address}
                beginAt={group.beginAt}
                endAt={group.endAt}
              />
            ))}
          </div>
          {currentGroups?.histories.length ===0 && <div className='w-full flex text-[#4A8EF7] mb-6 justify-center'>현재 참여중인 그룹이 없습니다.</div>}
          <div className="flex gap-4 w-full">
            <Image
              width={14}
              height={18}
              src="/past_group.svg"
              alt="past group"
            />
            <div className="font-bold text-[#4A8EF7] text-base md:text-lg">
              이전에 참여한 모각코
            </div>
          </div>
          <div className="flex flex-col gap-4 py-6 w-full">
            {previousGroups.map((group, index) => {
              const isLastElement = index == previousGroups.length - 1;
              return (
                <GroupCard
                  key={group.groupId}
                  groupId={group.groupId}
                  name={group.name}
                  address={group.address}
                  beginAt={group.beginAt}
                  endAt={group.endAt}
                  ref={isLastElement ? lastElementRef : null}
                />
              );
            })}
            {previousGroups.length === 0 && <div className='flex w-full justify-center text-blue-500'>이전에 참여한 그룹이 없습니다</div>}
            {isFetchingNextPage && <Spinner />}
            {!more && hasNextPage && (
              <div className="flex w-full justify-center">
                <Image
                  src={'/arrow_down.svg'}
                  width={32}
                  height={32}
                  alt="more group"
                  className="cursor-pointer animate-float"
                  onClick={() => {
                    fetchNextPage();
                    setMore(true);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
