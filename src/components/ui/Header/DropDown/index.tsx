import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../../dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '../../avatar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogoutButton } from './LogoutButton';

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
        <LogoutButton/>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
