import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 - About */}
        <div>
          <h2 className="text-xl font-semibold font-inter mb-3">About Us</h2>
          <p className="text-sm text-gray-400 font-quicksand">
            Discover and share the best recipes from around the world. We bring chefs and food lovers together.
          </p>
        </div>

        {/* Column 2 - Links */}
        <div>
          <h2 className="text-xl font-semibold font-inter mb-3">Quick Links</h2>
          <ul className="text-sm text-gray-400 space-y-2">
            <li><a href="#" className="hover:text-orange-500 font-quicksand">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-orange-500 font-quicksand">Terms of Service</a></li>
            <li><a href="#" className="hover:text-orange-500 font-quicksand">Contact Us</a></li>
            <li><a href="#" className="hover:text-orange-500 font-quicksand">Support</a></li>
          </ul>
        </div>

        {/* Column 3 - Newsletter */}
        <div>
          <h2 className="text-xl font-semibold font-inter mb-3">Subscribe to Our Newsletter</h2>
          <form className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="p-2 rounded bg-gray-800 text-white border border-gray-600"
            />
            <button className="bg-orange-500 hover:bg-orange-600 py-2 rounded text-white font-quicksand">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social Media + Copyright */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t border-gray-700 pt-4">
        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF /></a>
          <a href="#" className="text-gray-400 hover:text-white"><FaTwitter /></a>
          <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
          <a href="#" className="text-gray-400 hover:text-white"><FaYoutube /></a>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} RecipeShare. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
