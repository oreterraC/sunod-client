import { useEffect, useState } from "react";
import TrackCardContainer from "./TrackCardContainer";
import TrackCard from "./TrackCard";
import type { Track } from "../types/Track";
import TrackCardSkeleton from "./TrackCardSkeleton";

const TrackGrid = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    const controller = new AbortController();
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/songs/search?q=eminem`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();
        setTracks(data);
        setIsLoading(false);
      } catch (error: any) {
        if (error.name === "AbortError") return;
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchSongs();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <div className="p-4 bg-zinc-50 dark:bg-zinc-900">
        {error && <div className="text-red-400 mb-4">{error}</div>}
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 bg-zinc-50 dark:bg-zinc-900 p-4">
          {isLoading
            ? skeletons.map((skeleton) => (
                <TrackCardContainer key={skeleton}>
                  <TrackCardSkeleton />
                </TrackCardContainer>
              ))
            : tracks?.map((track) => (
                <TrackCardContainer key={track.id}>
                  <TrackCard track={track}></TrackCard>
                </TrackCardContainer>
              ))}
        </div>
      </div>
    </>
  );
};

export default TrackGrid;
