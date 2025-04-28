// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTjA3SolD5r6QV85kA71ehYJyPNEoNCF4",
  authDomain: "supermall-c0553.firebaseapp.com",
  projectId: "supermall-c0553",
  storageBucket: "supermall-c0553.firebasestorage.app",
  messagingSenderId: "1029192376562",
  appId: "1:1029192376562:web:fb8da1200e5c5e4aca706b",
  measurementId: "G-CEHC68260H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { storage ,auth, db, collection, getDocs };