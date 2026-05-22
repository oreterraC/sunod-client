import { useEffect, useState } from "react";
import TrackCardContainer from "./TrackCardContainer";
import TrackCard from "./TrackCard";

interface Album {
  title: string;
  cover: string;
}

interface Song {
  id: number;
  album: Album;
  title_short: string;
  duration: number;
}

const TrackGrid = () => {
  const [songs, setSongs] = useState<Song[]>([]);
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
        setSongs(data);
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
      <div className="p-4 bg-gray-600">
        {isLoading && <p>Loading...</p>}
        {error && <div className="text-red-400 mb-4">{error}</div>}
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 bg-gray-600 p-4">
          {songs?.map((song) => (
            <TrackCardContainer key={song.id}>
              <TrackCard song={song}></TrackCard>
            </TrackCardContainer>
          ))}
        </div>
      </div>
    </>
  );
};

export default TrackGrid;
