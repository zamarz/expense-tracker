import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import {
  FIREBASE_API,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DB_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_ID,
  FIREBASE_APP_ID,
} from "@env";

// const firebaseConfig = {
//   apiKey: "AIzaSyCK-ZHY-dAXDEwzvXnGdW84ZdGD9awj9X0",
//   authDomain: "test2-c87e5.firebaseapp.com",
//   databaseURL:
//     "https://test2-c87e5-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "test2-c87e5",
//   storageBucket: "test2-c87e5.appspot.com",
//   messagingSenderId: "914137622961",
//   appId: "1:914137622961:web:e95a69f971ae35e6d93590",
// };

const firebaseConfig = {
  apiKey: FIREBASE_API,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DB_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_ID,
  appId: FIREBASE_APP_ID,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyA7jcanmb-APOWyiWU_aAVcey7FKjbREl8",
//   authDomain: "cc-expenses-tracker.firebaseapp.com",
//   projectId: "cc-expenses-tracker",
//   storageBucket: "cc-expenses-tracker.appspot.com",
//   messagingSenderId: "56431060535",
//   appId: "1:56431060535:web:f29906aff5f7f51645c1b2",
//   measurementId: "G-RHHGG2881M",
// };

export const app = initializeApp(firebaseConfig);
export const authFire = getAuth(app);
export const dbFire = getFirestore(app);
