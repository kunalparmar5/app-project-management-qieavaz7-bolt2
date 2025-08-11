import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { 
  Shield, 
  Users, 
  TrendingUp, 
  Award,
  Star,
  ArrowRight
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Shield,
      title: 'Zero Brokerage',
      description: 'Connect directly with property owners and save on brokerage fees'
    },
    {
      icon: Users,
      title: 'Verified Properties',
      description: 'All properties are verified by our expert team for authenticity'
    },
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Get real-time market trends and property price analytics'
    },
    {
      icon: Award,
      title: 'Trusted Platform',
      description: 'Join millions of satisfied customers across India'
    }
  ];

  const stats = [
    { number: '10L+', label: 'Properties Listed' },
    { number: '50L+', label: 'Happy Customers' },
    { number: '100+', label: 'Cities Covered' },
    { number: '₹1000Cr+', label: 'Brokerage Saved' }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      comment: 'Found my dream apartment without any brokerage. The process was smooth and transparent.',
      avatar: 'PS'
    },
    {
      name: 'Rajesh Kumar',
      location: 'Delhi',
      rating: 5,
      comment: 'Sold my property quickly through PropertyHub. Great platform with genuine buyers.',
      avatar: 'RK'
    },
    {
      name: 'Anita Patel',
      location: 'Bangalore',
      rating: 5,
      comment: 'Excellent service! The team helped me find the perfect rental property in my budget.',
      avatar: 'AP'
    }
  ];

  const popularLocations = [
    { name: 'Andheri West, Mumbai', properties: '2,500+', image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Koramangala, Bangalore', properties: '1,800+', image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Gurgaon Sector 49', properties: '3,200+', image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Banjara Hills, Hyderabad', properties: '1,500+', image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Dream Home
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Buy, Sell & Rent Properties Without Brokerage. Connect directly with property owners.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <SearchBar />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PropertyHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing the real estate industry with our innovative platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Locations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Locations
            </h2>
            <p className="text-xl text-gray-600">
              Explore properties in India's most sought-after locations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularLocations.map((location, index) => (
              <div key={index} className="relative group cursor-pointer overflow-hidden rounded-xl">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">{location.name}</h3>
                  <p className="text-sm text-gray-200">{location.properties} properties</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied customers who found their perfect property
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-medium">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions of users who have found their perfect home through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/properties"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Browse Properties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/post-property"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              Post Your Property
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;