"use client";
import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import Image from "next/image";

import api from "@/lib/api";

import { useBookmarks } from "@/hooks/useBookmarks";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import { TVData } from "@/types";

export default function TvShowsPage() {
  const {
    data: tvShowsData,
    error: TVShowsError,
    isError: isTVShowsError,
    isLoading: isTVShowsLoading,
  } = useQuery<TVData[]>({
    queryKey: ["shows"],
    queryFn: api.getTvShows,
  });
  const { addBookmarks } = useBookmarks();
  const parsedUser = useGetUsersInfo();

  return (
    <ul className="grid grid-cols-2 gap-4 p-4">
      {tvShowsData?.map((show) => (
        <li
          key={show?.id}
          className="w-full h-full flex flex-col justify-between gap-2"
        >
          <div className="relative w-full h-full">
            {show?.poster_path ? (
              <Image
                className="w-full rounded-lg "
                width={100}
                height={100}
                alt={show?.backdrop_path || ""}
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
            <span>{show?.adult && "18+"}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
