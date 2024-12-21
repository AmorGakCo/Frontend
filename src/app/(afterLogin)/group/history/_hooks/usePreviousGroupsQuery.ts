import { GroupHistoryData, ParticipantsHistory } from '@/app/_types/Api';
import { useMemo } from 'react';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import { fetchPreviousGroups } from '../_lib/fetchPreviousGroups';

const usePreviousGroupsQuery = () => {
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage, hasPreviousPage } =
    useInfiniteQuery({
      queryKey: ['previousGroups', { cursor: undefined }],
      queryFn: fetchPreviousGroups,
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.page + 1 : undefined,
    });
  const previousGroups = useMemo(() => {
    if (!data?.pages) return [];
  
    // 각 페이지의 histories를 합치기
    return data?.pages.flatMap((page) => page.histories.map((history:GroupHistoryData) => ({
      groupId: history.groupId, // GroupCard.tsx의 props와 맞게 key 이름을 유지
      name: history.name,
      address: history.address,
      beginAt: history.beginAt, // beginAt을 Date 객체로 변환
      endAt: history.endAt,   // endAt을 Date 객체로 변환
    })));
  }, [data]);
  

  return { previousGroups, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage};
};

export default usePreviousGroupsQuery;
