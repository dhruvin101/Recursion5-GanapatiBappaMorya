import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAriRpjcteQG-aQ-mfvCUfnOxx3-vawecY",
  authDomain: "recursion-8807c.firebaseapp.com",
  projectId: "recursion-8807c",
  storageBucket: "recursion-8807c.appspot.com",
  messagingSenderId: "778431195372",
  appId: "1:778431195372:web:0a02c1a63f48e173ff5dc9",
  measurementId: "G-D4MNR2LMTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);