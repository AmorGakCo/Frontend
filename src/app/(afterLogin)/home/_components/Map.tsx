'use client'
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { location } from '@/app/_types/Map';
interface MapContainerProps {
  markers: location[];
}
export default function MapContainer({markers}:MapContainerProps) {

  return (
    <Map // 지도를 표시할 Container
      center={{ lat: 33.450701, lng: 126.570667}}
      style={{
        // 지도의 크기
        width: '100%',
        height: '100%',
        flex: '1',
        display: 'flex',
      }}
      level={3} // 지도의 확대 레벨
    >
      {
        markers.map((a: location) => (
        <MapMarker // 마커를 생성합니다
          key = {a.groupId}
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
            lat: a.lat,
            lng: a.lng,
          }}
        />
        ))
      }
    </Map>
  );
}
