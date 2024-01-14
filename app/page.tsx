"use client";

import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import { useBookmarks } from "@/hooks/useBookmarks";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import Auth from "@/components/Auth";

import { GenresData, MoviesData, PopularMovies } from "@/types";
import Link from "next/link";
import ScrollGrid from "@/components/ScrollGrid";
// import ScrollGrid from "@/components/ScrollGrid";

export default function Home() {
  const { addBookmarks } = useBookmarks();
  const parsedUser = useGetUsersInfo();

  const {
    data: genresData,
    error: genresError,
    isLoading: isGenresLoading,
    isError: isGenresError,
  } = useQuery<GenresData>({
    queryKey: ["genres"],
    queryFn: api.getGenres,
  });

  const { data: moveiesData } = useQuery<MoviesData["results"]>({
    queryKey: ["movies"],
    queryFn: api.getMovies,
  });

  const { data: popularMoveiesData } = useQuery<PopularMovies[]>({
    queryKey: ["popularMovies"],
    queryFn: api.getPopularMovies,
  });

  if (isGenresLoading) return <div>Loading...</div>;

  if (isGenresError) return <span>{genresError.message}</span>;

  return (
    <div>
      {/* {genresData?.genres?.map((genre) => (
        <span key={genre?.id}>{genre?.name}</span>
      ))} */}
      <ScrollGrid type="movie" data={popularMoveiesData ?? []} />;
      <Link href="/tvshow" className="w-full h-full flex flex-col  gap-2">
        Tv show
      </Link>
      <div className="grid grid-cols-5 grid-rows-5">
        {moveiesData?.map((movie) => (
          <li className="flex flex-col items-start" key={movie?.id}>
            <Link
              href={`/movie/${movie?.id}`}
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
