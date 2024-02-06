"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
  const { getBookmarks } = useBookmarks();

  const [bookmarks, setBookmarks] = useState<MovieBookmark[]>([]);

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

  return (
    <div className="px-4">
      <div>
        <span className="text-2xl">Movies</span>
        {isMoveiesLoading ? (
          <CardLoading />
        ) : (
          <ul className="grid grid-cols-2 gap-4 mb-8">
            {moveiesData &&
              moveiesData?.length > 0 &&
              moveiesData?.map((bookmark) => (
                <li
                  key={bookmark?.id + 9}
                  className="flex flex-col items-start "
                >
                  <div className="relative w-full">
                    <Image
                      className="w-full rounded-lg "
                      width={100}
                      height={100}
                      alt={bookmark?.backdrop_path || ""}
                      src={`https://image.tmdb.org/t/p/w400${bookmark?.poster_path}`}
                    />
                    <button
                      className="absolute top-4 right-4 aspect-square rounded-full bg-black/35 flex items-center justify-center p-3"
                      type="button"
                    >
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
                    </button>
                  </div>
                  <Link
                    href={`/movie/${bookmark?.id}`}
                    className="w-full h-full flex flex-col  gap-2"
                  >
                    <div className="flex flex-row gap-2 text-xs text-white/70">
                      <span>{bookmark?.release_date?.slice(0, 4)}</span>
                      <span>{bookmark?.original_language}</span>
                      <span>{bookmark?.adult && "18+"}</span>
                    </div>
                    <span className=" text-white font-medium text-[15px]">
                      {bookmark?.title}
                    </span>
                  </Link>
                </li>
              ))}
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
              tvshowData?.map((bookmark) => (
                <li
                  key={bookmark?.id + 5}
                  className="flex flex-col items-start "
                >
                  <div className="relative w-full">
                    <Image
                      className="w-full rounded-lg "
                      width={100}
                      height={100}
                      alt={bookmark?.poster_path || ""}
                      src={`https://image.tmdb.org/t/p/w400${bookmark?.poster_path}`}
                    />
                    <button
                      className="absolute top-4 right-4 aspect-square rounded-full bg-black/35 flex items-center justify-center p-3"
                      type="button"
                    >
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
                    </button>
                  </div>
                  <Link
                    href={`/movie/${bookmark?.id}`}
                    className="w-full h-full flex flex-col  gap-2"
                  >
                    <div className="flex flex-row gap-2 text-xs text-white/70">
                      <span>{bookmark?.first_air_date?.slice(0, 4)}</span>
                      <span>{bookmark?.original_language}</span>
                      <span>{bookmark?.adult && "18+"}</span>
                    </div>
                    <span className=" text-white font-medium text-[15px]">
                      {bookmark?.name}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
