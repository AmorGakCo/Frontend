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