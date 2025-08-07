import React, { useState } from 'react';
import { 
  Shield, 
  Eye, 
  Lock, 
  Database, 
  Share2,
  UserCheck,
  Settings,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Mail,
  Phone,
  FileText,
  ChevronRight,
  Cookie,
  Smartphone,
  Monitor,
  MapPin
} from 'lucide-react';

const PrivacyPolicy = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const lastUpdated = 'December 15, 2024';
  const effectiveDate = 'January 1, 2025';

  const privacyTabs = [
    { id: 'overview', title: 'Overview', icon: Eye },
    { id: 'data-collection', title: 'Data Collection', icon: Database },
    { id: 'data-usage', title: 'How We Use Data', icon: Settings },
    { id: 'data-sharing', title: 'Data Sharing', icon: Share2 },
    { id: 'your-rights', title: 'Your Rights', icon: UserCheck },
    { id: 'cookies', title: 'Cookies', icon: Cookie },
    { id: 'security', title: 'Security', icon: Lock }
  ];

  const dataTypes = [
    {
      category: 'Personal Information',
      description: 'Information that identifies you personally',
      icon: UserCheck,
      examples: [
        'Full name and contact details',
        'Email address and phone number',
        'Government-issued ID numbers',
        'Date of birth and age verification',
        'Profile photos and verification documents'
      ],
      purpose: 'Account creation, identity verification, communication',
      retention: '5 years after account closure',
      legal_basis: 'Contract performance, legitimate interests'
    },
    {
      category: 'Property Information',
      description: 'Details about properties you list or inquire about',
      icon: MapPin,
      examples: [
        'Property addresses and descriptions',
        'Property photos and videos',
        'Pricing and availability information',
        'Property features and amenities',
        'Ownership and legal documents'
      ],
      purpose: 'Property listing, matching, verification',
      retention: '3 years after listing removal',
      legal_basis: 'Contract performance, legitimate interests'
    },
    {
      category: 'Usage Data',
      description: 'Information about how you use our platform',
      icon: Monitor,
      examples: [
        'Pages visited and time spent',
        'Search queries and filters used',
        'Properties viewed and saved',
        'Messages sent and received',
        'App features used'
      ],
      purpose: 'Service improvement, personalization, analytics',
      retention: '2 years from collection',
      legal_basis: 'Legitimate interests, consent'
    },
    {
      category: 'Device Information',
      description: 'Technical information about your device and connection',
      icon: Smartphone,
      examples: [
        'IP address and location data',
        'Device type and operating system',
        'Browser type and version',
        'Mobile device identifiers',
        'Network connection information'
      ],
      purpose: 'Security, fraud prevention, technical support',
      retention: '1 year from collection',
      legal_basis: 'Legitimate interests, security'
    }
  ];

  const dataUsagePurposes = [
    {
      purpose: 'Service Provision',
      description: 'To provide and maintain our core platform services',
      activities: [
        'Creating and managing user accounts',
        'Processing property listings',
        'Facilitating communication between users',
        'Providing search and matching functionality',
        'Processing transactions and payments'
      ],
      legal_basis: 'Contract performance'
    },
    {
      purpose: 'Communication',
      description: 'To communicate with you about our services',
      activities: [
        'Sending service-related notifications',
        'Responding to customer support inquiries',
        'Providing property recommendations',
        'Sending marketing communications (with consent)',
        'Notifying about policy changes'
      ],
      legal_basis: 'Contract performance, legitimate interests, consent'
    },
    {
      purpose: 'Safety & Security',
      description: 'To protect our platform and users from fraud and abuse',
      activities: [
        'Verifying user identities',
        'Detecting and preventing fraud',
        'Monitoring for suspicious activity',
        'Enforcing our terms of service',
        'Protecting against security threats'
      ],
      legal_basis: 'Legitimate interests, legal obligations'
    },
    {
      purpose: 'Analytics & Improvement',
      description: 'To understand usage patterns and improve our services',
      activities: [
        'Analyzing user behavior and preferences',
        'Conducting market research',
        'Testing new features and improvements',
        'Generating usage statistics',
        'Personalizing user experience'
      ],
      legal_basis: 'Legitimate interests, consent'
    }
  ];

  const dataSharingScenarios = [
    {
      scenario: 'Service Providers',
      description: 'Third-party companies that help us operate our platform',
      examples: [
        'Cloud hosting providers (AWS, Google Cloud)',
        'Payment processors (Razorpay, PayU)',
        'Email service providers (SendGrid)',
        'Analytics providers (Google Analytics)',
        'Customer support tools (Zendesk)'
      ],
      safeguards: [
        'Data processing agreements in place',
        'Limited access to necessary data only',
        'Regular security audits',
        'Compliance with data protection laws'
      ]
    },
    {
      scenario: 'Legal Requirements',
      description: 'When required by law or to protect rights and safety',
      examples: [
        'Court orders and legal proceedings',
        'Government investigations',
        'Tax and regulatory compliance',
        'Law enforcement requests',
        'Protection of rights and safety'
      ],
      safeguards: [
        'Careful review of all requests',
        'Disclosure of minimum necessary data',
        'User notification when legally permitted',
        'Legal challenge when appropriate'
      ]
    },
    {
      scenario: 'Business Transfers',
      description: 'In case of merger, acquisition, or sale of assets',
      examples: [
        'Merger with another company',
        'Acquisition by third party',
        'Sale of business assets',
        'Corporate restructuring',
        'Bankruptcy proceedings'
      ],
      safeguards: [
        'User notification of transfer',
        'Continued protection under privacy policy',
        'Option to delete account before transfer',
        'Due diligence on acquiring party'
      ]
    }
  ];

  const userRights = [
    {
      right: 'Access Your Data',
      description: 'Request a copy of all personal data we hold about you',
      icon: Eye,
      how_to: 'Submit request through account settings or contact privacy team',
      timeframe: 'Within 30 days',
      details: [
        'Complete copy of your personal data',
        'Information about data sources',
        'Details of data processing activities',
        'List of third parties who received your data'
      ]
    },
    {
      right: 'Correct Your Data',
      description: 'Update or correct inaccurate personal information',
      icon: Settings,
      how_to: 'Update directly in account settings or contact support',
      timeframe: 'Immediate for account settings, 7 days for support requests',
      details: [
        'Update profile information',
        'Correct property listing details',
        'Fix contact information',
        'Amend verification documents'
      ]
    },
    {
      right: 'Delete Your Data',
      description: 'Request deletion of your personal data',
      icon: Trash2,
      how_to: 'Use account deletion option or contact privacy team',
      timeframe: 'Within 30 days',
      details: [
        'Complete account deletion',
        'Removal of personal information',
        'Anonymization of transaction records',
        'Retention of data required by law'
      ]
    },
    {
      right: 'Data Portability',
      description: 'Receive your data in a portable format',
      icon: Download,
      how_to: 'Request through account settings or privacy team',
      timeframe: 'Within 30 days',
      details: [
        'Data in machine-readable format',
        'Includes all personal data',
        'Structured for easy transfer',
        'Compatible with other services'
      ]
    },
    {
      right: 'Restrict Processing',
      description: 'Limit how we process your personal data',
      icon: Lock,
      how_to: 'Contact privacy team with specific restrictions',
      timeframe: 'Within 7 days',
      details: [
        'Limit data processing activities',
        'Maintain data but restrict use',
        'Apply to specific data categories',
        'Temporary or permanent restrictions'
      ]
    },
    {
      right: 'Object to Processing',
      description: 'Object to certain types of data processing',
      icon: AlertTriangle,
      how_to: 'Submit objection through privacy team',
      timeframe: 'Within 7 days',
      details: [
        'Object to marketing communications',
        'Opt out of profiling activities',
        'Restrict automated decision-making',
        'Limit legitimate interest processing'
      ]
    }
  ];

  const cookieTypes = [
    {
      type: 'Essential Cookies',
      description: 'Required for basic website functionality',
      purpose: 'Enable core features like login, security, and navigation',
      examples: ['Session management', 'Security tokens', 'Load balancing'],
      can_disable: false,
      duration: 'Session or up to 1 year'
    },
    {
      type: 'Analytics Cookies',
      description: 'Help us understand how visitors use our website',
      purpose: 'Analyze traffic, user behavior, and site performance',
      examples: ['Google Analytics', 'Hotjar', 'Internal analytics'],
      can_disable: true,
      duration: 'Up to 2 years'
    },
    {
      type: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements',
      purpose: 'Show personalized ads and measure campaign effectiveness',
      examples: ['Google Ads', 'Facebook Pixel', 'Retargeting pixels'],
      can_disable: true,
      duration: 'Up to 1 year'
    },
    {
      type: 'Preference Cookies',
      description: 'Remember your settings and preferences',
      purpose: 'Enhance user experience with personalized settings',
      examples: ['Language preferences', 'Theme settings', 'Search filters'],
      can_disable: true,
      duration: 'Up to 1 year'
    }
  ];

  const securityMeasures = [
    {
      measure: 'Data Encryption',
      description: 'All data is encrypted in transit and at rest',
      implementation: [
        'TLS 1.3 for data in transit',
        'AES-256 encryption for stored data',
        'End-to-end encryption for sensitive communications',
        'Regular encryption key rotation'
      ]
    },
    {
      measure: 'Access Controls',
      description: 'Strict controls on who can access your data',
      implementation: [
        'Role-based access permissions',
        'Multi-factor authentication for staff',
        'Regular access reviews and audits',
        'Principle of least privilege'
      ]
    },
    {
      measure: 'Security Monitoring',
      description: 'Continuous monitoring for security threats',
      implementation: [
        '24/7 security monitoring',
        'Automated threat detection',
        'Regular security assessments',
        'Incident response procedures'
      ]
    },
    {
      measure: 'Data Backup & Recovery',
      description: 'Regular backups and disaster recovery procedures',
      implementation: [
        'Automated daily backups',
        'Geographically distributed storage',
        'Regular recovery testing',
        'Business continuity planning'
      ]
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy Overview</h3>
              <p className="text-gray-700 mb-6">
                At PropertyHub, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, share, and protect your data when you use our platform.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Our Commitment
                  </h4>
                  <ul className="text-blue-800 text-sm space-y-2">
                    <li>• Transparent data practices</li>
                    <li>• Strong security measures</li>
                    <li>• Respect for your privacy rights</li>
                    <li>• Compliance with data protection laws</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Your Control
                  </h4>
                  <ul className="text-green-800 text-sm space-y-2">
                    <li>• Control your data sharing preferences</li>
                    <li>• Access and download your data</li>
                    <li>• Request corrections or deletions</li>
                    <li>• Opt out of marketing communications</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'data-collection':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Data We Collect</h3>
              <p className="text-gray-700 mb-6">
                We collect different types of information to provide and improve our services. Here's a detailed breakdown:
              </p>
            </div>
            
            <div className="space-y-6">
              {dataTypes.map((dataType, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <dataType.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{dataType.category}</h4>
                      <p className="text-gray-600 mb-4">{dataType.description}</p>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Examples:</h5>
                          <ul className="space-y-1">
                            {dataType.examples.map((example, exampleIndex) => (
                              <li key={exampleIndex} className="text-gray-700 text-sm flex items-start">
                                <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium text-gray-500">Purpose:</span>
                            <p className="text-gray-700 text-sm">{dataType.purpose}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Retention:</span>
                            <p className="text-gray-700 text-sm">{dataType.retention}</p>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-500">Legal Basis:</span>
                            <p className="text-gray-700 text-sm">{dataType.legal_basis}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'data-usage':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Data</h3>
              <p className="text-gray-700 mb-6">
                We use your personal data for specific purposes that are necessary for our service and beneficial to you:
              </p>
            </div>
            
            <div className="space-y-6">
              {dataUsagePurposes.map((usage, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{usage.purpose}</h4>
                  <p className="text-gray-600 mb-4">{usage.description}</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h5 className="font-semibold text-gray-900 mb-3">Activities:</h5>
                      <ul className="space-y-2">
                        {usage.activities.map((activity, activityIndex) => (
                          <li key={activityIndex} className="text-gray-700 text-sm flex items-start">
                            <ChevronRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Legal Basis:</h5>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-700 text-sm">{usage.legal_basis}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'data-sharing':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">When We Share Your Data</h3>
              <p className="text-gray-700 mb-6">
                We only share your personal data in specific circumstances and with appropriate safeguards:
              </p>
            </div>
            
            <div className="space-y-6">
              {dataSharingScenarios.map((scenario, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{scenario.scenario}</h4>
                  <p className="text-gray-600 mb-4">{scenario.description}</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Examples:</h5>
                      <ul className="space-y-1">
                        {scenario.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="text-gray-700 text-sm flex items-start">
                            <Share2 className="h-3 w-3 text-blue-500 mr-2 mt-1 flex-shrink-0" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Safeguards:</h5>
                      <ul className="space-y-1">
                        {scenario.safeguards.map((safeguard, safeguardIndex) => (
                          <li key={safeguardIndex} className="text-gray-700 text-sm flex items-start">
                            <Shield className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            {safeguard}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'your-rights':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Rights</h3>
              <p className="text-gray-700 mb-6">
                You have several rights regarding your personal data. Here's how you can exercise them:
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {userRights.map((right, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <right.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{right.right}</h4>
                      <p className="text-gray-600 mb-4">{right.description}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-500">How to request:</span>
                          <p className="text-gray-700 text-sm">{right.how_to}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Response time:</span>
                          <p className="text-gray-700 text-sm">{right.timeframe}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Includes:</span>
                          <ul className="mt-1 space-y-1">
                            {right.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="text-gray-700 text-xs flex items-start">
                                <CheckCircle className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cookies':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cookie Policy</h3>
              <p className="text-gray-700 mb-6">
                We use cookies and similar technologies to enhance your experience on our platform:
              </p>
            </div>
            
            <div className="space-y-6">
              {cookieTypes.map((cookie, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{cookie.type}</h4>
                      <p className="text-gray-600">{cookie.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      cookie.can_disable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {cookie.can_disable ? 'Optional' : 'Required'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Purpose:</h5>
                      <p className="text-gray-700 text-sm">{cookie.purpose}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Examples:</h5>
                      <ul className="space-y-1">
                        {cookie.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="text-gray-700 text-sm">
                            • {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Duration:</h5>
                      <p className="text-gray-700 text-sm">{cookie.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Managing Cookies</h4>
              <p className="text-blue-800 text-sm mb-3">
                You can control cookies through your browser settings or our cookie preference center:
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                  Cookie Preferences
                </button>
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors">
                  Browser Settings Guide
                </button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h3>
              <p className="text-gray-700 mb-6">
                We implement comprehensive security measures to protect your personal data:
              </p>
            </div>
            
            <div className="space-y-6">
              {securityMeasures.map((measure, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{measure.measure}</h4>
                  <p className="text-gray-600 mb-4">{measure.description}</p>
                  
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Implementation:</h5>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {measure.implementation.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-700 text-sm flex items-start">
                          <Lock className="h-3 w-3 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Security Incident Reporting</h4>
                  <p className="text-yellow-700 text-sm mt-1">
                    If you suspect a security incident or unauthorized access to your account, 
                    please contact our security team immediately at security@propertyhub.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Learn how we collect, use, and protect your personal information
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors inline-flex items-center justify-center">
              <Settings className="mr-2 h-5 w-5" />
              Privacy Settings
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Document Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Last Updated</p>
                <p className="text-gray-600">{lastUpdated}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Effective Date</p>
                <p className="text-gray-600">{effectiveDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Jurisdiction</p>
                <p className="text-gray-600">India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {privacyTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {renderTabContent()}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Our Privacy Team</h3>
          <p className="text-gray-700 mb-6">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-gray-600">privacy@propertyhub.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">Phone</p>
                <p className="text-gray-600">+91 9876543210</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">Data Protection Officer</p>
                <p className="text-gray-600">dpo@propertyhub.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;