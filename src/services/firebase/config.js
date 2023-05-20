import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCzHWnlFjJOsfMh0xabylPxg_Wy-zZwvA8",
    authDomain: "projectmania-e73ae.firebaseapp.com",
    projectId: "projectmania-e73ae",
    storageBucket: "projectmania-e73ae.appspot.com",
    messagingSenderId: "97090738607",
    appId: "1:97090738607:web:90f69531ecea0ee2e0375a"
};

initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();

export const auth = getAuth();