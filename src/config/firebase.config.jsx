// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_API_KEY,
  
  authDomain: env.VITE_API_URL,

  projectId: env.VITE_API_PROJECT_ID,

  storageBucket: env.VITE_API_STORAGE_BUCKET,

  messagingSenderId: env.VITE_SENDER_ID,

  appId: env.VITE_APP_ID,

  measurementId: env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

const analytics = getAnalytics(app);