import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Map, 
  Search, 
  Home, 
  Building, 
  Users, 
  FileText, 
  HelpCircle,
  Shield,
  Scale,
  CreditCard,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Filter,
  Grid,
  List,
  Clock,
  Star,
  Download
} from 'lucide-react';

const Sitemap = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('main-pages');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'hierarchical' | 'alphabetical'>('hierarchical');

  const siteStructure = {
    'main-pages': {
      title: 'Main Pages',
      icon: Home,
      description: 'Core pages and primary navigation',
      pages: [
        { title: 'Home', url: '/', description: 'Main landing page with property search and featured listings' },
        { title: 'Properties', url: '/properties', description: 'Browse all property listings with filters and search' },
        { title: 'Property Details', url: '/property/:id', description: 'Detailed view of individual properties' },
        { title: 'Post Property', url: '/post-property', description: 'List your property for rent or sale' },
        { title: 'Property Upload', url: '/upload-property', description: 'Upload property photos and documents' }
      ]
    },
    'authentication': {
      title: 'Authentication',
      icon: Users,
      description: 'User account and authentication pages',
      pages: [
        { title: 'Sign In', url: '/signin', description: 'User login with email, phone, or Google' },
        { title: 'Sign Up', url: '/signup', description: 'Create new user account' },
        { title: 'Forgot Password', url: '/forgot-password', description: 'Password reset functionality' }
      ]
    },
    'services': {
      title: 'Services',
      icon: Building,
      description: 'Real estate services and tools',
      pages: [
        { title: 'All Services', url: '/services', description: 'Complete overview of all real estate services' },
        { title: 'Property Guide', url: '/property-guide', description: 'Comprehensive guide to buying, selling, and investing' },
        { title: 'Area Guide', url: '/area-guide', description: 'Neighborhood profiles and location insights' },
        { title: 'Legal Services', url: '/legal-services', description: 'Property law advice and legal assistance' },
        { title: 'Home Loans', url: '/home-loans', description: 'Mortgage services and loan calculators' },
        { title: 'Property Valuation', url: '/property-valuation', description: 'Property value estimation and market analysis' }
      ]
    },
    'resources': {
      title: 'Resources',
      icon: FileText,
      description: 'Educational content and guides',
      pages: [
        { title: 'Buying Guides', url: '/resources/buying-guides', description: 'Step-by-step property buying guides' },
        { title: 'Selling Tips', url: '/resources/selling-tips', description: 'Expert advice for selling properties' },
        { title: 'Market Reports', url: '/resources/market-reports', description: 'Latest market trends and analysis' },
        { title: 'Investment Strategies', url: '/resources/investment-strategies', description: 'Real estate investment guidance' }
      ]
    },
    'location-guides': {
      title: 'Location Guides',
      icon: MapPin,
      description: 'Area-specific information and guides',
      pages: [
        { title: 'School Information', url: '/location/schools', description: 'School ratings and district information' },
        { title: 'Local Amenities', url: '/location/amenities', description: 'Parks, shopping, and entertainment options' },
        { title: 'Transportation', url: '/location/transportation', description: 'Public transit and commute information' },
        { title: 'Safety Statistics', url: '/location/safety', description: 'Crime data and safety information' }
      ]
    },
    'legal-assistance': {
      title: 'Legal Assistance',
      icon: Scale,
      description: 'Legal support and documentation',
      pages: [
        { title: 'Contract Reviews', url: '/legal/contract-review', description: 'Professional contract review services' },
        { title: 'Title Searches', url: '/legal/title-search', description: 'Property title verification services' },
        { title: 'Settlement Services', url: '/legal/settlement', description: 'Closing and settlement assistance' },
        { title: 'Documentation Help', url: '/legal/documentation', description: 'Legal document assistance' }
      ]
    },
    'mortgage-services': {
      title: 'Mortgage Services',
      icon: CreditCard,
      description: 'Financing and loan services',
      pages: [
        { title: 'Interest Rate Comparisons', url: '/mortgage/rates', description: 'Compare rates from multiple lenders' },
        { title: 'Pre-approval Process', url: '/mortgage/pre-approval', description: 'Get pre-approved for home loans' },
        { title: 'Refinancing Options', url: '/mortgage/refinancing', description: 'Lower your monthly payments' },
        { title: 'First-time Buyer Programs', url: '/mortgage/first-time-buyers', description: 'Special programs for new buyers' }
      ]
    },
    'valuation-tools': {
      title: 'Valuation Tools',
      icon: TrendingUp,
      description: 'Property valuation and analysis',
      pages: [
        { title: 'Professional Appraisals', url: '/valuation/professional', description: 'Certified property appraisal services' },
        { title: 'Market Analysis', url: '/valuation/market-analysis', description: 'Detailed market trends and forecasts' },
        { title: 'Price History', url: '/valuation/price-history', description: 'Historical property price data' },
        { title: 'Comparative Analysis', url: '/valuation/comparative-analysis', description: 'Compare similar properties' }
      ]
    },
    'support': {
      title: 'Support & Help',
      icon: HelpCircle,
      description: 'Customer support and assistance',
      pages: [
        { title: 'Help Center', url: '/help', description: 'Comprehensive customer support and FAQs' },
        { title: 'Safety Tips', url: '/safety', description: 'Security guidelines and best practices' },
        { title: 'Contact Us', url: '/contact', description: 'Get in touch with our support team' }
      ]
    },
    'legal-pages': {
      title: 'Legal & Policies',
      icon: Shield,
      description: 'Legal documents and policies',
      pages: [
        { title: 'Terms of Service', url: '/terms', description: 'Website usage rules and legal agreement' },
        { title: 'Privacy Policy', url: '/privacy', description: 'Data collection and protection practices' },
        { title: 'Sitemap', url: '/sitemap', description: 'Complete website structure and navigation' }
      ]
    },
    'company': {
      title: 'Company',
      icon: Building,
      description: 'About PropertyHub and company information',
      pages: [
        { title: 'About Us', url: '/about', description: 'Learn about PropertyHub and our mission' },
        { title: 'Careers', url: '/careers', description: 'Join our team and explore opportunities' },
        { title: 'Press', url: '/press', description: 'Press releases and media resources' },
        { title: 'Blog', url: '/blog', description: 'Latest news and insights from PropertyHub' }
      ]
    }
  };

  const popularPages = [
    { title: 'Properties', url: '/properties', visits: '2.5M', description: 'Browse property listings' },
    { title: 'Home Loans', url: '/home-loans', visits: '1.8M', description: 'Mortgage and loan services' },
    { title: 'Property Guide', url: '/property-guide', visits: '1.2M', description: 'Complete buying/selling guide' },
    { title: 'Area Guide', url: '/area-guide', visits: '950K', description: 'Neighborhood information' },
    { title: 'Post Property', url: '/post-property', visits: '800K', description: 'List your property' },
    { title: 'Property Valuation', url: '/property-valuation', visits: '650K', description: 'Property value estimation' }
  ];

  const recentlyUpdated = [
    { title: 'Privacy Policy', url: '/privacy', date: 'Dec 15, 2024', description: 'Updated data protection practices' },
    { title: 'Terms of Service', url: '/terms', date: 'Dec 15, 2024', description: 'Updated legal terms and conditions' },
    { title: 'Home Loans', url: '/home-loans', date: 'Dec 10, 2024', description: 'Added new loan calculators' },
    { title: 'Safety Tips', url: '/safety', date: 'Dec 8, 2024', description: 'Enhanced security guidelines' },
    { title: 'Legal Services', url: '/legal-services', date: 'Dec 5, 2024', description: 'Expanded legal assistance options' }
  ];

  const getAllPages = () => {
    const allPages: any[] = [];
    Object.values(siteStructure).forEach(section => {
      section.pages.forEach(page => {
        allPages.push({
          ...page,
          section: section.title,
          sectionIcon: section.icon
        });
      });
    });
    return allPages;
  };

  const filteredPages = getAllPages().filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const renderHierarchicalView = () => (
    <div className="space-y-6">
      {Object.entries(siteStructure).map(([sectionId, section]) => (
        <div key={sectionId} className="bg-white rounded-xl shadow-sm border border-gray-200">
          <button
            onClick={() => toggleSection(sectionId)}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <section.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                <p className="text-gray-600">{section.description}</p>
              </div>
            </div>
            <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${
              expandedSection === sectionId ? 'rotate-180' : ''
            }`} />
          </button>
          
          {expandedSection === sectionId && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.pages.map((page, index) => (
                  <Link
                    key={index}
                    to={page.url}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-700">{page.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{page.description}</p>
                      <p className="text-blue-600 text-xs mt-1 font-mono">{page.url}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderAlphabeticalView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPages
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((page, index) => (
          <Link
            key={index}
            to={page.url}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
          >
            <div className="flex items-center space-x-3 flex-1">
              <page.sectionIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
              <div>
                <h4 className="font-medium text-gray-900 group-hover:text-blue-700">{page.title}</h4>
                <p className="text-gray-500 text-xs">{page.section}</p>
                <p className="text-blue-600 text-xs font-mono">{page.url}</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Website Sitemap</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            Complete hierarchical listing of all pages and sections on PropertyHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <Download className="mr-2 h-5 w-5" />
              Download XML Sitemap
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-flex items-center justify-center">
              <ExternalLink className="mr-2 h-5 w-5" />
              View robots.txt
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Controls */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('hierarchical')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded transition-colors ${
                    viewMode === 'hierarchical'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                  <span>Hierarchical</span>
                </button>
                <button
                  onClick={() => setViewMode('alphabetical')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded transition-colors ${
                    viewMode === 'alphabetical'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="h-4 w-4" />
                  <span>Alphabetical</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{getAllPages().length}</div>
            <p className="text-gray-600">Total Pages</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{Object.keys(siteStructure).length}</div>
            <p className="text-gray-600">Main Sections</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <p className="text-gray-600">Availability</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
            <p className="text-gray-600">Mobile Friendly</p>
          </div>
        </div>

        {/* Popular Pages */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Most Popular Pages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPages.map((page, index) => (
              <Link
                key={index}
                to={page.url}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">
                    {page.title}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-600">{page.visits}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">{page.description}</p>
                <p className="text-green-600 text-xs font-mono">{page.url}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Recently Updated */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recently Updated</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              {recentlyUpdated.map((page, index) => (
                <Link
                  key={index}
                  to={page.url}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 group-hover:text-green-700">{page.title}</h4>
                      <p className="text-gray-600 text-sm">{page.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{page.date}</p>
                    <p className="text-green-600 text-xs font-mono">{page.url}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Main Sitemap */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Complete Site Structure</h2>
            {searchTerm && (
              <p className="text-gray-600">
                {filteredPages.length} pages found for "{searchTerm}"
              </p>
            )}
          </div>
          
          {viewMode === 'hierarchical' ? renderHierarchicalView() : renderAlphabeticalView()}
        </section>

        {/* Contact Section */}
        <section className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Need Help Finding Something?</h3>
          <p className="text-gray-700 mb-6">
            Can't find what you're looking for? Our support team is here to help you navigate our platform.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Email Support</p>
                <p className="text-gray-600">support@propertyhub.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Phone Support</p>
                <p className="text-gray-600">+91 9876543210</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sitemap;