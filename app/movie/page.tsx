"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

import api from "@/lib/api";

import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";
import { useBookmarks } from "@/hooks/useBookmarks";

import { MoviesData } from "@/types";

export default function page() {
  const { addBookmarks } = useBookmarks();
  const parsedUser = useGetUsersInfo();

  const { data: moveiesData } = useQuery<MoviesData["results"]>({
    queryKey: ["movies"],
    queryFn: api.getMovies,
  });
  return;
  <div className="grid grid-cols-2  gap-4 p-4">
    {moveiesData?.map((movie) => (
      <li className="flex flex-col items-start " key={movie?.id}>
        <div className="relative w-full">
          <Image
            className="w-full rounded-lg "
            width={100}
            height={100}
            alt={movie?.backdrop_path || ""}
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          />
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
            <span>{movie?.release_date.slice(0, 4)}</span>
            <span>{movie?.original_language}</span>
            <span>{movie.adult ? "18+" : "PG"}</span>
            {/* <ul>{movie.genres?.at(0)}</ul> */}
          </div>
          <span className=" text-white font-medium text-[15px]">
            {movie?.title}
          </span>
        </Link>
      </li>
    ))}
  </div>;
}
