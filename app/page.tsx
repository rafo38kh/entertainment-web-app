"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

import api from "@/lib/api";

import ScrollGrid from "@/components/ScrollGrid";

import { useBookmarks } from "@/hooks/useBookmarks";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import { PopularMovies, MoviesData, TVShowsData } from "@/types";
import { useContext, useEffect } from "react";
import { BookmarkContext } from "@/contexts/BookmarksContextProvider";
import { AuthContext } from "@/contexts/AuthContextProvider";

export default function Home() {
  const parsedUser = useGetUsersInfo();
  const { addBookmarks, removeBookmarks } = useBookmarks();

  const { isAuth } = useContext(AuthContext);
  const { bookmarks, setBookmarks } = useContext(BookmarkContext);

  const { getBookmarks } = useBookmarks();

  useEffect(() => {
    if (isAuth && parsedUser?.userID) {
      getBookmarks(parsedUser?.userID, setBookmarks);
    }
  }, [isAuth]);

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
    queryKey: ["movies", initialFilterOptions],
    queryFn: () => api.getFilteredMovies(initialFilterOptions),
  });

  const {
    data: tvShowData,
    error: tvShowError,
    isError: isTvShowError,
    isLoading: isTvShowLoading,
  } = useQuery<TVShowsData>({
    queryKey: ["tvshows", initialFilterOptions],
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
      </div>
      <span className="text-2xl px-4">Movies</span>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-4 p-4">
        {moveiesData?.results?.map((movie) => {
          const currentBookmarkId = bookmarks?.find(
            (bookmark) => bookmark?.movieId === movie?.id
          )?.docId as string;

          return (
            <li className="flex flex-col items-start " key={movie?.id}>
              <div className="relative w-full h-full">
                {movie?.poster_path ? (
                  <Image
                    className="w-full rounded-lg h-full"
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
                    if (currentBookmarkId) {
                      removeBookmarks(currentBookmarkId);
                    } else {
                      if (movie?.id && parsedUser?.userID) {
                        addBookmarks(movie.id, parsedUser.userID, "movie");
                      }
                    }
                  }}
                  // onClick={() => {
                  //   if (movie?.id && parsedUser?.userID) {
                  //     addBookmarks(movie?.id, parsedUser?.userID, "movie");
                  //   }
                  // }}
                >
                  {currentBookmarkId ? (
                    <svg
                      width="12"
                      height="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z"
                        fill="#FFF"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="12"
                      height="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                        stroke="#FFF"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    </svg>
                  )}
                  {/* <svg
                    width="12"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                      stroke="#FFF"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg> */}
                </button>
              </div>

              <Link
                href={`/movie/${movie?.id}`}
                className="w-full  flex flex-col"
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
          );
        })}
      </ul>

      <span className="px-4 text-2xl">TV Shows</span>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {tvShowData?.results?.map((show) => {
          const currentBookmarkId = bookmarks?.find(
            (bookmark) => bookmark?.movieId === show?.id
          )?.docId as string;

          return (
            <li
              key={show?.id}
              className="w-full h-full flex flex-col items-start"
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
                    if (currentBookmarkId) {
                      removeBookmarks(currentBookmarkId);
                    } else {
                      if (show?.id && parsedUser?.userID) {
                        addBookmarks(show.id, parsedUser.userID, "tv");
                      }
                    }
                  }}
                  // onClick={() => {
                  //   if (show?.id && parsedUser?.userID) {
                  //     addBookmarks(show?.id, parsedUser?.userID, "tv");
                  //   }
                  // }}
                >
                  {currentBookmarkId ? (
                    <svg
                      width="12"
                      height="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z"
                        fill="#FFF"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="12"
                      height="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                        stroke="#FFF"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    </svg>
                  )}
                  {/* <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                    stroke="#FFF"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg> */}
                </button>
              </div>

              <Link
                href={`/tvshow/${show?.id}`}
                className="w-full flex flex-col"
              >
                <div className="flex flex-row gap-2 text-xs text-white/70">
                  <span>
                    {show?.first_air_date && show?.first_air_date.slice(0, 4)}
                  </span>
                  <span>
                    {show?.original_language && show?.original_language}
                  </span>
                  <span>{show?.adult && "18+"}</span>
                </div>
                <span className=" text-white font-medium text-[15px] truncate">
                  {show?.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
