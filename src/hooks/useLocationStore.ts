import { mapLocationType } from '@/app/_types/Map';
import { create } from 'zustand';

interface curLocation {
  centerLat: number;
  centerLon: number;
}

// mapLocationType 정의 (mapLocation이 확장 가능하도록 설정)
interface curLocationType {
  centerLat: number;
  centerLon: number;
}

// Zustand 스토어 타입 정의
interface LocationState {
  mapLocation: mapLocationType; // 초기값이 비어 있을 수 있음
  curLocation: curLocationType; // 초기값이 비어 있을 수 있음
  setMapLocation: (update: Partial<mapLocationType>) => void; // Partial을 사용하여 선택적 업데이트 지원
  setCurLocation: (curLocation: Partial<mapLocationType>) => void;
}

// Zustand 스토어 생성
const useLocationStore = create<LocationState>((set, get) => ({
  mapLocation: {
    centerLat: 0,
    centerLon: 0,
    northEastLat: 0,
    northEastLon: 0,
    southWestLat: 0,
    southWestLon: 0,
    isLoading: true,
  },
  curLocation: {centerLat:0, centerLon:0},
  setMapLocation: (newLocation) =>
    set((state) => ({
      mapLocation: {
        ...state.mapLocation, // 이전 상태 병합
        ...newLocation,
      },
    })),
  setCurLocation: (newLocation) =>
    set((state) => ({
      curLocation: {
        ...state.curLocation, // 이전 상태 병합
        ...newLocation,
      },
    })),
}));

export default useLocationStore;
