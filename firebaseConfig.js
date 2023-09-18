import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "test2-c87e5.firebaseapp.com",
  databaseURL:
    "https://test2-c87e5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test2-c87e5",
  storageBucket: "test2-c87e5.appspot.com",
  messagingSenderId: "914137622961",
  appId: "1:914137622961:web:e95a69f971ae35e6d93590",
  measurementId: "G-HBVECC64FZ",
};

export const app = initializeApp(firebaseConfig);
export const analyticsFire = getAnalytics(app);
export const authFire = getAuth(app);
export const dbFire = getFirestore(app);
