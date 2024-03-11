"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import Image from "next/image";

import api from "@/lib/api";

import useDebounce from "@/hooks/useDebounce";

import { MultiSearchData } from "@/types";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const [input, setInput] = useState("");

  const debouncedValue = useDebounce({ initialSearchTerm: input, delay: 1500 });

  const { data: multiSearchData, isFetching: isMultiSearchFetching } = useQuery<
    MultiSearchData[]
  >({
    queryKey: ["multiSearch", debouncedValue],
    queryFn: () => api.multiSearch(debouncedValue || ""),
    enabled: !!debouncedValue,
  });

  useEffect(() => {
    setInput("");
  }, [pathname]);

  const submitInputValue = () => {
    router?.push(`/search/${input}`);
  };

  return (
    <div>
      <form
        action="#"
        onSubmit={submitInputValue}
        className="flex flex-row justify-center items-center gap-2 p-4"
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
          className="w-full bg-movieDarkBlue outline-none"
          type="text"
          value={input}
          placeholder="Search for movies or TV series"
          onChange={(event) => setInput(event.target.value)}
        />

        {isMultiSearchFetching && <span>Loading...</span>}
      </form>

      {input && (
        <ul className="flex flex-col">
          {multiSearchData?.map((data) => (
            <li
              className="border-b-[1px] border-movieGreyishBlue"
              key={data?.id}
            >
              <Link
                href={
                  data?.media_type === "movie"
                    ? `/movie/${data?.id}`
                    : `/tvshow/${data?.id}`
                }
                onClick={() => setInput("")}
                className="flex flex-row gap-2 p-2"
              >
                {data?.poster_path ? (
                  <Image
                    className="rounded-lg"
                    width={50}
                    height={50}
                    alt={data?.original_name || ""}
                    src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
                  />
                ) : (
                  <div className="h-[75px] w-[50px] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="96px"
                      height="96px"
                    >
                      <path fill="#90CAF9" d="M40 45L8 45 8 3 30 3 40 13z" />
                      <path fill="#E1F5FE" d="M38.5 14L29 14 29 4.5z" />
                      <path fill="#1565C0" d="M21 23L14 33 28 33z" />
                      <path
                        fill="#1976D2"
                        d="M28 26.4L23 33 33 33zM31.5 23A1.5 1.5 0 1 0 31.5 26 1.5 1.5 0 1 0 31.5 23z"
                      />
                    </svg>
                  </div>
                )}

                <div className="flex flex-col">
                  <span>
                    {data?.media_type === "movie" ? data?.title : data?.name}
                  </span>
                  <div className="flex flex-row gap-2">
                    <span>
                      {data?.media_type === "movie"
                        ? data?.release_date?.slice(0, 4)
                        : data?.first_air_date?.slice(0, 4)}
                    </span>
                    <span>{data?.media_type}</span>
                    <span>{data?.adult ? "18+" : null}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
          <button
            className="bg-movieGreyishBlue w-full p-2 flex flex-row justify-center items-center gap-1"
            onClick={submitInputValue}
          >
            View all results
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </ul>
      )}
    </div>
  );
}
