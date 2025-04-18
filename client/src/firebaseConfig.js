// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Log the environment variable for debugging
console.log("Firebase API Key from env:", process.env.REACT_APP_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "eventfull-8bfb3.firebaseapp.com",
  projectId: "eventfull-8bfb3",
  storageBucket: "eventfull-8bfb3.firebasestorage.app",
  messagingSenderId: "984545448051",
  appId: "1:984545448051:web:fb25d7e2131b033b73da06",
  measurementId: "G-CXZPE0JV59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth }; // Export auth instance for use in other components 