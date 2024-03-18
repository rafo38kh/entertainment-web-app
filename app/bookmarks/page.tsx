"use client";

import { useContext } from "react";

import { BookmarkContext } from "@/contexts/BookmarksContextProvider";
import { AuthContext } from "@/contexts/AuthContextProvider";

import { MovieData } from "@/types";
import { TVShowData } from "@/types";

import Card from "@/components/Card";
import SignIn from "@/components/SignIn";

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
        {movies.length > 0 && (
          <span className="text-2xl lg:text-4xl px-4">Movies</span>
        )}

        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 ">
          {movies?.map((movie) => {
            return (
              <Card
                key={movie?.id}
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
        {tvShows.length > 0 && (
          <span className="text-2xl lg:text-4xl px-4">TV Shows</span>
        )}

        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 ">
          {tvShows?.map((tvShow) => (
            <Card
              key={tvShow?.id}
              type="tvshow"
              data={tvShow}
              getKey={(data) => data?.id?.toString()}
              getPosterPath={(data) => data?.poster_path}
            />
          ))}
        </ul>
      </div>
    </div>
  ) : isAuth ? (
    <span className="text-2xl px-4">No bookmarks</span>
  ) : (
    <SignIn />
  );
}
