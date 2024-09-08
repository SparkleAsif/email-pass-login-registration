// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPQ7pfsgzhRAMrHL3Z-ZfJkHCcejE0al0",
  authDomain: "email-pass-auth-ddc35.firebaseapp.com",
  projectId: "email-pass-auth-ddc35",
  storageBucket: "email-pass-auth-ddc35.appspot.com",
  messagingSenderId: "266031641186",
  appId: "1:266031641186:web:7dd7f362adfde65a34173b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;