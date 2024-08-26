import Image from 'next/image';
import { timeUntilEvent } from './_lib/timeUntilEvent';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
export default function Page() {
  const groupData = {
    host: {
      memberId: 1,
      imgUrl: 'https://fakeimg',
      nickname: '아모르겠고',
      moGakCoTemperature: 0,
      githubUrl: null,
    },
    name: 'AmorGakCo',
    description: '모각코 합시다.',
    address: '서울특별시 종로구 신문로1가 23',
    longitude: 126.9748397,
    latitude: 37.5703901,
    beginAt: '2024-08-25T22:40:04.101337',
    endAt: '2024-08-25T23:55:04.101342',
    groupMembers: [
      {
        memberId: 1,
        imgUrl: '/coin.svg',
        nickname: '아모르겠고',
        moGakCoTemperature: 0,
        githubUrl: null,
      },
      {
        memberId: 2,
        imgUrl: '/coin.svg',
        nickname: '아모르겠고',
        moGakCoTemperature: 0,
        githubUrl: null,
      },
      {
        memberId: 3,
        imgUrl: '/coin.svg',
        nickname: '아모르겠고',
        moGakCoTemperature: 0,
        githubUrl: null,
      },
      {
        memberId: 4,
        imgUrl: '/coin.svg',
        nickname: '아모르겠고',
        moGakCoTemperature: 0,
        githubUrl: null,
      },
      {
        memberId: 5,
        imgUrl: '/coin.svg',
        nickname: '아모르겠고',
        moGakCoTemperature: 0,
        githubUrl: null,
      },
    ],
  };
  const beginAtDate = new Date(groupData.beginAt);
  const endAtDate = new Date(groupData.endAt);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col min-w-[312px] w-full max-w-96 py-6 gap-6 mb-0.5">
        <div>
          <div>모임 설명</div>
          <div className="pt-3 pb-6">{groupData.description}</div>
        </div>
        <div>
          <div className="flex justify-between">
            <div>모임 위치</div>
            <div className="flex gap-[4.5px] items-center">
              <Image
                src="/detail_location_icon.svg"
                alt="location"
                width={7}
                height={10}
              />

              <div className="text-secondary text-xs">{groupData.address}</div>
            </div>
          </div>
          <div className="mt-8 w-full h-[200px] bg-gray-200"></div>
          <div className="w-full flex justify-end mt-2">
            {timeUntilEvent(groupData.beginAt) == '' ? (
              <div>모임 시간이 지났습니다.</div>
            ) : (
              <div>
                시작까지{' '}
                <span className="font-bold">
                  {timeUntilEvent(groupData.beginAt)}
                </span>{' '}
                남았습니다.
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center w-full h-10">
          <div>모임 인원</div>
          <div className="flex relative h-10">
            {groupData.groupMembers.slice(0, 5).map((member, index) => {
              const zIndex = `z-${index + 1}0`;
              return (
                <Avatar
                  key={member.memberId}
                  className={`w-10 h-10 top-0 absolute ${zIndex}`}
                  style={{ right: `${index * 24}px` }}
                >
                  <AvatarImage src={`${member.imgUrl}`} />
                </Avatar>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between items-center w-full h-10">
          <div>모임 시간</div>
          <div className='font-thin text-xl'>{`${beginAtDate.getHours()}:${beginAtDate.getMinutes()}`}~{`${endAtDate.getHours()}:${endAtDate.getMinutes()}`}</div>
        </div>
        <div className = 'flex flex-col gap-4'>
          <Button>모임 위치 인증</Button>
          <Button>지각 알림</Button>
          <Button>장소 변경 요청</Button>
          <Button className={`bg-[#FF2950] hover:bg-[#FF2950]/70`}>{`'${groupData.name}'`} 탈퇴</Button>
        </div>
      </div>
    </div>
  );
}
