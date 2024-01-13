import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";

import { useEffect, useState } from "react";

export default function Auth() {
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

  return (
    <div>
      {!isAuth ? (
        <button onClick={() => signInWithGoogle()}>Sign in with google</button>
      ) : (
        isAuth && <button onClick={() => logOut()}>Logout</button>
      )}
    </div>
  );
}
