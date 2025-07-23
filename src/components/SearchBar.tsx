import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, Filter } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
  className?: string;
}

interface SearchFilters {
  location: string;
  propertyType: string;
  transactionType: string;
  budget: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = '' }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    propertyType: '',
    transactionType: 'rent',
    budget: ''
  });

  const [activeTab, setActiveTab] = useState<'rent' | 'buy'>('rent');

  const propertyTypes = [
    'Apartment',
    'Independent House',
    'Villa',
    'Studio',
    '1 RK',
    '1 BHK',
    '2 BHK',
    '3 BHK',
    '4+ BHK'
  ];

  const budgetRanges = {
    rent: [
      'Under ₹10,000',
      '₹10,000 - ₹20,000',
      '₹20,000 - ₹30,000',
      '₹30,000 - ₹50,000',
      '₹50,000 - ₹1,00,000',
      'Above ₹1,00,000'
    ],
    buy: [
      'Under ₹50 Lakh',
      '₹50 Lakh - ₹1 Crore',
      '₹1 Crore - ₹2 Crore',
      '₹2 Crore - ₹5 Crore',
      'Above ₹5 Crore'
    ]
  };

  const handleSearch = () => {
    // Create search parameters
    const searchParams = new URLSearchParams();
    
    if (filters.location) {
      searchParams.set('location', filters.location);
    }
    if (filters.propertyType) {
      searchParams.set('propertyType', filters.propertyType);
    }
    if (filters.transactionType) {
      searchParams.set('type', filters.transactionType);
    }
    if (filters.budget) {
      searchParams.set('budget', filters.budget);
    }

    // Navigate to properties page with search parameters
    const searchQuery = searchParams.toString();
    const url = searchQuery ? `/properties?${searchQuery}` : '/properties';
    
    console.log('Searching with filters:', filters);
    console.log('Navigating to:', url);
    
    // Call onSearch callback if provided
    onSearch?.(filters);
    
    // Navigate to properties page
    navigate(url);
  };

  const handleTabChange = (tab: 'rent' | 'buy') => {
    setActiveTab(tab);
    setFilters(prev => ({ 
      ...prev, 
      transactionType: tab,
      budget: '' // Reset budget when changing transaction type
    }));
  };

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => handleTabChange('rent')}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
            activeTab === 'rent'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Rent
        </button>
        <button
          onClick={() => handleTabChange('buy')}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
            activeTab === 'buy'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Buy
        </button>
      </div>

      {/* Search Form */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Location */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter locality, city"
                value={filters.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={filters.propertyType}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">All Types</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget
            </label>
            <select
              value={filters.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Budget</option>
              {budgetRanges[activeTab].map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button 
            onClick={() => navigate('/properties')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <Filter className="h-4 w-4" />
            <span>Advanced Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;