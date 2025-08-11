import React, {
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../config/firebase";
import {
  handleFirebaseError,
  debugFirebaseConnection,
} from "../utils/firebaseDebug";
import { formatPhoneNumber, isValidPhoneNumber } from "../utils/auth";
import { AuthContext, AuthContextType, UserProfile } from "../contexts/AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Debug Firebase connection on mount
  useEffect(() => {
    if (import.meta.env.DEV) {
      debugFirebaseConnection().then((results) => {
        console.log("Firebase Debug Results:", results);
        if (results.errors.length > 0) {
          console.warn("Firebase connection issues detected:", results.errors);
        }
      });
    }
  }, []);

  // Create or update user profile in Firestore
  const createUserProfile = async (
    user: User,
    additionalData?: Partial<UserProfile>,
  ): Promise<UserProfile> => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const { displayName, email, phoneNumber, photoURL } = user;
        const createdAt = new Date();

        const newProfile: UserProfile = {
          uid: user.uid,
          email: email || "",
          displayName: displayName || "",
          phoneNumber: phoneNumber || null,
          photoURL: photoURL || null,
          createdAt,
          lastLoginAt: createdAt,
          emailVerified: user.emailVerified,
          preferences: {
            notifications: true,
            marketing: false,
            rememberMe: false,
          },
          profile: {
            firstName: displayName?.split(" ")[0] || "",
            lastName: displayName?.split(" ").slice(1).join(" ") || "",
          },
          propertyPreferences: {
            propertyType: [],
            budget: { min: 0, max: 0 },
            location: [],
            amenities: [],
          },
          savedProperties: [],
          viewedProperties: [],
          role: "user",
          isActive: true,
          ...additionalData,
        };

        try {
          await setDoc(userRef, newProfile);
          return newProfile;
        } catch (error) {
          const firebaseError = handleFirebaseError(error, "create user profile");
          throw firebaseError;
        }
      } else {
        // Update last login time
        const existingProfile = userSnap.data() as UserProfile;
        const updatedProfile = {
          ...existingProfile,
          lastLoginAt: new Date(),
          emailVerified: user.emailVerified,
        };

        try {
          await setDoc(userRef, updatedProfile, { merge: true });
          return updatedProfile;
        } catch (error) {
          const firebaseError = handleFirebaseError(error, "update user profile");
          throw firebaseError;
        }
      }
    } catch (error) {
      const firebaseError = handleFirebaseError(error, "get user profile");
      throw firebaseError;
    }
  };

  // Sign in with email and password
  const signIn = async (
    email: string,
    password: string,
    rememberMe = false,
  ): Promise<User> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Update user profile
      const profile = await createUserProfile(result.user);
      profile.preferences.rememberMe = rememberMe;
      await updateUserProfile(profile);

      return result.user;
    } catch (error) {
      const firebaseError = handleFirebaseError(error, "sign in");
      throw firebaseError;
    }
  };

  // Sign up with email and password
  const signUp = async (
    email: string,
    password: string,
    displayName: string,
  ): Promise<User> => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Update display name
      await updateProfile(result.user, { displayName });

      // Create user profile
      await createUserProfile(result.user, { displayName });

      return result.user;
    } catch (error) {
      const firebaseError = handleFirebaseError(error, "sign up");
      throw firebaseError;
    }
  };

  // Sign in with Google popup
  const signInWithGoogle = async (): Promise<User> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await createUserProfile(result.user);
      return result.user;
    } catch (error) {
      const firebaseError = handleFirebaseError(error, "Google sign in");
      throw firebaseError;
    }
  };

  // Sign in with Google redirect
  const signInWithGoogleRedirect = async (): Promise<void> => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error("Google redirect sign in error:", error);
      throw error;
    }
  };

  // Sign in with phone number
  const signInWithPhone = async (
    phoneNumber: string,
  ): Promise<ConfirmationResult> => {
    try {
      // Validate phone number format
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      if (!isValidPhoneNumber(formattedPhoneNumber)) {
        const error: Error & { code?: string } = new Error(
          "Invalid phone number format. Please include country code (e.g., +1234567890).",
        );
        error.code = "auth/invalid-phone-number";
        throw error;
      }

      // Check if recaptchaVerifier exists
      if (!window.recaptchaVerifier) {
        const error: Error & { code?: string } = new Error(
          "reCAPTCHA verifier not initialized. Please refresh the page and try again.",
        );
        error.code = "auth/captcha-check-failed";
        throw error;
      }

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        window.recaptchaVerifier,
      );
      return confirmationResult;
    } catch (error) {
      const firebaseError = handleFirebaseError(error, "phone sign in");
      throw firebaseError;
    }
  };

  // Confirm phone sign in with verification code
  const confirmPhoneSignIn = async (
    confirmationResult: ConfirmationResult,
    code: string,
  ): Promise<User> => {
    try {
      if (!code || code.length !== 6) {
        const error: Error & { code?: string } = new Error(
          "Please enter a valid 6-digit verification code.",
        );
        error.code = "auth/invalid-verification-code";
        throw error;
      }

      const result = await confirmationResult.confirm(code.trim());
      await createUserProfile(result.user);
      return result.user;
    } catch (error) {
      const firebaseError = handleFirebaseError(error, "phone confirmation");
      throw firebaseError;
    }
  };

  // Sign out
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Password reset error:", error);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (
    updates: Partial<UserProfile>,
  ): Promise<void> => {
    if (!currentUser) throw new Error("No user logged in");

    try {
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(userRef, updates, { merge: true });

      if (userProfile) {
        setUserProfile({ ...userProfile, ...updates });
      }
    } catch (error) {
      const firebaseError = handleFirebaseError(error, "profile update");
      throw firebaseError;
    }
  };

  // Get user profile by UID
  const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        return userSnap.data() as UserProfile;
      }
      return null;
    } catch (error) {
      const firebaseError = handleFirebaseError(error, "get user profile");
      throw firebaseError;
    }
  };

  // Delete user profile
  const deleteUserProfile = async (uid: string): Promise<void> => {
    if (!currentUser || currentUser.uid !== uid) {
      throw new Error("Unauthorized to delete this profile");
    }

    try {
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, { isActive: false }, { merge: true });

      if (userProfile) {
        setUserProfile({ ...userProfile, isActive: false });
      }
    } catch (error) {
      const firebaseError = handleFirebaseError(error, "delete user profile");
      throw firebaseError;
    }
  };

  // Save property to user's saved list
  const saveProperty = async (propertyId: string): Promise<void> => {
    if (!currentUser || !userProfile) throw new Error("No user logged in");

    try {
      const updatedSavedProperties = [
        ...(userProfile.savedProperties || []),
        propertyId,
      ];
      await updateUserProfile({ savedProperties: updatedSavedProperties });
    } catch (error) {
      const firebaseError = handleFirebaseError(error, "save property");
      throw firebaseError;
    }
  };

  // Remove property from user's saved list
  const removeSavedProperty = async (propertyId: string): Promise<void> => {
    if (!currentUser || !userProfile) throw new Error("No user logged in");

    try {
      const updatedSavedProperties = (userProfile.savedProperties || []).filter(
        (id) => id !== propertyId,
      );
      await updateUserProfile({ savedProperties: updatedSavedProperties });
    } catch (error) {
      const firebaseError = handleFirebaseError(error, "remove saved property");
      throw firebaseError;
    }
  };

  // Add property to user's viewed list
  const addViewedProperty = async (propertyId: string): Promise<void> => {
    if (!currentUser || !userProfile) throw new Error("No user logged in");

    try {
      const viewedProperties = userProfile.viewedProperties || [];
      if (!viewedProperties.includes(propertyId)) {
        const updatedViewedProperties = [...viewedProperties, propertyId];
        await updateUserProfile({ viewedProperties: updatedViewedProperties });
      }
    } catch (error) {
      const firebaseError = handleFirebaseError(error, "add viewed property");
      throw firebaseError;
    }
  };

  // Update property preferences
  const updatePropertyPreferences = async (
    preferences: UserProfile["propertyPreferences"],
  ): Promise<void> => {
    if (!currentUser) throw new Error("No user logged in");

    try {
      await updateUserProfile({ propertyPreferences: preferences });
    } catch (error) {
      const firebaseError = handleFirebaseError(
        error,
        "update property preferences",
      );
      throw firebaseError;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!mounted) return;

      setCurrentUser(user);

      if (user) {
        try {
          const profile = await createUserProfile(user);
          if (mounted) {
            setUserProfile(profile);
          }

          // Test database connection when user is authenticated
          console.log(
            "🔍 Testing database connection for authenticated user...",
          );
          try {
            const { databaseHealth } = await import("../utils/databaseHealth");
            const healthCheck = await databaseHealth.check();

            if (!healthCheck.isConnected) {
              console.warn(
                "⚠️ Database connection issues detected:",
                healthCheck.errors,
              );
            } else {
              console.log(
                "✅ Database connection healthy for authenticated user",
              );
            }
          } catch (error) {
            console.error("Database health check failed:", error);
          }
        } catch (error) {
          console.error("Error loading user profile:", error);
          if (mounted) {
            setUserProfile(null);
          }
        }
      } else {
        if (mounted) {
          setUserProfile(null);
        }
      }

      if (mounted) {
        setLoading(false);
      }
    });

    // Handle redirect result
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user && mounted) {
          await createUserProfile(result.user);
        }
      } catch (error) {
        console.error("Error handling redirect result:", error);
      }
    };

    handleRedirectResult();

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGoogleRedirect,
    signInWithPhone,
    confirmPhoneSignIn,
    logout,
    resetPassword,
    updateUserProfile,
    getUserProfile,
    deleteUserProfile,
    saveProperty,
    removeSavedProperty,
    addViewedProperty,
    updatePropertyPreferences,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
