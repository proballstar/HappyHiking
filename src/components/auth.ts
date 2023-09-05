// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApTWQXf0i0-YDIbq0TiDnPc5QBnDj3-lM",
  authDomain: "happy-hikers-393217.firebaseapp.com",
  projectId: "happy-hikers-393217",
  storageBucket: "happy-hikers-393217.appspot.com",
  messagingSenderId: "676426091764",
  appId: "1:676426091764:web:2bdd1b0a633124a778e2a1",
  measurementId: "G-2E0DB8GT48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;