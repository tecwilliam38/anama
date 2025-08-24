// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKTG-WloNNi_JL-07RCT0rf8dt7oKVKls",
  authDomain: "anama-73119.firebaseapp.com",
  projectId: "anama-73119",
  storageBucket: "anama-73119.firebasestorage.app",
  messagingSenderId: "312097516241",
  appId: "1:312097516241:web:f8b1589ca09ceff12433f0",
  measurementId: "G-G06QGBB7CK"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export {app, storage, db};

