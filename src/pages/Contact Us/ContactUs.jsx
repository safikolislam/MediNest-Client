import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="min-h-[80vh] mt-5 bg-green-50 flex flex-col items-center justify-center py-16 px-4 md:px-8 lg:px-20">
   
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question about our medicines, 
          orders, or anything else — our team is ready to help.
        </p>
      </div>

   
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl">
      
        <div className="bg-white shadow-md rounded-2xl p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">
            Get in Touch
          </h2>
          <ul className="space-y-6 text-gray-700">
            <li className="flex items-center gap-4">
              <FaPhoneAlt className="text-green-600 text-xl" />
              <div>
                <p className="font-semibold">Call Us</p>
                <p>+880 1234-567890</p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <FaEnvelope className="text-green-600 text-xl" />
              <div>
                <p className="font-semibold">Email</p>
                <p>support@medinest.com</p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-green-600 text-xl" />
              <div>
                <p className="font-semibold">Visit Us</p>
                <p>House #12, Road #3, Dhanmondi, Dhaka, Bangladesh</p>
              </div>
            </li>
          </ul>
        </div>

       
        <div className="bg-white shadow-md rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">
            Send a Message
          </h2>
          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300 shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

     
      <div className="mt-16 w-full max-w-6xl rounded-2xl overflow-hidden shadow-lg">
        <iframe
          title="MediNest Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.843588490802!2d90.37502087436194!3d23.753849688666586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bf3aa3abf5%3A0x891a54089a9ab63!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1698765432100!5m2!1sen!2sbd"
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;

    