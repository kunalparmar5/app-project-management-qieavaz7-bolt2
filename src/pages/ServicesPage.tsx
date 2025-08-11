import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen,
  MapPin,
  Scale,
  CreditCard,
  LineChart,
  Home,
  TrendingUp,
  GraduationCap,
  Car,
  Shield,
  BarChart3,
  FileText,
  Search,
  Handshake,
  Calculator,
  Percent,
  Award,
  Users,
  Building,
  PieChart,
  Target,
  ArrowRight,
  CheckCircle,
  Star,
  Phone,
  Mail
} from 'lucide-react';

const ServicesPage = () => {
  const serviceCategories = [
    {
      title: 'Property Resources',
      description: 'Comprehensive guides and tools for property transactions',
      icon: BookOpen,
      color: 'blue',
      services: [
        {
          title: 'Buying Guides',
          description: 'Step-by-step guides for first-time and experienced buyers',
          href: '/resources/buying-guides',
          icon: Home,
          features: ['First-time buyer tips', 'Property inspection checklists', 'Negotiation strategies']
        },
        {
          title: 'Selling Tips',
          description: 'Expert advice to maximize your property sale value',
          href: '/resources/selling-tips',
          icon: TrendingUp,
          features: ['Home staging advice', 'Pricing strategies', 'Marketing tips']
        },
        {
          title: 'Market Reports',
          description: 'Latest market trends and analysis reports',
          href: '/resources/market-reports',
          icon: BarChart3,
          features: ['Monthly market updates', 'Price trend analysis', 'Investment insights']
        },
        {
          title: 'Investment Strategies',
          description: 'Build wealth through smart real estate investments',
          href: '/resources/investment-strategies',
          icon: Target,
          features: ['ROI calculations', 'Portfolio diversification', 'Risk assessment']
        }
      ]
    },
    {
      title: 'Location Guides',
      description: 'Detailed insights about neighborhoods and localities',
      icon: MapPin,
      color: 'green',
      services: [
        {
          title: 'Neighborhood Profiles',
          description: 'Comprehensive area guides with local insights',
          href: '/area-guide',
          icon: Building,
          features: ['Demographics data', 'Lifestyle information', 'Future development plans']
        },
        {
          title: 'School Information',
          description: 'School ratings, reviews, and district information',
          href: '/location/schools',
          icon: GraduationCap,
          features: ['School ratings', 'Academic performance', 'Admission criteria']
        },
        {
          title: 'Transportation Access',
          description: 'Public transit, highways, and commute information',
          href: '/location/transportation',
          icon: Car,
          features: ['Metro connectivity', 'Bus routes', 'Traffic patterns']
        },
        {
          title: 'Safety Statistics',
          description: 'Crime data and safety information by area',
          href: '/location/safety',
          icon: Shield,
          features: ['Crime statistics', 'Safety ratings', 'Emergency services']
        }
      ]
    },
    {
      title: 'Legal Assistance',
      description: 'Professional legal support for property transactions',
      icon: Scale,
      color: 'purple',
      services: [
        {
          title: 'Property Law Advice',
          description: 'Expert legal consultation for property matters',
          href: '/legal-services',
          icon: Scale,
          features: ['Legal consultation', 'Document verification', 'Dispute resolution']
        },
        {
          title: 'Contract Reviews',
          description: 'Professional review of purchase and sale agreements',
          href: '/legal/contract-review',
          icon: FileText,
          features: ['Agreement drafting', 'Terms review', 'Risk assessment']
        },
        {
          title: 'Title Searches',
          description: 'Comprehensive property title verification services',
          href: '/legal/title-search',
          icon: Search,
          features: ['Title verification', 'Encumbrance check', 'Legal clearance']
        },
        {
          title: 'Settlement Services',
          description: 'Complete closing and settlement assistance',
          href: '/legal/settlement',
          icon: Handshake,
          features: ['Closing coordination', 'Fund transfer', 'Document registration']
        }
      ]
    },
    {
      title: 'Mortgage Services',
      description: 'Complete financing solutions for your property needs',
      icon: CreditCard,
      color: 'orange',
      services: [
        {
          title: 'Loan Calculators',
          description: 'EMI calculators and affordability tools',
          href: '/home-loans',
          icon: Calculator,
          features: ['EMI calculator', 'Affordability assessment', 'Loan comparison']
        },
        {
          title: 'Interest Rate Comparisons',
          description: 'Compare rates from multiple lenders',
          href: '/mortgage/rates',
          icon: Percent,
          features: ['Rate comparison', 'Lender reviews', 'Best deals']
        },
        {
          title: 'Pre-approval Process',
          description: 'Get pre-approved for faster property purchases',
          href: '/mortgage/pre-approval',
          icon: Award,
          features: ['Quick approval', 'Credit assessment', 'Documentation help']
        },
        {
          title: 'First-time Buyer Programs',
          description: 'Special programs and incentives for new buyers',
          href: '/mortgage/first-time-buyers',
          icon: Users,
          features: ['Government schemes', 'Subsidies', 'Special rates']
        }
      ]
    },
    {
      title: 'Property Valuation Tools',
      description: 'Accurate property valuation and market analysis',
      icon: LineChart,
      color: 'red',
      services: [
        {
          title: 'Online Estimators',
          description: 'Instant property value estimates',
          href: '/property-valuation',
          icon: Calculator,
          features: ['Instant valuation', 'Market comparison', 'Price trends']
        },
        {
          title: 'Professional Appraisals',
          description: 'Certified property appraisal services',
          href: '/valuation/professional',
          icon: Award,
          features: ['Certified appraisers', 'Detailed reports', 'Legal compliance']
        },
        {
          title: 'Market Analysis',
          description: 'Detailed market trends and forecasts',
          href: '/valuation/market-analysis',
          icon: BarChart3,
          features: ['Market trends', 'Price forecasts', 'Investment analysis']
        },
        {
          title: 'Comparative Reports',
          description: 'Compare similar properties in your area',
          href: '/valuation/comparative-analysis',
          icon: PieChart,
          features: ['Property comparison', 'Market positioning', 'Value assessment']
        }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'from-blue-600 to-blue-700 bg-blue-50 text-blue-700 border-blue-200',
      green: 'from-green-600 to-green-700 bg-green-50 text-green-700 border-green-200',
      purple: 'from-purple-600 to-purple-700 bg-purple-50 text-purple-700 border-purple-200',
      orange: 'from-orange-600 to-orange-700 bg-orange-50 text-orange-700 border-orange-200',
      red: 'from-red-600 to-red-700 bg-red-50 text-red-700 border-red-200'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Real Estate Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Comprehensive tools and expert services to guide you through every step of your real estate journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                Get Expert Help
              </Link>
              <Link
                to="/consultation"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
              >
                <Mail className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Service Categories</h2>
            <p className="text-xl text-gray-600">Everything you need for successful real estate transactions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {serviceCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
                <div className={`w-12 h-12 bg-gradient-to-r ${getColorClasses(category.color).split(' ')[0]} ${getColorClasses(category.color).split(' ')[1]} rounded-lg flex items-center justify-center mb-4`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="text-sm text-gray-500">
                  {category.services.length} services available
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      {serviceCategories.map((category, categoryIndex) => (
        <section key={categoryIndex} className={`py-16 ${categoryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className={`w-16 h-16 bg-gradient-to-r ${getColorClasses(category.color).split(' ')[0]} ${getColorClasses(category.color).split(' ')[1]} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <category.icon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{category.title}</h2>
              <p className="text-xl text-gray-600">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {category.services.map((service, serviceIndex) => (
                <div key={serviceIndex} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${getColorClasses(category.color).split(' ')[2]} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <service.icon className={`h-6 w-6 ${getColorClasses(category.color).split(' ')[3]}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      
                      <div className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <Link
                        to={service.href}
                        className={`inline-flex items-center space-x-2 ${getColorClasses(category.color).split(' ')[3]} hover:underline font-medium`}
                      >
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Services?</h2>
            <p className="text-xl text-gray-300">Trusted by thousands of property buyers, sellers, and investors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Expert Guidance',
                description: 'Professional advice from certified real estate experts and legal professionals'
              },
              {
                icon: Shield,
                title: 'Secure Transactions',
                description: 'Complete verification and legal compliance for all property transactions'
              },
              {
                icon: Users,
                title: 'Personalized Service',
                description: 'Tailored solutions based on your specific needs and requirements'
              },
              {
                icon: Star,
                title: 'Proven Track Record',
                description: '10,000+ successful transactions and 4.8/5 customer satisfaction rating'
              },
              {
                icon: Calculator,
                title: 'Transparent Pricing',
                description: 'No hidden fees, clear pricing structure for all our services'
              },
              {
                icon: Phone,
                title: '24/7 Support',
                description: 'Round-the-clock customer support for all your queries and concerns'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Connect with our experts today and take the first step towards your real estate goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact Us Today
            </Link>
            <Link
              to="/properties"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              <Search className="mr-2 h-5 w-5" />
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;