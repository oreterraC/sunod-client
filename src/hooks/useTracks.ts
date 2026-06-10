import { useEffect, useState } from "react";
import { getTopTracks, getTracks } from "../services/tracks.api";
import { getTracksByGenre } from "../services/genres.api";
import type { Track } from "../types/Track";
import { resolveRequest } from "../utils/tracks/resolveRequest";

export const useTracks = (searchText: string, selectedGenre: number | null) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTracks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const request = resolveRequest(searchText, selectedGenre);
        let data;
        switch (request.type) {
          case "search":
            data = await getTracks(request.value, controller.signal);
            break;
          case "genre":
            data = await getTracksByGenre(request.value, controller.signal);
            break;
          case "top":
            data = await getTopTracks(controller.signal);
        }
        setTracks(data);
        setIsLoading(false);
      } catch (error: any) {
        if (error.name === "AbortError") return;
        setError(error);
        setIsLoading(false);
      }
    };

    fetchTracks();

    return () => {
      controller.abort();
    };
  }, [searchText, selectedGenre]);

  return { tracks, error, isLoading };
};
