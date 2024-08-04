import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";



const firebaseConfig = {
    apiKey: "AIzaSyC8wi3oZODWEOT-K-c-S8ko0BGR1FACmTc",
    authDomain: "blog-test1-8ed67.firebaseapp.com",
    projectId: "blog-test1-8ed67",
    storageBucket: "blog-test1-8ed67.appspot.com",
    messagingSenderId: "765429108420",
    appId: "1:765429108420:web:d5ea72e0b220ae41f88391"
  };
 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export {
  auth,
  db,
  getStorage,
  storage,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doc,
  setDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  signOut,
  getDoc,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  deleteDoc
};
