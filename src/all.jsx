VITE_FIREBASE_API_KEY=AIzaSyDDTskOwYTSfCDi4D-tlmURucFBslB8x9w
VITE_FIREBASE_AUTH_DOMAIN=ecommerce-web-d4558.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ecommerce-web-d4558
VITE_FIREBASE_STORAGE_BUCKET=ecommerce-web-d4558.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=841656300000
VITE_FIREBASE_APP_ID=1:841656300000:web:316bca94b6e830c04afb85



import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
