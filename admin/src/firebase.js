// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1qx-6UHp6Jz_a0x1GLTopI2mEG9sZzFg",
  authDomain: "craft-shop-f0928.firebaseapp.com",
  projectId: "craft-shop-f0928",
  storageBucket: "craft-shop-f0928.appspot.com",
  messagingSenderId: "77869535700",
  appId: "1:77869535700:web:39d4c852b20243cd20c641"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app