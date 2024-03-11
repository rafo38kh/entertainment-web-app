"use client";
import { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookmarkContext } from "@/contexts/BookmarksContextProvider";

import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import api from "@/lib/api";

import Link from "next/link";
import Image from "next/image";

import Modal from "@/components/Modal";

import { MovieData, MovieImages, TVShowData, TVShowImages } from "@/types";
import { useBookmarks } from "@/hooks/useBookmarks";

type TVMoiveProps = {
  tvShowId?: string;
  movieId?: string;
};

export default function ShowAndMovie({ tvShowId, movieId }: TVMoiveProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getBookmarks, addBookmarks, removeBookmarks } = useBookmarks();
  const { bookmarks, setBookmarks } = useContext(BookmarkContext);
  const parsedUser = useGetUsersInfo();

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
  const MAX_LENGTH =
    images?.backdrops?.length && images?.backdrops?.length < 5
      ? images?.backdrops?.length
      : 6;

  useEffect(() => {
    if (parsedUser?.userID) {
      getBookmarks(parsedUser?.userID, setBookmarks);
    }
  }, []);

  const currentBookmarkId = bookmarks?.find(
    (bookmark) => bookmark?.movieId === data?.id?.toString()
  )?.docId as string;

  return (
    <>
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w400${
            data?.backdrop_path && data?.backdrop_path
          })`,
        }}
        className="w-full lg:rounded-xl bg-cover bg-center bg-no-repeat "
      >
        <div className="h-full md:h-full w-full lg:rounded-lg bg-gradient-to-bl from-black/50 to-black/15 px-6 p-4 backdrop-blur-xl backdrop-filter flex flex-col items-center justify-center">
          <div className="grid md:grid-cols-2 md:grid-rows-[1fr_auto] gap-4 h-max">
            <div className="w-full h-full relative lg:rounded-lg overflow-hidden">
              {data && "backdrop_path" in data && data?.backdrop_path ? (
                <Image
                  className="w-full rounded-md"
                  width={1000}
                  height={100}
                  alt={data?.backdrop_path || ""}
                  src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
                />
              ) : data && "poster_path" in data && data?.poster_path ? (
                <Image
                  width={1000}
                  height={100}
                  className="w-full rounded-md"
                  alt={data?.poster_path || ""}
                  src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
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
            </div>
            <div className="flex flex-col">
              <span className="text-xl lg:text-4xl font-medium">
                {data && "original_title" in data
                  ? data.original_title
                  : data?.name}
              </span>
              <span className="flex flex-row gap-2 text-white/85 font-light text-xs md:text-sm lg:text-lg">
                <span className="font-bold text-white">About</span>
                {data && "original_title" in data
                  ? data.original_title
                  : data?.name}
              </span>
              <p className="text-xs md:text-sm lg:text-lg text-white/85 font-light">
                {data?.overview}
              </p>
            </div>

            <button
              className="bg-black/35 flex items-center justify-center p-3 w-full rounded-lg md:col-start-1 md:col-end-3 lg:text-2xl"
              type="button"
              onClick={() => {
                if (currentBookmarkId) {
                  removeBookmarks(currentBookmarkId);
                } else {
                  if (data?.id && parsedUser?.userID) {
                    addBookmarks(
                      data.id?.toString(),
                      JSON.stringify(data),
                      parsedUser.userID,
                      movieId ? "movie" : "tv"
                    );
                  }
                }
              }}
            >
              {currentBookmarkId ? (
                <div className="flex flex-row justify-center items-center gap-2">
                  <span>Bookmarked</span>
                  <svg
                    width="12"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z"
                      fill="#FFF"
                    />
                  </svg>
                </div>
              ) : (
                <div className="flex flex-row justify-center items-center gap-2">
                  <span>Bookmark</span>
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
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="px-4 pb-8 flex flex-col gap-4">
          <div className="flex flex-row gap-2 items-center">
            <span>{data && "adult" in data && data.adult && "🔞"}</span>
          </div>
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

          {data && "seasons" in data && (
            <>
              <span>Seasons</span>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data?.seasons.map((seson) => (
                  <li
                    key={seson.id}
                    className="flex flex-col items-start mb-4 "
                  >
                    <Link
                      href={`/tvshow/${seson?.id}`}
                      className="w-full h-full"
                    >
                      {seson?.poster_path ? (
                        <Image
                          className="w-full h-full rounded-xl"
                          width={1000}
                          height={1000}
                          alt={seson?.poster_path || ""}
                          src={`https://image.tmdb.org/t/p/original${seson?.poster_path}`}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded  dark:bg-gray-700">
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

                      <div className="flex flex-row gap-2 text-xs text-white/70 md:text-sm lg:text-base">
                        <span>{seson.name}</span>
                        <span className="text-white/75">
                          ep:{seson.episode_count}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          {!!images?.backdrops.length && (
            <div className="flex flex-col gap-4">
              <span className="w-full h-[1px] bg-slate-400"></span>
              <span>Gallery</span>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images?.backdrops?.slice(0, 6)?.map((backdrop, index) => (
                  <li key={backdrop?.file_path}>
                    <button
                      aria-label={backdrop.file_path}
                      onClick={() => handleOpenImage(index)}
                      className="h-full w-full rounded-lg overflow-hidden"
                    >
                      <Image
                        className="w-full h-full"
                        width={backdrop?.width || 1000}
                        height={backdrop?.height || 1000}
                        alt={backdrop?.file_path || ""}
                        src={`https://image.tmdb.org/t/p/original${backdrop?.file_path}`}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
