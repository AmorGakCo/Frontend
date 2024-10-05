export interface groupPost {
  name: string;
  description: string;
  groupCapacity: number;
  beginAt: Date;
  endAt: Date;    
  latitude: number;
  longitude: number;
  address: string;
}
export interface groupModalData {
  hostNickname: string;
  hostImgUrl: string;
  beginAt: string; // ISO 형식의 날짜 문자열
  endAt: string;   // ISO 형식의 날짜 문자열
  groupCapacity: number;
  currentParticipants: number;
  address: string;
}
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