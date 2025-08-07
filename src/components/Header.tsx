import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Menu, 
  X, 
  Heart,
  Bell,
  ChevronDown,
  MapPin,
  LogOut,
  Settings,
  UserCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ServicesMenu from './ServicesMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userProfile, logout } = useAuth();

  const cities = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Surat',
    'Lucknow',
    'Kanpur',
    'Nagpur',
    'Indore',
    'Thane',
    'Bhopal',
    'Visakhapatnam',
    'Pimpri-Chinchwad',
    'Patna',
    'Vadodara'
  ];
  const navigation = [
    { name: 'Buy', href: '/properties?type=buy', current: false },
    { name: 'Rent', href: '/properties?type=rent', current: false },
    { name: 'Sell', href: '/post-property?type=sell', current: false },
    { name: 'Post Property', href: '/post-property?type=rent', current: false },
    { name: 'Commercial', href: '/properties?category=commercial', current: false },
  ];

  const handleSignOut = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsLocationMenuOpen(false);
    
    // Update URL with selected city
    const currentPath = location.pathname;
    if (currentPath === '/properties') {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('location', city);
      navigate(`${currentPath}?${searchParams.toString()}`);
    } else {
      navigate(`/properties?location=${encodeURIComponent(city)}`);
    }
  };
  const getUserInitials = () => {
    if (userProfile?.displayName) {
      return userProfile.displayName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();
    }
    if (currentUser?.email) {
      return currentUser.email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PropertyHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Services Mega Menu */}
            <ServicesMenu />
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Location Selector */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">{selectedCity}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isLocationMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLocationMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-80 overflow-y-auto">
                  <div className="px-3 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">Select City</p>
                  </div>
                  <div className="py-1">
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => handleCitySelect(city)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          selectedCity === city
                            ? 'text-blue-600 bg-blue-50 font-medium'
                            : 'text-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{city}</span>
                          {selectedCity === city && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search Icon for Mobile */}
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-900">
              <Search className="h-5 w-5" />
            </button>

            {currentUser ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setIsNotificationMenuOpen(!isNotificationMenuOpen)}
                    className="hidden md:block relative p-2 text-gray-600 hover:text-gray-900"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                  </button>
                  {isNotificationMenuOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">
                          Notifications
                        </p>
                      </div>
                      <div className="py-1">
                        <a
                          href="#"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="w-full">
                            <p className="text-gray-900 font-medium">New message</p>
                            <p className="text-gray-500 text-xs">
                              You have a new message from John Doe.
                            </p>
                            <p className="text-blue-500 text-xs mt-1">
                              2 minutes ago
                            </p>
                          </div>
                        </a>
                        <a
                          href="#"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="w-full">
                            <p className="text-gray-900 font-medium">Property Alert</p>
                            <p className="text-gray-500 text-xs">
                              A new property matching your criteria is available.
                            </p>
                            <p className="text-blue-500 text-xs mt-1">
                              1 hour ago
                            </p>
                          </div>
                        </a>
                      </div>
                      <div className="border-t border-gray-200">
                        <a
                          href="#"
                          className="block w-full px-4 py-2 text-sm text-center text-blue-600 hover:bg-gray-50"
                        >
                          View all notifications
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Favorites */}
                <button className="hidden md:block p-2 text-gray-600 hover:text-gray-900">
                  <Heart className="h-5 w-5" />
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900"
                  >
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {getUserInitials()}
                        </span>
                      </div>
                    )}
                    <ChevronDown className="h-4 w-4 hidden md:block" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">
                          {userProfile?.displayName || currentUser.email}
                        </p>
                        <p className="text-sm text-gray-500">{currentUser.email}</p>
                      </div>
                      
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <UserCircle className="h-4 w-4 mr-3" />
                        My Profile
                      </Link>
                      
                      <Link
                        to="/my-properties"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Home className="h-4 w-4 mr-3" />
                        My Properties
                      </Link>
                      
                      <Link
                        to="/saved-properties"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Heart className="h-4 w-4 mr-3" />
                        Saved Properties
                      </Link>
                      
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                      </Link>
                      
                      <div className="border-t border-gray-200 my-1"></div>
                      
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Auth Buttons for Non-Authenticated Users */
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/signin"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-1">
              {/* Mobile Location Selector */}
              <div className="px-3 py-2">
                <button
                  onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
                  className="flex items-center justify-between w-full text-left text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>{selectedCity}</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isLocationMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isLocationMenuOpen && (
                  <div className="mt-2 ml-4 space-y-1 max-h-48 overflow-y-auto">
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          handleCitySelect(city);
                          setIsMenuOpen(false);
                        }}
                        className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                          selectedCity === city
                            ? 'text-blue-600 bg-blue-50 font-medium'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Services Menu */}
              <div className="px-3 py-2">
                <Link
                  to="/services"
                  className="block text-base font-medium text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
              </div>
              
              {!currentUser && (
                <div className="border-t border-gray-200 pt-4 mt-4 space-y-1">
                  <Link
                    to="/signin"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg mx-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Overlay to close dropdowns when clicking outside */}
      {(isLocationMenuOpen || isUserMenuOpen || isNotificationMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsLocationMenuOpen(false);
            setIsUserMenuOpen(false);
            setIsNotificationMenuOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;