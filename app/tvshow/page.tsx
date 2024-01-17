"use client";
import { useQuery } from "@tanstack/react-query";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";
import Image from "next/image";

import api from "@/lib/api";

import { TVData } from "@/types";
import Link from "next/link";

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

  //   const tvShow = tvData.results;

  //   console.log("tvShowsData", tvShowsData);

  return (
    <ul className="grid grid-cols-2 gap-4 p-4">
      {tvShowsData?.map((show) => (
        <li key={show?.id} className="">
          <div className="relative w-full">
            <Image
              className="w-full rounded-lg "
              width={100}
              height={100}
              alt={show?.backdrop_path || ""}
              src={`https://image.tmdb.org/t/p/w400${show.poster_path}`}
            />
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

          <Link href={`/tvshow/${show?.id}`} className="flex flex-col gap-2 ">
            <span>{show?.name}</span>
            <span>{show?.original_language}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
