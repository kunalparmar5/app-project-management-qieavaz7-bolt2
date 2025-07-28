import React from "react";
import { Calendar, ExternalLink, Download } from "lucide-react";

const Press = () => {
  const pressReleases = [
    {
      id: 1,
      title: "PropertyHub Raises $50M Series B to Expand Across India",
      date: "March 15, 2024",
      excerpt:
        "Leading no-brokerage property platform secures funding to accelerate growth and enhance technology offerings.",
      category: "Funding",
      link: "#",
    },
    {
      id: 2,
      title: "PropertyHub Launches AI-Powered Property Valuation Tool",
      date: "February 28, 2024",
      excerpt:
        "Revolutionary technology provides instant, accurate property valuations using machine learning algorithms.",
      category: "Product",
      link: "#",
    },
    {
      id: 3,
      title: "PropertyHub Crosses 10 Million Property Listings Milestone",
      date: "February 10, 2024",
      excerpt:
        "Platform celebrates significant growth in property inventory across 50+ cities in India.",
      category: "Milestone",
      link: "#",
    },
    {
      id: 4,
      title:
        "PropertyHub Partners with Leading Banks for Home Loan Integration",
      date: "January 25, 2024",
      excerpt:
        "Strategic partnerships enable seamless home loan applications directly through the platform.",
      category: "Partnership",
      link: "#",
    },
  ];

  const mediaKit = [
    {
      name: "Company Logo Pack",
      description: "High-resolution logos in various formats",
      size: "2.5 MB",
      format: "ZIP",
    },
    {
      name: "Brand Guidelines",
      description: "Complete brand identity and usage guidelines",
      size: "1.8 MB",
      format: "PDF",
    },
    {
      name: "Executive Photos",
      description: "Professional headshots of leadership team",
      size: "5.2 MB",
      format: "ZIP",
    },
    {
      name: "Product Screenshots",
      description: "High-quality platform interface images",
      size: "3.1 MB",
      format: "ZIP",
    },
  ];

  const awards = [
    {
      year: "2024",
      title: "Best PropTech Startup",
      organization: "India PropTech Awards",
    },
    {
      year: "2023",
      title: "Innovation in Real Estate",
      organization: "TechCrunch Disrupt",
    },
    {
      year: "2023",
      title: "Customer Choice Award",
      organization: "Real Estate Excellence Awards",
    },
    {
      year: "2022",
      title: "Emerging Company of the Year",
      organization: "Indian Startup Awards",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Press & Media
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Latest news, press releases, and media resources from PropertyHub.
            </p>
          </div>
        </div>
      </div>

      {/* Press Releases */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest Press Releases
            </h2>
            <p className="text-lg text-gray-600">
              Stay updated with our latest announcements and company news.
            </p>
          </div>

          <div className="space-y-6">
            {pressReleases.map((release) => (
              <div
                key={release.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {release.category}
                      </span>
                      <div className="flex items-center space-x-1 text-gray-500 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>{release.date}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {release.title}
                    </h3>

                    <p className="text-gray-600">{release.excerpt}</p>
                  </div>

                  <div className="mt-4 md:mt-0 md:ml-6">
                    <a
                      href={release.link}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <span>Read More</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Media Kit */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Media Kit</h2>
            <p className="text-lg text-gray-600">
              Download our media resources for press coverage and articles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaKit.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{item.size}</span>
                  <span>{item.format}</span>
                </div>
                <button className="flex items-center space-x-2 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Awards & Recognition */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Awards & Recognition
            </h2>
            <p className="text-lg text-gray-600">
              Celebrating our achievements and industry recognition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">
                    {award.year}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {award.title}
                </h3>
                <p className="text-gray-600 text-sm">{award.organization}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Media Inquiries</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              For press inquiries, interviews, or additional information, please
              contact our media team.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Press Contact</h3>
                <p className="text-gray-300">Priya Sharma</p>
                <p className="text-gray-300">Head of Communications</p>
                <p className="text-blue-400">press@propertyhub.com</p>
                <p className="text-gray-300">+91 98765 43210</p>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">
                  Partnership Inquiries
                </h3>
                <p className="text-gray-300">Rajesh Kumar</p>
                <p className="text-gray-300">Business Development</p>
                <p className="text-blue-400">partnerships@propertyhub.com</p>
                <p className="text-gray-300">+91 98765 43211</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;
