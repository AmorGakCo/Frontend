'use client'
import { GroupDetailData } from "@/app/_types/Api";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchGroupData } from "../_lib/fetchGroupData";

export function ButtonGroup ({groupId}:{groupId: number}) {
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
  return (<div className="flex flex-col gap-4">
    <Button>모임 위치 인증</Button>
    <Button>지각 알림</Button>
    <Button>장소 변경 요청</Button>
    <Button className={`bg-[#FF2950] hover:bg-[#FF2950]/70`}>
      {`'${data!.name}'`} 탈퇴
    </Button>
  </div>)
}