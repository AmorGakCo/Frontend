interface GeolocationPosition {
  currentLat: number;
  currentLon: number;
}

export function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            currentLat: position.coords.latitude,
            currentLon: position.coords.longitude,
          });
        },
        () => {
          resolve({
            currentLat: 0,
            currentLon: 0,
          });
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
}