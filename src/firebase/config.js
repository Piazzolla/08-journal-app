// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite' ;
import { getEnvironments } from "../helpers";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



 const {
   VITE_APIKEY,
   VITE_AUTHDOMAIN,
   VITE_DATABASEURL,
   VITE_PROJECTID,
   VITE_STORAGEBUCKET,
   VITE_MESSAGINGSENDERID,
   VITE_APPID,
   VITE_MEASUREMENTID,

 } = getEnvironments();


//PRODUCCION

//const {
//    VITE_APIKEY,
//    VITE_AUTHDOMAIN,
//    VITE_PROJECTID,
//    VITE_STORAGEBUCKET,
//    VITE_MESSAGINGSENDERID,
//    VITE_APPID,
//} = getEnvironments();


// Your web app's Firebase configuration
// const firebaseConfig = {
//  apiKey:VITE_APIKEY,
//  authDomain:VITE_AUTHDOMAIN,
//  projectId:VITE_PROJECTID,
//  storageBucket:VITE_STORAGEBUCKET,
//  messagingSenderId:VITE_MESSAGINGSENDERID,
//  appId:VITE_APPID,
// };



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//

//console.log(import.meta.env);

// TESTING 

// const {
//   VITE_APIKEY,
//   VITE_AUTHDOMAIN,
//   VITE_DATABASEURL,
//   VITE_PROJECTID,
//   VITE_STORAGEBUCKET,
//   VITE_MESSAGINGSENDERID,
//   VITE_APPID,
//   VITE_MEASUREMENTID,

// } = getEnvironments();
//console.log(env);

  const firebaseConfig = {
   apiKey: VITE_APIKEY,
   authDomain: VITE_AUTHDOMAIN,
   databaseURL: VITE_DATABASEURL,
   projectId: VITE_PROJECTID,
   storageBucket: VITE_STORAGEBUCKET,
   messagingSenderId: VITE_MESSAGINGSENDERID,
   appId: VITE_APPID,
   measurementId: VITE_MEASUREMENTID,
  };


  console.log(firebaseConfig);

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );