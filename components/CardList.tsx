import { useContext, useEffect } from "react";
import { motion } from "framer-motion";

import { AuthContext } from "@/contexts/AuthContextProvider";
import { BookmarkContext } from "@/contexts/BookmarksContextProvider";

import { useBookmarks } from "@/hooks/useBookmarks";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

import { list } from "@/animations/index";

import Card from "./Card";

import { MoviesData, TVShowsData } from "@/types";

type CardProps = {
  type: "movie" | "tvshow";
  data: MoviesData | TVShowsData | undefined;
};

export default function CardList({ data, type }: CardProps) {
  const { getBookmarks } = useBookmarks();
  const { setBookmarks } = useContext(BookmarkContext);
  const { isAuth } = useContext(AuthContext);
  const parsedUser = useGetUsersInfo();

  useEffect(() => {
    if (isAuth && parsedUser?.userID) {
      getBookmarks(parsedUser?.userID, setBookmarks);
    }
  }, [isAuth]);

  return (
    <div className="mt-8">
      <span className="text-2xl lg:text-4xl px-4">
        {type === "movie" ? "Movies" : "TV Shows"}
      </span>

      <motion.ul
        animate="open"
        variants={list}
        initial="closed"
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 "
      >
        {data?.results?.map((movie) => (
          <Card
            type={type}
            data={movie}
            key={movie?.id}
            getKey={(data) => data?.id?.toString()}
            getPosterPath={(data) => {
              2;
              return data?.poster_path;
            }}
          />
        ))}
      </motion.ul>
    </div>
  );
}
