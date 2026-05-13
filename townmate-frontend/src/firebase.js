import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfFR68hLYW7ecsABkyIrkSlVAm8P-9cqc",
  authDomain: "townmate-e9dd3.firebaseapp.com",
  projectId: "townmate-e9dd3",
  storageBucket: "townmate-e9dd3.firebasestorage.app",
  messagingSenderId: "150134269623",
  appId: "1:150134269623:web:9287a8c580fe66810dcf32"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
