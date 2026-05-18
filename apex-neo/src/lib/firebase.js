import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2Kfvg8o8QiA5NaH-xJIh3ZcD4G-msmx8",
  authDomain: "vortex-ffc84.firebaseapp.com",
  databaseURL: "https://vortex-ffc84-default-rtdb.firebaseio.com",
  projectId: "vortex-ffc84",
  storageBucket: "vortex-ffc84.firebasestorage.app",
  messagingSenderId: "417077673161",
  appId: "1:417077673161:web:d846837d4e8ff3d4b8e118",
  measurementId: "G-MVPHM94C49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

export default app;
