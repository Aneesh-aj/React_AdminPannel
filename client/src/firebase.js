
// Initialize Firebase




import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "authentication-525e8.firebaseapp.com",
  projectId: "authentication-525e8",
  storageBucket: "authentication-525e8.appspot.com",
  messagingSenderId: "929305375410",
  appId: "1:929305375410:web:6371c11f0dcb42596e4fab"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
