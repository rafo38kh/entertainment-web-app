"use client";

import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookmarkContext } from "@/contexts/BookmarksContextProvider";
import Image from "next/image";
import Link from "next/link";

import api from "@/lib/api";

import { useBookmarks } from "@/hooks/useBookmarks";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import { MovieBookmark } from "@/types";
import { MoviesData, TVShowData } from "@/types";
import CardLoading from "@/components/CardLoading";

export default function Bookmarks() {
  const parsedUser = useGetUsersInfo();
  const { getBookmarks, removeBookmarks } = useBookmarks();
  const { bookmarks, setBookmarks } = useContext(BookmarkContext);

  useEffect(() => {
    if (parsedUser?.userID) {
      getBookmarks(parsedUser?.userID, setBookmarks);
    }
  }, []);

  const {
    data: moveiesData,
    error: moveiesError,
    isError: isMoveiesError,
    isLoading: isMoveiesLoading,
  } = useQuery<MoviesData["results"]>({
    queryKey: ["movie"],
    queryFn: async () => {
      const movieData = await Promise.all(
        bookmarks
          ?.filter((bookmark) => bookmark?.type === "movie")
          ?.map((bookmark) => api.getMovie(bookmark?.movieId?.toString()))
      );

      return movieData;
    },
    enabled: bookmarks?.length > 0,
  });

  const {
    data: tvshowData,
    error: tvshowError,
    isError: isTvshowError,
    isLoading: isTvshowLoading,
  } = useQuery<TVShowData[]>({
    queryKey: ["show"],
    queryFn: async () => {
      const tvData = await Promise.all(
        bookmarks
          ?.filter((bookmark) => bookmark?.type === "tv")
          ?.map((bookmark) => api.getTvShow(bookmark?.movieId?.toString()))
      );

      return tvData;
    },
    enabled: bookmarks?.length > 0,
  });

  return bookmarks.length > 0 ? (
    <div className="px-4">
      <div>
        <span className="text-2xl">Movies</span>
        {isMoveiesLoading ? (
          <CardLoading />
        ) : (
          <ul className="grid grid-cols-2 gap-4 mb-8">
            {moveiesData &&
              moveiesData?.length > 0 &&
              moveiesData?.map((movie) => {
                const currentBookmarkId = bookmarks?.find(
                  (bookmark) => bookmark?.movieId === movie?.id
                )?.docId as string;

                return (
                  <li
                    key={movie?.id + 9}
                    className="flex flex-col items-start gap-2"
                  >
                    <div className="relative w-full">
                      <Image
                        className="w-full rounded-lg "
                        width={100}
                        height={100}
                        alt={movie?.backdrop_path || ""}
                        src={`https://image.tmdb.org/t/p/w400${movie?.poster_path}`}
                      />
                      <button
                        className="absolute top-4 right-4 aspect-square rounded-full bg-black/35 flex items-center justify-center p-3"
                        type="button"
                        onClick={() => removeBookmarks(currentBookmarkId)}
                      >
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
                      </button>
                    </div>
                    <Link
                      href={`/movie/${movie?.id}`}
                      className="w-full h-full flex flex-col  gap-2"
                    >
                      <div className="flex flex-row gap-2 text-xs text-white/70">
                        <span>{movie?.release_date?.slice(0, 4)}</span>
                        <span>{movie?.original_language}</span>
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
        )}
      </div>

      <div>
        <span className="text-2xl">TV Shows</span>
        {isTvshowLoading ? (
          <CardLoading />
        ) : (
          <ul className="grid grid-cols-2 gap-4">
            {tvshowData &&
              tvshowData?.length > 0 &&
              tvshowData?.map((show) => {
                const currentBookmarkId = bookmarks?.find(
                  (bookmark) => bookmark?.movieId === show?.id
                )?.docId as string;
                return (
                  <li
                    key={show?.id + 5}
                    className="flex flex-col items-start gap-2"
                  >
                    <div className="relative w-full">
                      <Image
                        className="w-full rounded-lg h-60"
                        width={100}
                        height={100}
                        alt={show?.poster_path || ""}
                        src={`https://image.tmdb.org/t/p/w400${show?.poster_path}`}
                      />
                      <button
                        className="absolute top-4 right-4 aspect-square rounded-full bg-black/35 flex items-center justify-center p-3"
                        type="button"
                        onClick={() => removeBookmarks(currentBookmarkId)}
                      >
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
                      </button>
                    </div>
                    <Link
                      href={`/movie/${show?.id}`}
                      className="w-full h-full flex flex-col  gap-2"
                    >
                      <div className="flex flex-row gap-2 text-xs text-white/70">
                        <span>{show?.first_air_date?.slice(0, 4)}</span>
                        <span>{show?.original_language}</span>
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
        )}
      </div>
    </div>
  ) : (
    <span className="text-2xl px-4">No bookmarks</span>
  );
}
