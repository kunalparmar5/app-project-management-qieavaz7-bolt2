import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Search, 
  FileText, 
  Calculator, 
  Shield, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Download,
  Clock,
  Users,
  Star,
  IndianRupee,
  Building,
  MapPin,
  Award,
  AlertTriangle,
  BookOpen,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Lightbulb,
  DollarSign,
  Phone,
  Mail
} from 'lucide-react';

const PropertyGuide = () => {
  const propertyTypes = [
    {
      type: 'Apartment/Flat',
      description: 'Self-contained housing unit within a larger building or complex',
      pros: ['Lower maintenance responsibility', 'Security features', 'Shared amenities', 'Prime locations'],
      cons: ['Limited space', 'Monthly maintenance charges', 'Noise from neighbors', 'Parking constraints'],
      priceRange: '₹30L - ₹2Cr',
      bestFor: 'First-time buyers, urban professionals, nuclear families',
      keyFeatures: ['Gated security', 'Elevators', 'Common areas', 'Utility connections']
    },
    {
      type: 'Independent House',
      description: 'Standalone residential property with private land ownership',
      pros: ['Complete privacy', 'More space', 'No maintenance fees', 'Customization freedom'],
      cons: ['Higher purchase cost', 'Full maintenance responsibility', 'Security concerns', 'Utility setup'],
      priceRange: '₹50L - ₹5Cr',
      bestFor: 'Large families, long-term investors, privacy seekers',
      keyFeatures: ['Private compound', 'Multiple floors', 'Garden space', 'Parking area']
    },
    {
      type: 'Villa',
      description: 'Luxury independent house with premium amenities and design',
      pros: ['Luxury living', 'Premium locations', 'High appreciation', 'Exclusive amenities'],
      cons: ['Very expensive', 'High maintenance costs', 'Limited availability', 'Property taxes'],
      priceRange: '₹1Cr - ₹10Cr+',
      bestFor: 'High-income buyers, luxury lifestyle seekers, status-conscious buyers',
      keyFeatures: ['Premium finishes', 'Landscaped gardens', 'Swimming pools', 'Smart home features']
    },
    {
      type: 'Plot/Land',
      description: 'Vacant land for future construction or investment purposes',
      pros: ['Lower initial investment', 'Custom construction', 'High appreciation potential', 'No depreciation'],
      cons: ['Construction complexity', 'Time investment', 'Approval processes', 'Infrastructure development'],
      priceRange: '₹20L - ₹2Cr',
      bestFor: 'Long-term investors, custom home builders, patient investors',
      keyFeatures: ['Clear title', 'Development potential', 'Infrastructure access', 'Zoning compliance']
    }
  ];

  const buyingProcess = [
    {
      step: 1,
      title: 'Financial Planning & Pre-approval',
      description: 'Establish your budget and secure financing before house hunting',
      details: [
        'Calculate affordability using 30% income rule (EMI should not exceed 30% of monthly income)',
        'Get pre-approval from 2-3 banks to compare interest rates and terms',
        'Factor in additional costs: registration (1%), stamp duty (5-7%), legal fees (₹25,000-50,000)',
        'Maintain emergency fund of 6 months EMI for unexpected situations',
        'Check and improve credit score (aim for 750+ for best rates)'
      ],
      timeframe: '2-4 weeks',
      cost: '₹5,000-15,000 for documentation',
      tips: 'Start with pre-approval to strengthen your negotiating position'
    },
    {
      step: 2,
      title: 'Property Research & Search',
      description: 'Identify suitable properties based on your requirements and budget',
      details: [
        'Define clear requirements: location, size, amenities, budget range',
        'Research neighborhoods for connectivity, schools, hospitals, future development',
        'Use multiple platforms: online portals, local agents, direct developer contact',
        'Visit properties at different times (morning, evening, weekends) to assess environment',
        'Create comparison spreadsheet with pros/cons for each property'
      ],
      timeframe: '4-8 weeks',
      cost: '₹10,000-25,000 for site visits and agent fees',
      tips: 'Visit at least 10-15 properties to understand market rates'
    },
    {
      step: 3,
      title: 'Legal Due Diligence',
      description: 'Verify all legal aspects and documentation of the property',
      details: [
        'Verify clear and marketable title with 30-year ownership history',
        'Check building approvals: sanctioned plan, occupancy certificate, completion certificate',
        'Confirm no pending litigation or disputes on the property',
        'Verify property tax payments and utility bill clearances',
        'Get legal opinion from qualified property lawyer'
      ],
      timeframe: '2-3 weeks',
      cost: '₹15,000-30,000 for legal verification',
      tips: 'Never skip legal verification - it can save you from future disputes'
    },
    {
      step: 4,
      title: 'Negotiation & Agreement',
      description: 'Negotiate terms and formalize the purchase agreement',
      details: [
        'Research comparable property prices for effective negotiation',
        'Negotiate not just price but also payment terms, possession date, inclusions',
        'Sign sale agreement with token amount (typically ₹50,000-2,00,000)',
        'Include penalty clauses for construction delays or possession delays',
        'Specify exact carpet area, amenities included, and handover condition'
      ],
      timeframe: '1-2 weeks',
      cost: 'Token amount + stamp duty on agreement',
      tips: 'Get all verbal promises in writing within the agreement'
    },
    {
      step: 5,
      title: 'Loan Processing & Approval',
      description: 'Complete bank formalities and secure loan disbursement',
      details: [
        'Submit complete documentation: income proof, property papers, identity documents',
        'Bank conducts technical and legal verification of the property',
        'Property valuation by bank-approved valuers (usually 85-90% of market value)',
        'Loan sanction letter with disbursement schedule and terms',
        'Coordinate with builder/seller for loan disbursement process'
      ],
      timeframe: '3-4 weeks',
      cost: 'Processing fee (0.5-1% of loan amount)',
      tips: 'Maintain all original documents and provide clear photocopies'
    },
    {
      step: 6,
      title: 'Registration & Possession',
      description: 'Complete legal formalities and take physical possession',
      details: [
        'Pay stamp duty and registration fees at sub-registrar office',
        'Register property in your name with proper documentation',
        'Conduct final inspection and get possession certificate',
        'Transfer utility connections (electricity, water, gas) to your name',
        'Get property insurance and update bank records'
      ],
      timeframe: '1-2 weeks',
      cost: 'Registration fees + utility deposits',
      tips: 'Do final inspection before registration to note any defects'
    }
  ];

  const sellingTips = [
    {
      category: 'Preparation',
      tips: [
        'Get professional property valuation from 2-3 certified valuers',
        'Complete minor repairs and fresh paint to improve appearance',
        'Declutter and stage the property for better visual appeal',
        'Gather all original documents and clearance certificates',
        'Research current market rates in your locality'
      ]
    },
    {
      category: 'Marketing',
      tips: [
        'Hire professional photographer for high-quality property photos',
        'List on multiple platforms: 99acres, MagicBricks, Housing.com',
        'Create compelling property description highlighting unique features',
        'Use social media and local networks for wider reach',
        'Consider virtual tours for remote buyers'
      ]
    },
    {
      category: 'Negotiation',
      tips: [
        'Set realistic asking price based on market analysis',
        'Be prepared to negotiate 5-10% from asking price',
        'Screen buyers for financial capability before serious negotiations',
        'Consider multiple offers and choose best overall terms',
        'Be flexible on possession date if it helps close the deal'
      ]
    }
  ];

  const marketTrends2024 = [
    {
      trend: 'Digital Transformation',
      impact: 'High',
      description: 'PropTech adoption accelerating with virtual tours, AI-powered property search, and blockchain for documentation',
      stats: '65% increase in virtual property tours',
      opportunity: 'Faster transactions, reduced physical visits, transparent pricing'
    },
    {
      trend: 'Sustainable & Green Buildings',
      impact: 'Medium-High',
      description: 'Growing demand for eco-friendly features, solar panels, rainwater harvesting, and green certifications',
      stats: '30% premium for green-certified buildings',
      opportunity: 'Higher resale value, lower operating costs, tax benefits'
    },
    {
      trend: 'Affordable Housing Focus',
      impact: 'High',
      description: 'Government schemes like PMAY driving affordable housing segment with subsidies and tax benefits',
      stats: '40% of new launches under ₹50 lakh',
      opportunity: 'Good entry point for first-time buyers, government support'
    },
    {
      trend: 'Co-living & Co-working Spaces',
      impact: 'Medium',
      description: 'Shared living arrangements and flexible workspaces gaining popularity among millennials',
      stats: '25% growth in co-living spaces',
      opportunity: 'Investment opportunity in rental market, lower entry costs'
    },
    {
      trend: 'Tier-2 City Growth',
      impact: 'High',
      description: 'IT companies expanding to smaller cities, improving infrastructure and job opportunities',
      stats: '20% price appreciation in tier-2 cities',
      opportunity: 'Lower prices, higher growth potential, better quality of life'
    }
  ];

  const investmentStrategies = [
    {
      strategy: 'Buy and Hold',
      description: 'Purchase property for long-term capital appreciation and rental income',
      timeframe: '5-10 years',
      riskLevel: 'Low-Medium',
      expectedReturns: '8-12% annually',
      bestFor: 'Conservative investors, retirement planning',
      keyPoints: [
        'Focus on locations with infrastructure development',
        'Choose properties with good rental demand',
        'Factor in maintenance and vacancy costs',
        'Consider tax benefits under Section 80C and 24(b)'
      ]
    },
    {
      strategy: 'Fix and Flip',
      description: 'Buy undervalued properties, renovate, and sell for quick profit',
      timeframe: '6 months - 2 years',
      riskLevel: 'High',
      expectedReturns: '15-25% per project',
      bestFor: 'Experienced investors, active involvement',
      keyPoints: [
        'Requires good understanding of renovation costs',
        'Market timing is crucial for success',
        'Higher tax implications on short-term gains',
        'Need sufficient capital for renovation'
      ]
    },
    {
      strategy: 'Rental Income Focus',
      description: 'Invest in properties with high rental yields for steady cash flow',
      timeframe: 'Ongoing',
      riskLevel: 'Medium',
      expectedReturns: '3-6% rental yield',
      bestFor: 'Income-focused investors, retirees',
      keyPoints: [
        'Target areas with high rental demand',
        'Consider commercial properties for higher yields',
        'Factor in property management costs',
        'Understand tenant laws and regulations'
      ]
    }
  ];

  const commonMistakes = [
    {
      mistake: 'Skipping Legal Verification',
      consequence: 'Legal disputes, financial loss, ownership issues',
      prevention: 'Always hire qualified lawyer, verify all documents, check litigation history',
      cost: 'Can lead to 100% loss of investment'
    },
    {
      mistake: 'Emotional Decision Making',
      consequence: 'Overpaying, wrong location choice, unsuitable property',
      prevention: 'Set clear criteria, stick to budget, take time to decide',
      cost: '10-20% overpayment on average'
    },
    {
      mistake: 'Ignoring Hidden Costs',
      consequence: 'Budget overrun, financial stress, incomplete transaction',
      prevention: 'Factor in all costs: registration, stamp duty, legal fees, brokerage',
      cost: 'Additional 8-12% of property value'
    },
    {
      mistake: 'Poor Location Research',
      consequence: 'Low appreciation, poor rental demand, lifestyle issues',
      prevention: 'Research infrastructure, connectivity, future development plans',
      cost: 'Slower appreciation, difficulty in resale'
    },
    {
      mistake: 'Inadequate Financial Planning',
      consequence: 'EMI burden, forced sale, credit score impact',
      prevention: 'Conservative EMI calculation, emergency fund, stable income',
      cost: 'Financial stress, potential foreclosure'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Complete Property Guide 2024
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Your comprehensive resource for buying, selling, and investing in Indian real estate. Updated with latest market trends and regulations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/properties"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                <Search className="mr-2 h-5 w-5" />
                Browse Properties
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center">
                <Download className="mr-2 h-5 w-5" />
                Download Complete Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Guide Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Property Types', icon: Building, href: '#property-types', desc: 'Apartments, houses, villas, plots' },
              { title: 'Buying Process', icon: Home, href: '#buying-process', desc: '6-step detailed process' },
              { title: 'Selling Guide', icon: TrendingUp, href: '#selling-guide', desc: 'Maximize your property value' },
              { title: 'Market Trends', icon: BarChart3, href: '#market-trends', desc: '2024 market insights' },
              { title: 'Investment Tips', icon: Target, href: '#investment-tips', desc: 'Smart investment strategies' },
              { title: 'Legal Aspects', icon: Shield, href: '#legal-aspects', desc: 'Documentation & compliance' },
              { title: 'Financing', icon: Calculator, href: '#financing', desc: 'Loans & financial planning' },
              { title: 'Common Mistakes', icon: AlertTriangle, href: '#common-mistakes', desc: 'Avoid costly errors' }
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="bg-gray-50 p-6 rounded-xl hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-all group"
              >
                <item.icon className="h-8 w-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section id="property-types" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Understanding Property Types</h2>
          <p className="text-xl text-gray-600 mb-12">
            Choosing the right property type is crucial for your investment success. Here's a detailed comparison of different property types available in India, with current market insights and practical considerations.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {propertyTypes.map((property, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{property.type}</h3>
                <p className="text-gray-600 mb-4">{property.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Advantages
                    </h4>
                    <ul className="space-y-1">
                      {property.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Considerations
                    </h4>
                    <ul className="space-y-1">
                      {property.cons.map((con, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start">
                          <div className="w-1 h-1 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-gray-700">Price Range:</span>
                      <div className="font-bold text-blue-600">{property.priceRange}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Best For:</span>
                      <div className="text-gray-600 text-sm">{property.bestFor}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">Key Features:</h5>
                  <div className="flex flex-wrap gap-2">
                    {property.keyFeatures.map((feature, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buying Process */}
      <section id="buying-process" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Complete Property Buying Process</h2>
          <p className="text-xl text-gray-600 mb-12">
            Follow this comprehensive 6-step process to ensure a smooth and successful property purchase. Each step includes detailed actions, timelines, and costs.
          </p>
          
          <div className="space-y-12">
            {buyingProcess.map((step, index) => (
              <div key={index} className="relative">
                {index < buyingProcess.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-full bg-blue-200"></div>
                )}
                
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/4">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg relative z-10">
                        {step.step}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          {step.timeframe}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-3/4">
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="font-semibold text-blue-900">Timeline</div>
                        <div className="text-blue-800 text-sm">{step.timeframe}</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="font-semibold text-green-900">Estimated Cost</div>
                        <div className="text-green-800 text-sm">{step.cost}</div>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="font-semibold text-purple-900">Pro Tip</div>
                        <div className="text-purple-800 text-sm">{step.tips}</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                        Detailed Action Items:
                      </h4>
                      <ul className="space-y-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="text-gray-700 flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
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

      {/* Selling Guide */}
      <section id="selling-guide" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Property Selling Guide</h2>
          <p className="text-xl text-gray-600 mb-12">
            Maximize your property's value with our proven selling strategies. Learn how to prepare, market, and negotiate for the best possible outcome.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sellingTips.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.category}</h3>
                <ul className="space-y-3">
                  {category.tips.map((tip, i) => (
                    <li key={i} className="text-gray-700 flex items-start">
                      <ArrowRight className="h-4 w-4 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Selling Timeline */}
          <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Typical Selling Timeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { phase: 'Preparation', duration: '2-4 weeks', activities: 'Valuation, documentation, repairs' },
                { phase: 'Marketing', duration: '4-8 weeks', activities: 'Listing, photography, viewings' },
                { phase: 'Negotiation', duration: '1-2 weeks', activities: 'Offers, terms discussion' },
                { phase: 'Closure', duration: '2-4 weeks', activities: 'Agreement, registration, handover' }
              ].map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold">{index + 1}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">{phase.phase}</h4>
                  <p className="text-blue-600 font-medium text-sm">{phase.duration}</p>
                  <p className="text-gray-600 text-xs mt-1">{phase.activities}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Market Trends */}
      <section id="market-trends" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">2024 Real Estate Market Trends</h2>
          <p className="text-xl text-gray-600 mb-12">
            Stay ahead with the latest trends shaping India's real estate market. Understanding these trends can help you make informed investment decisions.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {marketTrends2024.map((trend, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{trend.trend}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    trend.impact === 'High' ? 'bg-red-100 text-red-800' : 
                    trend.impact === 'Medium-High' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {trend.impact} Impact
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{trend.description}</p>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                  <h4 className="font-semibold text-blue-900 mb-1">Market Data:</h4>
                  <p className="text-blue-800 text-sm font-medium">{trend.stats}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-1">Investment Opportunity:</h4>
                  <p className="text-green-800 text-sm">{trend.opportunity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Strategies */}
      <section id="investment-tips" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Smart Investment Strategies</h2>
          <p className="text-xl text-gray-600 mb-12">
            Choose the right investment strategy based on your risk tolerance, timeline, and financial goals.
          </p>
          
          <div className="space-y-8">
            {investmentStrategies.map((strategy, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{strategy.strategy}</h3>
                    <p className="text-gray-600 mb-4">{strategy.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Timeline:</span>
                        <span className="font-medium">{strategy.timeframe}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Risk Level:</span>
                        <span className={`font-medium ${
                          strategy.riskLevel === 'High' ? 'text-red-600' :
                          strategy.riskLevel === 'Medium' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>{strategy.riskLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Expected Returns:</span>
                        <span className="font-medium text-green-600">{strategy.expectedReturns}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Best Suited For:</h4>
                    <p className="text-gray-600 mb-4">{strategy.bestFor}</p>
                    
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h5 className="font-semibold text-blue-900 text-sm">Quick Assessment:</h5>
                      <div className="text-blue-800 text-xs mt-1">
                        Risk: {strategy.riskLevel} | Timeline: {strategy.timeframe}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Success Factors:</h4>
                    <ul className="space-y-2">
                      {strategy.keyPoints.map((point, i) => (
                        <li key={i} className="text-gray-700 flex items-start">
                          <Target className="h-3 w-3 text-green-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section id="common-mistakes" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Mistakes to Avoid</h2>
          <p className="text-xl text-gray-600 mb-12">
            Learn from others' mistakes. These are the most common and costly errors in real estate transactions.
          </p>
          
          <div className="space-y-6">
            {commonMistakes.map((mistake, index) => (
              <div key={index} className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      {mistake.mistake}
                    </h3>
                    <div className="bg-red-100 p-2 rounded text-red-800 text-sm">
                      Potential Loss: {mistake.cost}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Consequences:</h4>
                    <p className="text-gray-700 text-sm">{mistake.consequence}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">How to Prevent:</h4>
                    <p className="text-gray-700 text-sm">{mistake.prevention}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-lg w-full text-center">
                      <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
                      <div className="text-green-800 text-xs font-medium">Preventable with proper planning</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Indian Real Estate Market Statistics 2024</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { stat: '8-12%', label: 'Average Annual Appreciation', icon: TrendingUp, detail: 'Varies by location and property type' },
              { stat: '2-4%', label: 'Typical Rental Yield', icon: IndianRupee, detail: 'Higher in tier-2 cities' },
              { stat: '15-20%', label: 'Down Payment Required', icon: Calculator, detail: 'For home loans' },
              { stat: '3-6 months', label: 'Average Selling Time', icon: Clock, detail: 'In normal market conditions' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <item.icon className="h-12 w-12 mx-auto mb-4 text-blue-200" />
                <div className="text-3xl font-bold mb-2">{item.stat}</div>
                <div className="text-blue-100 font-medium mb-1">{item.label}</div>
                <div className="text-blue-200 text-sm">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Consultation CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Expert Guidance?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our certified real estate experts are here to help you make informed decisions. Get personalized advice for your specific situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <Phone className="mr-2 h-5 w-5" />
              Schedule Consultation
            </button>
            <Link
              to="/property-valuation"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Get Property Valuation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyGuide;