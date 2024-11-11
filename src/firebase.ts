import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCzz_cdo3Cgnw9GvMOLtc6EPd4478-e7kw",
  authDomain: "desafio-junior-63ee8.firebaseapp.com",
  projectId: "desafio-junior-63ee8",
  storageBucket: "desafio-junior-63ee8.firebasestorage.app",
  messagingSenderId: "461157884365",
  appId: "1:461157884365:web:57957c38448904f6b5e484"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
