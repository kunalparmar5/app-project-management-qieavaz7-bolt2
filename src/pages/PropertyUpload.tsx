import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import { useFileUpload } from "../hooks/useFileUpload";
import { useAuth } from "../hooks/useAuth";
import {
  Save,
  Eye,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Upload as UploadIcon,
} from "lucide-react";

interface PropertyFormData {
  title: string;
  description: string;
  propertyType: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  amenities: string[];
}

const PropertyUpload: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [propertyId] = useState(() => `prop_${Date.now()}`);
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    description: "",
    propertyType: "",
    price: "",
    location: "",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 0,
    amenities: [],
  });

  const {
    files,
    isUploading,
    getUploadStats,
  } = useFileUpload({
    propertyId,
    maxFiles: 15,
    onUploadComplete: (file) => {
      console.log("File uploaded successfully:", file.name);
    },
    onUploadError: (error, fileName) => {
      console.error(`Upload failed for ${fileName}:`, error.message);
    },
  });

  const stats = getUploadStats();

  const handleInputChange = (field: keyof PropertyFormData, value: string | number | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveDraft = () => {
    const draftData = {
      ...formData,
      files: files.filter((f) => f.status === "completed"),
      propertyId,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      `property_draft_${propertyId}`,
      JSON.stringify(draftData),
    );
    alert("Draft saved successfully!");
  };

  const handlePreview = () => {
    // In a real app, this would open a preview modal or navigate to a preview page
    console.log("Preview property:", { ...formData, files });
    alert("Preview functionality would open here");
  };

  const handleSubmit = async () => {
    if (stats.uploading > 0) {
      alert("Please wait for all files to finish uploading before submitting.");
      return;
    }

    if (stats.errors > 0) {
      alert("Please resolve upload errors before submitting.");
      return;
    }

    // Validate required fields
    if (
      !formData.title ||
      !formData.description ||
      !formData.propertyType ||
      !formData.price ||
      !formData.location
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Import propertyService dynamically to avoid circular dependencies
      const { propertyService } = await import("../services/propertyService");

      // Get current user from auth context
      const currentUserId = currentUser?.uid;

      if (!currentUserId) {
        alert(
          "You must be signed in to post a property. Please sign in and try again.",
        );
        return;
      }

      const propertyData = {
        title: formData.title,
        description: formData.description,
        propertyType: formData.propertyType,
        price: formData.price,
        location: formData.location,
        area: formData.location, // You might want to separate area from location
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        sqft: formData.sqft,
        amenities: formData.amenities,
        images: files
          .filter((f) => f.status === "completed" && f.url)
          .map((f) => f.url),
        type: "rent" as const, // You might want to add this to your form
        isVerified: false,
        postedBy: "Owner", // You might want to add this to your form
        postedDate: new Date().toLocaleDateString(),
        ownerId: currentUserId,
        status: "active" as const,
      };

      console.log("Submitting property to Firebase:", propertyData);
      console.log("Images being saved:", propertyData.images);

      await propertyService.createProperty(propertyData);

      alert("Property submitted successfully!");
      navigate("/properties");
    } catch (err) {
      const error = err as Error;
      console.error("Failed to submit property:", error);
      alert(
        `Failed to submit property: ${error.message || "Please try again."}`,
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Upload Property
              </h1>
              <p className="text-gray-600 mt-1">
                Add photos and details for your property listing
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleSaveDraft}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save Draft</span>
            </button>
            <button
              onClick={handlePreview}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* Upload Status */}
        {files.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <UploadIcon className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-gray-900">
                    Upload Status
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">
                      {stats.completed} completed
                    </span>
                  </div>
                  {stats.uploading > 0 && (
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <span className="text-blue-600">
                        {stats.uploading} uploading
                      </span>
                    </div>
                  )}
                  {stats.errors > 0 && (
                    <div className="flex items-center space-x-1">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-red-600">
                        {stats.errors} errors
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {files.length} of 15 files
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* File Upload Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Property Photos & Documents
              </h2>
              <FileUpload
                propertyId={propertyId}
                maxFiles={15}
                maxFileSize={10}
                acceptedTypes={[
                  "image/jpeg",
                  "image/png",
                  "image/webp",
                  "application/pdf",
                ]}
                onFilesChange={(updatedFiles) => {
                  console.log("Files updated:", updatedFiles);
                }}
                existingFiles={files}
              />
            </div>

            {/* Property Details Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Property Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter a descriptive title for your property"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your property, its features, and nearby amenities"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) =>
                        handleInputChange("propertyType", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select type</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">Independent House</option>
                      <option value="villa">Villa</option>
                      <option value="studio">Studio</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price
                    </label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="₹50,000/month"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City, Area"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area (sqft)
                    </label>
                    <input
                      type="number"
                      value={formData.sqft}
                      onChange={(e) =>
                        handleInputChange("sqft", parseInt(e.target.value))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms
                    </label>
                    <select
                      value={formData.bedrooms}
                      onChange={(e) =>
                        handleInputChange("bedrooms", parseInt(e.target.value))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} Bedroom{num > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bathrooms
                    </label>
                    <select
                      value={formData.bathrooms}
                      onChange={(e) =>
                        handleInputChange("bathrooms", parseInt(e.target.value))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} Bathroom{num > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Upload Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Files:</span>
                  <span className="font-medium">{files.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-medium text-green-600">
                    {stats.completed}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Uploading:</span>
                  <span className="font-medium text-blue-600">
                    {stats.uploading}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Errors:</span>
                  <span className="font-medium text-red-600">
                    {stats.errors}
                  </span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Upload Tips
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Upload high-quality images for better visibility</li>
                <li>• Include photos of all rooms and amenities</li>
                <li>• Add floor plans if available</li>
                <li>• Ensure good lighting in photos</li>
                <li>• Maximum file size: 10MB per file</li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isUploading || stats.errors > 0}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                isUploading || stats.errors > 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isUploading ? "Uploading..." : "Submit Property"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyUpload;
