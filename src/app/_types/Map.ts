export interface location {
  lat: number;
  lng: number;
  groupId?: number;
}

export interface geolocation{
  center:location;
  errMsg: string | null;
  isLoading: boolean;
}

export interface groupData {
    hostNickname : string;
    hostImgUrl : string;
    beginAt : string;
    endAt : string;
    groupCapacity : number;
    currentParticipants : number;
    address : string;
}