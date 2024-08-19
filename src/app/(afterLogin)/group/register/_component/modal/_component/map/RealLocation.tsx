import { geolocation } from '@/app/_types/Map';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SetStateAction } from 'react';

interface RealLocationProps {
  realLocation: geolocation;
  setCurLocation: React.Dispatch<SetStateAction<geolocation>>; 
}

const RealLocation = ({realLocation,setCurLocation}:RealLocationProps) => {
  return (
    <Avatar onClick={() => {setCurLocation(realLocation);}} className="absolute rounded-full flex justify-center items-center bg-white shadow-md bottom-6 right-6 cursor-pointer z-40">
      <AvatarImage className="w-6 h-6" src="/myLocation.png" />
      <AvatarFallback>real Location</AvatarFallback>
    </Avatar>
  );
};
export default RealLocation;