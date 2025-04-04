import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBc1st0uWWThq8_fF48eOgCUy-zj9hGYac",
  authDomain: "recipe-finder-f5c8f.firebaseapp.com",
  projectId: "recipe-finder-f5c8f",
  storageBucket: "recipe-finder-f5c8f.firebasestorage.app",
  messagingSenderId: "1046043967838",
  appId: "1:1046043967838:web:d9a85c6e54d77c85328fcf",
  measurementId: "G-DTTH84KLJ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);