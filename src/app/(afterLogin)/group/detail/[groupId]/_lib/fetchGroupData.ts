
export async function fetchGroupData({queryKey}:{queryKey:[string,number]}) {
  try {
    const [_,groupId] = queryKey;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_LOCATION}/groups/detail/${groupId}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
   
    const { data } = await response.json(); // response.json()에서 data 추출
    return data;  // data 속성만 반환
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}