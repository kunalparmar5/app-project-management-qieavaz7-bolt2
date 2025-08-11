import React, { useState } from 'react';
import { FileText, Scale, Users, Shield, AlertTriangle, CheckCircle, Clock, Download, Printer as Print, Search, ChevronDown, Mail, Phone } from 'lucide-react';

const TermsOfService = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const lastUpdated = 'December 15, 2024';
  const effectiveDate = 'January 1, 2025';

  const tableOfContents = [
    { id: 'acceptance', title: '1. Acceptance of Terms', level: 1 },
    { id: 'definitions', title: '2. Definitions', level: 1 },
    { id: 'user-accounts', title: '3. User Accounts and Registration', level: 1 },
    { id: 'user-responsibilities', title: '4. User Rights and Responsibilities', level: 1 },
    { id: 'property-listings', title: '5. Property Listings and Content', level: 1 },
    { id: 'prohibited-activities', title: '6. Prohibited Activities', level: 1 },
    { id: 'payment-terms', title: '7. Payment Terms and Fees', level: 1 },
    { id: 'intellectual-property', title: '8. Intellectual Property Rights', level: 1 },
    { id: 'privacy-data', title: '9. Privacy and Data Protection', level: 1 },
    { id: 'disclaimers', title: '10. Disclaimers and Warranties', level: 1 },
    { id: 'liability', title: '11. Limitation of Liability', level: 1 },
    { id: 'indemnification', title: '12. Indemnification', level: 1 },
    { id: 'dispute-resolution', title: '13. Dispute Resolution', level: 1 },
    { id: 'termination', title: '14. Termination', level: 1 },
    { id: 'governing-law', title: '15. Governing Law', level: 1 },
    { id: 'modifications', title: '16. Modifications to Terms', level: 1 },
    { id: 'contact', title: '17. Contact Information', level: 1 }
  ];

  const keyHighlights = [
    {
      title: 'User Responsibilities',
      description: 'Users must provide accurate information and comply with all applicable laws',
      icon: Users,
      importance: 'High'
    },
    {
      title: 'Content Ownership',
      description: 'Users retain ownership of their content but grant us license to use it',
      icon: FileText,
      importance: 'Medium'
    },
    {
      title: 'Liability Limitations',
      description: 'Our liability is limited as outlined in the terms',
      icon: Shield,
      importance: 'High'
    },
    {
      title: 'Dispute Resolution',
      description: 'Disputes are resolved through arbitration in Mumbai, India',
      icon: Scale,
      importance: 'Medium'
    }
  ];

  const termsContent = {
    acceptance: {
      title: 'Acceptance of Terms',
      content: `
        <p>By accessing or using PropertyHub's website, mobile application, or any related services (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use our Service.</p>
        
        <p>These Terms constitute a legally binding agreement between you and PropertyHub Private Limited ("PropertyHub," "we," "us," or "our"), a company incorporated under the laws of India.</p>
        
        <h4>Important Notes:</h4>
        <ul>
          <li>You must be at least 18 years old to use our Service</li>
          <li>By using our Service, you represent that you have the legal capacity to enter into these Terms</li>
          <li>These Terms apply to all users, including property owners, buyers, renters, and browsers</li>
        </ul>
      `
    },
    definitions: {
      title: 'Definitions',
      content: `
        <p>For the purposes of these Terms, the following definitions apply:</p>
        
        <dl>
          <dt><strong>"Service"</strong></dt>
          <dd>Refers to PropertyHub's website, mobile applications, and all related services and features.</dd>
          
          <dt><strong>"User" or "You"</strong></dt>
          <dd>Any individual or entity that accesses or uses our Service.</dd>
          
          <dt><strong>"Content"</strong></dt>
          <dd>All information, data, text, images, videos, and other materials posted or transmitted through our Service.</dd>
          
          <dt><strong>"Property Listing"</strong></dt>
          <dd>Information about real estate properties posted on our platform for sale, rent, or other transactions.</dd>
          
          <dt><strong>"Verified User"</strong></dt>
          <dd>A user whose identity and credentials have been verified through our verification process.</dd>
        </dl>
      `
    },
    'user-accounts': {
      title: 'User Accounts and Registration',
      content: `
        <h4>Account Creation</h4>
        <p>To access certain features of our Service, you must create an account. When creating an account, you agree to:</p>
        <ul>
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain and update your information to keep it accurate</li>
          <li>Keep your login credentials secure and confidential</li>
          <li>Notify us immediately of any unauthorized use of your account</li>
        </ul>
        
        <h4>Account Verification</h4>
        <p>We may require verification of your identity through:</p>
        <ul>
          <li>Government-issued identification documents</li>
          <li>Phone number verification</li>
          <li>Email address confirmation</li>
          <li>Additional documentation as deemed necessary</li>
        </ul>
        
        <h4>Account Responsibility</h4>
        <p>You are responsible for all activities that occur under your account, whether or not you authorized such activities.</p>
      `
    },
    'user-responsibilities': {
      title: 'User Rights and Responsibilities',
      content: `
        <h4>User Rights</h4>
        <p>As a user of our Service, you have the right to:</p>
        <ul>
          <li>Access and use our Service in accordance with these Terms</li>
          <li>Post property listings (subject to our guidelines)</li>
          <li>Contact other users through our platform</li>
          <li>Receive customer support</li>
          <li>Request deletion of your account and personal data</li>
        </ul>
        
        <h4>User Responsibilities</h4>
        <p>You agree to:</p>
        <ul>
          <li>Comply with all applicable laws and regulations</li>
          <li>Provide accurate and truthful information</li>
          <li>Respect the rights and privacy of other users</li>
          <li>Use the Service only for lawful purposes</li>
          <li>Not engage in any prohibited activities as outlined in Section 6</li>
        </ul>
        
        <h4>Professional Users</h4>
        <p>If you are a real estate professional, you additionally agree to:</p>
        <ul>
          <li>Maintain all required professional licenses</li>
          <li>Comply with industry regulations and standards</li>
          <li>Disclose your professional status in all interactions</li>
        </ul>
      `
    },
    'property-listings': {
      title: 'Property Listings and Content',
      content: `
        <h4>Listing Requirements</h4>
        <p>All property listings must:</p>
        <ul>
          <li>Contain accurate and truthful information</li>
          <li>Include clear, recent photographs of the property</li>
          <li>Specify correct pricing and availability</li>
          <li>Comply with fair housing laws and regulations</li>
          <li>Not contain misleading or deceptive information</li>
        </ul>
        
        <h4>Content Standards</h4>
        <p>All content posted on our platform must:</p>
        <ul>
          <li>Be relevant to real estate transactions</li>
          <li>Not contain offensive, discriminatory, or illegal material</li>
          <li>Respect intellectual property rights</li>
          <li>Not include spam or promotional content unrelated to the property</li>
        </ul>
        
        <h4>Content Moderation</h4>
        <p>We reserve the right to:</p>
        <ul>
          <li>Review and moderate all content before publication</li>
          <li>Remove content that violates these Terms</li>
          <li>Suspend or terminate accounts for repeated violations</li>
          <li>Edit content for clarity or compliance purposes</li>
        </ul>
      `
    },
    'prohibited-activities': {
      title: 'Prohibited Activities',
      content: `
        <p>You agree not to engage in any of the following prohibited activities:</p>
        
        <h4>Fraudulent Activities</h4>
        <ul>
          <li>Posting fake or non-existent property listings</li>
          <li>Misrepresenting your identity or credentials</li>
          <li>Engaging in any form of fraud or deception</li>
          <li>Creating multiple accounts to circumvent restrictions</li>
        </ul>
        
        <h4>Harmful Behavior</h4>
        <ul>
          <li>Harassing, threatening, or intimidating other users</li>
          <li>Posting discriminatory content based on race, religion, gender, etc.</li>
          <li>Attempting to obtain unauthorized access to our systems</li>
          <li>Distributing malware or harmful software</li>
        </ul>
        
        <h4>Commercial Violations</h4>
        <ul>
          <li>Using our Service for unauthorized commercial purposes</li>
          <li>Scraping or harvesting user data</li>
          <li>Posting spam or unsolicited promotional content</li>
          <li>Competing directly with our Service using our platform</li>
        </ul>
        
        <h4>Legal Violations</h4>
        <ul>
          <li>Violating any applicable laws or regulations</li>
          <li>Infringing on intellectual property rights</li>
          <li>Engaging in money laundering or other financial crimes</li>
          <li>Facilitating illegal transactions</li>
        </ul>
      `
    },
    'payment-terms': {
      title: 'Payment Terms and Fees',
      content: `
        <h4>Free Services</h4>
        <p>PropertyHub provides the following services free of charge:</p>
        <ul>
          <li>Basic property listing posting</li>
          <li>Browsing and searching properties</li>
          <li>Contacting property owners</li>
          <li>Basic customer support</li>
        </ul>
        
        <h4>Premium Services</h4>
        <p>We may offer premium services for additional fees, including:</p>
        <ul>
          <li>Featured property listings</li>
          <li>Enhanced listing visibility</li>
          <li>Advanced analytics and reporting</li>
          <li>Priority customer support</li>
        </ul>
        
        <h4>Payment Processing</h4>
        <p>For paid services:</p>
        <ul>
          <li>All fees are quoted in Indian Rupees (INR)</li>
          <li>Payment is due immediately upon service activation</li>
          <li>We use secure third-party payment processors</li>
          <li>Refunds are subject to our refund policy</li>
        </ul>
        
        <h4>Fee Changes</h4>
        <p>We reserve the right to modify our fees with 30 days' notice to users.</p>
      `
    },
    'intellectual-property': {
      title: 'Intellectual Property Rights',
      content: `
        <h4>PropertyHub's Intellectual Property</h4>
        <p>All content and materials on our Service, including but not limited to:</p>
        <ul>
          <li>Website design, layout, and user interface</li>
          <li>PropertyHub logos, trademarks, and branding</li>
          <li>Software, algorithms, and technical systems</li>
          <li>Original content created by PropertyHub</li>
        </ul>
        <p>Are owned by PropertyHub and protected by intellectual property laws.</p>
        
        <h4>User Content License</h4>
        <p>By posting content on our Service, you grant PropertyHub:</p>
        <ul>
          <li>A non-exclusive, worldwide, royalty-free license to use your content</li>
          <li>The right to display, distribute, and promote your content</li>
          <li>Permission to modify content for technical or editorial purposes</li>
          <li>The ability to sublicense content to third parties for Service operation</li>
        </ul>
        
        <h4>Respect for Third-Party Rights</h4>
        <p>You agree not to post content that infringes on others' intellectual property rights and to respond promptly to any infringement claims.</p>
      `
    },
    'dispute-resolution': {
      title: 'Dispute Resolution',
      content: `
        <h4>Informal Resolution</h4>
        <p>Before initiating formal proceedings, parties agree to attempt resolution through:</p>
        <ul>
          <li>Direct communication between the parties</li>
          <li>Mediation through PropertyHub's customer service</li>
          <li>Good faith negotiation for at least 30 days</li>
        </ul>
        
        <h4>Arbitration</h4>
        <p>If informal resolution fails, disputes will be resolved through binding arbitration:</p>
        <ul>
          <li>Arbitration will be conducted in Mumbai, India</li>
          <li>Proceedings will follow Indian Arbitration and Conciliation Act, 2015</li>
          <li>The arbitrator's decision will be final and binding</li>
          <li>Each party bears their own costs unless otherwise determined</li>
        </ul>
        
        <h4>Exceptions</h4>
        <p>The following disputes are exempt from arbitration:</p>
        <ul>
          <li>Intellectual property infringement claims</li>
          <li>Small claims court matters within jurisdictional limits</li>
          <li>Injunctive relief requests</li>
        </ul>
        
        <h4>Class Action Waiver</h4>
        <p>You agree to resolve disputes individually and waive the right to participate in class action lawsuits.</p>
      `
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Please read these terms carefully before using PropertyHub's services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
                <Download className="mr-2 h-5 w-5" />
                Download PDF
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center">
                <Print className="mr-2 h-5 w-5" />
                Print Terms
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Document Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-blue-600" />
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
              <Scale className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Governing Law</p>
                <p className="text-gray-600">Laws of India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyHighlights.map((highlight, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <highlight.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{highlight.description}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  highlight.importance === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {highlight.importance} Priority
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h3>
              
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <nav className="space-y-1">
                {tableOfContents
                  .filter(item => 
                    item.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              {/* Introduction */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-700 mb-4">
                  Welcome to PropertyHub, India's leading platform for buying, selling, and renting properties without brokerage. 
                  These Terms of Service ("Terms") govern your use of our website, mobile application, and related services.
                </p>
                <p className="text-gray-700 mb-4">
                  By accessing or using PropertyHub, you agree to be bound by these Terms and our Privacy Policy. 
                  If you disagree with any part of these terms, you may not access our Service.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">Important Notice</h4>
                      <p className="text-yellow-700 text-sm mt-1">
                        These Terms include important information about your legal rights, remedies, and obligations. 
                        Please read them carefully.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms Sections */}
              <div className="space-y-8">
                {Object.entries(termsContent).map(([sectionId, section]) => (
                  <div key={sectionId} id={sectionId} className="border-b border-gray-200 pb-8 last:border-b-0">
                    <button
                      onClick={() => toggleSection(sectionId)}
                      className="w-full flex items-center justify-between text-left mb-4"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                      <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${
                        expandedSection === sectionId ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {(expandedSection === sectionId || expandedSection === null) && (
                      <div 
                        className="prose prose-gray max-w-none"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Contact Information */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">legal@propertyhub.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">+91 9876543210</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;