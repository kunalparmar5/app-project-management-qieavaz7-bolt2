import { auth, db } from "../config/firebase";
import { connectAuthEmulator, connectFirestoreEmulator } from "firebase/auth";

// Firebase connection debugging utility
export const debugFirebaseConnection = async () => {
  const results = {
    auth: false,
    firestore: false,
    network: false,
    errors: [] as string[],
  };

  try {
    // Test Auth connection
    console.log("Testing Firebase Auth connection...");
    if (auth) {
      results.auth = true;
      console.log("✅ Firebase Auth initialized successfully");
    } else {
      results.errors.push("Firebase Auth not initialized");
    }
  } catch (error) {
    results.errors.push(`Auth error: ${error}`);
    console.error("❌ Firebase Auth error:", error);
  }

  try {
    // Test Firestore connection
    console.log("Testing Firestore connection...");
    if (db) {
      results.firestore = true;
      console.log("✅ Firestore initialized successfully");
    } else {
      results.errors.push("Firestore not initialized");
    }
  } catch (error) {
    results.errors.push(`Firestore error: ${error}`);
    console.error("❌ Firestore error:", error);
  }

  try {
    // Test network connectivity to Firebase
    console.log("Testing network connectivity...");
    const response = await fetch("https://firebase.googleapis.com/", {
      method: "HEAD",
      mode: "no-cors",
    });
    results.network = true;
    console.log("✅ Network connectivity to Firebase successful");
  } catch (error) {
    results.errors.push(`Network error: ${error}`);
    console.error("❌ Network connectivity error:", error);
  }

  // Log Firebase config (without sensitive data)
  console.log("Firebase Config Check:");
  console.log(
    "- Project ID:",
    import.meta.env.VITE_FIREBASE_PROJECT_ID || "sample-firebase-ai-app-44fa7",
  );
  console.log(
    "- Auth Domain:",
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
      "sample-firebase-ai-app-44fa7.firebaseapp.com",
  );

  return results;
};

// Check if running in development mode with emulators
export const checkEmulators = () => {
  const isEmulator =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (isEmulator && import.meta.env.DEV) {
    console.log("🔧 Development mode detected");
    console.log("Consider using Firebase emulators for local development");

    // Uncomment these lines if you want to use Firebase emulators
    // try {
    //   connectAuthEmulator(auth, 'http://localhost:9099');
    //   connectFirestoreEmulator(db, 'localhost', 8080);
    //   console.log('✅ Connected to Firebase emulators');
    // } catch (error) {
    //   console.log('ℹ️ Emulators not available or already connected');
    // }
  }
};

// Enhanced error handler for Firebase operations
export const handleFirebaseError = (error: any, operation: string) => {
  console.error(`Firebase ${operation} error:`, error);

  // Common Firebase error codes and user-friendly messages
  const errorMessages: { [key: string]: string } = {
    "auth/network-request-failed":
      "Network connection failed. Please check your internet connection.",
    "auth/too-many-requests":
      "Too many failed attempts. Please try again later.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/unauthorized-domain":
      "This domain is not authorized. Please contact support.",
    "auth/invalid-phone-number":
      "Please enter a valid phone number with country code (e.g., +1234567890).",
    "auth/invalid-verification-code":
      "The verification code is invalid. Please check and try again.",
    "auth/code-expired":
      "The verification code has expired. Please request a new one.",
    "auth/missing-phone-number":
      "Phone number is required for SMS verification.",
    "auth/quota-exceeded": "SMS quota exceeded. Please try again later.",
    "auth/captcha-check-failed":
      "reCAPTCHA verification failed. Please try again.",
    "permission-denied":
      "🔒 FIRESTORE PERMISSION DENIED\n\n" +
      "Your Firebase project needs proper security rules. Follow these steps:\n\n" +
      "1. Go to Firebase Console (https://console.firebase.google.com)\n" +
      "2. Select your project: sample-firebase-ai-app-44fa7\n" +
      "3. Navigate to Firestore Database > Rules\n" +
      "4. Replace the rules with:\n\n" +
      "rules_version = '2';\n" +
      "service cloud.firestore {\n" +
      "  match /databases/{database}/documents {\n" +
      "    // Allow authenticated users to read/write properties\n" +
      "    match /properties/{document} {\n" +
      "      allow read, write: if request.auth != null;\n" +
      "    }\n" +
      "    // Allow authenticated users to read/write their own user data\n" +
      "    match /users/{userId} {\n" +
      "      allow read, write: if request.auth != null && request.auth.uid == userId;\n" +
      "    }\n" +
      "  }\n" +
      "}\n\n" +
      "5. Click 'Publish' to save the rules\n" +
      "6. Refresh this page and try again",
    "firestore/permission-denied":
      "Database access denied. Please check your Firestore security rules in the Firebase console.",
    "auth/unauthenticated":
      "You must be signed in to view properties. Please sign in and try again.",
    unavailable: "Service is currently unavailable. Please try again later.",
  };

  const userMessage =
    errorMessages[error.code] ||
    error.message ||
    "An unexpected error occurred.";

  // Additional context for permission-denied errors
  if (
    error.code === "permission-denied" ||
    error.code === "firestore/permission-denied"
  ) {
    console.warn("🔒 FIRESTORE SECURITY RULES ISSUE DETECTED");
    console.warn("\n📋 STEP-BY-STEP SOLUTION:");
    console.warn(
      "1. Open Firebase Console: https://console.firebase.google.com",
    );
    console.warn("2. Select project: sample-firebase-ai-app-44fa7");
    console.warn("3. Go to Firestore Database > Rules");
    console.warn("4. Copy and paste these rules:");
    console.warn(`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write properties
    match /properties/{document} {
      allow read, write: if request.auth != null;
    }
    // Allow authenticated users to read/write their own user data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}`);
    console.warn("5. Click 'Publish' to save the rules");
    console.warn("6. Refresh the page and try again\n");

    // Show current auth status
    console.warn("🔍 Current Authentication Status:");
    console.warn("- User authenticated:", !!auth.currentUser);
    if (auth.currentUser) {
      console.warn("- User ID:", auth.currentUser.uid);
      console.warn("- Email:", auth.currentUser.email);
    } else {
      console.warn("- No user is currently signed in");
      console.warn("- You may need to sign in first");
    }
  }

  return {
    code: error.code,
    message: userMessage,
    originalError: error,
  };
};
