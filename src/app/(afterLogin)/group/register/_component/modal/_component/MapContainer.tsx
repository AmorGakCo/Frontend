'use client';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { addressInfo, geolocation, markerType } from '@/app/_types/Map';
import { SetStateAction, useEffect, useState } from 'react';
import InfoCard from './map/InfoCard';
import { getRealLocation } from '../_lib/getRealLocation';
import RealLocation from './map/RealLocation';
import MenuBar from './map/MenuBar';

// import RecommendCard from './map/RecommendCard';

export default function MapContainer({setAddressInfo}:{setAddressInfo:React.Dispatch<SetStateAction<addressInfo>>}) {
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
  const [selectedMarker, setSelectedMarker] = useState<markerType | ''>('');
  const [map, setMap] = useState<kakao.maps.Map>();
  const [markers, setMarkers] = useState<markerType[]>();
  const [markerHoverCard, setMarkerHoverCard] = useState<markerType | ''>('');
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
        <MenuBar
          map={map}
          curLocation={curLocation}
          setSelectedMarker={setSelectedMarker}
          setMarkers={setMarkers}
        />
        {realLocation.errMsg === null && (
          <RealLocation
            map={map}
            realLocation={realLocation}
            setCurLocation={setCurLocation}
          />
        )}

        {markers?.map((marker: markerType) => (
              <MapMarker // 마커를 생성합니다
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
                onClick={() => {
                  setSelectedMarker(marker);
                }}
                image={{
                  src: `/mapMarker.svg`, // 마커이미지의 주소입니다
                  size: {
                    width: 28,
                    height: 36,
                  }, // 마커이미지의 크기입니다
                  options: {
                    offset: {
                      x: 27,
                      y: 69,
                    }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                  },
                }}
                onMouseOver={
                  // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
                  () => setMarkerHoverCard(marker)
                }
                // 마커에 마우스아웃 이벤트를 등록합니다
                onMouseOut={
                  // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
                  () => setMarkerHoverCard('')
                }
              >
              {markerHoverCard === marker && (<div className="w-auto h-auto p-1">{marker.content}</div>)}
              </MapMarker>
        ))}
        {selectedMarker !== '' && (
          <InfoCard selectedMarker={selectedMarker} setAddressInfo={setAddressInfo}/>
        )}
      </Map>
    </>
  );
}
