import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';

 const GroupCard = ({
  name,
  address,
  beginAt,
  endAt,
  groupId,
}: {
  name: string;
  address: string;
  beginAt: string;
  endAt: string;
  groupId: number;
}) => {
  const beginAtDate = `${new Date(beginAt).getHours().toString().padStart(2,'0')}:${
    new Date(beginAt).getMinutes().toString().padStart(2,'0')
  }`;
  const endAtDate = `${new Date(endAt).getHours().toString().padStart(2,'0')}:${
    new Date(endAt).getMinutes().toString().padStart(2,'0')
  }`;
  
  return (
    <Link href = {`/group/detail/${groupId}`}  className="flex gap-2">
      <Avatar className="w-[54px] h-[54px]">
        <AvatarImage src="/coin.svg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-bold text-base lg:text-lg">{name}</div>
        <div className="text-2xs lg:text-xs font-normal ml-0.5">
          {beginAtDate} ~ {endAtDate}
        </div>
        <div className="flex gap-[3.67px] h-4 ml-[3.67px] items-center">
          <Image
            width={8}
            height={8}
            src="/location_on.svg"
            alt="location icon"
          />
          <div className="text-2xs text-secondary lg:text-xs">{address}</div>
        </div>
      </div>
    </Link>
  );
};
export default GroupCard;