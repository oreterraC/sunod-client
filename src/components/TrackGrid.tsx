import TrackCardContainer from "./TrackCardContainer";
import TrackCard from "./TrackCard";
import TrackCardSkeleton from "./TrackCardSkeleton";
import { useTracks } from "../hooks/useTracks";

interface Properties {
  searchText: string;
  selectedGenre: number | null;
}

const TrackGrid = ({ searchText, selectedGenre }: Properties) => {
  const { tracks, error, isLoading } = useTracks(searchText, selectedGenre);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <div className="p-2 bg-zinc-50 dark:bg-zinc-900">
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
