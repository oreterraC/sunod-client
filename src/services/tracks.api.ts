import type { Track } from "../types/Track";

const API_URL = import.meta.env.VITE_API_URL;

export async function getTopTracks(signal: AbortSignal): Promise<Track[]> {
  const response = await fetch(`${API_URL}/top`, { signal });
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  return response.json();
}

export async function getTracks(
  query: string,
  signal: AbortSignal,
): Promise<Track[]> {
  const response = await fetch(
    `${API_URL}/search?q=${encodeURIComponent(query)}`,
    { signal },
  );
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  return response.json();
}
