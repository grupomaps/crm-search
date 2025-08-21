import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  // apiKey: "AIzaSyAJeF8VtrPYFJhYFtm1n4sj_NXLrcP8t_g",
  // authDomain: "crm-tfgestao.firebaseapp.com",
  // projectId: "crm-tfgestao",
  // storageBucket: "crm-tfgestao.firebasestorage.app",
  // messagingSenderId: "214326679546",
  // appId: "1:214326679546:web:5102847e9f1ad98d7e7643",
  // measurementId: "G-L9QS3K0R1S"
};




const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

