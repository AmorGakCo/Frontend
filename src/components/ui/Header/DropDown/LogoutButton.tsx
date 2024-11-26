import {
  DropdownMenuItem,
} from '../../dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { logout } from '../lib/logout';

export const LogoutButton = () => {

  return (
    <DropdownMenuItem onClick={async () => {
      try {
        await logout();
      } catch (error) {
        console.error('Error during logout:', error);
        alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
      } 
      }} className= 'cursor-pointer'>로그아웃</DropdownMenuItem>

  );
}