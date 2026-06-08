import type { Genre } from "../types/Genre";
import type { Track } from "../types/Track";

const API_URL = import.meta.env.VITE_API_URL;

export async function getGenres(signal: AbortSignal): Promise<Genre[]> {
  const response = await fetch(`${API_URL}/genre`, { signal });
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  return response.json();
}

export async function getTracksByGenre(
  id: number,
  signal: AbortSignal,
): Promise<Track[]> {
  const response = await fetch(`${API_URL}/genre/${id}`, { signal });
  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  return response.json();
}
