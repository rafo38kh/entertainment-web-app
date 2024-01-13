"use client";

import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import { useBookmarks } from "@/hooks/useBookmarks";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import Auth from "@/components/Auth";

import { GenresData, MoviesData } from "@/types";
import Link from "next/link";

export default function Home() {
  const { getBookmarks, addBookmarks } = useBookmarks();
  const parsedUser = useGetUsersInfo();

  console.log(parsedUser);

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
          <li className="flex flex-col items-start" key={movie?.id}>
            <Link
              href={`/test/${movie?.id}`}
              className="w-full h-full flex flex-col  gap-2"
            >
              <span>{movie?.title}</span>
              <span>{movie?.release_date}</span>
              <span>{movie?.original_language}</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                if (movie?.id && parsedUser?.userID) {
                  addBookmarks(movie?.id, parsedUser?.userID);
                }
              }}
            >
              bookmark
            </button>
          </li>
        ))}
      </div>
      <Auth />
    </div>
  );
}
