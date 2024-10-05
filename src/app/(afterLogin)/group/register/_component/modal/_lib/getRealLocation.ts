import { geolocation } from "@/app/_types/Map";
import { SetStateAction } from "react";

export function getRealLocation (setCurLocation:React.Dispatch<SetStateAction<geolocation>>) {
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
}