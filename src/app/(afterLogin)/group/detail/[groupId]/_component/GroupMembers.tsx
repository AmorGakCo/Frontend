import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import GroupMembersModal from "./GroupMembersModal";
import Image from "next/image";
export default function GroupMembers({groupMembers}:{groupMembers:{memberId:number; imgUrl: string;}[]}) {
  return (
    <div className="flex justify-between items-center w-full h-10">
          <div>모임 인원</div>
          <div className="flex relative h-10">
            {groupMembers.slice(0, 5).map((member, index) => {
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