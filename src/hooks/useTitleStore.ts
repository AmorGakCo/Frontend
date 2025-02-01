import { mapLocationType } from '@/app/_types/Map';
import { create } from 'zustand';


// Zustand 스토어 타입 정의
interface TitleState {
  title: string; // 초기값이 비어 있을 수 있음
  setTitle: (update: Partial<string>) => void; // Partial을 사용하여 선택적 업데이트 지원
}

// Zustand 스토어 생성
const useTitleStore = create<TitleState>((set, get) => ({
  title: '',
  setTitle: (newTitle: string) => set(() => ({ title: newTitle })),
}));

export default useTitleStore;
