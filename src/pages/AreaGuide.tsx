import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Search, 
  TrendingUp, 
  Home, 
  School, 
  Building2, 
  ShoppingBag, 
  Train, 
  Car, 
  Plane, 
  Star, 
  ArrowRight, 
  Filter, 
  Grid, 
  List,
  Users,
  Building,
  TreePine,
  Shield,
  Wifi,
  Coffee,
  Dumbbell,
  Music,
  Camera,
  Clock,
  IndianRupee,
  TrendingDown,
  Award,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Target
} from 'lucide-react';

const AreaGuide = () => {
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'];

  const neighborhoodFactors = [
    {
      factor: 'Connectivity',
      weight: '25%',
      description: 'Public transport, highways, and airport access',
      importance: 'High',
      icon: Train
    },
    {
      factor: 'Infrastructure',
      weight: '20%',
      description: 'Roads, utilities, and basic amenities',
      importance: 'High',
      icon: Building
    },
    {
      factor: 'Safety & Security',
      weight: '20%',
      description: 'Crime rates, police presence, and gated communities',
      importance: 'High',
      icon: Shield
    },
    {
      factor: 'Education',
      weight: '15%',
      description: 'Schools, colleges, and educational institutions',
      importance: 'Medium',
      icon: School
    },
    {
      factor: 'Healthcare',
      weight: '10%',
      description: 'Hospitals, clinics, and medical facilities',
      importance: 'Medium',
      icon: Building2
    },
    {
      factor: 'Lifestyle',
      weight: '10%',
      description: 'Shopping, dining, entertainment, and recreation',
      importance: 'Medium',
      icon: Coffee
    }
  ];

  const areas = {
    Mumbai: [
      {
        id: 1,
        name: 'Andheri West',
        description: 'Prime commercial and residential hub with excellent connectivity',
        priceRange: '₹15,000 - ₹45,000/sqft',
        rentRange: '₹25,000 - ₹80,000/month',
        rating: 4.5,
        image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400',
        highlights: ['Metro connectivity', 'IT hub', 'Shopping centers', 'Restaurants'],
        demographics: {
          population: '6.5 Lakh',
          averageAge: '32 years',
          familySize: '3.2 members',
          literacy: '89%'
        },
        infrastructure: {
          connectivity: 9.5,
          safety: 8.5,
          education: 8.5,
          healthcare: 9.0,
          lifestyle: 9.0,
          environment: 7.0
        },
        transportation: [
          { mode: 'Metro', stations: 'Andheri, DN Nagar, Azad Nagar', connectivity: 'Excellent' },
          { mode: 'Bus', routes: '50+ routes', connectivity: 'Very Good' },
          { mode: 'Auto/Taxi', availability: '24/7', connectivity: 'Excellent' },
          { mode: 'Airport', distance: '2 km', connectivity: 'Excellent' }
        ],
        amenities: {
          shopping: ['Infiniti Mall', 'Lokhandwala Market', 'Link Road'],
          healthcare: ['Kokilaben Hospital', 'Seven Hills Hospital', 'SL Raheja Hospital'],
          education: ['Ryan International', 'Podar International', 'St. Andrews'],
          recreation: ['Versova Beach', 'Juhu Beach', 'Prithvi Theatre']
        },
        futureProjects: [
          'Metro Line 7 extension',
          'Coastal Road Project',
          'New commercial developments'
        ],
        pros: [
          'Excellent connectivity to all parts of Mumbai',
          'Close to international airport',
          'Vibrant nightlife and dining scene',
          'Good schools and hospitals',
          'High rental yields'
        ],
        cons: [
          'High property prices',
          'Traffic congestion during peak hours',
          'Monsoon flooding in some areas',
          'Limited parking space'
        ]
      },
      {
        id: 2,
        name: 'Bandra West',
        description: 'Upscale locality known for its vibrant nightlife and celebrity homes',
        priceRange: '₹25,000 - ₹60,000/sqft',
        rentRange: '₹40,000 - ₹1,50,000/month',
        rating: 4.7,
        image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=400',
        highlights: ['Sea facing properties', 'Linking Road', 'Cafes & restaurants', 'Celebrity homes'],
        demographics: {
          population: '2.8 Lakh',
          averageAge: '35 years',
          familySize: '2.8 members',
          literacy: '92%'
        },
        infrastructure: {
          connectivity: 8.0,
          safety: 9.0,
          education: 8.0,
          healthcare: 8.5,
          lifestyle: 9.5,
          environment: 8.0
        },
        transportation: [
          { mode: 'Railway', stations: 'Bandra, Khar Road', connectivity: 'Excellent' },
          { mode: 'Bus', routes: '40+ routes', connectivity: 'Very Good' },
          { mode: 'Auto/Taxi', availability: '24/7', connectivity: 'Excellent' },
          { mode: 'Airport', distance: '8 km', connectivity: 'Good' }
        ],
        amenities: {
          shopping: ['Linking Road', 'Hill Road', 'Palladium Mall'],
          healthcare: ['Lilavati Hospital', 'Holy Family Hospital', 'Bhabha Hospital'],
          education: ['Apostolic Carmel', 'St. Stanislaus', 'Jamnabai Narsee'],
          recreation: ['Bandstand Promenade', 'Carter Road', 'Bandra-Worli Sea Link']
        },
        futureProjects: [
          'Bandra-Versova Sea Link',
          'Metro connectivity improvements',
          'Waterfront development'
        ],
        pros: [
          'Premium location with sea views',
          'Excellent dining and entertainment',
          'Good connectivity to South Mumbai',
          'High-end shopping destinations',
          'Celebrity neighborhood appeal'
        ],
        cons: [
          'Very expensive property prices',
          'Heavy traffic on weekends',
          'Limited parking',
          'High cost of living'
        ]
      }
    ],
    Delhi: [
      {
        id: 3,
        name: 'Connaught Place',
        description: 'Central business district with colonial architecture',
        priceRange: '₹20,000 - ₹50,000/sqft',
        rentRange: '₹30,000 - ₹1,00,000/month',
        rating: 4.6,
        image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=400',
        highlights: ['Central location', 'Metro hub', 'Shopping', 'Business center'],
        demographics: {
          population: '1.2 Lakh',
          averageAge: '30 years',
          familySize: '3.5 members',
          literacy: '88%'
        },
        infrastructure: {
          connectivity: 9.5,
          safety: 8.0,
          education: 7.5,
          healthcare: 8.0,
          lifestyle: 9.0,
          environment: 6.5
        },
        transportation: [
          { mode: 'Metro', stations: 'Rajiv Chowk, Patel Chowk', connectivity: 'Excellent' },
          { mode: 'Bus', routes: '100+ routes', connectivity: 'Excellent' },
          { mode: 'Auto/Taxi', availability: '24/7', connectivity: 'Excellent' },
          { mode: 'Airport', distance: '15 km', connectivity: 'Good' }
        ],
        amenities: {
          shopping: ['Central Park', 'Palika Bazaar', 'Janpath Market'],
          healthcare: ['Ram Manohar Lohia Hospital', 'Lady Hardinge Medical College'],
          education: ['Delhi University (nearby)', 'Convent of Jesus & Mary'],
          recreation: ['Central Park', 'India Gate', 'National Museum']
        },
        futureProjects: [
          'Heritage conservation projects',
          'Smart city initiatives',
          'Underground parking facilities'
        ],
        pros: [
          'Central location with excellent connectivity',
          'Rich historical and cultural heritage',
          'Major business and commercial hub',
          'Excellent public transport',
          'Tourist and entertainment center'
        ],
        cons: [
          'High pollution levels',
          'Very crowded during peak hours',
          'Limited residential options',
          'Parking challenges'
        ]
      }
    ],
    Bangalore: [
      {
        id: 4,
        name: 'Koramangala',
        description: 'IT hub with numerous startups and restaurants',
        priceRange: '₹8,000 - ₹25,000/sqft',
        rentRange: '₹15,000 - ₹50,000/month',
        rating: 4.4,
        image: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=400',
        highlights: ['IT companies', 'Startup ecosystem', 'Restaurants', 'Pubs'],
        demographics: {
          population: '1.5 Lakh',
          averageAge: '28 years',
          familySize: '2.5 members',
          literacy: '95%'
        },
        infrastructure: {
          connectivity: 7.5,
          safety: 8.5,
          education: 8.0,
          healthcare: 8.5,
          lifestyle: 9.0,
          environment: 7.5
        },
        transportation: [
          { mode: 'Bus', routes: '30+ routes', connectivity: 'Good' },
          { mode: 'Auto/Taxi', availability: '24/7', connectivity: 'Very Good' },
          { mode: 'Metro', stations: 'Planned connectivity', connectivity: 'Future' },
          { mode: 'Airport', distance: '35 km', connectivity: 'Moderate' }
        ],
        amenities: {
          shopping: ['Forum Mall', '5th Block Market', 'Koramangala Social'],
          healthcare: ['Manipal Hospital', 'Apollo Hospital', 'Fortis Hospital'],
          education: ['National Public School', 'Bishop Cotton School'],
          recreation: ['Lalbagh Botanical Garden', 'Cubbon Park', 'UB City Mall']
        },
        futureProjects: [
          'Namma Metro Phase 2',
          'IT corridor expansion',
          'Smart traffic management'
        ],
        pros: [
          'Major IT and startup hub',
          'Vibrant nightlife and dining',
          'Young professional community',
          'Good educational institutions',
          'Cosmopolitan culture'
        ],
        cons: [
          'Traffic congestion',
          'Limited metro connectivity',
          'Rising property prices',
          'Water scarcity issues'
        ]
      }
    ]
  };

  const currentAreas = areas[selectedCity as keyof typeof areas] || [];
  const filteredAreas = currentAreas.filter(area =>
    area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInfrastructureColor = (score: number) => {
    if (score >= 8.5) return 'text-green-600';
    if (score >= 7.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getInfrastructureLabel = (score: number) => {
    if (score >= 8.5) return 'Excellent';
    if (score >= 7.0) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Complete Area Guide
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Discover the best neighborhoods across India with detailed insights on infrastructure, amenities, and lifestyle
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search areas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhood Factors Guide */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Makes a Great Neighborhood?</h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            Understanding the key factors that determine neighborhood quality and property values
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {neighborhoodFactors.map((factor, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <factor.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{factor.factor}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-blue-600">{factor.weight}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        factor.importance === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {factor.importance}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City Selection */}
      <section className="py-8 bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-3 mb-4 md:mb-0">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    selectedCity === city
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
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
            </div>
          </div>
        </div>
      </section>

      {/* Areas Detailed View */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Neighborhoods in {selectedCity}
            </h2>
            <p className="text-gray-600">
              {filteredAreas.length} areas found with detailed analysis
            </p>
          </div>

          <div className="space-y-12">
            {filteredAreas.map((area) => (
              <div key={area.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Area Header */}
                <div className="relative">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-6 text-white">
                    <h3 className="text-3xl font-bold mb-2">{area.name}</h3>
                    <p className="text-lg text-gray-200">{area.description}</p>
                    <div className="flex items-center mt-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-lg font-medium">{area.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">Property Prices</h4>
                      <p className="text-blue-800">{area.priceRange}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Rental Range</h4>
                      <p className="text-green-800">{area.rentRange}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-2">Population</h4>
                      <p className="text-purple-800">{area.demographics.population}</p>
                    </div>
                  </div>

                  {/* Infrastructure Scores */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Infrastructure Rating</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(area.infrastructure).map(([key, score]) => (
                        <div key={key} className="text-center">
                          <div className={`text-2xl font-bold ${getInfrastructureColor(score)}`}>
                            {score}/10
                          </div>
                          <div className="text-sm text-gray-600 capitalize">{key}</div>
                          <div className={`text-xs ${getInfrastructureColor(score)}`}>
                            {getInfrastructureLabel(score)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Demographics */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Demographics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center bg-gray-50 p-3 rounded-lg">
                        <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <div className="font-semibold">{area.demographics.population}</div>
                        <div className="text-sm text-gray-600">Population</div>
                      </div>
                      <div className="text-center bg-gray-50 p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <div className="font-semibold">{area.demographics.averageAge}</div>
                        <div className="text-sm text-gray-600">Avg Age</div>
                      </div>
                      <div className="text-center bg-gray-50 p-3 rounded-lg">
                        <Home className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                        <div className="font-semibold">{area.demographics.familySize}</div>
                        <div className="text-sm text-gray-600">Family Size</div>
                      </div>
                      <div className="text-center bg-gray-50 p-3 rounded-lg">
                        <School className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                        <div className="font-semibold">{area.demographics.literacy}</div>
                        <div className="text-sm text-gray-600">Literacy</div>
                      </div>
                    </div>
                  </div>

                  {/* Transportation */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Transportation</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {area.transportation.map((transport, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-gray-900">{transport.mode}</h5>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              transport.connectivity === 'Excellent' ? 'bg-green-100 text-green-800' :
                              transport.connectivity === 'Very Good' ? 'bg-blue-100 text-blue-800' :
                              transport.connectivity === 'Good' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {transport.connectivity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {transport.stations || transport.routes || transport.availability || transport.distance}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Key Amenities</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <ShoppingBag className="h-4 w-4 mr-2 text-blue-600" />
                          Shopping
                        </h5>
                        <ul className="space-y-1">
                          {area.amenities.shopping.map((item, index) => (
                            <li key={index} className="text-sm text-gray-600">• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <Building2 className="h-4 w-4 mr-2 text-red-600" />
                          Healthcare
                        </h5>
                        <ul className="space-y-1">
                          {area.amenities.healthcare.map((item, index) => (
                            <li key={index} className="text-sm text-gray-600">• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <School className="h-4 w-4 mr-2 text-green-600" />
                          Education
                        </h5>
                        <ul className="space-y-1">
                          {area.amenities.education.map((item, index) => (
                            <li key={index} className="text-sm text-gray-600">• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <TreePine className="h-4 w-4 mr-2 text-purple-600" />
                          Recreation
                        </h5>
                        <ul className="space-y-1">
                          {area.amenities.recreation.map((item, index) => (
                            <li key={index} className="text-sm text-gray-600">• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Pros and Cons */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Pros & Cons</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-green-700 mb-3 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Advantages
                        </h5>
                        <ul className="space-y-2">
                          {area.pros.map((pro, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-red-700 mb-3 flex items-center">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          Considerations
                        </h5>
                        <ul className="space-y-2">
                          {area.cons.map((con, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start">
                              <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Future Projects */}
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Future Development</h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <ul className="space-y-2">
                        {area.futureProjects.map((project, index) => (
                          <li key={index} className="text-blue-800 flex items-center">
                            <Target className="h-4 w-4 text-blue-600 mr-2" />
                            {project}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Area Comparison Tool */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Choose the Right Area</h2>
            <p className="text-xl text-gray-600">Key considerations for selecting your ideal neighborhood</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Lifestyle Match',
                description: 'Consider your daily routine, work location, and lifestyle preferences',
                tips: [
                  'Proximity to workplace',
                  'Social and cultural activities',
                  'Family-friendly environment',
                  'Nightlife and entertainment'
                ]
              },
              {
                title: 'Investment Potential',
                description: 'Evaluate long-term growth prospects and rental yields',
                tips: [
                  'Infrastructure development plans',
                  'Historical price appreciation',
                  'Rental demand and yields',
                  'Future connectivity projects'
                ]
              },
              {
                title: 'Budget Considerations',
                description: 'Factor in all costs including maintenance and lifestyle expenses',
                tips: [
                  'Property prices and trends',
                  'Maintenance and utility costs',
                  'Transportation expenses',
                  'Lifestyle and dining costs'
                ]
              }
            ].map((guide, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{guide.title}</h3>
                <p className="text-gray-600 mb-4">{guide.description}</p>
                <ul className="space-y-2">
                  {guide.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-sm text-gray-700 flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Find Properties in Your Preferred Area</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Browse available properties in the areas you're interested in
          </p>
          <Link
            to="/properties"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            <Search className="mr-2 h-5 w-5" />
            Browse Properties
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AreaGuide;