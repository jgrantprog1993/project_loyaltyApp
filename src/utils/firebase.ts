// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjQKZrGpzP6AODANwu7aWtA71_w3uBTmI",
  authDomain: "loyaltyapp-6b8a8.firebaseapp.com",
  databaseURL: "https://loyaltyapp-6b8a8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "loyaltyapp-6b8a8",
  storageBucket: "loyaltyapp-6b8a8.appspot.com",
  messagingSenderId: "711994626610",
  appId: "1:711994626610:web:9cd23a4a2887504ec5222b",
  measurementId: "G-D48VZDSFG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//const analytics = getAnalytics(app);

export {app, auth};