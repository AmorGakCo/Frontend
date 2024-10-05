import { postCurLocation } from "@/app/_types/Api";

interface curLocationType extends postCurLocation {
  isLoading: boolean;
}
export const handleBoundsChanged = (map: kakao.maps.Map,curLocation:curLocationType,setCurLocation:React.Dispatch<React.SetStateAction<curLocationType>>) => {
  const bounds = map.getBounds();
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();
  const center = map.getCenter();
  if (
    sw.getLat() !== curLocation.southWestLat ||
    sw.getLng() !== curLocation.southWestLon ||
    ne.getLat() !== curLocation.northEastLat ||
    ne.getLng() !== curLocation.northEastLon ||
    center.getLat() !== curLocation.centerLat ||
    center.getLng() !== curLocation.centerLon
  ) {
    // 상태 업데이트 (남서쪽, 북동쪽, 중심 좌표)
    setCurLocation(() => ({
      southWestLat: sw.getLat(),
      southWestLon: sw.getLng(),
      northEastLat: ne.getLat(),
      northEastLon: ne.getLng(),
      centerLat: center.getLat(),
      centerLon: center.getLng(),
      isLoading: false,
    }));
  }
};