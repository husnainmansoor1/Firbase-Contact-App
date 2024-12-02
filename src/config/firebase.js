// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZRMnzk7c-SOJ1_Bb0mrAM0jFSu5hpDR0",
  authDomain: "vite-contact-e07b4.firebaseapp.com",
  projectId: "vite-contact-e07b4",
  storageBucket: "vite-contact-e07b4.firebasestorage.app",
  messagingSenderId: "442774599020",
  appId: "1:442774599020:web:778e8075cd04ae16b66f49",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
