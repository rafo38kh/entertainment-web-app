"use client";

import { useContext } from "react";

import { BookmarkContext } from "@/contexts/BookmarksContextProvider";
import { AuthContext } from "@/contexts/AuthContextProvider";

import { MovieData } from "@/types";
import { TVShowData } from "@/types";

import Card from "@/components/Card";

export default function Bookmarks() {
  const { isAuth } = useContext(AuthContext);
  const { bookmarks } = useContext(BookmarkContext);

  const { movies, tvShows } = (bookmarks ?? []).reduce(
    (acc: { movies: MovieData[]; tvShows: TVShowData[] }, bookmark) => {
      const parsedMovie = JSON.parse(bookmark?.movie);
      const formattedBookmark = {
        ...parsedMovie,
        bookmarkType: bookmark?.type,
        docId: bookmark?.docId,
      };

      if (bookmark?.type === "movie") {
        acc.movies.push(formattedBookmark as MovieData);
      } else if (bookmark?.type === "tv") {
        acc.tvShows.push(formattedBookmark as TVShowData);
      }

      return acc;
    },
    { movies: [], tvShows: [] }
  );

  return isAuth && bookmarks.length > 0 ? (
    <div className="px-4">
      <div>
        <span className="text-2xl">Movies</span>

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
          {movies?.map((movie) => {
            return (
              <Card
                data={movie}
                type="movie"
                getKey={(data) => data?.id?.toString()}
                getPosterPath={(data) => data?.poster_path}
              />
            );
          })}
        </ul>
      </div>

      <div>
        <span className="text-2xl">TV Shows</span>

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {tvShows?.map((tvShow) => (
            <Card
              type="tvshow"
              data={tvShow}
              getKey={(data) => data?.id?.toString()}
              getPosterPath={(data) => data?.poster_path}
            />
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <span className="text-2xl px-4">No bookmarks</span>
  );
}
