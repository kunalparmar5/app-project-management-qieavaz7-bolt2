import React, { useState } from 'react';
import { 
  Upload, 
  MapPin, 
  Home, 
  IndianRupee,
  Camera,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const PostProperty = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [propertyType, setPropertyType] = useState<'rent' | 'sell'>('rent');
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    // Basic Details
    propertyFor: 'rent',
    propertyType: '',
    bhkType: '',
    
    // Location
    city: '',
    locality: '',
    address: '',
    
    // Property Details
    builtUpArea: '',
    carpetArea: '',
    floor: '',
    totalFloors: '',
    age: '',
    facing: '',
    furnishing: '',
    
    // Pricing
    expectedPrice: '',
    priceNegotiable: false,
    maintenanceCharges: '',
    securityDeposit: '',
    
    // Amenities
    amenities: [] as string[],
    
    // Description
    title: '',
    description: '',
    
    // Contact
    name: '',
    email: '',
    phone: '',
  });

  const steps = [
    { id: 1, title: 'Basic Details', description: 'Property type and configuration' },
    { id: 2, title: 'Location', description: 'Where is your property located?' },
    { id: 3, title: 'Property Details', description: 'Size, age, and other details' },
    { id: 4, title: 'Pricing', description: 'Set your price and charges' },
    { id: 5, title: 'Photos & Description', description: 'Add photos and description' },
    { id: 6, title: 'Contact Details', description: 'How can buyers reach you?' }
  ];

  const propertyTypes = [
    'Apartment',
    'Independent House',
    'Villa',
    'Studio Apartment',
    'Penthouse',
    'Duplex'
  ];

  const bhkTypes = [
    '1 RK',
    '1 BHK',
    '2 BHK',
    '3 BHK',
    '4 BHK',
    '5+ BHK'
  ];

  const amenitiesList = [
    'Parking',
    'Lift',
    'Security',
    'Gym',
    'Swimming Pool',
    'Garden',
    'Balcony',
    'AC',
    'Modular Kitchen',
    'Furnished',
    'Internet/WiFi',
    'Gated Community',
    'Power Backup',
    'Water Supply',
    'Maintenance Staff',
    'CCTV'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // In a real app, you would upload these to a server
      // For demo, we'll just create object URLs
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 10)); // Max 10 images
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In a real app, this would submit to your backend
    console.log('Form submitted:', formData);
    alert('Property posted successfully!');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I want to
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setPropertyType('rent');
                    handleInputChange('propertyFor', 'rent');
                  }}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    propertyType === 'rent'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Home className="h-8 w-8 mx-auto mb-2" />
                  <span className="font-medium">Rent Out</span>
                </button>
                <button
                  onClick={() => {
                    setPropertyType('sell');
                    handleInputChange('propertyFor', 'sell');
                  }}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    propertyType === 'sell'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <IndianRupee className="h-8 w-8 mx-auto mb-2" />
                  <span className="font-medium">Sell</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Property Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleInputChange('propertyType', type)}
                    className={`p-3 border rounded-lg text-sm transition-colors ${
                      formData.propertyType === type
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                BHK Type
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {bhkTypes.map((bhk) => (
                  <button
                    key={bhk}
                    onClick={() => handleInputChange('bhkType', bhk)}
                    className={`p-3 border rounded-lg text-sm transition-colors ${
                      formData.bhkType === bhk
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {bhk}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter city name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Locality/Area
              </label>
              <input
                type="text"
                value={formData.locality}
                onChange={(e) => handleInputChange('locality', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter locality or area"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complete Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter complete address"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Built-up Area (sqft)
                </label>
                <input
                  type="number"
                  value={formData.builtUpArea}
                  onChange={(e) => handleInputChange('builtUpArea', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter area in sqft"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Carpet Area (sqft)
                </label>
                <input
                  type="number"
                  value={formData.carpetArea}
                  onChange={(e) => handleInputChange('carpetArea', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter carpet area"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Floor Number
                </label>
                <input
                  type="number"
                  value={formData.floor}
                  onChange={(e) => handleInputChange('floor', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Floor number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Floors
                </label>
                <input
                  type="number"
                  value={formData.totalFloors}
                  onChange={(e) => handleInputChange('totalFloors', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Total floors in building"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Age
                </label>
                <select
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select age</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="1-5 years">1-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facing
                </label>
                <select
                  value={formData.facing}
                  onChange={(e) => handleInputChange('facing', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select facing</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="North-East">North-East</option>
                  <option value="North-West">North-West</option>
                  <option value="South-East">South-East</option>
                  <option value="South-West">South-West</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Furnishing Status
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Unfurnished', 'Semi-Furnished', 'Fully Furnished'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleInputChange('furnishing', status)}
                    className={`p-3 border rounded-lg text-sm transition-colors ${
                      formData.furnishing === status
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected {propertyType === 'rent' ? 'Rent' : 'Price'}
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={formData.expectedPrice}
                  onChange={(e) => handleInputChange('expectedPrice', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`Enter expected ${propertyType === 'rent' ? 'monthly rent' : 'selling price'}`}
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="negotiable"
                checked={formData.priceNegotiable}
                onChange={(e) => handleInputChange('priceNegotiable', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="negotiable" className="ml-2 text-sm text-gray-700">
                Price Negotiable
              </label>
            </div>

            {propertyType === 'rent' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maintenance Charges (per month)
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.maintenanceCharges}
                      onChange={(e) => handleInputChange('maintenanceCharges', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter maintenance charges"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Security Deposit
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={formData.securityDeposit}
                      onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter security deposit"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Property Photos
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload photos</p>
                  <p className="text-sm text-gray-500">Upload up to 10 photos (JPG, PNG)</p>
                </label>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Property ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter a catchy title for your property"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your property, its features, nearby amenities, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {amenitiesList.map((amenity) => (
                  <label key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Privacy Notice</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Your contact details will only be shared with genuine interested buyers/tenants. 
                    We respect your privacy and will not spam you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Post Your Property
          </h1>
          <p className="text-gray-600">
            List your property for free and connect with genuine buyers/tenants
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600 text-sm">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          {currentStep === steps.length ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Post Property
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostProperty;