import {
  Card,
  CardContent,

  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { groupData } from '@/app/_types/Map';
import processPeriod from '../../_lib/processPeriod';
interface InfoCardProps {
  groupData: groupData;
  setCard: React.Dispatch<React.SetStateAction<string>>;
}
export default function GroupCard({ groupData, setCard }: InfoCardProps) {
  return (
    <Card className="z-30 w-[328px] absolute bottom-6 left-1/2 right-1/2 -translate-x-1/2">
      <CardHeader className="relative flex flex-col items-center p-4">
        <Avatar className="w-[75px] h-[75px] mt-0.5">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <CardTitle className="text-center text-title outline-blue mt-0 underline">
          {groupData.hostNickname}
        </CardTitle>
        <div className="absolute top-4 right-4 font-semibold"><span className='text-[#FF0000]'>{groupData.currentParticipants}</span>{`/${groupData.groupCapacity}`}</div>
      </CardHeader>
      <CardContent>
        <p className="text-center font-semibold">{`${processPeriod(
          groupData.beginAt,
          groupData.endAt,
        )}`}</p>
        <p className="text-center font-light text-sm">{groupData.address}</p>
        <p className="flex gap-0.5 font-light text-xs justify-center">
          200000P{' '}
          <Avatar className="w-4 h-4">
            <AvatarImage src="/coin.svg" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </p>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <Button>참여 요청</Button>
      </CardFooter>
    </Card>
  );
}
