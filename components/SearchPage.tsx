"use client";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { useBookmarks } from "@/hooks/useBookmarks";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import api from "@/lib/api";

import { MultiSearchData } from "@/types";
import CardLoading from "./CardLoading";

type SearchPageProp = {
  searchValue: string;
};

const placeholderImageUrl = "/assets/thumbnails/large.js";

export default function SearchPage({ searchValue }: SearchPageProp) {
  const { addBookmarks } = useBookmarks();
  const parsedUser = useGetUsersInfo();

  // data: moveiesData,
  // error: moviesError,
  // isError: isMoviesError,
  // isLoading: isMoviesLoading,

  const {
    data: multiSearchData,
    error: multiSearchDataError,
    isError: isMultiSearchDataError,
    isLoading: isMultiSearchData,
    isFetching: isMultiSearchFetching,
  } = useQuery<MultiSearchData[]>({
    queryKey: ["multiSearch"],
    queryFn: () => api.multiSearch(searchValue || ""),
    enabled: !!searchValue,
  });

  return isMultiSearchData ? (
    <CardLoading />
  ) : (
    <div>
      <div className="flex flex-row gap-2  p-4">
        <span>Search results for</span>
        <span className="font-bold">{`'${searchValue}'`}</span>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-4 p-4">
        {multiSearchData?.map((movie) => (
          <li className="flex flex-col items-start " key={movie?.id}>
            <div className="relative w-full">
              {/* <Image
                priority
                src={`https://image.tmdb.org/t/p/w400${movie?.poster_path}`}
                alt="Placeholder"
                layout="fill"
                placeholder="blur"
                objectFit="cover"
              /> */}

              {movie &&
              "poster_path" in movie &&
              movie?.poster_path &&
              !isMultiSearchData ? (
                <Image
                  width={100}
                  height={100}
                  className="w-full rounded-lg h-60"
                  alt={movie?.poster_path || ""}
                  src={`https://image.tmdb.org/t/p/w400${movie?.poster_path}`}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded py-10 dark:bg-gray-700">
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
              className="w-full h-full flex flex-col  gap-2"
            >
              <div className="flex flex-row gap-2 text-xs text-white/70">
                <span>
                  {movie?.release_date
                    ? movie?.release_date.slice(0, 4)
                    : movie?.first_air_date?.slice(0, 4)}
                </span>
                <span>{movie?.original_language}</span>
                <span>{movie?.adult && "18+"}</span>
              </div>

              <span className=" text-white font-medium text-[15px] truncate">
                {movie?.title ? movie?.title : movie?.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
