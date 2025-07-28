import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { propertyService, Property } from "../services/propertyService";
import {
  Database,
  Eye,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const DatabaseViewer: React.FC = () => {
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "checking" | "connected" | "error"
  >("checking");

  const checkConnection = async () => {
    try {
      const isConnected = await propertyService.testConnection();
      setConnectionStatus(isConnected ? "connected" : "error");
      return isConnected;
    } catch (error) {
      setConnectionStatus("error");
      return false;
    }
  };

  const loadAllProperties = async () => {
    setLoading(true);
    setError(null);

    try {
      // First check connection
      const isConnected = await checkConnection();

      if (!isConnected) {
        throw new Error("Database connection failed");
      }

      // Load properties without filters to see everything
      const { properties: allProperties } = await propertyService.getProperties(
        {},
        { limit: 100 },
      );
      setProperties(allProperties);

      console.log("📊 Database Properties:", allProperties);
      console.log("📊 Total Properties Found:", allProperties.length);
    } catch (error: any) {
      console.error("Error loading properties:", error);
      setError(error.message || "Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllProperties();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "inactive":
        return "text-gray-600 bg-gray-100";
      case "sold":
        return "text-blue-600 bg-blue-100";
      case "rented":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Database className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Database Viewer
              </h1>
              <p className="text-gray-600">
                View all properties stored in Firebase Firestore
              </p>
            </div>
          </div>

          <button
            onClick={loadAllProperties}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Connection Status */}
        <div className="mb-6">
          <div className="flex items-center space-x-2">
            {connectionStatus === "checking" && (
              <>
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-gray-600">Checking connection...</span>
              </>
            )}
            {connectionStatus === "connected" && (
              <>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-600">
                  Connected to Firebase Firestore
                </span>
              </>
            )}
            {connectionStatus === "error" && (
              <>
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-red-600">Connection failed</span>
              </>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-900 mb-2">Current User</h3>
          {currentUser ? (
            <div className="text-sm text-gray-600">
              <p>
                <strong>UID:</strong> {currentUser.uid}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              <p>
                <strong>Display Name:</strong>{" "}
                {currentUser.displayName || "Not set"}
              </p>
            </div>
          ) : (
            <p className="text-red-600">
              Not authenticated - this may prevent viewing properties
            </p>
          )}
        </div>

        {/* Database Info */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-900 mb-2">
            Database Information
          </h3>
          <div className="text-sm text-blue-800">
            <p>
              <strong>Collection:</strong> properties
            </p>
            <p>
              <strong>Project ID:</strong> sample-firebase-ai-app-44fa7
            </p>
            <p>
              <strong>Total Properties:</strong> {properties.length}
            </p>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="font-medium text-red-900">Error</span>
            </div>
            <p className="text-red-700 mt-1">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-gray-600">Loading properties...</p>
          </div>
        )}

        {/* Properties List */}
        {!loading && properties.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Properties in Database
            </h2>

            {properties.map((property) => (
              <div
                key={property.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-900">
                        {property.title}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(property.status)}`}
                      >
                        {property.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <strong>ID:</strong> {property.id}
                      </div>
                      <div>
                        <strong>Price:</strong> {property.price}
                      </div>
                      <div>
                        <strong>Location:</strong> {property.location}
                      </div>
                      <div>
                        <strong>Type:</strong> {property.type}
                      </div>
                      <div>
                        <strong>Property Type:</strong> {property.propertyType}
                      </div>
                      <div>
                        <strong>Bedrooms:</strong> {property.bedrooms}
                      </div>
                      <div>
                        <strong>Owner:</strong> {property.ownerId}
                      </div>
                      <div>
                        <strong>Posted:</strong> {property.postedDate}
                      </div>
                    </div>

                    {property.description && (
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {property.description}
                      </p>
                    )}

                    {property.images && property.images.length > 0 && (
                      <p className="text-gray-500 text-xs mt-2">
                        {property.images.length} image(s) uploaded
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Properties */}
        {!loading && !error && properties.length === 0 && (
          <div className="text-center py-12">
            <Database className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Properties Found
            </h3>
            <p className="text-gray-600">
              No properties are currently stored in the database.
              {!currentUser && " You may need to sign in to view properties."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabaseViewer;
