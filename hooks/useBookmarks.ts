import {
  addDoc,
  onSnapshot,
  collection,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { db } from "../config/firebase";

import { MovieBookmark } from "@/types";

export function useBookmarks() {
  const docCollectionRef = collection(db, "bookmarks");

  const getBookmarks = async () => {
    try {
      const unsubscribe = onSnapshot(docCollectionRef, (snapshot) => {
        const bookmarkedMovies: MovieBookmark[] = snapshot.docs.map(
          (doc: QueryDocumentSnapshot) => ({
            ...(doc.data() as MovieBookmark),
            docId: doc.id,
          })
        );

        console.log(bookmarkedMovies);
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error creating folder:");
    }
  };

  const addBookmarks = async (movieId: number, userID: string) => {
    try {
      await addDoc(docCollectionRef, { movieId, userID });
    } catch (error) {
      console.log(error);
    }
  };

  return { getBookmarks, addBookmarks };
}
