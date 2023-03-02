import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBApmkCwVy8lqnz9S4Gse5c--235TfRtH4",
    authDomain: "shopping-food-022023.firebaseapp.com",
    databaseURL: "https://shopping-food-022023-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "shopping-food-022023",
    storageBucket: "shopping-food-022023.appspot.com",
    messagingSenderId: "372286605478",
    appId: "1:372286605478:web:90e1be26844d744c7acc67",
    measurementId: "G-CP73Q77XJZ"
};



export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);