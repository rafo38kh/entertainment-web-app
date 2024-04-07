"use client";
import { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { BookmarkContext } from "@/contexts/BookmarksContextProvider";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import api from "@/lib/api";

import Link from "next/link";
import Image from "next/image";

import Modal from "@/components/Modal";

import { MovieData, MovieImages, TVShowData, TVShowImages } from "@/types";
import { useBookmarks } from "@/hooks/useBookmarks";
import BookmarkModal from "./BookmarkModal";
import { AuthContext } from "@/contexts/AuthContextProvider";

type TVMoiveProps = {
  tvShowId?: string;
  movieId?: string;
};

export default function ShowAndMovie({ tvShowId, movieId }: TVMoiveProps) {
  const { isAuth } = useContext(AuthContext);
  const { bookmarks, setBookmarks } = useContext(BookmarkContext);

  const parsedUser = useGetUsersInfo();
  const { getBookmarks, addBookmarks, removeBookmarks } = useBookmarks();

  const [imageIndex, setImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const openModal = () => {
    setIsSignInModalOpen(true);
    document.body.classList.add("modal-open");
  };

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

  const {
    data: movieTeasers,
    error: movieTeasersError,
    isError: isMovieTeasersError,
    isLoading: isMovieTeasersLoading,
  } = useQuery<{ results: { type: string; key: string }[] }>({
    queryKey: ["movieTeasers", movieData?.id],
    queryFn: () => api.getMovieTeasers("movie", movieData?.id),
    enabled: !!movieData?.id,
  });

  const {
    data: tvTeasers,
    error: tvTeasersError,
    isError: isTvTeasersError,
    isLoading: isTvTeasersLoading,
  } = useQuery<{ results: { type: string; key: string }[] }>({
    queryKey: ["tvTeasers", tvData?.id],
    queryFn: () => api.getMovieTeasers("tv", tvData?.id),
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

  const IFrameMovieKey = movieTeasers?.results
    ?.filter((movie) => movie?.type === "Teaser" || movie?.type === "Trailer")
    ?.map((movie) => movie?.key)
    ?.at(0);

  const IFrameTVKey = tvTeasers?.results
    ?.filter((movie) => movie?.type === "Trailer")
    ?.map((movie) => movie?.key)
    ?.at(0);

  const currentIFrameKey = movieId ? IFrameMovieKey : IFrameTVKey;
  const backdrop =
    data?.backdrop_path &&
    `url(https://image.tmdb.org/t/p/w400${data?.backdrop_path})`;

  return (
    <>
      <div
        style={{ backgroundImage: backdrop }}
        className="relative w-full lg:rounded-xl bg-cover bg-center bg-no-repeat overflow-hidden"
      >
        {currentIFrameKey && (
          <iframe
            className="h-full w-full absolute overflow-hidden scale-150"
            allow="autoplay; encrypted-media"
            src={`https://www.youtube.com/embed/${currentIFrameKey}?autoplay=1&loop=1&playlist=${currentIFrameKey}&controls=0&disablekb=0&fs=0&iv_load_policy=3&rel=0`}
          />
        )}

        <div className="h-full md:h-full w-full lg:rounded-lg bg-gradient-to-bl from-black/50 to-black/15 px-6 p-4 backdrop-blur-sm backdrop-filter flex flex-col items-center justify-center">
          <div className="grid md:grid-cols-2 md:grid-rows-[1fr_auto] gap-4 h-max">
            <div className="w-full h-full relative lg:rounded-lg overflow-hidden">
              {data && "backdrop_path" in data && data?.backdrop_path ? (
                <Image
                  className="w-full rounded-md"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                  priority={false}
                  loading="lazy"
                  width={1000}
                  height={100}
                  alt={data?.backdrop_path || ""}
                  src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
                />
              ) : data && "poster_path" in data && data?.poster_path ? (
                <Image
                  className="w-full rounded-md"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                  priority={false}
                  loading="lazy"
                  width={1000}
                  height={100}
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

            <div className="flex flex-col gap-2">
              <span className="text-xl font-medium md:text-[3rem] md:leading-[3rem] lg:text-[4rem] lg:leading-[4rem] lg:py-4">
                {data && "original_title" in data
                  ? data.original_title
                  : data?.name}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#000000b3" }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              className="bg-black/35 flex items-center justify-center p-3 w-full rounded-lg md:col-start-1 md:col-end-3 lg:text-2xl"
              type="button"
              onClick={() => {
                if (!isAuth) {
                  openModal();
                }

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
              <div className="flex flex-row justify-center items-center gap-2">
                <span>{currentBookmarkId ? "Bookmarked" : "Bookmark"}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    fill={currentBookmarkId ? "#fff" : "none"}
                  />
                </svg>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
      <div>
        <div className="px-4 pb-8 flex flex-col gap-4">
          <div className="w-full pt-4 grid md:grid-cols-2 justify-center items-start gap-4">
            <div className="w-full max-w-[40rem] md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2">
              <span className="flex flex-row gap-2 text-white/85 font-light ">
                <span className="font-bold text-white">About</span>
                {data && "original_title" in data
                  ? data.original_title
                  : data?.name}
              </span>
              <p className=" text-white/85 font-light">{data?.overview}</p>
            </div>
            <div className="flex flex-col gap-4 w-full md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2">
              <span>{data && "adult" in data && data.adult && "🔞"}</span>
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
                  <span className="font-bold text-white">
                    Production Companies
                  </span>
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
            </div>
          </div>

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
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                            objectFit: "cover",
                          }}
                          priority={false}
                          loading="lazy"
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
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 3 } }}
                    className="min-w-[10rem] min-h-[6.0625rem]"
                    key={backdrop?.file_path}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      aria-label={backdrop.file_path}
                      onClick={() => handleOpenImage(index)}
                      className="h-full w-full rounded-lg overflow-hidden cursor-zoom-in"
                    >
                      <Image
                        className="w-full h-full"
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          objectFit: "cover",
                        }}
                        priority={false}
                        loading="lazy"
                        width={backdrop?.width || 1000}
                        height={backdrop?.height || 1000}
                        alt={backdrop?.file_path || ""}
                        src={`https://image.tmdb.org/t/p/original${backdrop?.file_path}`}
                      />
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <Modal
          images={images}
          maxLegnth={MAX_LENGTH}
          imageIndex={imageIndex}
          isModalOpen={isModalOpen}
          setImageIndex={setImageIndex}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {isSignInModalOpen && (
        <BookmarkModal setIsSignInModalOpen={setIsSignInModalOpen} />
      )}
    </>
  );
}
