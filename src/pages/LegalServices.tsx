import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  FileText, 
  Shield, 
  CheckCircle, 
  Clock, 
  Users, 
  Phone,
  Mail,
  MapPin,
  Star,
  ArrowRight,
  Download,
  AlertTriangle,
  BookOpen,
  Gavel,
  Search,
  Building,
  Home,
  IndianRupee,
  Award,
  Target,
  Lightbulb,
  Building2
} from 'lucide-react';

const LegalServices = () => {
  const [selectedService, setSelectedService] = useState('all');

  const legalProcesses = [
    {
      process: 'Property Purchase',
      steps: [
        'Initial document verification and title search',
        'Legal due diligence and clearance verification',
        'Sale agreement drafting and review',
        'Registration process assistance',
        'Post-registration compliance'
      ],
      timeline: '15-30 days',
      cost: '₹15,000 - ₹50,000'
    },
    {
      process: 'Property Sale',
      steps: [
        'Document preparation and verification',
        'NOC and clearance certificates',
        'Sale agreement negotiation',
        'Registration and transfer formalities',
        'Tax compliance and documentation'
      ],
      timeline: '10-20 days',
      cost: '₹10,000 - ₹30,000'
    },
    {
      process: 'Property Dispute Resolution',
      steps: [
        'Case assessment and legal opinion',
        'Documentation and evidence collection',
        'Negotiation and mediation attempts',
        'Court proceedings if required',
        'Settlement execution'
      ],
      timeline: '6 months - 3 years',
      cost: '₹50,000 - ₹5,00,000'
    }
  ];

  const essentialDocuments = [
    {
      category: 'Title Documents',
      documents: [
        { name: 'Sale Deed', description: 'Primary ownership document', importance: 'Critical' },
        { name: 'Title Deed', description: 'Establishes legal ownership', importance: 'Critical' },
        { name: 'Chain of Title', description: '30-year ownership history', importance: 'High' },
        { name: 'Mutation Records', description: 'Revenue department records', importance: 'High' }
      ]
    },
    {
      category: 'Approval Documents',
      documents: [
        { name: 'Building Plan Approval', description: 'Municipal corporation approval', importance: 'Critical' },
        { name: 'Occupancy Certificate', description: 'Completion and safety clearance', importance: 'Critical' },
        { name: 'Completion Certificate', description: 'Construction completion proof', importance: 'High' },
        { name: 'Environmental Clearance', description: 'For large projects', importance: 'Medium' }
      ]
    },
    {
      category: 'Financial Documents',
      documents: [
        { name: 'Property Tax Receipts', description: 'Municipal tax payment proof', importance: 'High' },
        { name: 'Utility Bills', description: 'Electricity, water bill clearance', importance: 'Medium' },
        { name: 'Society NOC', description: 'Housing society clearance', importance: 'High' },
        { name: 'Bank NOC', description: 'Loan clearance certificate', importance: 'Critical' }
      ]
    }
  ];

  const propertyLaws = [
    {
      law: 'Real Estate Regulation Act (RERA) 2016',
      scope: 'Regulates real estate sector, protects buyer interests',
      keyProvisions: [
        'Mandatory registration for projects above 500 sq.m',
        'Carpet area definition and disclosure requirements',
        'Penalty for project delays and false advertising',
        'Establishment of Real Estate Regulatory Authority'
      ],
      impact: 'High protection for buyers, increased transparency'
    },
    {
      law: 'Transfer of Property Act 1882',
      scope: 'Governs property transfers and transactions',
      keyProvisions: [
        'Defines various types of property transfers',
        'Registration requirements for property sales',
        'Rights and obligations of buyers and sellers',
        'Conditions for valid property transfers'
      ],
      impact: 'Foundation law for all property transactions'
    },
    {
      law: 'Indian Registration Act 1908',
      scope: 'Mandatory registration of property documents',
      keyProvisions: [
        'Compulsory registration for properties above ₹100',
        'Stamp duty and registration fee requirements',
        'Document authentication and legal validity',
        'Public record maintenance'
      ],
      impact: 'Legal validity and protection against fraud'
    },
    {
      law: 'Benami Transactions Act 2016',
      scope: 'Prohibits benami property transactions',
      keyProvisions: [
        'Definition and prohibition of benami transactions',
        'Penalty and confiscation provisions',
        'Adjudication and appellate authority',
        'Exemptions for certain transactions'
      ],
      impact: 'Prevents money laundering through property'
    }
  ];

  const commonDisputes = [
    {
      dispute: 'Title Disputes',
      description: 'Conflicts over property ownership and title',
      causes: ['Unclear title documents', 'Multiple claims', 'Fraudulent transactions'],
      resolution: 'Title verification, court proceedings, settlement',
      prevention: 'Thorough due diligence, legal verification',
      avgCost: '₹1,00,000 - ₹10,00,000',
      timeline: '1-5 years'
    },
    {
      dispute: 'Builder Delays',
      description: 'Construction or possession delays by developers',
      causes: ['Financial issues', 'Approval delays', 'Poor planning'],
      resolution: 'RERA complaint, compensation claim, legal notice',
      prevention: 'RERA registered projects, penalty clauses',
      avgCost: '₹50,000 - ₹3,00,000',
      timeline: '6 months - 2 years'
    },
    {
      dispute: 'Society Disputes',
      description: 'Conflicts with housing society management',
      causes: ['Maintenance issues', 'Bylaw violations', 'Financial disputes'],
      resolution: 'Society mediation, registrar complaint, court',
      prevention: 'Understanding society bylaws, active participation',
      avgCost: '₹25,000 - ₹1,00,000',
      timeline: '3 months - 1 year'
    },
    {
      dispute: 'Tenant Disputes',
      description: 'Landlord-tenant conflicts and eviction issues',
      causes: ['Rent defaults', 'Property damage', 'Lease violations'],
      resolution: 'Rent control court, mediation, eviction proceedings',
      prevention: 'Proper lease agreement, tenant verification',
      avgCost: '₹30,000 - ₹2,00,000',
      timeline: '6 months - 3 years'
    }
  ];

  const services = [
    {
      id: 1,
      title: 'Property Title Verification',
      description: 'Complete verification of property documents and title clearance',
      price: '₹5,000 - ₹15,000',
      duration: '3-5 days',
      category: 'verification',
      features: [
        'Title deed verification and chain analysis',
        'Encumbrance certificate examination',
        'Survey settlement records verification',
        'Legal opinion report with recommendations'
      ],
      popular: true,
      process: [
        'Document collection and initial review',
        'Revenue records verification',
        'Court records search for litigation',
        'Final legal opinion and clearance'
      ]
    },
    {
      id: 2,
      title: 'Property Registration Assistance',
      description: 'End-to-end property registration and documentation services',
      price: '₹10,000 - ₹25,000',
      duration: '7-10 days',
      category: 'registration',
      features: [
        'Sale deed preparation and review',
        'Registration process coordination',
        'Stamp duty calculation and payment',
        'Post-registration formalities'
      ],
      popular: false,
      process: [
        'Document preparation and verification',
        'Stamp duty assessment and payment',
        'Registration appointment booking',
        'Registration completion and handover'
      ]
    },
    {
      id: 3,
      title: 'Legal Due Diligence',
      description: 'Comprehensive legal audit for property transactions',
      price: '₹15,000 - ₹35,000',
      duration: '5-7 days',
      category: 'diligence',
      features: [
        'Complete document verification',
        'Compliance and approval check',
        'Risk assessment and mitigation',
        'Legal clearance certificate'
      ],
      popular: true,
      process: [
        'Document collection and analysis',
        'Legal and regulatory compliance check',
        'Risk identification and assessment',
        'Detailed report with recommendations'
      ]
    },
    {
      id: 4,
      title: 'Property Dispute Resolution',
      description: 'Legal assistance for property-related disputes and litigation',
      price: '₹25,000 - ₹1,00,000',
      duration: '30-90 days',
      category: 'dispute',
      features: [
        'Case analysis and legal strategy',
        'Court representation and proceedings',
        'Mediation and settlement services',
        'Documentation and compliance'
      ],
      popular: false,
      process: [
        'Case evaluation and strategy development',
        'Legal notice and initial proceedings',
        'Court representation and advocacy',
        'Settlement negotiation and execution'
      ]
    }
  ];

  const lawyers = [
    {
      id: 1,
      name: 'Adv. Priya Sharma',
      specialization: 'Property Law & RERA',
      experience: '12 years',
      rating: 4.8,
      cases: 500,
      image: 'PS',
      location: 'Mumbai',
      languages: ['Hindi', 'English', 'Marathi'],
      expertise: ['RERA compliance', 'Property disputes', 'Title verification'],
      education: 'LLB from Mumbai University, Specialized in Property Law'
    },
    {
      id: 2,
      name: 'Adv. Rajesh Kumar',
      specialization: 'Real Estate Litigation',
      experience: '15 years',
      rating: 4.9,
      cases: 750,
      image: 'RK',
      location: 'Delhi',
      languages: ['Hindi', 'English', 'Punjabi'],
      expertise: ['Property litigation', 'Commercial real estate', 'Land acquisition'],
      education: 'LLM from Delhi University, Senior Advocate'
    },
    {
      id: 3,
      name: 'Adv. Meera Patel',
      specialization: 'Property Documentation',
      experience: '10 years',
      rating: 4.7,
      cases: 400,
      image: 'MP',
      location: 'Bangalore',
      languages: ['English', 'Kannada', 'Hindi'],
      expertise: ['Documentation', 'Registration', 'Due diligence'],
      education: 'LLB from Bangalore University, Property Law Specialist'
    }
  ];

  const legalChecklist = [
    {
      phase: 'Before Purchase',
      items: [
        'Verify seller\'s ownership and title documents',
        'Check for any pending litigation or disputes',
        'Confirm all approvals and clearances',
        'Verify property tax and utility bill payments',
        'Check encumbrance certificate for 30 years',
        'Confirm RERA registration for new projects'
      ]
    },
    {
      phase: 'During Transaction',
      items: [
        'Review sale agreement terms carefully',
        'Ensure proper stamp duty calculation',
        'Verify all parties\' identity and signatures',
        'Check payment terms and schedule',
        'Include penalty clauses for delays',
        'Ensure proper registration process'
      ]
    },
    {
      phase: 'After Purchase',
      items: [
        'Obtain registered sale deed copy',
        'Update property records and mutation',
        'Transfer utility connections',
        'Get property insurance',
        'Update bank records for loan',
        'Keep all documents safely'
      ]
    }
  ];

  const filteredServices = selectedService === 'all' 
    ? services 
    : services.filter(service => service.category === selectedService);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Complete Legal Services Guide
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Navigate property laws, documentation, and legal requirements with expert guidance. Protect your investment with comprehensive legal support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
                <Phone className="mr-2 h-5 w-5" />
                Consult Legal Expert
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors inline-flex items-center justify-center">
                <Download className="mr-2 h-5 w-5" />
                Download Legal Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Process Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Legal Process Overview</h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            Understanding the legal processes involved in different property transactions
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {legalProcesses.map((process, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{process.process}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Clock className="h-5 w-5 text-blue-600 mb-1" />
                    <div className="text-blue-900 font-semibold text-sm">Timeline</div>
                    <div className="text-blue-800 text-sm">{process.timeline}</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <IndianRupee className="h-5 w-5 text-green-600 mb-1" />
                    <div className="text-green-900 font-semibold text-sm">Legal Cost</div>
                    <div className="text-green-800 text-sm">{process.cost}</div>
                  </div>
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-3">Key Steps:</h4>
                <ul className="space-y-2">
                  {process.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-gray-700 flex items-start">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-purple-600 text-xs font-bold">{stepIndex + 1}</span>
                      </div>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Essential Documents */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Essential Property Documents</h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            Complete guide to documents required for property transactions
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {essentialDocuments.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{category.category}</h3>
                
                <div className="space-y-4">
                  {category.documents.map((doc, docIndex) => (
                    <div key={docIndex} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          doc.importance === 'Critical' ? 'bg-red-100 text-red-800' :
                          doc.importance === 'High' ? 'bg-orange-100 text-orange-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {doc.importance}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{doc.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Laws */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Property Laws in India</h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            Understanding the legal framework governing real estate transactions
          </p>
          
          <div className="space-y-8">
            {propertyLaws.map((law, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{law.law}</h3>
                    <p className="text-gray-600 mb-4">{law.scope}</p>
                    <div className="bg-white p-3 rounded-lg border border-blue-200">
                      <h5 className="font-semibold text-blue-900 text-sm">Impact:</h5>
                      <p className="text-blue-800 text-sm">{law.impact}</p>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Provisions:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {law.keyProvisions.map((provision, provisionIndex) => (
                        <div key={provisionIndex} className="bg-white p-3 rounded-lg border border-gray-200">
                          <div className="flex items-start">
                            <Scale className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{provision}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Disputes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common Property Disputes</h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            Understanding common disputes and how to prevent or resolve them
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {commonDisputes.map((dispute, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{dispute.dispute}</h3>
                <p className="text-gray-600 mb-4">{dispute.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="font-semibold text-red-900 text-sm">Average Cost</div>
                    <div className="text-red-800 text-sm">{dispute.avgCost}</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="font-semibold text-orange-900 text-sm">Timeline</div>
                    <div className="text-orange-800 text-sm">{dispute.timeline}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Common Causes:</h4>
                    <ul className="space-y-1">
                      {dispute.causes.map((cause, causeIndex) => (
                        <li key={causeIndex} className="text-gray-700 flex items-center text-sm">
                          <AlertTriangle className="h-3 w-3 text-red-500 mr-2" />
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Resolution Process:</h4>
                    <p className="text-gray-700 text-sm">{dispute.resolution}</p>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-1 text-sm">Prevention:</h4>
                    <p className="text-green-800 text-sm">{dispute.prevention}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Legal Services</h2>
            <p className="text-xl text-gray-600">Professional legal assistance for all property matters</p>
          </div>

          {/* Service Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { id: 'all', name: 'All Services' },
              { id: 'verification', name: 'Verification' },
              { id: 'registration', name: 'Registration' },
              { id: 'diligence', name: 'Due Diligence' },
              { id: 'dispute', name: 'Disputes' }
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedService(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedService === category.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {service.popular && (
                  <div className="bg-purple-600 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-2xl font-bold text-purple-600">{service.price}</div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {service.duration}
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-gray-900">Included Services:</h4>
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Process:</h4>
                    <div className="space-y-2">
                      {service.process.map((step, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                            <span className="text-purple-600 text-xs font-bold">{index + 1}</span>
                          </div>
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Lawyers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Expert Property Lawyers</h2>
            <p className="text-xl text-gray-600">Connect with experienced property law specialists</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lawyers.map((lawyer) => (
              <div key={lawyer.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl font-bold">{lawyer.image}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{lawyer.name}</h3>
                  <p className="text-purple-600 font-medium">{lawyer.specialization}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{lawyer.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cases Handled:</span>
                    <span className="font-medium">{lawyer.cases}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{lawyer.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">{lawyer.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Education:</p>
                  <p className="text-sm text-gray-800">{lawyer.education}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Expertise:</p>
                  <div className="flex flex-wrap gap-1">
                    {lawyer.expertise.map((skill, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Languages:</p>
                  <div className="flex flex-wrap gap-2">
                    {lawyer.languages.map((lang, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  Consult Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Checklist */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Property Transaction Legal Checklist</h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            Essential legal checkpoints for every property transaction
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {legalChecklist.map((phase, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{phase.phase}</h3>
                
                <div className="space-y-3">
                  {phase.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start">
                      <div className="w-5 h-5 border-2 border-purple-300 rounded mr-3 mt-0.5 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Legal Assistance?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Get expert legal advice for your property matters from our experienced lawyers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <Phone className="mr-2 h-5 w-5" />
              Call +91 9876543210
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors inline-flex items-center justify-center">
              <Mail className="mr-2 h-5 w-5" />
              Email Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalServices;