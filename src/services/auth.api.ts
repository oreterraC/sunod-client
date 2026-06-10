const API_URL = import.meta.env.VITE_API_URL;

export async function signIn(
  username: string,
  password: string,
  signal: AbortSignal,
): Promise<string> {
  const response = await fetch(`${API_URL}/auth/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    signal,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  const data = await response.json();
  return data.token;
}

export async function signUp(
  username: string,
  password: string,
  signal: AbortSignal,
): Promise<string> {
  const response = await fetch(`${API_URL}/auth/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    signal,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  const data = await response.json();
  return data.token;
}
