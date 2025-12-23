export async function checkConnection(): Promise<string> {
    const res = await fetch("http://server:8000/health");
    if (!res.ok) {
      throw new Error("Server error");
    }
    const data = await res.json();
    return data.status;
  }
  