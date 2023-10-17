// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwMMC9R6XQsx2BUX8ZeiF7rzyHd0c5ScE",
  authDomain: "nextchronicle.firebaseapp.com",
  projectId: "nextchronicle",
  storageBucket: "nextchronicle.appspot.com",
  messagingSenderId: "858422003472",
  appId: "1:858422003472:web:2aef3b792d1877d6964795",
  measurementId: "G-6QCLKME2V5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);