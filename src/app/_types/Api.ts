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

export interface participantsHistory {
  groupId : number,
  name : string,
  address : string,
  beginAt : string,
  endAt : string
}

export interface postCurLocation {
  southWestLat: number;
  southWestLon: number;
  northEastLat: number;
  northEastLon: number;
  centerLat: number;
  centerLon: number;
}