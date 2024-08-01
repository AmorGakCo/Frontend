'use client'
import { Map, MapTypeControl }  from "react-kakao-maps-sdk"
import useKakaoLoader from "./_lib/useKakaoLoader"
import { Dispatch, SetStateAction, useRef, useState } from "react"

function MapContainer() {
  useKakaoLoader()
  const mapRef = useRef<kakao.maps.Map>(null)

  return (
    <Map // 지도를 표시할 Container
      center={{ lat: 33.450701, lng: 126.570667 }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "100%",
        flex: '1',
        display:'flex'
      }}
      level={3} // 지도의 확대 레벨
    >
      <MapTypeControl position={"TOPRIGHT"} />
    </Map>
  )
}
// 비 로그인시 '/home' 으로 전환
export default function Page() {
  return (
    <>
      <MapContainer />
    </>
  );
}
