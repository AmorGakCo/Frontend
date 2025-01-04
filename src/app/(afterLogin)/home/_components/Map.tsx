'use client';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { postCurLocation,apiLocation } from '@/app/_types/Api';
import { useEffect, useRef, useState } from 'react';
import GroupCard from './map/GroupCard';
import { fetchNearGroups } from '../_lib/fetchNearGroups';
import { handleBoundsChanged } from '../_lib/handleBoundsChanged';
import { getCurrentPosition } from '../../_lib/getCurrentPosition';
import { mapLocationType } from '@/app/_types/Map';
import useLocationStore from '@/hooks/useLocationStore';


export default function MapContainer() {
  const [groups, setGroups] = useState<apiLocation[] | []>([]);
  console.log(groups);
  const mapLocation = useLocationStore(state => state.mapLocation);
  const setMapLocation = useLocationStore((state) => state.setMapLocation);
  const setCurLocation = useLocationStore((state) => state.setCurLocation);
  const [selectedGroupId, setSelectedGroupId] = useState(-1);
  const mapRef = useRef<kakao.maps.Map>(null);
  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedGroupId(-1);
    }
  };
  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const {currentLat:centerLat, currentLon: centerLon} = await getCurrentPosition();
        setMapLocation({centerLat, centerLon});
        setCurLocation({centerLat, centerLon});
      } catch (error) {
        console.error('Error getting position:', error);
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    
    if(mapLocation.isLoading) {
    fetchPosition();
    }
    return () => {document.removeEventListener('keydown', handleEscapeKey)}
  }, []);

  // 이후에 API 연동 가능할 시 주변 그룹 불러오기
  // useGetGroups(curLocation);
  // 지도의 경계 좌표와 중심 좌표를 가져오는 함수
  
  useEffect(() => {
    const {isLoading,...apiData} = mapLocation;
    console.log(mapLocation);
    if (isLoading === false){
    fetchNearGroups(apiData,setGroups);
    }
  },[mapLocation]);
  return (
    <>
      <Map // 지도를 표시할 Container
        center={{ lat: mapLocation.centerLat, lng: mapLocation.centerLon }}
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
          setMapLocation({isLoading:true});
          handleBoundsChanged(map,mapLocation,setMapLocation);
        }}
        onCreate={(map) => {
          if (mapLocation.isLoading === true) {
            handleBoundsChanged(map,mapLocation,setMapLocation);
          }
        }}
        onClick={() => {
          setSelectedGroupId(-1);
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
              setSelectedGroupId(marker.groupId!);
            }}
          />
        ))}
      </Map>
      {selectedGroupId !== -1 && <GroupCard setSelectedGroupId={setSelectedGroupId} groupId={selectedGroupId} />}
      </>
  );
}
