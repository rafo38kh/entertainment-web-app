import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";

export default function Auth({
  isSignOutShowing,
  setIsSignOutShowing,
}: {
  isSignOutShowing: boolean;
  setIsSignOutShowing: Dispatch<SetStateAction<boolean>>;
}) {
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
      setIsSignOutShowing(false);

      window?.localStorage?.removeItem("user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!isAuth && <button onClick={signInWithGoogle}>Sign in</button>}

      {isAuth && isSignOutShowing && (
        <button
          onClick={logOut}
          className="bg-black p-4 whitespace-nowrap absolute top-10 right-0 rounded"
        >
          Sign out
        </button>
      )}
    </div>
  );
}
