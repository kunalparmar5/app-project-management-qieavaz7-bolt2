import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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
  AuthError
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../config/firebase';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  photoURL?: string;
  createdAt: Date;
  lastLoginAt: Date;
  emailVerified: boolean;
  preferences: {
    notifications: boolean;
    marketing: boolean;
    rememberMe: boolean;
  };
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<User>;
  signUp: (email: string, password: string, displayName: string) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  signInWithGoogleRedirect: () => Promise<void>;
  signInWithPhone: (phoneNumber: string) => Promise<ConfirmationResult>;
  confirmPhoneSignIn: (confirmationResult: ConfirmationResult, code: string) => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Create or update user profile in Firestore
  const createUserProfile = async (user: User, additionalData?: any): Promise<UserProfile> => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const { displayName, email, phoneNumber, photoURL } = user;
      const createdAt = new Date();
      
      const newProfile: UserProfile = {
        uid: user.uid,
        email: email || '',
        displayName: displayName || '',
        phoneNumber: phoneNumber || undefined,
        photoURL: photoURL || undefined,
        createdAt,
        lastLoginAt: createdAt,
        emailVerified: user.emailVerified,
        preferences: {
          notifications: true,
          marketing: false,
          rememberMe: false
        },
        ...additionalData
      };

      try {
        await setDoc(userRef, newProfile);
        return newProfile;
      } catch (error) {
        console.error('Error creating user profile:', error);
        throw error;
      }
    } else {
      // Update last login time
      const existingProfile = userSnap.data() as UserProfile;
      const updatedProfile = {
        ...existingProfile,
        lastLoginAt: new Date(),
        emailVerified: user.emailVerified
      };
      
      await setDoc(userRef, updatedProfile, { merge: true });
      return updatedProfile;
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string, rememberMe = false): Promise<User> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Update user profile
      const profile = await createUserProfile(result.user);
      profile.preferences.rememberMe = rememberMe;
      await updateUserProfile(profile);
      
      return result.user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, displayName: string): Promise<User> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      await updateProfile(result.user, { displayName });
      
      // Create user profile
      await createUserProfile(result.user, { displayName });
      
      return result.user;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  // Sign in with Google popup
  const signInWithGoogle = async (): Promise<User> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await createUserProfile(result.user);
      return result.user;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  // Sign in with Google redirect
  const signInWithGoogleRedirect = async (): Promise<void> => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error('Google redirect sign in error:', error);
      throw error;
    }
  };

  // Sign in with phone number
  const signInWithPhone = async (phoneNumber: string): Promise<ConfirmationResult> => {
    try {
      // Note: This requires reCAPTCHA setup in the component
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      return confirmationResult;
    } catch (error) {
      console.error('Phone sign in error:', error);
      throw error;
    }
  };

  // Confirm phone sign in with verification code
  const confirmPhoneSignIn = async (confirmationResult: ConfirmationResult, code: string): Promise<User> => {
    try {
      const result = await confirmationResult.confirm(code);
      await createUserProfile(result.user);
      return result.user;
    } catch (error) {
      console.error('Phone confirmation error:', error);
      throw error;
    }
  };

  // Sign out
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    if (!currentUser) throw new Error('No user logged in');
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, updates, { merge: true });
      
      if (userProfile) {
        setUserProfile({ ...userProfile, ...updates });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          const profile = await createUserProfile(user);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    // Handle redirect result
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          await createUserProfile(result.user);
        }
      } catch (error) {
        console.error('Error handling redirect result:', error);
      }
    };

    handleRedirectResult();

    return unsubscribe;
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
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};