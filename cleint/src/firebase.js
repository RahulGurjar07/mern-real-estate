// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-2d422.firebaseapp.com",
  projectId: "mern-real-estate-2d422",
  storageBucket: "mern-real-estate-2d422.appspot.com",
  messagingSenderId: "375879672654",
  appId: "1:375879672654:web:d1e4c75ec7665e85e8741f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);