import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdYtEKAty57zprC7Gza4fmYCb4doSHybI",
  authDomain: "entertainment-a0fd2.firebaseapp.com",
  projectId: "entertainment-a0fd2",
  storageBucket: "entertainment-a0fd2.appspot.com",
  messagingSenderId: "1033409740589",
  appId: "1:1033409740589:web:f9b94d4f213d68ac935da4",
  measurementId: "G-54HK9X9FFJ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });
