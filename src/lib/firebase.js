import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

//  Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVjOnV73Xo3WGzWWkEtEcO6PcxSbXvCy0",
  authDomain: "next-js-proj-45cbe.firebaseapp.com",
  projectId: "next-js-proj-45cbe",
  storageBucket: "next-js-proj-45cbe.firebasestorage.app",
  messagingSenderId: "619320984243",
  appId: "1:619320984243:web:238b633d546efbdb7926c6",
  measurementId: "G-ND94GJ56GP"
};

// To avoid Next.js multiple initialization errors 
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };