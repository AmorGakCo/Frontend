import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../../dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '../../avatar';
import Link from 'next/link';
import { LogoutButton } from './LogoutButton';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchNotification } from '@/app/(afterLogin)/notification/_lib/fetchNotification';

export default function DropDown() {
  const { data } = useInfiniteQuery({
    queryKey: ['notification', { page: 0 }],
    queryFn: fetchNotification,
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
  });
  const notifyNumber = data?.pages[0].elementSize;
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative">
        <Avatar className="w-[32px] h-[32px] cursor-pointer z-40">
          <AvatarImage src="/coin.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {(notifyNumber && notifyNumber > 0)? (
          <div className="w-4 h-4 text-xs flex justify-center items-center rounded-full absolute -right-1.5 -bottom-1 bg-red-500 text-white z-50">
            {notifyNumber}
          </div>
        ):''}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <Link href="/notification">
          <DropdownMenuItem className="cursor-pointer flex">
            알림
            {
            notifyNumber && (notifyNumber > 0)? (
              <div className="w-4 h-4 text-xs flex justify-center items-center rounded-full bg-red-500 text-white z-50 ml-2">
                {notifyNumber}
              </div>
            ):''}
          </DropdownMenuItem>
        </Link>
        <Link href="/info">
          <DropdownMenuItem className="cursor-pointer">
            추가 정보 관리
          </DropdownMenuItem>
        </Link>
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
