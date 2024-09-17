'use client';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { groupData } from '@/app/_types/Map';
import { postCurLocation,apiLocation } from '@/app/_types/Api';
import { useEffect, useRef, useState } from 'react';
import GroupCard from './map/GroupCard';
import { fetchNearGroups } from '../_lib/fetchNearGroups';
import { handleBoundsChanged } from '../_lib/handleBoundsChanged';

type CardType = 'none' | 'info' | 'recommend';

interface curLocationType extends postCurLocation {
  isLoading: boolean;
}
export default function MapContainer() {
  const [groups, setGroups] = useState<apiLocation[] | []>([]);
  const [curLocation, setCurLocation] = useState<curLocationType>({
    southWestLat: 0,
    southWestLon: 0,
    northEastLat: 0,
    northEastLon: 0,
    centerLat: 0,
    centerLon: 0,
    isLoading: true,
  });
  const [card, setCard] = useState<string>('none');
  const [groupData, setGroupData] = useState<groupData>({
    hostNickname: '아모르겠고',
    hostImgUrl: 'https://fakeimg',
    beginAt: '2024-07-30T20:38:09.621499',
    endAt: '2024-07-30T23:38:09.621502',
    groupCapacity: 3,
    currentParticipants: 3,
    address: '서울특별시 종로구 신문로1가 23',
  });
  const mapRef = useRef<kakao.maps.Map>(null);
  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurLocation((prev) => ({
            ...prev,
            centerLat: position.coords.latitude, // 위도
            centerLon: position.coords.longitude, // 경도
          }));
        },
        (err) => {
          alert(err.message);
        },
      );
    }
  }, []);

  // 이후에 API 연동 가능할 시 주변 그룹 불러오기
  // useGetGroups(curLocation);
  // 지도의 경계 좌표와 중심 좌표를 가져오는 함수
  
  
  useEffect(() => {
    const {isLoading,...apiData} = curLocation;
    if (isLoading === false){
    fetchNearGroups(apiData,setGroups);
    }
  },[curLocation]);
  return (
    <>
      <Map // 지도를 표시할 Container
        center={{ lat: curLocation.centerLat, lng: curLocation.centerLon }}
        style={{
          // 지도의 크기
          width: '100%',
          height: '100%',
          flex: '1',
          display: 'flex',
        }}
        level={3} // 지도의 확대 레벨
        ref={mapRef}
        onIdle={(map) => {
          setCurLocation((prev) => ({ ...prev, isLoading: true }));
          handleBoundsChanged(map,curLocation,setCurLocation);
        }}
        onCreate={(map) => {
          if (curLocation.isLoading === true) {
            handleBoundsChanged(map,curLocation,setCurLocation);
          }
        }}

      >
        {groups?.map((marker: apiLocation) => (
          <MapMarker // 마커를 생성합니다
            key={marker.groupId}
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
              lat: marker.latitude,
              lng: marker.longitude,
            }}
            onClick={() => {
              setCard('info');
            }}
          />
        ))}
      </Map>
      {card === 'info' && <GroupCard groupData={groupData} setCard={setCard} />}
    </>
  );
}
