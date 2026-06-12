import { useEffect, useState } from "react";
import type { Genre } from "../types/Genre";
import { getGenres } from "../services/genres.api";

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchGenres = async () => {
      try {
        setError(null);
        const data = await getGenres(controller.signal);
        setGenres(data);
      } catch (error: any) {
        if (error.name === "AbortError") return;
        setError(error);
      }
    };

    fetchGenres();

    return () => {
      controller.abort();
    };
  }, []);

  return { genres, error };
};
