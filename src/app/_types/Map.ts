export interface addressInfo {
  latitude:number;
  longitude: number;
  address: string;
  content: string;
}


export interface mapLocation {
  lat: number;
  lng: number;
  groupId?: number;
}

export interface geolocation{
  center:mapLocation;
  errMsg: string | null;
  isLoading: boolean;
  radius: number;
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

export interface markerType {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
  address: string;
}

export type CategoryType = ""  | "MT1" | "CS2" | "PS3" | "SC4" | "AC5" | "PK6" | "OL7" | "SW8" | "BK9" | "CT1" | "AG2" | "PO3" | "AT4" | "AD5" | "FD6" | "CE7" | "HP8" | "PM9";