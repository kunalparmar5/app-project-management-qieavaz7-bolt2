import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Shield,
  Star,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Car,
  Wifi,
  Dumbbell,
  Trees,
  Camera,
  Video,
  Map
} from 'lucide-react';

const PropertyDetails = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  // Mock property data - in a real app, this would be fetched based on the ID
  const property = {
    id: '1',
    title: 'Spacious 2BHK Apartment in Andheri West',
    price: '₹45,000',
    originalPrice: '₹50,000',
    location: 'Andheri West, Mumbai, Maharashtra',
    area: 'Andheri West',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 950,
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    type: 'rent' as const,
    propertyType: '2 BHK Apartment',
    furnishing: 'Semi-Furnished',
    floor: '5th Floor',
    totalFloors: 12,
    age: '5 years',
    facing: 'North-East',
    amenities: [
      { name: 'Parking', icon: Car, available: true },
      { name: 'WiFi', icon: Wifi, available: true },
      { name: 'Gym', icon: Dumbbell, available: true },
      { name: 'Garden', icon: Trees, available: false },
    ],
    description: `Beautiful 2BHK apartment located in the heart of Andheri West. This property offers modern amenities and excellent connectivity to major business districts. The apartment is well-ventilated with ample natural light and comes with a modular kitchen, spacious bedrooms, and a comfortable living area.

    Key highlights:
    • Prime location with easy access to metro station
    • Well-maintained building with 24/7 security
    • Close to schools, hospitals, and shopping centers
    • Peaceful neighborhood with good connectivity`,
    rating: 4.5,
    reviews: 23,
    isVerified: true,
    postedBy: {
      name: 'Rajesh Kumar',
      type: 'Owner',
      phone: '+91 9876543210',
      verified: true,
      rating: 4.8,
      properties: 3
    },
    postedDate: '2 days ago',
    features: [
      'Modular Kitchen',
      'Balcony',
      'Wardrobe',
      'AC',
      'Geyser',
      'Intercom',
      'Security',
      'Lift'
    ],
    nearbyPlaces: [
      { name: 'Andheri Metro Station', distance: '0.5 km', type: 'Transport' },
      { name: 'Infiniti Mall', distance: '1.2 km', type: 'Shopping' },
      { name: 'Kokilaben Hospital', distance: '2.1 km', type: 'Healthcare' },
      { name: 'Ryan International School', distance: '0.8 km', type: 'Education' }
    ]
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center space-x-2 text-gray-600 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>{property.location}</span>
                  </div>
                </div>
                {property.isVerified && (
                  <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    <Shield className="h-4 w-4" />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">{property.price}</span>
                <span className="text-gray-500">/month</span>
                {property.originalPrice && (
                  <span className="text-gray-400 line-through">{property.originalPrice}</span>
                )}
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Bed className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Square className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{property.sqft} sqft</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{property.age}</span>
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 text-sm">
                <div>
                  <span className="text-gray-500">Property Type:</span>
                  <span className="ml-2 font-medium">{property.propertyType}</span>
                </div>
                <div>
                  <span className="text-gray-500">Furnishing:</span>
                  <span className="ml-2 font-medium">{property.furnishing}</span>
                </div>
                <div>
                  <span className="text-gray-500">Floor:</span>
                  <span className="ml-2 font-medium">{property.floor} of {property.totalFloors}</span>
                </div>
                <div>
                  <span className="text-gray-500">Facing:</span>
                  <span className="ml-2 font-medium">{property.facing}</span>
                </div>
                <div>
                  <span className="text-gray-500">Posted:</span>
                  <span className="ml-2 font-medium">{property.postedDate}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <div className="text-gray-700 whitespace-pre-line">
                  {property.description}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 p-3 rounded-lg ${
                      amenity.available ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'
                    }`}
                  >
                    <amenity.icon className="h-5 w-5" />
                    <span className="font-medium">{amenity.name}</span>
                    {amenity.available && <CheckCircle className="h-4 w-4 ml-auto" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-700">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Places */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Places</h3>
              <div className="space-y-3">
                {property.nearbyPlaces.map((place, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                      <span className="font-medium text-gray-900">{place.name}</span>
                      <span className="ml-2 text-sm text-gray-500">({place.type})</span>
                    </div>
                    <span className="text-blue-600 font-medium">{place.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {property.postedBy.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{property.postedBy.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{property.postedBy.type}</span>
                    {property.postedBy.verified && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{property.postedBy.rating}</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {property.postedBy.properties} properties
                </span>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Call Now</span>
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Send Message</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="w-full text-blue-600 font-medium hover:text-blue-700"
                >
                  Get Contact Details
                </button>
              </div>
            </div>

            {/* Similar Properties */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Properties</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <img
                      src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=200"
                      alt="Similar property"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">2BHK Apartment</h4>
                      <p className="text-gray-600 text-xs">Andheri West</p>
                      <p className="text-blue-600 font-semibold text-sm">₹42,000/month</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;