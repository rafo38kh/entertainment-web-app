"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import useMediaQuery from "@/hooks/useMediaQuery";
import { AuthContext } from "@/contexts/AuthContextProvider";

import { useBookmarks } from "@/hooks/useBookmarks";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";
import { BookmarkContext } from "@/contexts/BookmarksContextProvider";
import { MovieData, TVShowData } from "@/types";
import { cardItemVariants, cardList, cardItem } from "@/animations/index";
import BookmarkModal from "./BookmarkModal";

type CardProps<T> = {
  data: T;
  type: "movie" | "tvshow";
  getKey: (data: T) => string;
  getPosterPath: (data: T) => string | undefined;
};

export default function Card<T>({
  data,
  type,
  getKey,
  getPosterPath,
}: CardProps<T>) {
  const { isAuth } = useContext(AuthContext);
  const { bookmarks } = useContext(BookmarkContext);
  const isDesktop = useMediaQuery("(min-width: 960px)");

  const parsedUser = useGetUsersInfo();
  const { addBookmarks, removeBookmarks } = useBookmarks();

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const openModal = () => {
    setIsSignInModalOpen(true);
    document.body.classList.add("modal-open");
  };

  const currentBookmarkId = bookmarks?.find(
    (bookmark) => bookmark?.movieId == getKey(data)
  );

  // const isSmallDevice = useMediaQuery("only screen and (max-width : 1024px)");

  return (
    <>
      <motion.li
        key={getKey(data)}
        variants={cardItemVariants}
        whileHover={{ scale: 0.97 }}
        className="flex flex-col items-start group"
      >
        <motion.div
          variants={cardList}
          initial={isDesktop && "hidden"}
          // initial="hidden"
          whileHover="visible"
          className="relative w-full h-full lg:flex lg:items-end"
        >
          <Link href={`/${type}/${getKey(data)}`}>
            {getPosterPath(data) ? (
              <Image
                width={1000}
                height={100}
                alt={getPosterPath(data) || ""}
                className="w-full rounded-lg h-full"
                src={`https://image.tmdb.org/t/p/original${getPosterPath(
                  data
                )}`}
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
          </Link>
          <motion.button
            type="button"
            variants={cardItem}
            className="absolute bg-black/75 aspect-square h-10 right-0 rounded-full top-2 lg:top-auto lg:w-5/6 lg:bottom-2 mx-4 lg:rounded-lg lg:py-2 lg:hidden lg:group-hover:flex lg:justify-center lg:items-center"
            onClick={() => {
              if (!isAuth) {
                openModal();
              }
              if (data) {
                if (currentBookmarkId) {
                  removeBookmarks(currentBookmarkId?.docId);
                } else if (parsedUser?.userID) {
                  addBookmarks(
                    getKey(data),
                    JSON.stringify(data),
                    parsedUser.userID,
                    type === "movie" ? "movie" : "tv"
                  );
                }
              }
            }}
          >
            <div className="flex justify-center items-center gap-2">
              <span className="hidden lg:inline-block">
                {currentBookmarkId ? "Bookmarked" : "Bookmark"}
              </span>
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
        </motion.div>

        <Link
          href={`/${type}/${getKey(data)}`}
          className="w-full  flex flex-col"
        >
          <div className="flex flex-row gap-2  text-xs lg:text-sm text-white/70 ">
            <span className="group-hover:text-red-500">
              {type === "movie"
                ? (data as MovieData).release_date.slice(0, 4)
                : (data as TVShowData).first_air_date.slice(0, 4)}
            </span>
            <span className="group-hover:text-red-500">
              {(data as MovieData | TVShowData)?.original_language}
            </span>
            <span className="group-hover:text-red-500">
              {(data as MovieData | TVShowData)?.adult && "18+"}
            </span>
          </div>

          <span className="text-white font-medium text-base lg:text-lg truncate group-hover:underline group-hover:text-red-500">
            {type === "movie"
              ? (data as MovieData).title
              : (data as TVShowData).name}
          </span>
        </Link>
      </motion.li>

      {isSignInModalOpen && (
        <BookmarkModal setIsSignInModalOpen={setIsSignInModalOpen} />
      )}
    </>
  );
}
