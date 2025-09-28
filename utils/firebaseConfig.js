import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID_KEY,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKE_KEY,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_KEY,
  appId: process.env.FIREBASE_APP_ID_KEY,
  measurementId: process.env.FIREBASE_MEASURAMENT_ID_KEY
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
