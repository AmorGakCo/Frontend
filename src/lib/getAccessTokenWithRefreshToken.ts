export const getAccessTokenWithRefreshToken = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_LOCATION}/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      cache: 'no-cache',
    });


    return await response.json();
  };