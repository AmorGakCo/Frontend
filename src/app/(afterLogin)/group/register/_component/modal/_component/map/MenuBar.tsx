import { SetStateAction, useEffect, useState } from 'react';
import SearchKeyWord from './SearchKeyWord';
import { markerType } from '@/app/_types/Map';
import MenuTypeSelector from './MenuTypeSelector';


const MenuBar = ({
  map,
  setMarkers,
  setSelected,
}: {
  map: kakao.maps.Map | undefined;
  setMarkers: React.Dispatch<SetStateAction<markerType[] | undefined>>;
  setSelected: React.Dispatch<SetStateAction<'' | markerType>>;
}) => {
  const [keyword, setKeyword] = useState<string>('');
  const [menuType, setMenuType] = useState<string>('');

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
  return (
    <div className="absolute top-4 left-4 flex flex-col gap-2 z-40">
      <MenuTypeSelector menuType={menuType} setMenuType = {setMenuType}/>
      {menuType === 'search' && (
        <SearchKeyWord setSelected={setSelected} setKeyword={setKeyword} />
      )}
    </div>
  );
};
export default MenuBar;
