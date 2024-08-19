import { geolocation } from '@/app/_types/Map';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


interface RealLocationProps {
  map: kakao.maps.Map | undefined
  realLocation: geolocation;
  setCurLocation: React.Dispatch<React.SetStateAction<geolocation>>;
}

const RealLocation = ({ map, realLocation, setCurLocation,  }: RealLocationProps) => {
  return (
    <Avatar
      onClick={() => {
        map?.setLevel(3);
        setCurLocation(realLocation);
      }}
      className="absolute rounded-full flex justify-center items-center bg-white shadow-md bottom-6 right-6 cursor-pointer z-40"
    >
      <AvatarImage className="w-6 h-6" src="/myLocation.png" />
      <AvatarFallback>real Location</AvatarFallback>
    </Avatar>
  );
};
export default RealLocation;
