export type TrackRequest =
  | { type: "search"; value: string }
  | { type: "genre"; value: number }
  | { type: "top" };

export function resolveRequest(
  searchText: string,
  selectedGenre: number | null,
): TrackRequest {
  if (searchText.trim() !== "") return { type: "search", value: searchText };
  if (selectedGenre !== null) return { type: "genre", value: selectedGenre };
  return { type: "top" };
}
