import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal, MapPin, Search } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';

const PropertyListings = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);

  // Mock data - in a real app, this would come from an API
  const allProperties = [
    {
      id: '1',
      title: 'Spacious 2BHK Apartment in Andheri West',
      price: '₹45,000',
      location: 'Andheri West, Mumbai',
      area: 'Andheri West',
      bedrooms: 2,
      bathrooms: 2,
      sqft: 950,
      images: [
        'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      type: 'rent' as const,
      propertyType: '2 BHK',
      amenities: ['Parking', 'Gym', 'Swimming Pool'],
      rating: 4.5,
      reviews: 23,
      isVerified: true,
      postedBy: 'Owner',
      postedDate: '2 days ago'
    },
    {
      id: '2',
      title: 'Modern 3BHK Villa with Garden',
      price: '₹1.2 Cr',
      location: 'Whitefield, Bangalore',
      area: 'Whitefield',
      bedrooms: 3,
      bathrooms: 3,
      sqft: 1800,
      images: [
        'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      type: 'buy' as const,
      propertyType: '3 BHK Villa',
      amenities: ['Garden', 'Parking', 'Security'],
      rating: 4.8,
      reviews: 15,
      isVerified: true,
      postedBy: 'Builder',
      postedDate: '1 week ago'
    },
    {
      id: '3',
      title: 'Luxury 1BHK Studio Apartment',
      price: '₹28,000',
      location: 'Koramangala, Bangalore',
      area: 'Koramangala',
      bedrooms: 1,
      bathrooms: 1,
      sqft: 650,
      images: [
        'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      type: 'rent' as const,
      propertyType: '1 BHK',
      amenities: ['Furnished', 'AC', 'WiFi'],
      rating: 4.2,
      reviews: 8,
      isVerified: false,
      postedBy: 'Owner',
      postedDate: '3 days ago'
    },
    {
      id: '4',
      title: 'Premium 4BHK Penthouse',
      price: '₹2.5 Cr',
      location: 'Bandra West, Mumbai',
      area: 'Bandra West',
      bedrooms: 4,
      bathrooms: 4,
      sqft: 2500,
      images: [
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      type: 'buy' as const,
      propertyType: '4 BHK',
      amenities: ['Sea View', 'Terrace', 'Lift', 'Parking'],
      rating: 4.9,
      reviews: 31,
      isVerified: true,
      postedBy: 'Builder',
      postedDate: '5 days ago'
    },
    {
      id: '5',
      title: 'Cozy 2BHK Family Apartment',
      price: '₹32,000',
      location: 'Sector 49, Gurgaon',
      area: 'Sector 49',
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1100,
      images: [
        'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      type: 'rent' as const,
      propertyType: '2 BHK',
      amenities: ['Parking', 'Playground', 'Security'],
      rating: 4.3,
      reviews: 12,
      isVerified: true,
      postedBy: 'Owner',
      postedDate: '1 day ago'
    },
    {
      id: '6',
      title: 'Independent House with Parking',
      price: '₹85 Lakh',
      location: 'Jayanagar, Bangalore',
      area: 'Jayanagar',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1400,
      images: [
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      type: 'buy' as const,
      propertyType: 'Independent House',
      amenities: ['Parking', 'Garden', 'Terrace'],
      rating: 4.6,
      reviews: 19,
      isVerified: true,
      postedBy: 'Owner',
      postedDate: '4 days ago'
    }
  ];

  // Filter properties based on search parameters
  useEffect(() => {
    const location = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');
    const type = searchParams.get('type');
    const budget = searchParams.get('budget');

    console.log('Search parameters:', { location, propertyType, type, budget });

    let filtered = [...allProperties];

    // Filter by location
    if (location) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(location.toLowerCase()) ||
        property.area.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by property type
    if (propertyType) {
      filtered = filtered.filter(property => 
        property.propertyType.toLowerCase().includes(propertyType.toLowerCase())
      );
    }

    // Filter by transaction type (rent/buy)
    if (type) {
      filtered = filtered.filter(property => property.type === type);
    }

    // Filter by budget (simplified logic)
    if (budget) {
      // This is a simplified budget filter - in a real app you'd have more sophisticated logic
      filtered = filtered.filter(property => {
        if (budget.includes('Under')) {
          return true; // Show all for demo
        }
        return true; // Show all for demo
      });
    }

    console.log('Filtered properties:', filtered);
    setFilteredProperties(filtered);
  }, [searchParams]);

  const filterOptions = {
    propertyType: ['Apartment', 'Villa', 'Independent House', 'Studio'],
    bhkType: ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4+ BHK'],
    budget: ['Under ₹20,000', '₹20,000 - ₹40,000', '₹40,000 - ₹60,000', 'Above ₹60,000'],
    amenities: ['Parking', 'Gym', 'Swimming Pool', 'Garden', 'Security', 'Lift']
  };

  const getSearchSummary = () => {
    const location = searchParams.get('location');
    const type = searchParams.get('type');
    
    if (location && type) {
      return `Properties for ${type} in ${location}`;
    } else if (location) {
      return `Properties in ${location}`;
    } else if (type) {
      return `Properties for ${type}`;
    }
    return 'All Properties';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button 
                  onClick={() => window.location.href = '/properties'}
                  className="text-blue-600 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Property Type</h4>
                <div className="space-y-2">
                  {filterOptions.propertyType.map((type) => (
                    <label key={type} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* BHK Type */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">BHK Type</h4>
                <div className="space-y-2">
                  {filterOptions.bhkType.map((bhk) => (
                    <label key={bhk} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">{bhk}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Budget Range</h4>
                <div className="space-y-2">
                  {filterOptions.budget.map((budget) => (
                    <label key={budget} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">{budget}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Amenities</h4>
                <div className="space-y-2">
                  {filterOptions.amenities.map((amenity) => (
                    <label key={amenity} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {getSearchSummary()}
                </h1>
                <p className="text-gray-600">
                  {filteredProperties.length} properties found
                  {searchParams.toString() && (
                    <span className="ml-2 text-blue-600">
                      • Filtered results
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                </button>

                {/* View Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Sort by: Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Area: Low to High</option>
                </select>
              </div>
            </div>

            {/* No Results Message */}
            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or browse all properties
                </p>
                <button
                  onClick={() => window.location.href = '/properties'}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View All Properties
                </button>
              </div>
            )}

            {/* Properties Grid */}
            {filteredProperties.length > 0 && (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onFavorite={(id) => console.log('Favorited:', id)}
                    onContact={(id) => console.log('Contact:', id)}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredProperties.length > 0 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                    Previous
                  </button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`px-3 py-2 rounded-lg ${
                        page === 1
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="px-3 py-2 text-gray-500 hover:text-gray-700">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListings;