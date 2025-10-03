
const API_URL = "http://127.0.0.1:8000/api/";

export default async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<Response> {

  const headers: HeadersInit = {
    Accept: "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    window.dispatchEvent(new Event("auth:expired"));
    throw new Error("Token expired");
  }

  return res;
}
