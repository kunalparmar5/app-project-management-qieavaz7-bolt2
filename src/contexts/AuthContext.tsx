import { createContext } from "react";
import { User, ConfirmationResult } from "firebase/auth";

export interface UserProfile {
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
  profile: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    gender?: "male" | "female" | "other";
    occupation?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
    };
    emergencyContact?: {
      name?: string;
      phone?: string;
      relationship?: string;
    };
  };
  propertyPreferences?: {
    propertyType?: string[];
    budget?: {
      min?: number;
      max?: number;
    };
    location?: string[];
    amenities?: string[];
  };
  savedProperties?: string[];
  viewedProperties?: string[];
  role: "user" | "agent" | "admin";
  isActive: boolean;
}

export interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string,
    rememberMe?: boolean,
  ) => Promise<User>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  signInWithGoogleRedirect: () => Promise<void>;
  signInWithPhone: (phoneNumber: string) => Promise<ConfirmationResult>;
  confirmPhoneSignIn: (
    confirmationResult: ConfirmationResult,
    code: string,
  ) => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  getUserProfile: (uid: string) => Promise<UserProfile | null>;
  deleteUserProfile: (uid: string) => Promise<void>;
  saveProperty: (propertyId: string) => Promise<void>;
  removeSavedProperty: (propertyId: string) => Promise<void>;
  addViewedProperty: (propertyId: string) => Promise<void>;
  updatePropertyPreferences: (
    preferences: UserProfile["propertyPreferences"],
  ) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

