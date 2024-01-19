"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import api from "@/lib/api";

import { useBookmarks } from "@/hooks/useBookmarks";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import { MoviesData } from "@/types";
import { MovieBookmark } from "@/types";

export default function Bookmarks() {
  const parsedUser = useGetUsersInfo();
  const { getBookmarks } = useBookmarks();

  const [bookmarks, setBookmarks] = useState<MovieBookmark[]>([]);

  useEffect(() => {
    if (parsedUser?.userID) {
      getBookmarks(parsedUser?.userID, setBookmarks);
    }
  }, []);

  const { data: moveiesData } = useQuery<MoviesData["results"]>({
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

  return (
    <ul className="grid grid-cols-2 gap-4">
      {moveiesData &&
        moveiesData?.length > 0 &&
        moveiesData?.map((bookmark) => (
          <li key={bookmark?.id} className="flex flex-col items-start ">
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
              href={`/movie/${bookmark?.id}`}
              className="w-full h-full flex flex-col  gap-2"
            >
              <div className="flex flex-row gap-2 text-xs text-white/70">
                <span>{bookmark?.release_date?.slice(0, 4)}</span>
                <span>{bookmark?.original_language}</span>
                <span>{bookmark?.adult ? "18+" : "PG"}</span>
              </div>
              <span className=" text-white font-medium text-[15px]">
                {bookmark?.title}
              </span>
            </Link>
          </li>
        ))}
    </ul>
  );
}
