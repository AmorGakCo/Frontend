import { SetStateAction, useEffect, useState } from 'react';
import SearchKeyWord from './MenuBar/SearchKeyWord';
import { CategoryType, geolocation, markerType } from '@/app/_types/Map';
import MenuTypeSelector from './MenuBar/MenuTypeSelector';
import CategorySelector from './MenuBar/CategorySelector';


const MenuBar = ({
  map,
  curLocation,
  setMarkers,
  setSelectedMarker,
}: {
  map: kakao.maps.Map | undefined;
  curLocation: geolocation;
  setMarkers: React.Dispatch<SetStateAction<markerType[] | undefined>>;
  setSelectedMarker: React.Dispatch<SetStateAction<'' | markerType>>;
}) => {
  
  const [menuType, setMenuType] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [category, setCategory] = useState<CategoryType>('');
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
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
          setMarkers(markers);
        }
      });
    }
  }, [map, keyword]);
  
  useEffect(() => {
    if (!map) return;

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places(map); 
const placesSearchCB =  (result: kakao.maps.services.PlacesSearchResult, status: kakao.maps.services.Status, pagination: kakao.maps.Pagination) => {
  let markers:markerType[] = []
  if (status === kakao.maps.services.Status.OK) {
      for (var i=0; i<result.length; i++) {
        markers.push({
          position: {
            lat: Number(result[i].y),
            lng: Number(result[i].x),
          },

          content: result[i].place_name,
          address: result[i].road_address_name,
        });
      }    
      setMarkers(markers);   
  }
};
// 카테고리로 은행을 검색합니다
if (category!=='' && menuType == 'category'){
ps.categorySearch(category, placesSearchCB, {useMapBounds:true}); 

// 키워드 검색 완료 시 호출되는 콜백함수 입니다

  }}, [map, category,curLocation]);
  return (
    <div className="absolute top-4 left-4 flex flex-col items-start gap-2 z-40">
      <MenuTypeSelector menuType={menuType} setMenuType = {setMenuType}/>
      {menuType === 'search' && (
        <SearchKeyWord setSelectedMarker={setSelectedMarker} setKeyword={setKeyword} />
      )}
      {menuType === 'category' && (<CategorySelector setSelectedMarker = {setSelectedMarker} setCategory = {setCategory}/>)}
    </div>
  );
};
export default MenuBar;
