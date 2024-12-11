import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';

interface groupMembersType {
  groupMembers: {
    memberId: number;
    imgUrl: string;
    nickname: string;
    moGakCoTemperature: number;
    githubUrl: string | null;
  }[]
}
export default function GroupMembersModal({groupMembers}:groupMembersType) {
  return (
    <>
    <DialogTitle className = 'hidden'></DialogTitle>
    <DialogContent className="flex flex-col gap-2 py-8 px-6 max-h-96 rounded-lg">
      <div className='overflow-auto'>
        {groupMembers?.map((data) => {
          return (<div key={data.memberId} className="flex w-full h-14 gap-4 items-center">
            <Avatar>
              <AvatarImage className="w-10 h-10 rounded-full" src={data.imgUrl} />
            </Avatar>
    
            <div>{data.nickname}</div>
          </div>)
        })}
      </div>
    </DialogContent>
    </>
  );
}
