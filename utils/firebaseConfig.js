import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_KEY,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKE_KEY,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_KEY,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURAMENT_ID_KEY
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
