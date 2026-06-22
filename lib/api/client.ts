const TOKEN_KEY = 'harvestsun_token';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem(TOKEN_KEY);
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || data.message || `API request failed with status ${response.status}`);
  }

  return response.json();
}
