import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Calculator, 
  MapPin, 
  Home, 
  Calendar,
  CheckCircle,
  ArrowRight,
  FileText,
  Phone,
  Mail,
  Star,
  Building,
  Users,
  Award,
  BarChart3,
  PieChart,
  LineChart,
  Shield,
  Target,
  Lightbulb,
  AlertTriangle,
  IndianRupee,
  Clock,
  DollarSign
} from 'lucide-react';

const PropertyValuation = () => {
  const [propertyDetails, setPropertyDetails] = useState({
    propertyType: '',
    location: '',
    area: '',
    bedrooms: '',
    age: '',
    floor: '',
    amenities: []
  });

  const [estimatedValue, setEstimatedValue] = useState(null);

  const valuationMethods = [
    {
      title: 'Comparative Market Analysis (CMA)',
      description: 'Compare with similar properties sold recently in your area',
      accuracy: '85-90%',
      timeframe: '1-2 days',
      cost: '₹2,000 - ₹5,000',
      icon: BarChart3,
      features: [
        'Recent sales data analysis (last 6 months)',
        'Location-based comparison within 1km radius',
        'Market trend analysis and forecasting',
        'Detailed comparable properties report',
        'Price per sq.ft. analysis'
      ],
      bestFor: 'Quick valuation for buying/selling decisions',
      process: [
        'Identify comparable properties in the area',
        'Analyze recent sale transactions',
        'Adjust for property differences',
        'Calculate market value range'
      ]
    },
    {
      title: 'Income Approach Method',
      description: 'Valuation based on rental income potential and investment returns',
      accuracy: '80-85%',
      timeframe: '2-3 days',
      cost: '₹3,000 - ₹7,000',
      icon: PieChart,
      features: [
        'Rental yield calculation and analysis',
        'Cash flow projection and modeling',
        'ROI assessment for investors',
        'Investment viability analysis',
        'Market rental rate comparison'
      ],
      bestFor: 'Investment properties and rental income focus',
      process: [
        'Determine current market rent',
        'Calculate gross rental yield',
        'Factor in expenses and vacancy',
        'Apply capitalization rate'
      ]
    },
    {
      title: 'Cost Approach Method',
      description: 'Based on land value plus construction cost minus depreciation',
      accuracy: '75-80%',
      timeframe: '3-4 days',
      cost: '₹4,000 - ₹8,000',
      icon: LineChart,
      features: [
        'Current construction cost analysis',
        'Land value assessment and trends',
        'Depreciation calculation by age',
        'Replacement cost methodology',
        'Building condition assessment'
      ],
      bestFor: 'New properties and insurance purposes',
      process: [
        'Assess current land value',
        'Calculate replacement cost',
        'Apply depreciation factors',
        'Add land and building values'
      ]
    }
  ];

  const valuationFactors = [
    {
      factor: 'Location & Connectivity',
      weight: '35%',
      description: 'Proximity to amenities, transport, and commercial areas',
      impact: 'High',
      details: [
        'Distance to metro/railway stations',
        'Proximity to IT hubs and business districts',
        'Access to highways and major roads',
        'Nearby schools, hospitals, and shopping centers',
        'Future infrastructure development plans'
      ]
    },
    {
      factor: 'Property Size & Layout',
      weight: '25%',
      description: 'Built-up area, carpet area, and efficient space utilization',
      impact: 'High',
      details: [
        'Total built-up area and carpet area',
        'Number of bedrooms and bathrooms',
        'Balcony and terrace space',
        'Parking availability',
        'Storage and utility areas'
      ]
    },
    {
      factor: 'Age & Condition',
      weight: '20%',
      description: 'Property age, maintenance level, and current condition',
      impact: 'Medium',
      details: [
        'Age of construction and possession',
        'Maintenance and upkeep quality',
        'Recent renovations and upgrades',
        'Structural condition and safety',
        'Wear and tear assessment'
      ]
    },
    {
      factor: 'Amenities & Features',
      weight: '15%',
      description: 'Available facilities and modern features',
      impact: 'Medium',
      details: [
        'Building amenities (gym, pool, security)',
        'Modern fittings and fixtures',
        'Air conditioning and appliances',
        'Internet and cable connectivity',
        'Power backup and water supply'
      ]
    },
    {
      factor: 'Market Trends',
      weight: '5%',
      description: 'Current market conditions and future prospects',
      impact: 'Low',
      details: [
        'Recent price trends in the area',
        'Supply and demand dynamics',
        'Economic factors and interest rates',
        'Government policies and regulations',
        'Future development prospects'
      ]
    }
  ];

  const experts = [
    {
      id: 1,
      name: 'Rajesh Sharma',
      designation: 'Certified Property Valuer',
      experience: '15 years',
      rating: 4.9,
      valuations: 2500,
      specialization: 'Residential Properties',
      image: 'RS',
      location: 'Mumbai',
      certifications: ['RICS Certified', 'Government Approved', 'Bank Panel Valuer'],
      expertise: ['Luxury properties', 'Commercial valuation', 'Legal disputes'],
      languages: ['Hindi', 'English', 'Marathi']
    },
    {
      id: 2,
      name: 'Priya Patel',
      designation: 'Real Estate Appraiser',
      experience: '12 years',
      rating: 4.8,
      valuations: 1800,
      specialization: 'Commercial Properties',
      image: 'PP',
      location: 'Delhi',
      certifications: ['RICS Certified', 'ASA Member', 'Court Approved'],
      expertise: ['Office spaces', 'Retail properties', 'Industrial valuation'],
      languages: ['Hindi', 'English', 'Punjabi']
    },
    {
      id: 3,
      name: 'Amit Kumar',
      designation: 'Property Investment Advisor',
      experience: '10 years',
      rating: 4.7,
      valuations: 1200,
      specialization: 'Investment Properties',
      image: 'AK',
      location: 'Bangalore',
      certifications: ['CFA', 'RICS Associate', 'Bank Empanelled'],
      expertise: ['Investment analysis', 'Portfolio valuation', 'Market research'],
      languages: ['English', 'Hindi', 'Kannada']
    }
  ];

  const valuationProcess = [
    {
      step: 1,
      title: 'Property Inspection',
      description: 'Detailed physical inspection of the property',
      duration: '2-3 hours',
      activities: [
        'Measure actual carpet and built-up area',
        'Assess structural condition and quality',
        'Document amenities and features',
        'Photograph key areas and defects',
        'Check legal compliance and approvals'
      ]
    },
    {
      step: 2,
      title: 'Market Research',
      description: 'Comprehensive analysis of local market conditions',
      duration: '1-2 days',
      activities: [
        'Identify comparable properties in the area',
        'Analyze recent sale and rental transactions',
        'Study market trends and price movements',
        'Research upcoming developments',
        'Assess supply and demand factors'
      ]
    },
    {
      step: 3,
      title: 'Data Analysis',
      description: 'Apply valuation methodologies and calculations',
      duration: '1 day',
      activities: [
        'Apply appropriate valuation methods',
        'Adjust for property differences',
        'Calculate value using multiple approaches',
        'Cross-verify results for accuracy',
        'Determine final value range'
      ]
    },
    {
      step: 4,
      title: 'Report Preparation',
      description: 'Comprehensive valuation report with findings',
      duration: '1-2 days',
      activities: [
        'Prepare detailed valuation report',
        'Include methodology and assumptions',
        'Provide supporting data and analysis',
        'Add photographs and property details',
        'Quality review and certification'
      ]
    }
  ];

  const marketTrends2024 = [
    {
      city: 'Mumbai',
      priceChange: '+8.5%',
      trend: 'Rising',
      avgPrice: '₹18,500/sqft',
      hotAreas: ['Andheri West', 'Bandra', 'Powai'],
      outlook: 'Positive growth expected due to infrastructure development'
    },
    {
      city: 'Delhi NCR',
      priceChange: '+6.2%',
      trend: 'Stable',
      avgPrice: '₹8,200/sqft',
      hotAreas: ['Gurgaon', 'Noida', 'Greater Noida'],
      outlook: 'Steady appreciation with new metro connectivity'
    },
    {
      city: 'Bangalore',
      priceChange: '+12.3%',
      trend: 'Rising',
      avgPrice: '₹7,800/sqft',
      hotAreas: ['Whitefield', 'Electronic City', 'Sarjapur'],
      outlook: 'Strong growth driven by IT sector expansion'
    },
    {
      city: 'Hyderabad',
      priceChange: '+10.1%',
      trend: 'Rising',
      avgPrice: '₹5,500/sqft',
      hotAreas: ['Gachibowli', 'Kondapur', 'Manikonda'],
      outlook: 'Excellent potential with pharma and IT growth'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setPropertyDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateEstimate = () => {
    // Enhanced estimation logic
    const basePrice = 8000; // per sqft
    const area = parseInt(propertyDetails.area) || 1000;
    
    // Location multiplier
    let locationMultiplier = 1.0;
    const location = propertyDetails.location.toLowerCase();
    if (location.includes('mumbai') || location.includes('bandra') || location.includes('andheri')) {
      locationMultiplier = 2.2;
    } else if (location.includes('delhi') || location.includes('gurgaon')) {
      locationMultiplier = 1.5;
    } else if (location.includes('bangalore') || location.includes('whitefield')) {
      locationMultiplier = 1.4;
    } else if (location.includes('hyderabad')) {
      locationMultiplier = 1.2;
    }
    
    // Age multiplier
    let ageMultiplier = 1.0;
    switch (propertyDetails.age) {
      case 'new': ageMultiplier = 1.15; break;
      case '0-5': ageMultiplier = 1.1; break;
      case '5-10': ageMultiplier = 1.0; break;
      case '10+': ageMultiplier = 0.85; break;
      default: ageMultiplier = 1.0;
    }
    
    // Property type multiplier
    let typeMultiplier = 1.0;
    switch (propertyDetails.propertyType) {
      case 'villa': typeMultiplier = 1.3; break;
      case 'apartment': typeMultiplier = 1.0; break;
      case 'house': typeMultiplier = 1.1; break;
      case 'plot': typeMultiplier = 0.6; break;
      default: typeMultiplier = 1.0;
    }
    
    const estimate = basePrice * area * locationMultiplier * ageMultiplier * typeMultiplier;
    setEstimatedValue(Math.round(estimate));
  };

  const valuationReasons = [
    {
      reason: 'Property Sale/Purchase',
      description: 'Determine fair market value for buying or selling decisions',
      importance: 'Critical',
      frequency: '60% of valuations',
      benefits: ['Avoid overpaying or underselling', 'Negotiate better deals', 'Make informed decisions']
    },
    {
      reason: 'Home Loan Processing',
      description: 'Banks require valuation for loan approval and amount determination',
      importance: 'Mandatory',
      frequency: '25% of valuations',
      benefits: ['Loan approval process', 'Determine loan amount', 'Interest rate decisions']
    },
    {
      reason: 'Insurance Claims',
      description: 'Accurate valuation for property insurance and claim settlements',
      importance: 'High',
      frequency: '8% of valuations',
      benefits: ['Adequate insurance coverage', 'Fair claim settlements', 'Risk assessment']
    },
    {
      reason: 'Legal Disputes',
      description: 'Court-approved valuation for property disputes and settlements',
      importance: 'Critical',
      frequency: '4% of valuations',
      benefits: ['Legal compliance', 'Fair dispute resolution', 'Court acceptance']
    },
    {
      reason: 'Investment Analysis',
      description: 'Evaluate investment potential and portfolio decisions',
      importance: 'High',
      frequency: '3% of valuations',
      benefits: ['Investment decisions', 'Portfolio optimization', 'Risk assessment']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Complete Property Valuation Guide
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-8">
              Get accurate property valuations from certified experts using advanced market analysis. Understand your property's true worth with comprehensive valuation methods.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
                <Calculator className="mr-2 h-5 w-5" />
                Get Free Estimate
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors inline-flex items-center justify-center">
                <Phone className="mr-2 h-5 w-5" />
                Expert Valuation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Valuation Tool */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Property Valuation Tool</h2>
            <p className="text-xl text-gray-600">Get an instant estimate of your property value using our advanced algorithm</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Valuation Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Property Details</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    value={propertyDetails.propertyType}
                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select property type</option>
                    <option value="apartment">Apartment/Flat</option>
                    <option value="villa">Villa</option>
                    <option value="house">Independent House</option>
                    <option value="plot">Plot/Land</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={propertyDetails.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter location (e.g., Andheri West, Mumbai)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area (sqft)
                    </label>
                    <input
                      type="number"
                      value={propertyDetails.area}
                      onChange={(e) => handleInputChange('area', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter area"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms
                    </label>
                    <select
                      value={propertyDetails.bedrooms}
                      onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="1">1 BHK</option>
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4+ BHK</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Age
                    </label>
                    <select
                      value={propertyDetails.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select age</option>
                      <option value="new">Under construction</option>
                      <option value="0-5">0-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Floor
                    </label>
                    <input
                      type="text"
                      value={propertyDetails.floor}
                      onChange={(e) => handleInputChange('floor', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., 5th floor"
                    />
                  </div>
                </div>

                <button
                  onClick={calculateEstimate}
                  className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  Calculate Valuation
                </button>
              </div>
            </div>

            {/* Valuation Result */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Estimated Value</h3>
              
              {estimatedValue ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-600 mb-2">
                      ₹{estimatedValue.toLocaleString()}
                    </div>
                    <p className="text-gray-600">Estimated Property Value</p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Value Range</h4>
                    <div className="flex justify-between text-sm">
                      <span>Lower Estimate:</span>
                      <span className="font-medium">₹{(estimatedValue * 0.9).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Upper Estimate:</span>
                      <span className="font-medium">₹{(estimatedValue * 1.1).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price per sqft:</span>
                      <span className="font-medium">₹{Math.round(estimatedValue / parseInt(propertyDetails.area || '1000')).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Market Trend:</span>
                      <span className="font-medium text-green-600 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Appreciating
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Confidence Level:</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Valuation Date:</span>
                      <span className="font-medium">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-blue-900 text-sm">Market Insights:</h5>
                        <p className="text-blue-800 text-sm mt-1">
                          Properties in this area have appreciated by 8-12% in the last year. Consider professional valuation for accurate assessment.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-3">
                      This is a preliminary estimate based on available data. For accurate valuation, consult our certified experts.
                    </p>
                    <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                      Get Professional Valuation
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Fill in the property details to get an estimated value</p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Why Get a Valuation?</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Make informed buying/selling decisions</li>
                      <li>• Secure appropriate home loan amounts</li>
                      <li>• Ensure adequate insurance coverage</li>
                      <li>• Support legal and tax requirements</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Valuation Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Valuation Methods</h2>
            <p className="text-xl text-gray-600">Understanding different approaches to property valuation</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {valuationMethods.map((method, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <method.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-green-50 p-2 rounded text-center">
                    <div className="font-semibold text-green-900 text-sm">Accuracy</div>
                    <div className="text-green-800 text-xs">{method.accuracy}</div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded text-center">
                    <div className="font-semibold text-blue-900 text-sm">Time</div>
                    <div className="text-blue-800 text-xs">{method.timeframe}</div>
                  </div>
                  <div className="bg-purple-50 p-2 rounded text-center">
                    <div className="font-semibold text-purple-900 text-sm">Cost</div>
                    <div className="text-purple-800 text-xs">{method.cost}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {method.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-600 flex items-start">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <h5 className="font-semibold text-blue-900 text-sm mb-1">Best For:</h5>
                  <p className="text-blue-800 text-sm">{method.bestFor}</p>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-2 text-sm">Process:</h5>
                  <ol className="space-y-1">
                    {method.process.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-sm text-gray-600 flex items-start">
                        <span className="w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          <span className="text-orange-600 text-xs font-bold">{stepIndex + 1}</span>
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                  Choose This Method
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valuation Factors */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Factors Affecting Property Value</h2>
            <p className="text-xl text-gray-600">Understanding what determines your property's worth</p>
          </div>

          <div className="space-y-8">
            {valuationFactors.map((factor, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 mr-4">{factor.factor}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        factor.impact === 'High' ? 'bg-red-100 text-red-800' :
                        factor.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {factor.impact} Impact
                      </span>
                    </div>
                    <p className="text-gray-600">{factor.description}</p>
                  </div>
                  <div className="text-right ml-6">
                    <div className="text-3xl font-bold text-orange-600">{factor.weight}</div>
                    <div className="text-sm text-gray-500">Weight</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Considerations:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {factor.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start">
                        <Target className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valuation Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Valuation Process</h2>
            <p className="text-xl text-gray-600">How our certified experts conduct property valuations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuationProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 font-bold text-xl">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                <div className="bg-blue-50 p-2 rounded-lg mb-4">
                  <div className="flex items-center justify-center text-blue-800 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {step.duration}
                  </div>
                </div>
                <ul className="text-left space-y-1">
                  {step.activities.map((activity, activityIndex) => (
                    <li key={activityIndex} className="text-xs text-gray-600 flex items-start">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Trends */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2024 Market Trends</h2>
            <p className="text-xl text-gray-600">Current property market trends across major Indian cities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {marketTrends2024.map((city, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{city.city}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      city.trend === 'Rising' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {city.trend}
                    </span>
                    <span className="text-lg font-bold text-green-600">{city.priceChange}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-gray-600 text-sm">Average Price</div>
                    <div className="font-bold text-gray-900">{city.avgPrice}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-gray-600 text-sm">YoY Change</div>
                    <div className="font-bold text-green-600">{city.priceChange}</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Hot Areas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {city.hotAreas.map((area, areaIndex) => (
                      <span key={areaIndex} className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h5 className="font-semibold text-blue-900 text-sm mb-1">Market Outlook:</h5>
                  <p className="text-blue-800 text-sm">{city.outlook}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Valuers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Certified Property Valuers</h2>
            <p className="text-xl text-gray-600">Get professional valuation from certified and experienced experts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experts.map((expert) => (
              <div key={expert.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl font-bold">{expert.image}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{expert.name}</h3>
                  <p className="text-orange-600 font-medium">{expert.designation}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{expert.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valuations:</span>
                    <span className="font-medium">{expert.valuations}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Specialization:</span>
                    <span className="font-medium text-sm">{expert.specialization}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{expert.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{expert.location}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Certifications:</p>
                  <div className="flex flex-wrap gap-1">
                    {expert.certifications.map((cert, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Expertise:</p>
                  <div className="flex flex-wrap gap-1">
                    {expert.expertise.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Languages:</p>
                  <div className="flex flex-wrap gap-2">
                    {expert.languages.map((lang, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
                  Book Consultation
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Get Valuation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Get Professional Property Valuation?</h2>
            <p className="text-xl text-gray-600">Understanding the importance and benefits of accurate property valuation</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {valuationReasons.map((reason, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{reason.reason}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      reason.importance === 'Critical' ? 'bg-red-100 text-red-800' :
                      reason.importance === 'Mandatory' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {reason.importance}
                    </span>
                    <span className="text-sm text-gray-500">{reason.frequency}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{reason.description}</p>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {reason.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="text-green-800 flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Professional Property Valuation Today</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Connect with certified valuers for accurate property assessment and make informed decisions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <Phone className="mr-2 h-5 w-5" />
              Call +91 9876543210
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors inline-flex items-center justify-center">
              <Mail className="mr-2 h-5 w-5" />
              Request Callback
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyValuation;