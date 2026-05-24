const TrackCardSkeleton = () => {
  return (
    <>
      <div className="w-full aspect-square bg-zinc-300 dark:bg-zinc-800 rounded-lg" />
      <div className="flex justify-start p-3">
        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex-shrink-0" />
        <div className="flex flex-col pl-3 gap-2 flex-1">
          <h3 className="h-5 w-6/7 bg-zinc-200 dark:bg-zinc-800"></h3>
          <span className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded"></span>
          <span className="h-4 w-1/7 bg-zinc-200 dark:bg-zinc-800 rounded"></span>
        </div>
      </div>
    </>
  );
};

export default TrackCardSkeleton;
