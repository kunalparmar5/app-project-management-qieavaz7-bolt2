import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  QueryConstraint,
  Timestamp,
} from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { handleFirebaseError } from "../utils/firebaseDebug";

// Property data interface matching your database schema
export interface Property {
  id?: string;
  title: string;
  description: string;
  propertyType: string;
  price: string;
  location: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  amenities: string[];
  images: string[];
  type: "rent" | "buy";
  rating?: number;
  reviews?: number;
  isVerified: boolean;
  postedBy: string;
  postedDate: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  ownerId: string;
  status: "active" | "inactive" | "sold" | "rented";
  featured?: boolean;
  viewCount?: number;
}

// Property filters interface
export interface PropertyFilters {
  location?: string;
  propertyType?: string;
  type?: "rent" | "buy";
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  minSqft?: number;
  maxSqft?: number;
}

// Pagination interface
export interface PaginationOptions {
  limit?: number;
  lastDoc?: DocumentSnapshot;
}

class PropertyService {
  private collectionName = "properties";

  // Create a new property
  async createProperty(
    propertyData: Omit<Property, "id" | "createdAt" | "updatedAt">,
  ): Promise<string> {
    try {
      const now = Timestamp.now();
      const propertyWithTimestamps = {
        ...propertyData,
        createdAt: now,
        updatedAt: now,
        status: propertyData.status || "active",
        isVerified: propertyData.isVerified || false,
        viewCount: 0,
      };

      const docRef = await addDoc(
        collection(db, this.collectionName),
        propertyWithTimestamps,
      );
      console.log("Property created successfully with ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      const firebaseError = handleFirebaseError(error, "create property");
      throw firebaseError;
    }
  }

  // Get all properties with optional filters and pagination
  async getProperties(
    filters: PropertyFilters = {},
    pagination: PaginationOptions = {},
  ): Promise<{ properties: Property[]; lastDoc?: DocumentSnapshot }> {
    try {
      console.log("🔍 Attempting to fetch properties...");
      console.log(
        "- Current user:",
        auth.currentUser?.uid || "Not authenticated",
      );
      console.log("- Filters:", filters);
      console.log("- Pagination:", pagination);

      const constraints: QueryConstraint[] = [];

      // Add filters
      if (filters.location) {
        constraints.push(where("location", ">=", filters.location));
        constraints.push(where("location", "<=", filters.location + "\uf8ff"));
      }

      if (filters.propertyType) {
        constraints.push(where("propertyType", "==", filters.propertyType));
      }

      if (filters.type) {
        constraints.push(where("type", "==", filters.type));
      }

      if (filters.bedrooms) {
        constraints.push(where("bedrooms", "==", filters.bedrooms));
      }

      if (filters.bathrooms) {
        constraints.push(where("bathrooms", "==", filters.bathrooms));
      }

      // Add status filter to only show active properties
      constraints.push(where("status", "==", "active"));

      // Add ordering
      constraints.push(orderBy("createdAt", "desc"));

      // Add pagination
      if (pagination.limit) {
        constraints.push(limit(pagination.limit));
      }

      if (pagination.lastDoc) {
        constraints.push(startAfter(pagination.lastDoc));
      }

      console.log("📋 Query constraints:", constraints.length);

      const q = query(collection(db, this.collectionName), ...constraints);
      const querySnapshot = await getDocs(q);

      const properties: Property[] = [];
      let lastDoc: DocumentSnapshot | undefined;

      querySnapshot.forEach((doc) => {
        properties.push({
          id: doc.id,
          ...doc.data(),
        } as Property);
        lastDoc = doc;
      });

      console.log(`✅ Successfully retrieved ${properties.length} properties`);
      return { properties, lastDoc };
    } catch (error: any) {
      console.error("❌ Error in getProperties:", error);

      // Check if user is authenticated
      if (!auth.currentUser) {
        console.warn(
          "⚠️ User is not authenticated - this may be the cause of permission denied",
        );
        const authError = {
          code: "auth/unauthenticated",
          message:
            "You must be signed in to view properties. Please sign in and try again.",
          originalError: error,
        };
        throw authError;
      }

      const firebaseError = handleFirebaseError(error, "get properties");
      throw firebaseError;
    }
  }

  // Get a single property by ID
  async getPropertyById(propertyId: string): Promise<Property | null> {
    try {
      const docRef = doc(db, this.collectionName, propertyId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Increment view count
        await this.incrementViewCount(propertyId);

        return {
          id: docSnap.id,
          ...docSnap.data(),
        } as Property;
      } else {
        console.log("No property found with ID:", propertyId);
        return null;
      }
    } catch (error) {
      const firebaseError = handleFirebaseError(error, "get property by ID");
      throw firebaseError;
    }
  }

  // Update a property
  async updateProperty(
    propertyId: string,
    updates: Partial<Property>,
  ): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, propertyId);
      const updateData = {
        ...updates,
        updatedAt: Timestamp.now(),
      };

      await updateDoc(docRef, updateData);
      console.log("Property updated successfully:", propertyId);
    } catch (error) {
      const firebaseError = handleFirebaseError(error, "update property");
      throw firebaseError;
    }
  }

  // Delete a property (soft delete by changing status)
  async deleteProperty(propertyId: string): Promise<void> {
    try {
      await this.updateProperty(propertyId, {
        status: "inactive",
        updatedAt: Timestamp.now(),
      });
      console.log("Property deleted (soft delete):", propertyId);
    } catch (error) {
      const firebaseError = handleFirebaseError(error, "delete property");
      throw firebaseError;
    }
  }

  // Hard delete a property (permanent deletion)
  async hardDeleteProperty(propertyId: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, propertyId);
      await deleteDoc(docRef);
      console.log("Property permanently deleted:", propertyId);
    } catch (error) {
      const firebaseError = handleFirebaseError(error, "hard delete property");
      throw firebaseError;
    }
  }

  // Get properties by owner
  async getPropertiesByOwner(ownerId: string): Promise<Property[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where("ownerId", "==", ownerId),
        orderBy("createdAt", "desc"),
      );

      const querySnapshot = await getDocs(q);
      const properties: Property[] = [];

      querySnapshot.forEach((doc) => {
        properties.push({
          id: doc.id,
          ...doc.data(),
        } as Property);
      });

      return properties;
    } catch (error) {
      const firebaseError = handleFirebaseError(
        error,
        "get properties by owner",
      );
      throw firebaseError;
    }
  }

  // Search properties by text
  async searchProperties(searchTerm: string): Promise<Property[]> {
    try {
      // Note: Firestore doesn't support full-text search natively
      // This is a basic implementation. For better search, consider using Algolia or similar
      const q = query(
        collection(db, this.collectionName),
        where("status", "==", "active"),
        orderBy("createdAt", "desc"),
      );

      const querySnapshot = await getDocs(q);
      const properties: Property[] = [];

      querySnapshot.forEach((doc) => {
        const property = { id: doc.id, ...doc.data() } as Property;

        // Client-side filtering for search term
        const searchFields = [
          property.title,
          property.description,
          property.location,
          property.area,
          property.propertyType,
          ...property.amenities,
        ]
          .join(" ")
          .toLowerCase();

        if (searchFields.includes(searchTerm.toLowerCase())) {
          properties.push(property);
        }
      });

      return properties;
    } catch (error) {
      const firebaseError = handleFirebaseError(error, "search properties");
      throw firebaseError;
    }
  }

  // Increment view count
  private async incrementViewCount(propertyId: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, propertyId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentViewCount = docSnap.data().viewCount || 0;
        await updateDoc(docRef, {
          viewCount: currentViewCount + 1,
        });
      }
    } catch (error) {
      console.error("Error incrementing view count:", error);
      // Don't throw error for view count increment failures
    }
  }

  // Get featured properties
  async getFeaturedProperties(limitCount: number = 6): Promise<Property[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where("featured", "==", true),
        where("status", "==", "active"),
        orderBy("createdAt", "desc"),
        limit(limitCount),
      );

      const querySnapshot = await getDocs(q);
      const properties: Property[] = [];

      querySnapshot.forEach((doc) => {
        properties.push({
          id: doc.id,
          ...doc.data(),
        } as Property);
      });

      return properties;
    } catch (error) {
      const firebaseError = handleFirebaseError(
        error,
        "get featured properties",
      );
      throw firebaseError;
    }
  }

  // Test database connection
  async testConnection(): Promise<boolean> {
    try {
      const testQuery = query(collection(db, this.collectionName), limit(1));
      await getDocs(testQuery);
      console.log("✅ Property service database connection successful");
      return true;
    } catch (error) {
      console.error("❌ Property service database connection failed:", error);
      return false;
    }
  }
}

// Export singleton instance
export const propertyService = new PropertyService();
export default propertyService;
