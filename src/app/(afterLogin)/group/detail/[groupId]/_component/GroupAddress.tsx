import Image from "next/image";
const GroupAddress = ({address}: {address: string}) => {
  return (
          <div className="flex justify-between">
            <div>모임 위치</div>
            <div className="flex gap-[4.5px] items-center">
              <Image
                src="/detail_location_icon.svg"
                alt="location"
                width={7}
                height={10}
              />

              <div className="text-secondary text-xs">{address}</div>
            </div>
          </div>
  );
};
export default GroupAddress;
