export async function fetchGroupData(groupId: number) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_LOCATION}/groups/basic/${groupId}`, {
      method: "GET",
      cache: "no-cache",
    })
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}