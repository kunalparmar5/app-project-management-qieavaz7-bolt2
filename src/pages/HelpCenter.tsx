import React, { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  Phone, 
  Mail, 
  MessageCircle,
  FileText,
  User,
  Home,
  CreditCard,
  Shield,
  ChevronRight,
  ChevronDown,
  Send,
  Clock,
  CheckCircle,
  Star,
  Book
} from 'lucide-react';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    description: '',
    priority: 'medium'
  });

  const categories = [
    { id: 'all', name: 'All Categories', icon: FileText },
    { id: 'account', name: 'Account & Profile', icon: User },
    { id: 'property', name: 'Property Listings', icon: Home },
    { id: 'payments', name: 'Payments & Billing', icon: CreditCard },
    { id: 'security', name: 'Security & Privacy', icon: Shield },
    { id: 'technical', name: 'Technical Issues', icon: HelpCircle }
  ];

  const faqs = [
    {
      id: '1',
      category: 'account',
      question: 'How do I create an account on PropertyHub?',
      answer: 'To create an account, click the "Sign Up" button in the top right corner. You can register using your email address, phone number, or Google account. Fill in your details, verify your email/phone, and you\'re ready to start using PropertyHub.',
      popularity: 95,
      helpful: 234,
      tags: ['registration', 'signup', 'account creation']
    },
    {
      id: '2',
      category: 'property',
      question: 'How do I post a property for rent or sale?',
      answer: 'Click "Post Property" in the main menu. Choose whether you want to rent or sell, fill in property details including photos, location, price, and amenities. Our team will verify your listing within 24 hours before it goes live.',
      popularity: 92,
      helpful: 189,
      tags: ['posting', 'listing', 'property', 'rent', 'sale']
    },
    {
      id: '3',
      category: 'payments',
      question: 'What are the charges for posting a property?',
      answer: 'PropertyHub is completely free for property owners. We don\'t charge any brokerage or listing fees. You only pay when you successfully rent or sell your property through our platform.',
      popularity: 88,
      helpful: 156,
      tags: ['charges', 'fees', 'pricing', 'free']
    },
    {
      id: '4',
      category: 'security',
      question: 'How do I verify if a property listing is genuine?',
      answer: 'Look for the "Verified" badge on listings. We verify property documents, owner identity, and conduct physical inspections. You can also request additional verification documents directly from the owner.',
      popularity: 85,
      helpful: 142,
      tags: ['verification', 'genuine', 'authentic', 'safety']
    },
    {
      id: '5',
      category: 'technical',
      question: 'Why can\'t I see property photos loading?',
      answer: 'This might be due to slow internet connection or browser cache issues. Try refreshing the page, clearing your browser cache, or switching to a different browser. If the issue persists, contact our technical support.',
      popularity: 78,
      helpful: 98,
      tags: ['photos', 'loading', 'technical', 'browser']
    }
  ];

  const guides = [
    {
      title: 'Complete Guide to Buying Your First Home',
      description: 'Step-by-step process from searching to closing',
      duration: '15 min read',
      category: 'property',
      icon: Home,
      steps: 8
    },
    {
      title: 'How to Create an Effective Property Listing',
      description: 'Tips for writing descriptions and taking photos',
      duration: '10 min read',
      category: 'property',
      icon: FileText,
      steps: 6
    },
    {
      title: 'Setting Up Your Profile for Maximum Visibility',
      description: 'Optimize your profile to attract more inquiries',
      duration: '5 min read',
      category: 'account',
      icon: User,
      steps: 4
    },
    {
      title: 'Understanding Property Verification Process',
      description: 'Learn how we verify properties and owners',
      duration: '8 min read',
      category: 'security',
      icon: Shield,
      steps: 5
    }
  ];

  const contactMethods = [
    {
      method: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: '24/7',
      responseTime: 'Immediate',
      icon: MessageCircle,
      action: 'Start Chat',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      method: 'Phone Support',
      description: 'Speak directly with our experts',
      availability: '9 AM - 9 PM',
      responseTime: 'Immediate',
      icon: Phone,
      action: 'Call +91 9876543210',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      method: 'Email Support',
      description: 'Send detailed queries and get comprehensive answers',
      availability: '24/7',
      responseTime: 'Within 2 hours',
      icon: Mail,
      action: 'Send Email',
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ticket submitted:', ticketForm);
    alert('Support ticket submitted successfully! We\'ll get back to you within 24 hours.');
    setTicketForm({
      name: '',
      email: '',
      category: '',
      subject: '',
      description: '',
      priority: 'medium'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Help Center</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Find answers to your questions, get step-by-step guides, and connect with our support team
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles, guides, or FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:border-transparent text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Contact Methods */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Get Immediate Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((contact, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <contact.icon className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{contact.method}</h3>
                <p className="text-gray-600 mb-4">{contact.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Availability:</span>
                    <span className="font-medium">{contact.availability}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Response Time:</span>
                    <span className="font-medium">{contact.responseTime}</span>
                  </div>
                </div>
                <button className={`w-full text-white py-3 px-4 rounded-lg transition-colors ${contact.color}`}>
                  {contact.action}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border-2 transition-colors text-center ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <category.icon className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Step-by-Step Guides */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Step-by-Step Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guides.map((guide, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <guide.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{guide.title}</h3>
                    <p className="text-gray-600 mb-4">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {guide.duration}
                        </div>
                        <div className="flex items-center">
                          <Book className="h-4 w-4 mr-1" />
                          {guide.steps} steps
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                        Read Guide
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-400" />
                        {faq.popularity}% helpful
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                        {faq.helpful} people found this helpful
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${
                    expandedFAQ === faq.id ? 'rotate-180' : ''
                  }`} />
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 mb-4">{faq.answer}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {faq.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4">
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                          👍 Helpful
                        </button>
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                          👎 Not helpful
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Support Ticket Form */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Submit a Support Ticket</h2>
          <p className="text-gray-600 mb-8">
            Can't find what you're looking for? Submit a detailed support ticket and our team will get back to you within 24 hours.
          </p>
          
          <form onSubmit={handleTicketSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={ticketForm.name}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={ticketForm.email}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={ticketForm.category}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="account">Account & Profile</option>
                  <option value="property">Property Listings</option>
                  <option value="payments">Payments & Billing</option>
                  <option value="security">Security & Privacy</option>
                  <option value="technical">Technical Issues</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={ticketForm.priority}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={ticketForm.subject}
                onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of your issue"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={ticketForm.description}
                onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Please provide detailed information about your issue, including steps to reproduce if applicable"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
            >
              <Send className="h-5 w-5 mr-2" />
              Submit Support Ticket
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default HelpCenter;