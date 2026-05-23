import { useEffect, useState } from "react";
import TrackCardContainer from "./TrackCardContainer";
import TrackCard from "./TrackCard";
import type { Track } from "../types/Track";

const TrackGrid = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/songs/search?q=eminem`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        setIsLoading(false);
        const data = await response.json();
        setTracks(data);
      } catch (error: any) {
        setIsLoading(false);
        if (error.name === "AbortError") return;
        setError(error.message);
      }
    };

    fetchSongs();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <div className="p-4 bg-zinc-900">
        {isLoading && <p>Loading...</p>}
        {error && <div className="text-red-400 mb-4">{error}</div>}
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 bg-zinc-900 p-4">
          {tracks?.map((track) => (
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
