import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  Phone, 
  Mail,
  CheckCircle,
  XCircle,
  User,
  CreditCard,
  Home,
  MessageCircle,
  FileText,
  Camera,
  MapPin,
  Clock,
  Star,
  Flag,
  HelpCircle,
  Download,
  ExternalLink
} from 'lucide-react';

const SafetyTips = () => {
  const [activeTab, setActiveTab] = useState('online-security');

  const securityCategories = [
    {
      id: 'online-security',
      title: 'Online Security',
      icon: Shield,
      description: 'Protect your account and personal information online'
    },
    {
      id: 'account-protection',
      title: 'Account Protection',
      icon: Lock,
      description: 'Keep your PropertyHub account secure'
    },
    {
      id: 'transaction-safety',
      title: 'Transaction Safety',
      icon: CreditCard,
      description: 'Safe practices for property transactions'
    },
    {
      id: 'fraud-prevention',
      title: 'Fraud Prevention',
      icon: AlertTriangle,
      description: 'Identify and avoid common scams'
    }
  ];

  const onlineSecurityTips = [
    {
      title: 'Use Strong, Unique Passwords',
      description: 'Create complex passwords with a mix of letters, numbers, and symbols',
      details: [
        'Use at least 12 characters',
        'Include uppercase and lowercase letters',
        'Add numbers and special characters',
        'Avoid personal information like birthdays',
        'Use different passwords for different accounts',
        'Consider using a password manager'
      ],
      importance: 'Critical',
      icon: Lock
    },
    {
      title: 'Enable Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      details: [
        'Enable 2FA on your PropertyHub account',
        'Use authenticator apps instead of SMS when possible',
        'Keep backup codes in a safe place',
        'Never share your 2FA codes with anyone',
        'Update your phone number if it changes'
      ],
      importance: 'High',
      icon: Shield
    },
    {
      title: 'Be Cautious with Public Wi-Fi',
      description: 'Protect your data when using public internet connections',
      details: [
        'Avoid accessing sensitive accounts on public Wi-Fi',
        'Use a VPN when connecting to public networks',
        'Turn off auto-connect to Wi-Fi networks',
        'Log out of accounts when finished',
        'Use your mobile data for sensitive transactions'
      ],
      importance: 'Medium',
      icon: Eye
    },
    {
      title: 'Keep Software Updated',
      description: 'Regularly update your devices and applications',
      details: [
        'Enable automatic updates for your operating system',
        'Keep your browser updated',
        'Update mobile apps regularly',
        'Install security patches promptly',
        'Use reputable antivirus software'
      ],
      importance: 'High',
      icon: Download
    }
  ];

  const accountProtectionTips = [
    {
      title: 'Verify Your Account Information',
      description: 'Keep your profile information accurate and up-to-date',
      details: [
        'Verify your email address and phone number',
        'Upload clear identification documents',
        'Keep your profile photo current',
        'Update your address if you move',
        'Review your account settings regularly'
      ],
      importance: 'High',
      icon: User
    },
    {
      title: 'Monitor Account Activity',
      description: 'Regularly check your account for unauthorized access',
      details: [
        'Review login history in your account settings',
        'Check for unfamiliar devices or locations',
        'Monitor your property listings for changes',
        'Watch for unexpected emails or notifications',
        'Report suspicious activity immediately'
      ],
      importance: 'High',
      icon: Eye
    },
    {
      title: 'Secure Your Email Account',
      description: 'Protect the email address associated with your account',
      details: [
        'Use a strong password for your email',
        'Enable 2FA on your email account',
        'Be cautious of phishing emails',
        'Don\'t click suspicious links',
        'Verify sender authenticity before responding'
      ],
      importance: 'Critical',
      icon: Mail
    }
  ];

  const transactionSafetyTips = [
    {
      title: 'Meet in Safe, Public Places',
      description: 'Always meet potential buyers/sellers in secure locations',
      details: [
        'Meet during daylight hours',
        'Choose busy, well-lit public places',
        'Bring a friend or family member',
        'Inform someone about your meeting plans',
        'Trust your instincts about the location'
      ],
      importance: 'Critical',
      icon: MapPin
    },
    {
      title: 'Verify Property Documents',
      description: 'Always check property ownership and legal documents',
      details: [
        'Request original property documents',
        'Verify ownership certificates',
        'Check for any legal disputes',
        'Confirm property tax payments',
        'Get documents verified by a lawyer'
      ],
      importance: 'Critical',
      icon: FileText
    },
    {
      title: 'Use Secure Payment Methods',
      description: 'Protect yourself with safe payment practices',
      details: [
        'Avoid cash transactions for large amounts',
        'Use bank transfers or certified checks',
        'Never pay advance fees to unknown parties',
        'Get payment receipts for all transactions',
        'Use escrow services for high-value deals'
      ],
      importance: 'Critical',
      icon: CreditCard
    },
    {
      title: 'Document Everything',
      description: 'Keep detailed records of all interactions and agreements',
      details: [
        'Save all communication messages',
        'Take photos of property conditions',
        'Keep copies of all documents',
        'Record meeting dates and locations',
        'Get written agreements for all terms'
      ],
      importance: 'High',
      icon: Camera
    }
  ];

  const fraudPreventionTips = [
    {
      title: 'Recognize Common Scams',
      description: 'Learn to identify typical real estate fraud patterns',
      details: [
        'Unusually low prices for premium properties',
        'Requests for advance payments or fees',
        'Pressure to make quick decisions',
        'Sellers who won\'t meet in person',
        'Properties with stolen or fake photos'
      ],
      importance: 'Critical',
      icon: AlertTriangle
    },
    {
      title: 'Verify Property Listings',
      description: 'Confirm the authenticity of property advertisements',
      details: [
        'Cross-check photos with other listings',
        'Verify property addresses exist',
        'Check if prices match market rates',
        'Look for verified badges on listings',
        'Research the property\'s history'
      ],
      importance: 'High',
      icon: Home
    },
    {
      title: 'Be Wary of Fake Profiles',
      description: 'Identify and avoid fraudulent user accounts',
      details: [
        'Check for profile verification badges',
        'Look for detailed profile information',
        'Be suspicious of new accounts with no history',
        'Verify contact information independently',
        'Trust profiles with positive reviews'
      ],
      importance: 'High',
      icon: User
    }
  ];

  const emergencyContacts = [
    {
      service: 'PropertyHub Security Team',
      description: 'Report security issues or suspicious activity',
      contact: 'security@propertyhub.com',
      phone: '+91 9876543210',
      availability: '24/7',
      icon: Shield
    },
    {
      service: 'Cyber Crime Helpline',
      description: 'Report online fraud and cybercrime',
      contact: 'cybercrime@gov.in',
      phone: '1930',
      availability: '24/7',
      icon: AlertTriangle
    },
    {
      service: 'Consumer Helpline',
      description: 'Consumer protection and complaint resolution',
      contact: 'consumer@gov.in',
      phone: '1915',
      availability: '9 AM - 5 PM',
      icon: Phone
    },
    {
      service: 'Police Emergency',
      description: 'Emergency law enforcement assistance',
      contact: 'Emergency Services',
      phone: '100',
      availability: '24/7',
      icon: Flag
    }
  ];

  const warningSignsChecklist = [
    {
      category: 'Communication Red Flags',
      signs: [
        'Poor grammar or spelling in messages',
        'Reluctance to talk on the phone',
        'Pressure to make immediate decisions',
        'Requests for personal financial information',
        'Communication only through messaging apps'
      ]
    },
    {
      category: 'Property Red Flags',
      signs: [
        'Prices significantly below market value',
        'Limited or low-quality photos',
        'Vague property descriptions',
        'No property address provided',
        'Claims of urgent sale due to emergency'
      ]
    },
    {
      category: 'Payment Red Flags',
      signs: [
        'Requests for advance payments',
        'Unusual payment methods required',
        'No proper receipts or documentation',
        'Pressure to pay immediately',
        'Requests for gift cards or wire transfers'
      ]
    }
  ];

  const getCurrentTips = () => {
    switch (activeTab) {
      case 'online-security':
        return onlineSecurityTips;
      case 'account-protection':
        return accountProtectionTips;
      case 'transaction-safety':
        return transactionSafetyTips;
      case 'fraud-prevention':
        return fraudPreventionTips;
      default:
        return onlineSecurityTips;
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Safety & Security Tips</h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
            Protect yourself and your property with our comprehensive safety guidelines and best practices
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <Download className="mr-2 h-5 w-5" />
              Download Safety Guide
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors inline-flex items-center justify-center">
              <Flag className="mr-2 h-5 w-5" />
              Report Suspicious Activity
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Tabs */}
        <div className="mb-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {securityCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === category.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <category.icon className="h-5 w-5" />
                  <span>{category.title}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">
              {securityCategories.find(cat => cat.id === activeTab)?.description}
            </p>
          </div>
        </div>

        {/* Safety Tips */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {getCurrentTips().map((tip, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <tip.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{tip.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImportanceColor(tip.importance)}`}>
                        {tip.importance}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{tip.description}</p>
                    <ul className="space-y-2">
                      {tip.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Warning Signs Checklist */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Warning Signs Checklist</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {warningSignsChecklist.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.signs.map((sign, signIndex) => (
                    <li key={signIndex} className="flex items-start">
                      <XCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Emergency Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <contact.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{contact.service}</h3>
                    <p className="text-gray-600 mb-4">{contact.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{contact.contact}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{contact.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-700">{contact.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Resources */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Safety Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Safety Checklist PDF',
                description: 'Downloadable checklist for safe property transactions',
                icon: Download,
                action: 'Download PDF'
              },
              {
                title: 'Video Safety Guide',
                description: 'Watch our comprehensive video guide on property safety',
                icon: Camera,
                action: 'Watch Video'
              },
              {
                title: 'Report Suspicious Activity',
                description: 'Quickly report any suspicious listings or users',
                icon: Flag,
                action: 'Report Now'
              },
              {
                title: 'Safety FAQ',
                description: 'Frequently asked questions about safety and security',
                icon: HelpCircle,
                action: 'View FAQ'
              },
              {
                title: 'Community Guidelines',
                description: 'Learn about our community standards and policies',
                icon: FileText,
                action: 'Read Guidelines'
              },
              {
                title: 'Contact Security Team',
                description: 'Get in touch with our dedicated security experts',
                icon: MessageCircle,
                action: 'Contact Us'
              }
            ].map((resource, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <resource.icon className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                <button className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center">
                  {resource.action}
                  <ExternalLink className="h-4 w-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SafetyTips;