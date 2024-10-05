import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

const GroupCard = ({
  name,
  address,
  beginAt,
  endAt,
}: {
  name: string;
  address: string;
  beginAt: string;
  endAt: string;
}) => {
  const beginAtDate = `${new Date(beginAt).getHours()}:${
    new Date(beginAt).getMinutes()
  }`;
  const endAtDate = `${new Date(endAt).getHours()}:${
    new Date(endAt).getMinutes()
  }`;
  return (
    <div className="flex gap-2">
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
    </div>
  );
};
export default GroupCard;