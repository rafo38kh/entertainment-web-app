"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import Link from "next/link";
import Image from "next/image";

import Modal from "@/components/Modal";

import { MovieData, MovieImages, TVShowData, TVShowImages } from "@/types";

type TVMoiveProps = {
  tvShowId?: string;
  movieId?: string;
};

export default function ShowAndMovie({ tvShowId, movieId }: TVMoiveProps) {
  const MAX_LENGTH = 5;

  const [imageIndex, setImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: movieData,
    error: movieError,
    isError: isMovieError,
    isLoading: isMovieLoading,
  } = useQuery<MovieData>({
    queryKey: ["movie", movieId],
    queryFn: () => api.getMovie(movieId || ""),
    enabled: !!movieId,
  });

  const {
    data: movieImages,
    error: movieImagesError,
    isError: isMovieImagesError,
    isLoading: isMovieImagesLoading,
  } = useQuery<MovieImages>({
    queryKey: ["movieImages", movieData?.id],
    queryFn: () => api.getMovieImages(movieData?.id),
    enabled: !!movieData?.id,
  });

  const {
    data: tvData,
    error: TVShowError,
    isError: isTVShowError,
    isLoading: isTVShowLoading,
  } = useQuery<TVShowData>({
    queryKey: ["show", tvShowId],
    queryFn: () => api.getTvShow(tvShowId || ""),
    enabled: !!tvShowId,
  });

  const {
    data: tvShowImages,
    error: tvShowImagesError,
    isError: istvShowImagesError,
    isLoading: istvShowImagesLoading,
  } = useQuery<TVShowImages>({
    queryKey: ["tvImages", tvData?.id],
    queryFn: () => api.getTVShowImages(tvData?.id),
    enabled: !!tvData?.id,
  });

  const handleOpenImage = (index: number) => {
    setIsModalOpen(true);
    setImageIndex(index);
  };

  const data = movieData ? movieData : tvData;
  const images = movieImages ? movieImages : tvShowImages;

  return (
    <>
      <div className="relative">
        {data && "backdrop_path" in data ? (
          <Image
            className="w-full mb-6"
            width={100}
            height={100}
            alt={data?.backdrop_path || ""}
            src={`https://image.tmdb.org/t/p/w400${data?.backdrop_path}`}
          />
        ) : (
          <Image
            className="w-full mb-6"
            width={100}
            height={100}
            alt={data?.poster_path || ""}
            src={`https://image.tmdb.org/t/p/w400${data?.poster_path}`}
          />
        )}

        <div className="px-4 flex flex-col gap-4">
          <span className=" text-4xl font-medium">
            {data && "original_title" in data
              ? data.original_title
              : data?.name}
          </span>
          <div className="flex flex-row gap-2 items-center">
            <span className="flex flex-row gap-2 text-white/85 font-light">
              <span className="font-bold text-white">About</span>
              {data && "original_title" in data
                ? data.original_title
                : data?.name}
            </span>
            <span>{data && "adult" in data && data.adult && "🔞"}</span>
          </div>
          <p className="text-white/85 font-light">{data?.overview}</p>
          <ul className="flex flex-row gap-2 overflow-auto flex-wrap">
            <span className="font-bold text-white">Genres</span>
            {data?.genres?.map((genere, index) => (
              <li
                className="bg-white/90 text-semiDarkBlue font-light px-2 whitespace-nowrap rounded-md"
                key={index}
              >
                {genere?.name}
              </li>
            ))}
          </ul>
          {data && "release_date" in data ? (
            <p className="font-bold text-white flex flex-row gap-2">
              Released
              <span className="font-light text-white/85">
                {data?.release_date}
              </span>
            </p>
          ) : (
            <p className="font-bold text-white flex flex-row gap-2">
              First Air Date{" "}
              <span className="font-light text-white/85">
                {data?.first_air_date}
              </span>
            </p>
          )}
          {data && "production_companies" in data ? (
            <div>
              <span className="font-bold text-white">Production Companies</span>
              <ul>
                {data?.production_companies?.map((company, idx) => (
                  <li className="ml-4 font-light text-white/85" key={idx}>
                    {company?.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <span className="font-light text-white/85 flex flex-row gap-2">
            <span className="font-bold text-white ">Original language</span>
            {data && "original_language" in data && data?.original_language}
          </span>
          <Link
            className="font-bold text-white flex flex-row gap-2 "
            href={`${data?.homepage}`}
          >
            homepage{" "}
            <span className="font-light text-white/85 hover:underline">
              link
            </span>
          </Link>
          {data && "runtime" in data && (
            <div className="flex flex-row gap-1">
              <span className="font-bold text-white">Duration</span>
              <span className="font-light text-white/85">
                {data?.runtime} min
              </span>
            </div>
          )}
          {data && "popularity" in data && (
            <span className="font-light text-white/85 flex flex-row gap-2">
              <span className="font-bold text-white">popularity</span>{" "}
              {data?.popularity}
            </span>
          )}
          <span className="w-full h-[1px] bg-slate-400"></span>
          {data && "seasons" in data && (
            <>
              <span>Seasons</span>
              <ul className="grid grid-cols-2 gap-4">
                {data?.seasons.map((seson) => (
                  <li key={seson.id}>
                    <Link
                      href={`/tvshow/${seson?.id}`}
                      className="flex flex-col gap-2 w-full h-full justify-between"
                    >
                      {seson?.poster_path ? (
                        <Image
                          className="w-full h-full rounded-xl"
                          width={100}
                          height={100}
                          alt={seson?.poster_path || ""}
                          src={`https://image.tmdb.org/t/p/w400${seson?.poster_path}`}
                        />
                      ) : (
                        <svg
                          className="w-full h-full"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 48 48"
                          width="96px"
                          height="96px"
                        >
                          <path
                            fill="#90CAF9"
                            d="M40 45L8 45 8 3 30 3 40 13z"
                          />
                          <path fill="#E1F5FE" d="M38.5 14L29 14 29 4.5z" />
                          <path fill="#1565C0" d="M21 23L14 33 28 33z" />
                          <path
                            fill="#1976D2"
                            d="M28 26.4L23 33 33 33zM31.5 23A1.5 1.5 0 1 0 31.5 26 1.5 1.5 0 1 0 31.5 23z"
                          />
                        </svg>
                      )}

                      <div className="flex flex-col ">
                        <span>{seson.name}</span>
                        <span className="text-xs text-white/75">
                          ep:{seson.episode_count}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="flex flex-col gap-4">
            <span className="w-full h-[1px] bg-slate-400"></span>
            <span>Gallery</span>
            <ul className="grid grid-cols-2 gap-2">
              {images?.backdrops?.slice(0, 6)?.map((backdrop, index) => (
                <li key={backdrop?.file_path}>
                  <button
                    aria-label={backdrop.file_path}
                    onClick={() => handleOpenImage(index)}
                  >
                    <Image
                      className="w-full"
                      width={backdrop?.width}
                      height={backdrop?.height}
                      alt={backdrop?.file_path || ""}
                      src={`https://image.tmdb.org/t/p/w400${backdrop?.file_path}`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          maxLegnth={MAX_LENGTH}
          imageIndex={imageIndex}
          movieImages={movieImages}
          tvShowImages={tvShowImages}
          isModalOpen={isModalOpen}
          setImageIndex={setImageIndex}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}
