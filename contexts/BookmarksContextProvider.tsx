"use client";

import {
  createContext,
  useState,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import { MovieBookmark } from "@/types";
type BookmarkContext = {
  bookmarks: MovieBookmark[];
  setBookmarks: Dispatch<SetStateAction<MovieBookmark[]>>;
};

export const BookmarkContext = createContext<BookmarkContext>({
  bookmarks: [],
  setBookmarks: () => {},
});

type BookmarksContextProviderProps = { children: ReactNode | ReactNode[] };

const BookmarkContextProvider = ({
  children,
}: BookmarksContextProviderProps) => {
  const [bookmarks, setBookmarks] = useState<MovieBookmark[]>([]);

  const value = useMemo(
    () => ({ bookmarks, setBookmarks }),
    [bookmarks, setBookmarks]
  );

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContextProvider;
