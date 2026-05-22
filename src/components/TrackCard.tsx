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

interface Properties {
  song: Song;
}

const TrackCard = ({ song }: Properties) => {
  const transformToMinutes = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const duration = transformToMinutes(song.duration);

  return (
    <div className="bg-gray-400 rounded-sm">
      <img src={`${song.album.cover}?size=big`} alt="" />
      <div>
        {song.album.title} | {song.title_short}
      </div>
      <div>{duration}</div>
    </div>
  );
};

export default TrackCard;
