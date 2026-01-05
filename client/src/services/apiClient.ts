export const apiClient = async <T>(
  endpoint: string, 
  params?: { method: string; body?: string; headers?: Record<string, string> }
): Promise<T> => {
  const API_URL = process.env.REACT_APP_API_URL;
  
  const url = new URL(`${API_URL}${endpoint}`);
  
  console.log(`API Request: ${url.toString()}`);
  console.log(`Method: ${params?.method || 'GET'}`);

  try {
    const res = await fetch(url.toString(), {
      method: params?.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...params?.headers,
      },
      body: params?.body ? params.body : undefined,
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch from ${endpoint}`);
    }

    const data = await res.json();
    console.log(`Fetched data from ${endpoint}:`, data); 
    return data;
  } catch (error: any) {
    console.error(`Error fetching from ${endpoint}:`, error); 
    throw new Error(error.message);
  }
};
