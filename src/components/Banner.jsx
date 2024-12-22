import React from "react";
import banner from "../assets/0x0.webp";

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center h-screen mt-6 mb-20"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center bg-white bg-opacity-10 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Drive Your Dreams Today!
          </h1>
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-medium btn rounded-lg transition duration-300">
            View Available Cars
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
