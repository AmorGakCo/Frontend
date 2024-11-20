import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar';
import Link from 'next/link';
import { logout } from './lib/logout';
import { useRouter } from 'next/navigation';

export default function DropDown() {
  const router = useRouter();
  return (
    <DropdownMenu modal = {false}>
      <DropdownMenuTrigger>
        <Avatar className="w-[32px] h-[32px] cursor-pointer">
          <AvatarImage src="/coin.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className = 'mr-2'>
        <Link href = '/notification'><DropdownMenuItem className= 'cursor-pointer'>알림</DropdownMenuItem></Link>
        <Link href = '/user'><DropdownMenuItem className= 'cursor-pointer'>계정관리</DropdownMenuItem></Link>
        <DropdownMenuItem onClick={async () => {
          try {
            await logout();
          } catch (error) {
            console.error('Error during logout:', error);
            alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
          }
          }} className= 'cursor-pointer'>로그아웃</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
