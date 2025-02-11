import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";
import logo from '../assets/0x0.webp'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-800 to-orange-600 hover:from-orange-600 hover:to-orange-800 text-white py-10">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Top Section */}
        <div className="grid justify-center items-center grid-cols-1 md:grid-cols-4 gap-8">
          <nav className="space-y-3 flex flex-col space-x-3">
            <img className="h-12 w-12 rounded-full" src={logo} alt="" />
            <p className="text-xl font-bold">FlexiRide</p>
            <p>At FlexiRide, we are passionate about providing a seamless and memorable car rental experience.</p>
          </nav>
        
          <div className="flex flex-col">
            <h6 className="text-xl font-bold mb-4">Company</h6>
            <Link to='/' className="link link-hover">Home</Link>
            <Link to='/availableCar' className="link link-hover">Available Car</Link>         
            <Link to='/myCar' className="link link-hover">My Car</Link>
            <Link to='/myBooking' className="link link-hover">My Bookings</Link>
            
          </div>
          <div className="flex flex-col">
            <h6 className="text-xl font-bold mb-4">Legal</h6>
            <Link to='/rental-policy' className="link link-hover">Terms of use</Link>
            <Link to='/rental-policy' className="link link-hover">Privacy policy</Link>
            <Link to='/rental-policy' className="link link-hover">Cookie policy</Link>
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
                className="text-white hover:text-indigo-300 transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-indigo-300 transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://x.com/home?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-indigo-300 transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-indigo-300 transition-colors"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white my-8">
          <p className="text-base text-white text-center mt-6">
            &copy; 2024 FlexiRide. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
