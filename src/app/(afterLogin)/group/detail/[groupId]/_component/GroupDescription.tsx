'use client'
import { GroupDetailData } from "@/app/_types/Api";
import { useQuery } from "@tanstack/react-query";
import { fetchGroupData } from "../_lib/fetchGroupData";

const GroupDescription = ({groupId}: {groupId: number}) => {
  const { data, error } = useQuery<
  GroupDetailData,         // 성공 시 반환될 데이터 타입
  Error,                   // 에러 타입 (여기서는 Error로 지정)
  GroupDetailData,         // 캐시된 데이터를 사용할 때의 타입 (보통 첫 번째와 동일하게 사용)
  [string, number]         // queryKey의 타입 (string과 number로 이루어진 튜플)
>({
    queryKey: ["groupDetail", groupId],
    queryFn: fetchGroupData,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  return (
    <div>
      <div>모임 설명</div>
      <div className="pt-3 pb-6">{data?.description}</div>
    </div>
  );
};
export default GroupDescription;
