
export async function fetchGroupHistory({pageParam}:{pageParam:number}) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_LOCATION}/participants/histories?page=${pageParam}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
   
    const {data} = await response.json(); // response.json()에서 data 추출
    return data;  // data 속성만 반환
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}