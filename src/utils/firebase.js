import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD35KFc4xxq3Vn6-5cnB5MnNWcmghgJcRM",
  authDomain: "policy-perfect.firebaseapp.com",
  projectId: "policy-perfect",
  storageBucket: "policy-perfect.firebasestorage.app",
  messagingSenderId: "756410485093",
  appId: "1:756410485093:web:ceab839f090726d32d398c"
};

export const isFirebaseConfigured = !!firebaseConfig.apiKey;

let app;
let firestore = null;
let storage = null;
let auth = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    firestore = getFirestore(app);
    storage = getStorage(app);
    auth = getAuth(app);
    console.log('Firebase initialized successfully.');
  } catch (error) {
    console.error('Firebase initialization failed:', error);
  }
} else {
  console.warn('Firebase configuration missing. Falling back to local database simulation.');
}

export { app, firestore, storage, auth };
