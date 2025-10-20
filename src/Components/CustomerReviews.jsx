import React from "react";
import img from "../assets/Safikol_islam_profile.png"
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const CustomerReviews = () => {
  return (
    <section data-aos="fade-up" data-aos-duration="1000"  className="bg-white dark:bg-dark py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-green-300">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Real feedback from people who love using our platform.
          </p>
        </div>

     
        <div className="grid md:grid-cols-2 gap-8">
  
          <div className="bg-green-50 dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center">
            <FaQuoteLeft className="text-green-500 text-4xl opacity-30 mx-auto mb-4" />
            <p className="text-gray-700 dark:text-gray-200 italic mb-6">
              "This platform made it so easy to order medicines online. 
              Everything is organized and delivery is fast!"
            </p>

            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-green-500" />
              ))}
            </div>

            <img
              src={img}
              alt="Alice Johnson"
              className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-green-500 mb-3"
            />
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Alice Johnson
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Pharmacist, MedCare Clinic
            </p>
          </div>

    
          <div className="bg-green-50 dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center">
            <FaQuoteLeft className="text-green-500 text-4xl opacity-30 mx-auto mb-4" />
            <p className="text-gray-700 dark:text-gray-200 italic mb-6">
              "Great selection, fast delivery, and affordable prices. 
              I always find what I need easily!"
            </p>

            <div className="flex justify-center mb-3">
              {[...Array(4)].map((_, i) => (
                <FaStar key={i} className="text-green-500" />
              ))}
              <FaStar className="text-gray-300 dark:text-gray-700" />
            </div>

            <img
              src={img}
              alt="Bob Williams"
              className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-green-500 mb-3"
            />
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Bob Williams
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Happy Customer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
