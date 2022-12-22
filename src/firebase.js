// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZBxS5gdMbNPFXNqUdO7AA0xekH2jMOkc",
  authDomain: "upload-file-be08b.firebaseapp.com",
  projectId: "upload-file-be08b",
  storageBucket: "upload-file-be08b.appspot.com",
  messagingSenderId: "715470168494",
  appId: "1:715470168494:web:325af852cd29265436283f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
