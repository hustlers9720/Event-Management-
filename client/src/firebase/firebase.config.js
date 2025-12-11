
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoXH4-xC8KPWX5tKUBuO5oDhlQGm2VE_c",
  authDomain: "event-1f81c.firebaseapp.com",
  projectId: "event-1f81c",
  storageBucket: "event-1f81c.firebasestorage.app",
  messagingSenderId: "571834852779",
  appId: "1:571834852779:web:fd9a631777ce0c2ec59eee",
  measurementId: "G-KH8DYTR9M6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export default app