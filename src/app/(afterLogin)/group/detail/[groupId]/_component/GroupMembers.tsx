'use client'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import GroupMembersModal from "./GroupMembersModal";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { GroupDetailData } from "@/app/_types/Api";
import { fetchGroupData } from "../_lib/fetchGroupData";
export default function GroupMembers({groupId}:{groupId:number}) {
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
  const maxGroupMember = (data?.groupMembers.length!>=5)? 5: data?.groupMembers.length;
  return (
    <div className="flex justify-between items-center w-full h-10">
          <div>모임 인원</div>
          <div className="flex relative h-10">
            {data?.groupMembers?.slice(0, maxGroupMember).map((member, index) => {
              const zIndex = `z-${index + 1}0`;
              return (
                <Avatar
                  key={member.memberId}
                  className={`w-10 h-10 top-0 absolute ${zIndex}`}
                  style={{ right: `${index * 24 + 14}px` }}
                >
                  <AvatarImage src={`${member.imgUrl}`} />
                </Avatar>
              );
            })}
            <Dialog>
              <DialogTrigger asChild>
              <Image
                src="/right_arrow.svg"
                alt={'group members'}
                width={6}
                height={12}
                className="cursor-pointer"
              />
              </DialogTrigger>
              <GroupMembersModal/>
            </Dialog>
          </div>
        </div>
  )
}