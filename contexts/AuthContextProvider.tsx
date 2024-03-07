"use client";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useMemo,
  ReactNode,
  createContext,
} from "react";

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";

type AuthContext = {
  isAuth: boolean | null;
  logOut: () => void;
  signInWithGoogle: () => void;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

const initialContext = {
  isAuth: null,
  logOut: () => {},
  setIsAuth: () => {},
  signInWithGoogle: () => {},
};

export const AuthContext = createContext<AuthContext>(initialContext);

type AuthContextProviderProps = { children: ReactNode | ReactNode[] };

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const user =
      typeof window !== "undefined"
        ? window?.localStorage?.getItem("user")
        : null;

    if (user !== null) setIsAuth(true);
  }, []);

  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      const authInfo = {
        userID: response?.user?.uid,
        email: response?.user?.email,
        name: response?.user?.displayName,
        profilePhoto: response?.user?.photoURL,
      };

      if (response?.user) {
        setIsAuth(true);

        window?.localStorage?.setItem("user", JSON.stringify(authInfo));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setIsAuth(false);

      window?.localStorage?.removeItem("user");
    } catch (error) {
      console.log(error);
    }
  };

  const value = { isAuth, setIsAuth, signInWithGoogle, logOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
