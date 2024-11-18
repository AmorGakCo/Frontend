export interface groupPost {
  name: string;
  description: string;
  groupCapacity: number;
  beginAt: string;
  endAt: string;    
  latitude: number;
  longitude: number;
  address: string;
}
export interface groupModalApiData {
  path: string;
  status: string;
  data: {
  address: string; // 모임 장소 주소
  beginAt: string; // 모임 시작 시간 (ISO 8601 형식)
  currentParticipants: number; // 현재 참가자 수
  endAt: string; // 모임 종료 시간 (ISO 8601 형식)
  groupCapacity: number; // 모임 최대 인원 수
  hostImgUrl: string; // 호스트의 프로필 이미지 URL
  hostNickname: string; // 호스트 닉네임
  isParticipated: boolean; // 사용자가 현재 모임에 참여 중인지 여부
  isParticipationRequested: boolean; // 사용자가 참여 요청을 보냈는지 여부
  }
};
interface GroupMember {
  memberId: number;
  imgUrl: string;
  nickname: string;
  moGakCoTemperature: number;
  githubUrl: string | null;
}

export interface GroupDetailData {
  host: GroupMember;
  name: string;
  description: string;
  address: string;
  longitude: number;
  latitude: number;
  beginAt: string;  // ISO 형식의 날짜 문자열
  endAt: string;    // ISO 형식의 날짜 문자열
  groupMembers: GroupMember[];
}


export interface participantsHistory {
  groupId : number,
  name : string,
  address : string,
  beginAt : string,
  endAt : string
}

export interface GroupHistoryData {
  page: number;
  elementSize: number;
  hasNext: boolean;
  activatedGroup: participantsHistory[];      // 활성화된 그룹 배열
  inactivatedGroup: participantsHistory[];     // 비활성화된 그룹 배열
}

export interface apiLocation {
  latitude:number;
  longitude:number;
  groupId?: number;
}
export interface postCurLocation {
  southWestLat: number;
  southWestLon: number;
  northEastLat: number;
  northEastLon: number;
  centerLat: number;
  centerLon: number;
}