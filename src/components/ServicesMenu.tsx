import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown,
  Home,
  BookOpen,
  TrendingUp,
  DollarSign,
  MapPin,
  GraduationCap,
  Car,
  Shield,
  BarChart3,
  Scale,
  FileText,
  Search,
  Handshake,
  Calculator,
  Percent,
  CreditCard,
  Users,
  Award,
  Building,
  LineChart,
  PieChart,
  Calendar,
  Target
} from 'lucide-react';

interface ServiceItem {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<any>;
  isNew?: boolean;
  isPopular?: boolean;
}

interface ServiceSection {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  items: ServiceItem[];
}

const ServicesMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const servicesSections: ServiceSection[] = [
    {
      title: 'Property Resources',
      description: 'Comprehensive guides and tools for property transactions',
      icon: BookOpen,
      items: [
        {
          title: 'Buying Guides',
          description: 'Step-by-step guides for first-time and experienced buyers',
          href: '/resources/buying-guides',
          icon: Home,
          isPopular: true
        },
        {
          title: 'Selling Tips',
          description: 'Expert advice to maximize your property sale value',
          href: '/resources/selling-tips',
          icon: TrendingUp
        },
        {
          title: 'Market Reports',
          description: 'Latest market trends and analysis reports',
          href: '/resources/market-reports',
          icon: BarChart3,
          isNew: true
        },
        {
          title: 'Investment Strategies',
          description: 'Build wealth through smart real estate investments',
          href: '/resources/investment-strategies',
          icon: Target
        }
      ]
    },
    {
      title: 'Location Guides',
      description: 'Detailed insights about neighborhoods and localities',
      icon: MapPin,
      items: [
        {
          title: 'Neighborhood Profiles',
          description: 'Comprehensive area guides with local insights',
          href: '/area-guide',
          icon: Building,
          isPopular: true
        },
        {
          title: 'School Information',
          description: 'School ratings, reviews, and district information',
          href: '/location/schools',
          icon: GraduationCap
        },
        {
          title: 'Local Amenities',
          description: 'Parks, shopping, dining, and entertainment options',
          href: '/location/amenities',
          icon: MapPin
        },
        {
          title: 'Transportation Access',
          description: 'Public transit, highways, and commute information',
          href: '/location/transportation',
          icon: Car
        },
        {
          title: 'Crime Statistics',
          description: 'Safety data and crime statistics by area',
          href: '/location/safety',
          icon: Shield
        }
      ]
    },
    {
      title: 'Legal Assistance',
      description: 'Professional legal support for property transactions',
      icon: Scale,
      items: [
        {
          title: 'Property Law Advice',
          description: 'Expert legal consultation for property matters',
          href: '/legal-services',
          icon: Scale,
          isPopular: true
        },
        {
          title: 'Contract Reviews',
          description: 'Professional review of purchase and sale agreements',
          href: '/legal/contract-review',
          icon: FileText
        },
        {
          title: 'Title Searches',
          description: 'Comprehensive property title verification services',
          href: '/legal/title-search',
          icon: Search
        },
        {
          title: 'Settlement Services',
          description: 'Complete closing and settlement assistance',
          href: '/legal/settlement',
          icon: Handshake
        },
        {
          title: 'Documentation Help',
          description: 'Assistance with legal documents and paperwork',
          href: '/legal/documentation',
          icon: FileText
        }
      ]
    },
    {
      title: 'Mortgage Services',
      description: 'Complete financing solutions for your property needs',
      icon: CreditCard,
      items: [
        {
          title: 'Loan Calculators',
          description: 'EMI calculators and affordability tools',
          href: '/home-loans',
          icon: Calculator,
          isPopular: true
        },
        {
          title: 'Interest Rate Comparisons',
          description: 'Compare rates from multiple lenders',
          href: '/mortgage/rates',
          icon: Percent
        },
        {
          title: 'Pre-approval Process',
          description: 'Get pre-approved for faster property purchases',
          href: '/mortgage/pre-approval',
          icon: Award
        },
        {
          title: 'Refinancing Options',
          description: 'Lower your monthly payments with refinancing',
          href: '/mortgage/refinancing',
          icon: TrendingUp
        },
        {
          title: 'First-time Buyer Programs',
          description: 'Special programs and incentives for new buyers',
          href: '/mortgage/first-time-buyers',
          icon: Users,
          isNew: true
        }
      ]
    },
    {
      title: 'Property Valuation Tools',
      description: 'Accurate property valuation and market analysis',
      icon: LineChart,
      items: [
        {
          title: 'Online Estimators',
          description: 'Instant property value estimates',
          href: '/property-valuation',
          icon: Calculator,
          isPopular: true
        },
        {
          title: 'Professional Appraisals',
          description: 'Certified property appraisal services',
          href: '/valuation/professional',
          icon: Award
        },
        {
          title: 'Market Analysis',
          description: 'Detailed market trends and forecasts',
          href: '/valuation/market-analysis',
          icon: BarChart3
        },
        {
          title: 'Historical Price Data',
          description: 'Property price history and trends',
          href: '/valuation/price-history',
          icon: LineChart
        },
        {
          title: 'Comparative Market Reports',
          description: 'Compare similar properties in your area',
          href: '/valuation/comparative-analysis',
          icon: PieChart
        }
      ]
    }
  ];

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    setActiveSection(null);
  };

  const handleSectionHover = (sectionTitle: string) => {
    setActiveSection(sectionTitle);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
        <span>Services</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Mega Menu */}
      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen max-w-6xl bg-white shadow-2xl border border-gray-200 rounded-lg mt-2 z-50">
          <div className="flex">
            {/* Left Sidebar - Service Categories */}
            <div className="w-80 bg-gray-50 p-6 border-r border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Real Estate Services</h3>
              <nav className="space-y-2">
                {servicesSections.map((section) => (
                  <button
                    key={section.title}
                    onMouseEnter={() => handleSectionHover(section.title)}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                      activeSection === section.title
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <section.icon className={`h-5 w-5 ${
                        activeSection === section.title ? 'text-blue-600' : 'text-gray-500'
                      }`} />
                      <div>
                        <div className="font-medium">{section.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{section.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Right Content - Service Items */}
            <div className="flex-1 p-6">
              {activeSection ? (
                <div>
                  {servicesSections
                    .filter(section => section.title === activeSection)
                    .map((section) => (
                      <div key={section.title}>
                        <div className="flex items-center space-x-3 mb-6">
                          <section.icon className="h-6 w-6 text-blue-600" />
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900">{section.title}</h4>
                            <p className="text-gray-600">{section.description}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {section.items.map((item) => (
                            <Link
                              key={item.title}
                              to={item.href}
                              className="group p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                  <item.icon className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h5 className="font-medium text-gray-900 group-hover:text-blue-700">
                                      {item.title}
                                    </h5>
                                    {item.isNew && (
                                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                        New
                                      </span>
                                    )}
                                    {item.isPopular && (
                                      <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                                        Popular
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Comprehensive Real Estate Services
                  </h4>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Hover over a service category on the left to explore our comprehensive range of real estate tools and resources.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="border-t border-gray-200 bg-gray-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-semibold text-gray-900">Need Personal Assistance?</h5>
                <p className="text-sm text-gray-600">Connect with our real estate experts for personalized guidance</p>
              </div>
              <div className="flex space-x-3">
                <Link
                  to="/contact"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Expert
                </Link>
                <Link
                  to="/consultation"
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Schedule Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesMenu;