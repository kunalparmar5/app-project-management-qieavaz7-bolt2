import React from 'react';
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Camera,
  Phone,
  MessageCircle,
  Share2,
  Star
} from 'lucide-react';

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  images: string[];
  type: 'rent' | 'buy';
  propertyType: string;
  amenities: string[];
  rating: number;
  reviews: number;
  isVerified: boolean;
  postedBy: string;
  postedDate: string;
}

interface PropertyCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
  onContact?: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onFavorite, 
  onContact 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      {/* Image Section */}
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        
        {/* Image Count */}
        <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs flex items-center space-x-1">
          <Camera className="h-3 w-3" />
          <span>{property.images.length}</span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => onFavorite?.(property.id)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart className="h-4 w-4 text-gray-600" />
        </button>

        {/* Verified Badge */}
        {property.isVerified && (
          <div className="absolute bottom-3 left-3 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium">
            Verified
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Price and Type */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">{property.price}</span>
            {property.type === 'rent' && (
              <span className="text-gray-500 text-sm">/month</span>
            )}
          </div>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
            {property.propertyType}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center space-x-1 text-gray-600 mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center space-x-4 mb-3 text-gray-600">
          <div className="flex items-center space-x-1">
            <Bed className="h-4 w-4" />
            <span className="text-sm">{property.bedrooms} Bed</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath className="h-4 w-4" />
            <span className="text-sm">{property.bathrooms} Bath</span>
          </div>
          <div className="flex items-center space-x-1">
            <Square className="h-4 w-4" />
            <span className="text-sm">{property.sqft} sqft</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{property.rating}</span>
          </div>
          <span className="text-gray-500 text-sm">({property.reviews} reviews)</span>
        </div>

        {/* Posted Info */}
        <div className="text-xs text-gray-500 mb-4">
          Posted by {property.postedBy} • {property.postedDate}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => onContact?.(property.id)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Phone className="h-4 w-4" />
            <span>Contact</span>
          </button>
          <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>Chat</span>
          </button>
          <button className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;