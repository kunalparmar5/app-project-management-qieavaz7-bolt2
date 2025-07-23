import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8Bj8y9ho39vsmJrsh2p9nOg4OEh1RLok",
  authDomain: "sample-firebase-ai-app-44fa7.firebaseapp.com",
  projectId: "sample-firebase-ai-app-44fa7",
  storageBucket: "sample-firebase-ai-app-44fa7.appspot.com",
  messagingSenderId: "416107738718",
  appId: "1:416107738718:web:e6817d085038ca1d2466cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Recaptcha verifier for phone authentication
export const setupRecaptcha = (containerId: string): RecaptchaVerifier => {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved
    },
    'expired-callback': () => {
      // Response expired
    }
  });
};

export default app;