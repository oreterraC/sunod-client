const API_URL = import.meta.env.VITE_API_URL;

export async function signIn(
  email: string,
  password: string,
  signal: AbortSignal,
): Promise<string> {
  const response = await fetch(`${API_URL}/auth/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    signal,
  });
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  const data = await response.json();
  return data.token;
}

export async function signUp(
  email: string,
  password: string,
  signal: AbortSignal,
): Promise<string> {
  const response = await fetch(`${API_URL}/auth/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    signal,
  });

  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  const data = await response.json();
  return data.token;
}
