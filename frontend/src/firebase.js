// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBudzY8bDCcu1qxZZx_fT6t3uFxh5fIBUQ",
  authDomain: "medantra-bae5a.firebaseapp.com",
  projectId: "medantra-bae5a",
  storageBucket: "medantra-bae5a.firebasestorage.app",
  messagingSenderId: "948167597578",
  appId: "1:948167597578:web:78139a80f53918f2c8c9f3",
  measurementId: "G-KLN5KJ2MFB"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };