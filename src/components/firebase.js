// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "fir-login-1157b.firebaseapp.com",
  projectId: "fir-login-1157b",
  storageBucket: "fir-login-1157b.appspot.com",
  messagingSenderId: "365216522831",
  appId: "1:365216522831:web:f85cd862c69d026b63c03a",
  measurementId: "G-BT0JP9M6W0"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);