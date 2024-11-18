'use client'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { fetchGroupData } from '../../_lib/fetchGroupData';
import { useQuery } from '@tanstack/react-query';
import processPeriod from '../../_lib/processPeriod';
import { useJoinGroupMutation } from '../../_lib/useJoinGroupMutation';
import { groupModalApiData } from '@/app/_types/Api';
import { forwardRef, SetStateAction, useRef } from 'react';
interface InfoCardProps {
  groupId: number;
  setSelectedGroupId: React.Dispatch<SetStateAction<number>>
}
export default function GroupCard({ groupId, setSelectedGroupId }: InfoCardProps) {
  const {
    isPending,
    isError,
    data: response,
  } = useQuery<groupModalApiData | undefined>({
    queryKey: ['group', groupId],
    queryFn: () => fetchGroupData(groupId),
  });
  const { mutate: joinGroup } = useJoinGroupMutation(groupId);
  
  return (
    <Card className="z-30 w-[328px] absolute bottom-6 left-1/2 right-1/2 -translate-x-1/2">
      {isPending && <div className='w-full h-[282.6px] flex justify-center items-center'></div>}
      {isError && !response && <div className='w-full h-64 flex justify-center items-center'>데이터를 불러오는 중 오류가 발생했습니다.</div>}
      {response && (
        <>
          <CardHeader className="relative flex flex-col items-center p-4">
            <Avatar className="w-[75px] h-[75px] mt-0.5">
              <AvatarImage src={`${response?.data.hostImgUrl}`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardTitle className="text-center text-title outline-blue mt-0 underline">
              {response?.data.hostNickname}
            </CardTitle>
            <div className="absolute top-4 right-4 font-semibold">
              <span className="text-[#FF0000]">
                {response?.data.currentParticipants}
              </span>
              {`/${response?.data.groupCapacity}`}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-center font-semibold">{`${processPeriod(
              response?.data.beginAt,
              response?.data.endAt,
            )}`}</p>
            <p className="text-center font-light text-sm">
              {response?.data.address}
            </p>
            <p className="flex gap-0.5 font-light text-xs justify-center">
              200000P{' '}
              <Avatar className="w-4 h-4">
                <AvatarImage src="/coin.svg" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </p>
          </CardContent>
          <CardFooter className="flex justify-center text-blue-500">
            {(response?.data.isParticipationRequested) && '참여 요청 대기 중...'}
            {(response?.data.isParticipated) && '참여 중인 그룹'}
            {(!response?.data.isParticipated && !response.data.isParticipationRequested) && (<Button onClick={() => {joinGroup()}}>참여 요청</Button>)}
          </CardFooter>
        </>
      )}
    </Card>
  );
}
