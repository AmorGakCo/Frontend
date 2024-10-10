'use client';
import { GroupDetailData } from '@/app/_types/Api';
import { useQuery } from '@tanstack/react-query';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { usePathname } from 'next/navigation';
import { fetchGroupData } from '../_lib/fetchGroupData';
import { useEffect, useState } from 'react';

export default function Location() {
  const pathname = usePathname();
  const groupId = pathname.split('/')[3];
  const { data, error, isSuccess} = useQuery<
  GroupDetailData,         // 성공 시 반환될 데이터 타입
  Error,                   // 에러 타입 (여기서는 Error로 지정)
  GroupDetailData,         // 캐시된 데이터를 사용할 때의 타입 (보통 첫 번째와 동일하게 사용)
  [string, number]         // queryKey의 타입 (string과 number로 이루어진 튜플)
>({
    queryKey: ["groupDetail", Number(groupId)],
    queryFn: fetchGroupData,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  const [center, setCenter] = useState({lng:0,lat:0});
  const [marker, setMarker] = useState({lng:0,lat:0});
  console.log(data);
  const [address, setAddress] = useState('');
  useEffect(() => {
    console.log(isSuccess);
    if(isSuccess) {
      setCenter({lat:data?.latitude,lng:data?.longitude});
      setMarker({lat:data?.latitude,lng:data?.longitude});
      setAddress(data?.address)
    }
  },[isSuccess,data]);
  console.log(center);
  return (
    <div className="mt-8 w-full h-[200px] bg-gray-200">
      <Map // 지도를 표시할 Container
        center={center}
        style={{
          // 지도의 크기
          width: '100%',
          height: '100%',
          flex: '1',
          display: 'flex',
        }}
        level={5} 
        draggable = {false}
        // 지도의 확대 레벨
        // onDragEnd={(map) => {
        //   const lat = map.getCenter().getLat();
        //   const lng = map.getCenter().getLng();
        //   setCurLocation((prev) => ({
        //     ...prev,
        //     center: { lat: lat, lng: lng },
        //     radius: 500,
        //   }));
        // }}
        // onZoomChanged={(map) => {
        //   const lat = map.getCenter().getLat();
        //   const lng = map.getCenter().getLng();
        //   console.log(lat, lng);
        //   setCurLocation((prev) => ({
        //     ...prev,
        //     center: { lat: lat, lng: lng },
        //     radius: 500,
        //   }));
        // }}
      >
        <MapMarker // 마커를 생성합니다
          image={{
            src: `/mapMarker.svg`, // 마커이미지의 주소입니다
            size: {
              width: 24,
              height: 32,
            }, // 마커이미지의 크기입니다
            options: {
              offset: {
                x: 27,
                y: 69,
              }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            },
          }}
          position={{
            // 마커가 표시될 위치입니다
            lat: marker.lat,
            lng: marker.lng,
          }}
        >
          <div className="min-w-32 h-auto p-1 z-50 bg-white absolute top-16">{address}</div>
        </MapMarker>
      </Map>
    </div>
  );
}
