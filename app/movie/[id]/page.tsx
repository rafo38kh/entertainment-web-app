"use client";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/api";

import { MovieData, MovieImages } from "@/types";

type Params = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Params) {
  const {
    data: movieData,
    error: movieError,
    isError: isMovieError,
    isLoading: isMovieLoading,
  } = useQuery<MovieData>({
    queryKey: ["movie"],
    queryFn: () => api.getMovie(params?.id),
    enabled: !!params?.id,
  });

  const {
    data: movieImages,
    error: movieImagesError,
    isError: isMovieImagesError,
    isLoading: isMovieImagesLoading,
  } = useQuery<MovieImages>({
    queryKey: ["images"],
    queryFn: () => api.getMovieImages(movieData?.id),
    enabled: !!movieData?.id,
  });

  console.log("movieImages", movieImages);

  return (
    <div>
      {movieData?.backdrop_path && (
        <Image
          className="w-full mb-6"
          width={100}
          height={100}
          alt={movieData?.backdrop_path || ""}
          src={`https://image.tmdb.org/t/p/w400${movieData?.backdrop_path}`}
        />
      )}

      <div className="px-4 flex flex-col gap-2">
        <span className=" text-4xl font-medium">
          {movieData?.original_title}
        </span>
        <p>{movieData?.overview}</p>
        <ul className="flex flex-row gap-2 ">
          Genre:{" "}
          {movieData?.genres?.map((genere, index) => (
            <li
              className="bg-white/90 text-semiDarkBlue px-2  rounded-md"
              key={index}
            >
              {genere?.name}
            </li>
          ))}
        </ul>

        <span>Released: {movieData?.release_date}</span>
        <span>Original language: {movieData?.original_language}</span>
        <Link href={`${movieData?.homepage}`}>homepage: link</Link>
        <span>Duration: {movieData?.runtime} min</span>
        <ul className="grid grid-cols-2 gap-2">
          {movieImages?.backdrops.map((backdrop) => (
            <li key={backdrop?.file_path}>
              <Image
                className="w-full"
                width={backdrop?.width}
                height={backdrop?.height}
                alt={backdrop?.file_path || ""}
                src={`https://image.tmdb.org/t/p/w400${backdrop?.file_path}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
