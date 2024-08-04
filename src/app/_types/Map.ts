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