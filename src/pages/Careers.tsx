import React from "react";
import { MapPin, Clock, Users, ArrowRight } from "lucide-react";

const Careers = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "3-5 years",
      description:
        "Join our engineering team to build the next generation of real estate technology.",
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "4-6 years",
      description:
        "Lead product strategy and development for our core platform features.",
    },
    {
      id: 3,
      title: "Sales Executive",
      department: "Sales",
      location: "Delhi, India",
      type: "Full-time",
      experience: "2-4 years",
      description:
        "Drive business growth by building relationships with property owners and agents.",
    },
    {
      id: 4,
      title: "UX Designer",
      department: "Design",
      location: "Pune, India",
      type: "Full-time",
      experience: "2-4 years",
      description:
        "Create intuitive and beautiful user experiences for our platform.",
    },
    {
      id: 5,
      title: "Data Analyst",
      department: "Analytics",
      location: "Hyderabad, India",
      type: "Full-time",
      experience: "1-3 years",
      description:
        "Analyze market trends and user behavior to drive data-driven decisions.",
    },
    {
      id: 6,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Chennai, India",
      type: "Full-time",
      experience: "2-4 years",
      description: "Ensure customer satisfaction and drive product adoption.",
    },
  ];

  const benefits = [
    {
      title: "Competitive Salary",
      description:
        "Industry-leading compensation packages with performance bonuses",
    },
    {
      title: "Health Insurance",
      description: "Comprehensive medical coverage for you and your family",
    },
    {
      title: "Flexible Work",
      description: "Hybrid work model with flexible hours and remote options",
    },
    {
      title: "Learning & Development",
      description:
        "Continuous learning opportunities and skill development programs",
    },
    {
      title: "Stock Options",
      description: "Equity participation in the company's growth and success",
    },
    {
      title: "Wellness Programs",
      description:
        "Mental health support, gym memberships, and wellness initiatives",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Help us revolutionize the real estate industry and build the
              future of property transactions.
            </p>
          </div>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Work at PropertyHub?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join a mission-driven company that's transforming how people buy,
              sell, and rent properties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-gray-600">
              Discover exciting opportunities to grow your career with us.
            </p>
          </div>

          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {job.department}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{job.description}</p>

                    <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{job.experience}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 md:ml-6">
                    <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      <span>Apply Now</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Culture Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Culture
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We foster an inclusive, collaborative environment where
                innovation thrives and every voice matters.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Collaborative and supportive team environment</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>
                    Opportunities for professional growth and advancement
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Work-life balance and flexible arrangements</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Regular team events and company celebrations</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  500+
                </div>
                <div className="text-gray-600 mb-4">Team Members</div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  15+
                </div>
                <div className="text-gray-600 mb-4">Office Locations</div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  4.8/5
                </div>
                <div className="text-gray-600">Employee Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't see a role that fits? We're always looking for talented
            individuals to join our team.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium">
            Send Us Your Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default Careers;
