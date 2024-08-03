import MapContainer from './_components/Map';

// 비 로그인시 '/home' 으로 전환
export default function Page() {
  const markers = [
    { lat: 33.450701, lng: 126.570667, groupId: 1 },
    {
      lat: 33.450302,
      lng: 126.2222,
      groupId: 2,
    },
    {
      lat: 33.450302,
      lng: 126.22212,
      groupId: 3,
    },
  ];
  return (
    <>
      <MapContainer markers={markers} />
    </>
  );
}
