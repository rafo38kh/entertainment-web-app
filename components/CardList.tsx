import { useContext, useEffect } from "react";
import { Variants, motion } from "framer-motion";

import { AuthContext } from "@/contexts/AuthContextProvider";
import { BookmarkContext } from "@/contexts/BookmarksContextProvider";

import { useBookmarks } from "@/hooks/useBookmarks";
import { useGetUsersInfo } from "@/hooks/useGetUsresInfo";

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

  const list: Variants = {
    open: {
      transition: {
        bounce: 0,
        duration: 0.7,
        type: "spring",
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
    closed: {
      transition: {
        bounce: 0,
        duration: 0.3,
        type: "spring",
      },
    },
  };

  return (
    <div className="mt-8">
      <span className="text-2xl lg:text-4xl px-4">
        {type === "movie" ? "Movies" : "TV Shows"}
      </span>

      <motion.ul
        variants={list}
        animate="open" // Always animate to open after mounting
        initial={"closed"} // Initially closed if not mounted
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1, transition: { duration: 0.5 } }}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 "
      >
        {data?.results?.map((movie, i) => (
          <Card
            i={i}
            key={movie?.id}
            type={type}
            data={movie}
            getKey={(data) => data?.id?.toString()}
            getPosterPath={(data) => {
              return data?.poster_path;
            }}
          />
        ))}
      </motion.ul>
    </div>
  );
}
