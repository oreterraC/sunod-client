import { useEffect, useState } from "react";
import type { Genre } from "../types/Genre";
import { getGenres } from "../services/api";

const GenreList = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    getGenres(controller.signal)
      .then((data) => {
        setGenres(data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name == "AbortError") return;
        setError(error);
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <ul>
      {genres?.map((genre) => (
        <li
          key={genre.id}
          className="flex flex-row items-center text-black text-lg dark:text-white pb-3"
        >
          <img src={genre.picture} alt="" className="w-9 h-9 rounded-lg" />
          <span className="pl-4">{genre.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default GenreList;
