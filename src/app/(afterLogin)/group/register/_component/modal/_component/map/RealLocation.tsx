import { geolocation } from '@/app/_types/Map';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useLocationStore from '@/hooks/useLocationStore';


interface RealLocationProps {
  map: kakao.maps.Map | undefined
  setLocation: React.Dispatch<React.SetStateAction<geolocation>>;
}

const RealLocation = ({ map, setLocation  }: RealLocationProps) => {
  const curLocation = useLocationStore((state) => state.curLocation);

  return (
    <Avatar
      onClick={() => {
        map?.setLevel(3);
        setLocation((prev) => ({...prev,center: {lat:curLocation.centerLat,lng:curLocation.centerLon}}));
      }}
      className="absolute rounded-full flex justify-center items-center bg-white shadow-md bottom-6 right-6 cursor-pointer z-40"
    >
      <AvatarImage className="w-6 h-6" src="/myLocation.png" />
      <AvatarFallback>real Location</AvatarFallback>
    </Avatar>
  );
};
export default RealLocation;
