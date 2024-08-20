import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import React, { SetStateAction } from 'react';
interface MenuTypeSelectorProps {
  menuType: string;
  setMenuType: React.Dispatch<SetStateAction<string>>;
}
const MenuTypeSelector = ({ menuType, setMenuType }: MenuTypeSelectorProps) => {
  return (
    <ToggleGroup type="single" className="flex gap-1">
      <ToggleGroupItem className="w-auto h-auto p-0" value="search">
        <Avatar
          className={`transition-all rounded-full flex justify-center items-center bg-white hover:bg-slate-700 shadow-md ${
            menuType === 'search' && 'bg-slate-700'
          } `}
          onClick={() => {
            if (menuType !== 'search') {
              setMenuType('search');
            } else {
              setMenuType('');
            }
          }}
        >
          <AvatarImage className="w-6 h-6" src={'/search.png'} />
        </Avatar>
      </ToggleGroupItem>
      <ToggleGroupItem className="w-auto h-auto p-0" value="category">
        <Avatar
          className={`transition-all rounded-full flex justify-center items-center bg-white hover:bg-slate-700 shadow-md ${
            menuType === 'category' && 'bg-slate-700'
          } `}
          onClick={() => {
            if (menuType !== 'category') {
              setMenuType('category');
            } else {
              setMenuType('');
            }
          }}
        >
          <AvatarImage className="w-6 h-6" src={'/distance.png'} />
        </Avatar>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
export default MenuTypeSelector;
