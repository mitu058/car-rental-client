import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-gray-200 py-10">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Top Section */}
        <div className="grid justify-center items-center grid-cols-1 md:grid-cols-4 gap-8">
        <nav className="flex flex-col">
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav className="flex flex-col">
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>

          {/* Quick Links */}
          <div className="lg:ml-14">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:text-indigo-300">Home</a>
              </li>
              <li>
                <a className="hover:text-indigo-300">Top Games</a>
              </li>
              <li>
                <a className="hover:text-indigo-300">Game Reviews</a>
              </li>
              <li>
                <a className="hover:text-indigo-300">Service</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-sm">Email: support@gamingworld.com</p>
            <p className="text-sm">Phone: +123 456 7890</p>
            <p className="text-sm">
              Address: 123 Gaming Street, Game City, GC 45678
            </p>
            {/* Social Media */}
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-300 transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-300 transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://x.com/home?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-300 transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-300 transition-colors"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8">
          <p className="text-base text-gray-500 text-center mt-6">
            &copy; 2024 Gaming World. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
