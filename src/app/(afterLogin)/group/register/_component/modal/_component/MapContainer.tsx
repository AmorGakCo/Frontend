'use client';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { geolocation, markerType } from '@/app/_types/Map';
import { useEffect, useState } from 'react';
import RecommendCard from './map/RecommendCard';
import SearchKeyWord from './map/SearchKeyWord';
import { getRealLocation } from '../_lib/getRealLocation';
import RealLocation from './map/RealLocation';
import MenuBar from './map/MenuBar';
// import RecommendCard from './map/RecommendCard';

export default function MapContainer() {
  const [curLocation, setCurLocation] = useState<geolocation>({
    center: {
      lat: 37.54619261015808,
      lng: 126.7303762529431,
    },
    radius: 300,
    errMsg: null,
    isLoading: true,
  });
  const [realLocation, setRealLocation] = useState<geolocation>({
    center: {
      lat: 37.54619261015808,
      lng: 126.7303762529431,
    },
    radius: 300,
    errMsg: null,
    isLoading: true,
  });
  const [selected, setSelected] = useState<markerType | ''>('');
  const [map, setMap] = useState<kakao.maps.Map>();
  const [markers, setMarkers] = useState<markerType[]>();


  useEffect(() => {
    getRealLocation(setRealLocation);
  }, []);

 

  

  useEffect(() => {
    if (realLocation.errMsg === null) {
      setCurLocation(realLocation);
    }
  }, [realLocation]);

  return (
    <>
      <Map // 지도를 표시할 Container
        center={curLocation.center}
        style={{
          // 지도의 크기
          width: '100%',
          height: '100%',
          flex: '1',
          display: 'flex',
          position: 'relative',
        }}
        level={3} // 지도의 확대 레벨
        onDragEnd={(map) => {
          const lat = map.getCenter().getLat();
          const lng = map.getCenter().getLng();
          setCurLocation((prev) => ({
            ...prev,
            center: { lat: lat, lng: lng },
            radius: 500,
          }));
        }}
        onZoomChanged={(map) => {
          const lat = map.getCenter().getLat();
          const lng = map.getCenter().getLng();
          setCurLocation((prev) => ({
            ...prev,
            center: { lat: lat, lng: lng },
            radius: 500,
          }));
        }}
        onCreate={setMap}
      >
        <MenuBar map = {map} setSelected={setSelected} setMarkers={setMarkers}/>
        {realLocation.errMsg === null && (
          <RealLocation
            map = {map} 
            realLocation={realLocation}
            setCurLocation={setCurLocation}
          />
        )}
        {markers?.map((marker: markerType) => (
          <MapMarker // 마커를 생성합니다
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => {
              setSelected(marker);
            }}
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
          />
        ))}
        {selected !== '' && <RecommendCard selected={selected} />}
        
      </Map>
    </>
  );
}
