import {
  query,
  where,
  addDoc,
  onSnapshot,
  collection,
  QueryDocumentSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../config/firebase";

import { MovieBookmark } from "@/types";

export function useBookmarks() {
  const docCollectionRef = collection(db, "bookmarks");

  const getBookmarks = (
    userID: string,
    setState: (value: MovieBookmark[]) => void
  ) => {
    try {
      const docQuery = query(docCollectionRef, where("userID", "==", userID));
      const unsubscribe = onSnapshot(docQuery, (snapshot) => {
        const bookmarkedMovies: MovieBookmark[] = snapshot.docs.map(
          (doc: QueryDocumentSnapshot) => ({
            ...(doc.data() as MovieBookmark),
            docId: doc.id,
          })
        );

        setState(bookmarkedMovies);
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error creating folder:");
    }
  };

  const addBookmarks = async (
    movieId: number,
    userID: string,
    type: string
  ) => {
    try {
      await addDoc(docCollectionRef, { movieId, userID, type });
    } catch (error) {
      console.log(error);
    }
  };

  const removeBookmarks = async (docID: string) => {
    try {
      const docRef = doc(db, "bookmarks", docID);

      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  return { getBookmarks, addBookmarks, removeBookmarks };
}
