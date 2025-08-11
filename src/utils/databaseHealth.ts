import { propertyService } from "../services/propertyService";
import { debugFirebaseConnection } from "./firebaseDebug";
import { auth } from "../config/firebase";

interface FirebaseError extends Error {
  code?: string;
}

// Database health check interface
export interface DatabaseHealthCheck {
  isConnected: boolean;
  services: {
    auth: boolean;
    firestore: boolean;
    propertyService: boolean;
  };
  errors: string[];
  warnings: string[];
  recommendations: string[];
}

// Comprehensive database health check
export const performDatabaseHealthCheck =
  async (): Promise<DatabaseHealthCheck> => {
    const healthCheck: DatabaseHealthCheck = {
      isConnected: false,
      services: {
        auth: false,
        firestore: false,
        propertyService: false,
      },
      errors: [],
      warnings: [],
      recommendations: [],
    };

    try {
      console.log("🔍 Starting database health check...");

      // 1. Check Firebase connection
      const firebaseResults = await debugFirebaseConnection();
      healthCheck.services.auth = firebaseResults.auth;
      healthCheck.services.firestore = firebaseResults.firestore;

      if (firebaseResults.errors.length > 0) {
        healthCheck.errors.push(...firebaseResults.errors);
      }

      // 2. Check Property Service
      try {
        const propertyServiceConnected = await propertyService.testConnection();
        healthCheck.services.propertyService = propertyServiceConnected;

        if (!propertyServiceConnected) {
          healthCheck.errors.push("Property service connection failed");
          healthCheck.recommendations.push(
            "Check Firestore security rules and ensure proper authentication",
          );
        }
      } catch (err) {
        const error = err as FirebaseError;
        healthCheck.services.propertyService = false;
        healthCheck.errors.push(`Property service error: ${error.message}`);
      }

      // 3. Check Authentication State
      if (auth.currentUser) {
        console.log("✅ User is authenticated:", auth.currentUser.uid);
      } else {
        healthCheck.warnings.push("No user is currently authenticated");
        healthCheck.recommendations.push(
          "Some features may require user authentication",
        );
      }

      // 4. Check Firestore connectivity state
      try {
        // Note: connectivityState is not available in all Firebase versions
        // This is a placeholder for future implementation
        console.log("📡 Checking Firestore connectivity...");
      } catch {
        console.log("ℹ️ Connectivity state check not available");
      }

      // 5. Overall health assessment
      const criticalServices = [
        healthCheck.services.auth,
        healthCheck.services.firestore,
      ];
      const allCriticalServicesWorking = criticalServices.every(
        (service) => service,
      );

      healthCheck.isConnected =
        allCriticalServicesWorking && healthCheck.errors.length === 0;

      // 6. Generate recommendations based on findings
      if (!healthCheck.services.auth) {
        healthCheck.recommendations.push(
          "Check Firebase Auth configuration and API keys",
        );
      }

      if (!healthCheck.services.firestore) {
        healthCheck.recommendations.push(
          "Verify Firestore is enabled in Firebase Console",
        );
        healthCheck.recommendations.push(
          "Check network connectivity and firewall settings",
        );
      }

      if (!healthCheck.services.propertyService) {
        healthCheck.recommendations.push(
          "Review Firestore security rules for properties collection",
        );
        healthCheck.recommendations.push(
          "Ensure user has proper permissions to read/write properties",
        );
      }

      // 7. Log results
      if (healthCheck.isConnected) {
        console.log("✅ Database health check passed");
      } else {
        console.warn("⚠️ Database health check found issues");
        console.warn("Errors:", healthCheck.errors);
        console.warn("Recommendations:", healthCheck.recommendations);
      }

      return healthCheck;
    } catch (err) {
      const error = err as FirebaseError;
      console.error("❌ Database health check failed:", error);
      healthCheck.errors.push(`Health check failed: ${error.message}`);
      return healthCheck;
    }
  };

// Quick connection test
export const quickConnectionTest = async (): Promise<boolean> => {
  try {
    const healthCheck = await performDatabaseHealthCheck();
    return healthCheck.isConnected;
  } catch (error) {
    console.error("Quick connection test failed:", error);
    return false;
  }
};

// Database mapping validation
export const validateDatabaseMapping = async (): Promise<{
  isValid: boolean;
  issues: string[];
  suggestions: string[];
}> => {
  const validation = {
    isValid: true,
    issues: [] as string[],
    suggestions: [] as string[],
  };

  try {
    // Test property creation and retrieval
    console.log("🔍 Validating database mapping...");

    // Check if we can read properties
    const { properties } = await propertyService.getProperties(
      {},
      { limit: 1 },
    );
    console.log("✅ Property read operation successful");

    // Validate property structure
    if (properties.length > 0) {
      const sampleProperty = properties[0];
      const requiredFields = [
        "id",
        "title",
        "description",
        "price",
        "location",
        "createdAt",
      ];

      for (const field of requiredFields) {
        if (!(field in sampleProperty)) {
          validation.issues.push(`Missing required field: ${field}`);
          validation.isValid = false;
        }
      }

      // Check data types
      if (typeof sampleProperty.bedrooms !== "number") {
        validation.issues.push("bedrooms should be a number");
        validation.suggestions.push(
          "Ensure bedrooms field is stored as a number in Firestore",
        );
      }

      if (typeof sampleProperty.bathrooms !== "number") {
        validation.issues.push("bathrooms should be a number");
        validation.suggestions.push(
          "Ensure bathrooms field is stored as a number in Firestore",
        );
      }

      if (!Array.isArray(sampleProperty.amenities)) {
        validation.issues.push("amenities should be an array");
        validation.suggestions.push(
          "Ensure amenities field is stored as an array in Firestore",
        );
      }
    } else {
      validation.suggestions.push(
        "No properties found in database - consider adding sample data",
      );
    }
  } catch (err) {
    const error = err as FirebaseError;
    validation.isValid = false;
    validation.issues.push(
      `Database mapping validation failed: ${error.message}`,
    );

    if (error.code === "permission-denied") {
      validation.suggestions.push(
        "Check Firestore security rules - ensure authenticated users can read properties",
      );
      validation.suggestions.push("Verify user authentication status");
    }
  }

  console.log(
    validation.isValid
      ? "✅ Database mapping validation passed"
      : "⚠️ Database mapping issues found",
  );
  return validation;
};

// Export utility for easy access
export const databaseHealth = {
  check: performDatabaseHealthCheck,
  quickTest: quickConnectionTest,
  validateMapping: validateDatabaseMapping,
};
