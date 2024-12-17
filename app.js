// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUHHGPBdN2VAWaF_J7wYqZ54sPBxy1RFs",
  authDomain: "tenderlicitaciones-9ba50.firebaseapp.com",
  projectId: "tenderlicitaciones-9ba50",
  storageBucket: "tenderlicitaciones-9ba50.firebasestorage.app",
  messagingSenderId: "531013447459",
  appId: "1:531013447459:web:07580f26176abe2fe62696",
  measurementId: "G-E9RJCXF5MC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
