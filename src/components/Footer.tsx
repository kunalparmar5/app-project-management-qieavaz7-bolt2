import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, HelpCircle, Shield, FileText, Lock, Map } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact Us', href: '/contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Buy Property', href: '/properties?type=buy' },
        { name: 'Rent Property', href: '/properties?type=rent' },
        { name: 'Sell Property', href: '/post-property?type=sell' },
        { name: 'Rent Out Property', href: '/post-property?type=rent' },
        { name: 'Commercial', href: '/properties?category=commercial' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Property Guide', href: '/property-guide' },
        { name: 'Area Guide', href: '/area-guide' },
        { name: 'Legal Services', href: '/legal-services' },
        { name: 'Home Loans', href: '/home-loans' },
        { name: 'Property Valuation', href: '/property-valuation' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Safety Tips', href: '/safety' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Sitemap', href: '/sitemap' }
      ]
    }
  ];

  const supportLinks = [
    { 
      name: 'Help Center', 
      href: '/help', 
      icon: HelpCircle,
      description: 'Customer support, FAQs, and contact information'
    },
    { 
      name: 'Safety Tips', 
      href: '/safety', 
      icon: Shield,
      description: 'Security guidelines and best practices'
    },
    { 
      name: 'Terms of Service', 
      href: '/terms', 
      icon: FileText,
      description: 'Website usage rules and policies'
    },
    { 
      name: 'Privacy Policy', 
      href: '/privacy', 
      icon: Lock,
      description: 'Data collection and protection practices'
    },
    { 
      name: 'Sitemap', 
      href: '/sitemap', 
      icon: Map,
      description: 'Complete listing of all website pages'
    }
  ];

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
    'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">PropertyHub</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              India's largest platform for buying, selling, and renting properties without brokerage.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Help & Legal Navigation Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-6 text-center md:text-left">Help & Legal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {supportLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="group flex flex-col items-center md:items-start p-4 rounded-lg border border-gray-700 hover:border-gray-600 hover:bg-gray-800 transition-all duration-200"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                    <link.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-white group-hover:text-blue-300 transition-colors">
                    {link.name}
                  </span>
                </div>
                <p className="text-xs text-gray-400 text-center md:text-left group-hover:text-gray-300 transition-colors">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Cities Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-4">Popular Cities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {cities.map((city, index) => (
              <Link
                key={index}
                to={`/properties?location=${city}`}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Email Us</p>
                <p className="text-gray-400 text-sm">support@propertyhub.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Call Us</p>
                <p className="text-gray-400 text-sm">+91 9876543210</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Visit Us</p>
                <p className="text-gray-400 text-sm">Mumbai, Maharashtra</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 PropertyHub. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/help" className="text-gray-400 hover:text-white text-sm transition-colors">
              Help Center
            </Link>
            <Link to="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;