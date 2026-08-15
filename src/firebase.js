import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA6Gx3fMtXH2olrkKbj7vM9bHpeOpDRNFk",
    authDomain: "diana-beauty-booking.firebaseapp.com",
    databaseURL: "https://diana-beauty-booking-default-rtdb.firebaseio.com",
    projectId: "diana-beauty-booking",
    storageBucket: "diana-beauty-booking.firebasestorage.app",
    messagingSenderId: "197579334100",
    appId: "1:197579334100:web:bec9bdfc1528466695f641"
}

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
