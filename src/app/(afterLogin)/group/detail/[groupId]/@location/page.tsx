'use client';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function Location() {
  const center = { lng: 126.9748397, lat: 37.5703901 };
  const marker = { lng: 126.9748397, lat: 37.5703901 };
  const address = '서울특별시 종로구 신문로1가 23';
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
          <div className="w-auto h-auto p-1">{address}</div>
        </MapMarker>
      </Map>
    </div>
  );
}
