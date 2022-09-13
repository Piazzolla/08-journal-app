// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite' ;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZso44inkdl40te62B_OAzUGUbHz9lkTc",
  authDomain: "react-cursos-17a80.firebaseapp.com",
  projectId: "react-cursos-17a80",
  storageBucket: "react-cursos-17a80.appspot.com",
  messagingSenderId: "709108289382",
  appId: "1:709108289382:web:d2b446353e17799393c2a7"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );