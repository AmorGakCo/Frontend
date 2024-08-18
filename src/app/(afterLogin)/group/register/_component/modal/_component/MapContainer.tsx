'use client';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { geolocation, groupData, location, markerType } from '@/app/_types/Map';
import { useEffect, useState } from 'react';
import RecommendCard from './RecommendCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SearchKeyWord from './SearchKeyWord';
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
  const [selected, setSelected] = useState<markerType | ''>('');
  const [map, setMap] = useState<kakao.maps.Map>();
  const [markers, setMarkers] = useState<markerType[]>();
  const [keyword, setKeyword] = useState<string>('');
  useEffect(() => {
    if (!map) return;
    if (keyword !== '') {
      const ps = new kakao.maps.services.Places();

      ps.keywordSearch(keyword, (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];

          for (var i = 0; i < data.length; i++) {
            // @ts-ignore
            markers.push({
              position: {
                lat: Number(data[i].y),
                lng: Number(data[i].x),
              },
              content: data[i].place_name,
              address: data[i].road_address_name,
            });
            // @ts-ignore
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          setMarkers(markers);

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
        }
      });
    }
  }, [map, keyword]);

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setCurLocation((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setCurLocation((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }, []);

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
          console.log(lat, lng);
          setCurLocation((prev) => ({
            ...prev,
            center: { lat: lat, lng: lng },
            radius: 500,
          }));
        }}
        onCreate={setMap}
      >
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
        <SearchKeyWord setSelected={setSelected} setKeyword={setKeyword} />
      </Map>
    </>
  );
}
