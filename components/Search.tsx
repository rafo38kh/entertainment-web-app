"use client";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import useDebounce from "@/hooks/useDebounce";

import { MultiSearchData } from "@/types";
import Link from "next/link";

export default function Search() {
  const [input, setInput] = useState("");

  const debouncedValue = useDebounce({ initialSearchTerm: input, delay: 1500 });

  const { data: multiSearchData, isFetching: isMultiSearchFetching } = useQuery<
    MultiSearchData[]
  >({
    queryKey: ["multiSearch", debouncedValue],
    queryFn: () => api.multiSearch(debouncedValue || ""),
    enabled: !!debouncedValue,
  });

  return (
    <div>
      <form
        className="flex flex-row justify-center items-center p-4"
        action="#"
      >
        <label htmlFor="">
          <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
              fill="#FFF"
            />
          </svg>
        </label>
        <input
          className="w-full p-2 bg-movieDarkBlue outline-none"
          type="text"
          value={input}
          placeholder="Search for movies or TV series"
          onChange={(event) => setInput(event.target.value)}
        />

        {isMultiSearchFetching && <span>Loading...</span>}
      </form>

      <ul className="flex flex-col">
        {multiSearchData?.map((data) => (
          <li className="border mb-2" key={data?.id}>
            <Link
              href={
                data?.media_type === "movie"
                  ? `/movie/${data?.id}`
                  : `/tvshow/${data?.id}`
              }
              className="flex flex-row gap-2"
            >
              {data?.poster_path ? (
                <Image
                  width={50}
                  height={50}
                  alt={data?.original_name || ""}
                  src={`https://image.tmdb.org/t/p/w200${data?.poster_path}`}
                />
              ) : (
                <div className="h-[75px] w-[50px] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                    />
                  </svg>
                </div>
              )}

              <div className="flex flex-col">
                <span>
                  {data?.media_type === "movie" ? data?.title : data?.name}
                </span>
                <div className="flex flex-row gap-2">
                  <span>{data?.adult && "18+"}</span>
                  <span>{data?.media_type}</span>
                  <span>
                    {data?.media_type === "movie"
                      ? data?.release_date?.slice(0, 4)
                      : data?.first_air_date?.slice(0, 4)}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
