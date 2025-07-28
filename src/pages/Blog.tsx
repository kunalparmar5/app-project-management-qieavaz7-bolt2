import React from "react";
import { Calendar, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for First-Time Home Buyers in 2024",
      excerpt:
        "Navigate the property market with confidence using these essential tips for first-time buyers.",
      author: "Priya Sharma",
      date: "March 15, 2024",
      category: "Buying Guide",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Real Estate Investment Trends in Mumbai",
      excerpt:
        "Discover the hottest investment opportunities and emerging areas in Mumbai's real estate market.",
      author: "Rajesh Kumar",
      date: "March 12, 2024",
      category: "Investment",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "How to Rent Out Your Property Without Hassle",
      excerpt:
        "A comprehensive guide to becoming a successful landlord and maximizing your rental income.",
      author: "Anita Desai",
      date: "March 10, 2024",
      category: "Rental Guide",
      image:
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Legal Documents Every Property Buyer Must Know",
      excerpt:
        "Understanding the essential legal documents and paperwork involved in property transactions.",
      author: "Vikram Singh",
      date: "March 8, 2024",
      category: "Legal",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
      readTime: "8 min read",
    },
    {
      id: 5,
      title: "Home Loan Interest Rates: What to Expect in 2024",
      excerpt:
        "Stay updated with the latest home loan trends and find the best financing options for your property.",
      author: "Meera Patel",
      date: "March 5, 2024",
      category: "Finance",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
      readTime: "4 min read",
    },
    {
      id: 6,
      title: "Vastu Tips for Your New Home",
      excerpt:
        "Create positive energy in your new home with these practical Vastu guidelines and tips.",
      author: "Dr. Sunita Rao",
      date: "March 3, 2024",
      category: "Lifestyle",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      readTime: "5 min read",
    },
  ];

  const categories = [
    "All",
    "Buying Guide",
    "Investment",
    "Rental Guide",
    "Legal",
    "Finance",
    "Lifestyle",
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              PropertyHub Blog
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Expert insights, market trends, and practical tips for all your
              real estate needs.
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <span className="text-blue-600 font-medium">
                      {post.readTime}
                    </span>
                  </div>

                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest real estate
              insights delivered to your inbox.
            </p>

            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
