import React from 'react';
import { FaPills, FaTruck, FaLock, FaUsers, FaDollarSign, FaSearch } from 'react-icons/fa';

const benefitsData = [
  {
    icon: <FaPills className="text-4xl text-blue-500 mb-4" />,
    title: 'Wide Variety of Medicines',
    description: 'Access a comprehensive catalog of prescription and over-the-counter medicines from multiple verified vendors.',
  },
  {
    icon: <FaUsers className="text-4xl text-green-500 mb-4" />,
    title: 'Trusted and Verified Vendors',
    description: 'All vendors are thoroughly vetted to ensure authenticity and quality.',
  },
  {
    icon: <FaDollarSign className="text-4xl text-yellow-500 mb-4" />,
    title: 'Competitive Pricing',
    description: 'Multiple vendors competing on the platform means better prices for you.',
  },
  {
    icon: <FaSearch className="text-4xl text-purple-500 mb-4" />,
    title: 'Easy Online Ordering',
    description: 'Simple, intuitive interface to browse, select, and order medicines.',
  },
  {
    icon: <FaTruck className="text-4xl text-red-500 mb-4" />,
    title: 'Fast and Reliable Delivery',
    description: 'Doorstep delivery with real-time tracking for your orders.',
  },
  {
    icon: <FaLock className="text-4xl text-indigo-500 mb-4" />,
    title: 'Secure Payments',
    description: 'Multiple payment options with SSL encryption to keep your data safe.',
  },
];

const Benefits = () => {
  return (
    <div data-aos="fade-up" duration="1000" className="w-full flex justify-center py-16 bg-gray-50">
      <div className="w-full max-w-[1500px] px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-green-400">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefitsData.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center"
            >
              {benefit.icon}
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
