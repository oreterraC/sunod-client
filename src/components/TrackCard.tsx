import type { Track } from "../types/Track";

interface Properties {
  track: Track;
}

const TrackCard = ({ track }: Properties) => {
  const transformToMinutes = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const duration = transformToMinutes(track.duration);

  return (
    <>
      <img src={track.cover} alt="" className="rounded-lg" />
      <div className="flex justify-start p-3">
        <img
          src={track.picture}
          alt=""
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="flex flex-col pl-3 min-w-0">
          <h3 className="font-semibold text-xl truncate text-black dark:text-white">
            {track.title}
          </h3>
          <span className="text-md text-zinc-600 line-clamp-2">
            {track.album}
          </span>
          <span className="text-sm text-black dark:text-white font-medium">
            {duration}
          </span>
        </div>
      </div>
    </>
  );
};

export default TrackCard;
