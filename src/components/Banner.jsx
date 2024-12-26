import React from "react";
import banner from "../assets/new car.webp";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center h-screen  mb-20"
      style={{ backgroundImage: `url(${banner})` }}
    >
      {/* Overlay for blur effect */}
      <div className="absolute inset-0 bg-black bg-opacity-65  flex items-center justify-center">
        <div className="text-center p-8 rounded-lg ">
          {/* Highlighted text */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Drive Your Dreams Today!
          </h1>
          <p className="text-white pb-4">Experience the freedom to drive your dream car today! No matter  the destination or occasion, <br /> we make it easy for you to hit the road in style and comfort. Start your journey now!</p>
          <Link to={"/availableCar"}>
            <button className="bg-gradient-to-r from-orange-800 to-orange-600 hover:from-orange-600 hover:to-orange-800 text-white text-lg font-medium btn rounded-lg px-6 py-2 transition duration-300">
              View Available Cars
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
