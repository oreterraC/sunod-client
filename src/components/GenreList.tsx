import { useEffect, useState } from "react";
import type { Genre } from "../types/Genre";

const GenreList = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchGenres = async () => {
      try {
        const response = await fetch("http://localhost:5000/genre", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();

        setGenres(data);
        setIsLoading(false);
      } catch (error: any) {
        if (error.name == "AbortError") return;
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchGenres();

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
