import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
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

// Enable offline persistence for Firestore
try {
  // Enable offline persistence
  if (typeof window !== 'undefined') {
    import('firebase/firestore').then(({ enableNetwork, disableNetwork }) => {
      // Enable network by default
      enableNetwork(db).catch((error) => {
        console.warn('Failed to enable Firestore network:', error);
      });
    });
  }
} catch (error) {
  console.warn('Firestore offline persistence setup failed:', error);
}

// Development mode: Use emulators if available
if (import.meta.env.DEV && typeof window !== 'undefined') {
  const isLocalhost = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1';
  
  if (isLocalhost) {
    try {
      // Only connect to emulators if not already connected
      if (!auth.config.emulator) {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      }
      if (!(db as any)._delegate._databaseId.projectId.includes('demo-')) {
        connectFirestoreEmulator(db, 'localhost', 8080);
      }
      console.log('🔧 Connected to Firebase emulators for development');
    } catch (error) {
      console.log('ℹ️ Firebase emulators not available, using production Firebase');
    }
  }
}

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