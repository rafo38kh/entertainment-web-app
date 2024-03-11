import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { useBookmarks } from "@/hooks/useBookmarks";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";
import { BookmarkContext } from "@/contexts/BookmarksContextProvider";

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
  const parsedUser = useGetUsersInfo();
  const { addBookmarks, removeBookmarks } = useBookmarks();
  const { bookmarks } = useContext(BookmarkContext);

  const currentBookmarkId = bookmarks?.find(
    (bookmark) => bookmark?.movieId == getKey(data)
  );

  return (
    <li className="flex flex-col items-start " key={getKey(data)}>
      <div className="relative w-full h-full">
        <Link href={`/${type}/${getKey(data)}`}>
          {getPosterPath(data) ? (
            <Image
              className="w-full rounded-lg h-full"
              width={1000}
              height={100}
              alt={getPosterPath(data) || ""}
              src={`https://image.tmdb.org/t/p/original${getPosterPath(data)}`}
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
        <button
          className="absolute top-4 right-4 aspect-square rounded-full bg-black/35 flex items-center justify-center p-3"
          type="button"
          onClick={() => {
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
          {currentBookmarkId ? (
            <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z"
                fill="#FFF"
              />
            </svg>
          ) : (
            <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                stroke="#FFF"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          )}
        </button>
      </div>

      <Link href={`/${type}/${getKey(data)}`} className="w-full  flex flex-col">
        <div className="flex flex-row gap-2 text-xs lg:text-sm text-white/70">
          <span>
            {type === "movie"
              ? data?.release_date.slice(0, 4)
              : data?.first_air_date.slice(0, 4)}
          </span>
          <span>{data?.original_language && data?.original_language}</span>
          <span>{data?.adult && "18+"}</span>
        </div>

        <span className=" text-white font-medium text-base lg:text-lg truncate">
          {type === "movie" ? data?.title : data?.name}
        </span>
      </Link>
    </li>
  );
}
