// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5Jra03eEaMrKSP2lw1QdSOhYiIHEUdEo",
  authDomain: "sanskritbingo.firebaseapp.com",
  projectId: "sanskritbingo",
  storageBucket: "sanskritbingo.firebasestorage.app",
  messagingSenderId: "62251647480",
  appId: "1:62251647480:web:96644175b132f00374960d",
  measurementId: "G-H0G9X20EY9"
};

// Initialize Firebase
const wordsApp = initializeApp(firebaseConfig, 'words-database');
const wordsDb = getFirestore(wordsApp);

export { wordsDb };
