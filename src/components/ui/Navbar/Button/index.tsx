import Link from "next/link";
import HomeIcon from "./HomeIcon";
import MessageIcon from "./MessageIcon";
import GroupIcon from "./GroupIcon";
import NotificationIcon from "./NotificationIcon";
interface NavBarButtonProps {
  link: string;
  name: string;
}

export default function Button({link,name}: NavBarButtonProps) {
  return (
    <Link href = {link} className = 'group transition-all rounded-lg hover:bg-blue-500 w-16 h-auto py-1 flex flex-col justify-center gap-[2px] items-center '>
      {(link === '/home') && (<HomeIcon />)}
      {(link === '/message') && (<MessageIcon />)}
      {(link === '/notification') && (<NotificationIcon />)}
      {(link.includes('group'))&& (<GroupIcon />)}
      <div className='group-hover:text-white text-black font-bold text-xs h-3'>{name}</div>
    </Link>
  )
}