"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

import api from "@/lib/api";

import Auth from "@/components/Auth";
import ScrollGrid from "@/components/ScrollGrid";

import { useBookmarks } from "@/hooks/useBookmarks";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import { PopularMovies, MoviesData, TVShowsData } from "@/types";

export default function Home() {
  const parsedUser = useGetUsersInfo();
  const { addBookmarks } = useBookmarks();

  const initialFilterOptions = {
    adult: false,
    language: "en-US",
    year: 2023,
    genre: null,
    page: 1,
  };

  const {
    data: upcomingMoviesData,
    error: upcomingMoviesError,
    isError: isUpcomingMoviesError,
    isLoading: isUpcomingMoviesLoading,
  } = useQuery<PopularMovies[]>({
    queryKey: ["upcomingMovies"],
    queryFn: api.getUpcomingMovies,
  });

  const {
    data: nowPlayingMoviesData,
    error: nowPlayingMoviesError,
    isError: isNowPlayingMoviesError,
    isLoading: isNowPlayingMoviesLoading,
  } = useQuery<PopularMovies[]>({
    queryKey: ["nowPlayingMovies"],
    queryFn: api.getNowPlayingMovies,
  });

  const {
    data: moveiesData,
    error: moviesError,
    isError: isMoviesError,
    isLoading: isMoviesLoading,
  } = useQuery<MoviesData>({
    queryKey: ["movies"],
    queryFn: () => api.getFilteredMovies(initialFilterOptions),
  });

  const {
    data: tvShowData,
    error: tvShowError,
    isError: isTvShowError,
    isLoading: isTvShowLoading,
  } = useQuery<TVShowsData>({
    queryKey: ["tvshows"],
    queryFn: () => api.getFilteredShows(initialFilterOptions),
  });

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="pl-4">
          <span className="text-2xl">Upcoming</span>

          <ScrollGrid
            type="movie"
            data={upcomingMoviesData ?? []}
            isLoading={isUpcomingMoviesLoading}
          />
        </div>
        <div className="pl-4">
          <span className="text-2xl">Now Playing</span>

          <ScrollGrid
            type="movie"
            data={nowPlayingMoviesData ?? []}
            isLoading={isNowPlayingMoviesLoading}
          />
        </div>
        <Auth />
      </div>
      <span className="text-2xl px-4">Movies</span>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-4 p-4">
        {moveiesData?.results?.map((movie) => (
          <li className="flex flex-col items-start " key={movie?.id}>
            <div className="relative w-full">
              {movie?.poster_path ? (
                <Image
                  className="w-full rounded-lg "
                  width={100}
                  height={100}
                  alt={movie?.backdrop_path || ""}
                  src={`https://image.tmdb.org/t/p/w400${movie?.poster_path}`}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded  dark:bg-gray-700">
                  <svg
                    className="w-1/2 h-full text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
              )}
              <button
                className="absolute top-4 right-4 aspect-square rounded-full bg-black/35 flex items-center justify-center p-3"
                type="button"
                onClick={() => {
                  if (movie?.id && parsedUser?.userID) {
                    addBookmarks(movie?.id, parsedUser?.userID, "movie");
                  }
                }}
              >
                <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                    stroke="#FFF"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </button>
            </div>

            <Link
              href={`/movie/${movie?.id}`}
              className="w-full h-full flex flex-col"
            >
              <div className="flex flex-row gap-2 text-xs text-white/70">
                <span>
                  {movie?.release_date && movie?.release_date.slice(0, 4)}
                </span>
                <span>
                  {movie?.original_language && movie?.original_language}
                </span>
                <span>{movie?.adult && "18+"}</span>
              </div>

              <span className=" text-white font-medium text-[15px] truncate">
                {movie?.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <span className="px-4 text-2xl">TV Shows</span>
      <ul className="grid grid-cols-2 gap-4 p-4">
        {tvShowData?.results?.map((show) => (
          <li
            key={show?.id}
            className="w-full h-full flex flex-col justify-between gap-2"
          >
            <div className="relative w-full h-full">
              {show?.poster_path ? (
                <Image
                  className="w-full h-full rounded-lg "
                  width={100}
                  height={100}
                  alt={show?.poster_path || ""}
                  src={`https://image.tmdb.org/t/p/w400${show?.poster_path}`}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                  <svg
                    className="w-1/2 h-full text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
              )}

              <button
                className="absolute top-4 right-4 aspect-square rounded-full bg-black/35 flex items-center justify-center p-3"
                type="button"
                onClick={() => {
                  if (show?.id && parsedUser?.userID) {
                    addBookmarks(show?.id, parsedUser?.userID, "tv");
                  }
                }}
              >
                <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                    stroke="#FFF"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </button>
            </div>

            <Link href={`/tvshow/${show?.id}`} className="flex flex-col">
              <span className="truncate">{show?.name}</span>
              <span>{show?.original_language}</span>
              <span>{show?.adult ? "18+" : null}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
