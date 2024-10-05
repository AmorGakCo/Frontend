import { participantsHistory } from '@/app/_types/Api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import GroupCard from './_components/GroupCard';
export default function Page() {
  const activatedGroupData: participantsHistory[] = [
    {
      "groupId" : 4,
      "name" : "AmorGakCo",
      "address" : "서울특별시 종로구 신문로1가 23",
      "beginAt" : "2024-08-25T11:51:06.07031",
      "endAt" : "2024-08-25T14:51:06.070315"
    }, {
      "groupId" : 5,
      "name" : "AmorGakCo",
      "address" : "서울특별시 종로구 신문로1가 23",
      "beginAt" : "2024-08-25T11:51:06.07031",
      "endAt" : "2024-08-25T14:51:06.070315"
    }, {
      "groupId" : 6,
      "name" : "AmorGakCo",
      "address" : "서울특별시 종로구 신문로1가 23",
      "beginAt" : "2024-08-25T11:51:06.07031",
      "endAt" : "2024-08-25T14:51:06.070315"
    }
  ];
  const pastGroupData: participantsHistory[] = [
    {
      "groupId" : 1,
      "name" : "AmorGakCo",
      "address" : "서울특별시 종로구 신문로1가 23",
      "beginAt" : "2024-08-25T11:51:06.07031",
      "endAt" : "2024-08-25T14:51:06.070315"
    }, {
      "groupId" : 2,
      "name" : "AmorGakCo",
      "address" : "서울특별시 종로구 신문로1가 23",
      "beginAt" : "2024-08-25T11:51:06.07031",
      "endAt" : "2024-08-25T14:51:06.070315"
    }, {
      "groupId" : 3,
      "name" : "AmorGakCo",
      "address" : "서울특별시 종로구 신문로1가 23",
      "beginAt" : "2024-08-25T11:51:06.07031",
      "endAt" : "2024-08-25T14:51:06.070315"
    }
  ];
  return (
    <main className="flex flex-col w-full items-center">
      <div className='w-[312px]'>
      <div className="w-full mt-4 flex gap-4">
        <Image
          width={14}
          height={18}
          src="/activated_group.svg"
          alt="activated group"
        />
        <div className="font-bold text-[#4A8EF7] text-base md:text-lg">현재 참여중인 모각코</div>
      </div>
      <div className="w-full flex flex-col gap-4 py-6">
        {activatedGroupData.map((group) => (
          <GroupCard
            key={group.groupId}
            name={group.name}
            address={group.address}
            beginAt={group.beginAt}
            endAt={group.endAt}
          />
        ))}
      </div>
      <div className="flex gap-4 w-full">
        <Image width={14} height={18} src="/past_group.svg" alt="past group" />
        <div className="font-bold text-[#4A8EF7] text-base md:text-lg">이전에 참여한 모각코</div>
      </div>
      <div className="flex flex-col gap-4 py-6 w-full">
        {pastGroupData.map((group) => (
          <GroupCard
            key={group.groupId}
            name={group.name}
            address={group.address}
            beginAt={group.beginAt}
            endAt={group.endAt}
          />
        ))}
      </div>
      </div>
    </main>
  );
}
