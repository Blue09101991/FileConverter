// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZiIfU4UvvOy6cT4fHKEzwFi1RZcRZbtk",
    authDomain: "fileconverter-8e4f3.firebaseapp.com",
    projectId: "fileconverter-8e4f3",
    storageBucket: "fileconverter-8e4f3.appspot.com",
    messagingSenderId: "232676051081",
    appId: "1:232676051081:web:b848ee500b8b709cabde58",
    measurementId: "G-NZQB1BE8TY"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// export const app = initializeApp(firebaseConfig);
export const auth = getAuth()

export { app };