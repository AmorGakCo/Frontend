import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Avatar } from '@radix-ui/react-avatar';
import Image from 'next/image';
export const NotificationItem = () => {
  return (
    <div className="flex gap-2 py-[6px] md:gap-4 items-center">
      <Image width={44} height={44} src="/coin.svg" alt="notify" />
      <div className="flex flex-col gap-3 text-[#5D5D5D] sm:text-xs md:text-base lg:text-lg">
        김무땡님이 모르모르모각코에서 23분 지각합니다.
        <div className='flex gap-2 justify-end'><Button className='w-12 h-6 py-2'>승인</Button><Button className='w-12 h-6 py-2 bg-red-500 hover:bg-red-400'>거절</Button></div>
      </div>
    </div>
  );
};
