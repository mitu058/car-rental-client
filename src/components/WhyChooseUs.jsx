import React from "react";
import { FaCarAlt, FaTag, FaLaptop, FaPhoneAlt } from "react-icons/fa";

const WhyChooseUs = () => {
  const points = [
    {
      icon: <FaCarAlt className="text-6xl text-blue-600 mb-4" />,
      title: "Wide Variety of Cars",
      description: "From budget-friendly options to luxury vehicles.",
    },
    {
      icon: <FaTag className="text-6xl text-green-600 mb-4" />,
      title: "Affordable Prices",
      description: "Competitive daily rates you can count on.",
    },
    {
      icon: <FaLaptop className="text-6xl text-purple-600 mb-4" />,
      title: "Easy Booking Process",
      description: "Seamlessly book your ride in just a few clicks.",
    },
    {
      icon: <FaPhoneAlt className="text-6xl text-red-600 mb-4" />,
      title: "Customer Support",
      description: "24/7 assistance for all your queries.",
    },
  ];

  return (
    <section className="mb-20 w-[80%] mx-auto  ">
      <div className=" text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {points.map((point, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-8 max-w-xs w-full hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-center items-center mb-4">
                {point.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {point.title}
              </h3>
              <p className="text-gray-600 text-base">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
