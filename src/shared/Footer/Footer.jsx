
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-blue-100 via-white to-blue-100 text-gray-700 pt-10 border-t border-gray-200 mt-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">

        
        <div>
          <h3 className="text-xl font-bold text-blue-800 m-5">MediNest</h3>
          <p className="text-sm">Your trusted partner in online medicine and healthcare product delivery. Secure, fast, and reliable service 24/7.</p>
        </div>

      
        <div>
          <h4 className="text-md font-semibold text-blue-700 m-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li><a href="/shop" className="hover:text-blue-600">Shop</a></li>
            <li><a href="/store" className="hover:text-blue-600">Cart</a></li>
            <li><a href="/dashboard" className="hover:text-blue-600">Dashboard</a></li>
          </ul>
        </div>

   
        <div>
          <h4 className="text-md font-semibold text-blue-700 m-5">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a>Contact Us</a></li>
            <li><a> FAQs</a></li>
            <li><a>Privacy Policy</a></li>
            <li><a >Terms & Conditions</a></li>
          </ul>
        </div>

    
        <div>
          <h4 className="text-md font-semibold text-blue-700 m-5">Connect with Us</h4>
          <div className="flex space-x-4 text-lg">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook className="hover:text-blue-600" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter className="hover:text-blue-600" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin className="hover:text-blue-600" /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub className="hover:text-blue-600" /></a>
          </div>
          <p className="mt-4 text-sm">
            Email: support@medikart.com <br />
            Phone: +1 234 567 890
          </p>
        </div>
      </div>

      <div className="bg-blue-50 text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} MediNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;



