"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import { useBookmarks } from "@/hooks/useBookmarks";

import Auth from "@/components/Auth";

import { GenresData, MoviesData } from "@/types";

export default function Home() {
  const { getBookmarks, addBookmarks } = useBookmarks();

  const {
    data: genresData,
    error: genresError,
    isLoading: isGenresLoading,
    isError: isGenresError,
  } = useQuery<GenresData>({
    queryKey: ["genres"],
    queryFn: api.getGenres,
  });

  const { data: moveiesData } = useQuery<MoviesData>({
    queryKey: ["movies"],
    queryFn: api.getMovies,
  });

  const user = {
    id: "534535",
  };

  const movies = moveiesData?.results;

  if (isGenresError)
    return (
      <div>
        <span>{genresError.message}</span>
      </div>
    );

  if (isGenresLoading) return <div>Loading...</div>;

  return (
    <div>
      {/* {genresData?.genres?.map((genre) => (
        <span key={genre?.id}>{genre?.name}</span>
      ))} */}
      <div className="grid grid-cols-5 grid-rows-5">
        {movies?.map((movie) => (
          <div key={movie.id} className="flex flex-col gap-2">
            <span>{movie.title}</span>
            <span>{movie.release_date}</span>
            <span>{movie.original_language}</span>
            <button
              type="button"
              onClick={() => addBookmarks(movie.id, user.id)}
            >
              bookmark
            </button>
          </div>
        ))}
      </div>
      <Auth />
    </div>
  );
}
