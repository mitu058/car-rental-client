import React, { useEffect } from "react";
import { FaCarAlt, FaTag, FaLaptop, FaPhoneAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS CSS

const WhyChooseUs = () => {
  const points = [
    {
      icon: <FaCarAlt className="text-5xl text-blue-600 mb-4" />,
      title: "Wide Variety of Cars",
      description: "From budget-friendly options to luxury vehicles.",
    },
    {
      icon: <FaTag className="text-5xl text-green-600 mb-4" />,
      title: "Affordable Prices",
      description: "Competitive daily rates you can count on.",
    },
    {
      icon: <FaLaptop className="text-5xl text-purple-600 mb-4" />,
      title: "Easy Booking Process",
      description: "Seamlessly book your ride in just a few clicks.",
    },
    {
      icon: <FaPhoneAlt className="text-5xl text-red-600 mb-4" />,
      title: "Customer Support",
      description: "24/7 assistance for all your queries.",
    },
  ];

  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  return (
    <section className="mb-20 w-[80%] mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-5">Why Choose Us?</h2>
        <p className="mb-12">With a wide variety of vehicles, transparent pricing, and exceptional customer service. <br /> we ensure a smooth and enjoyable journey every time you choose us</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {points.map((point, index) => (
            <div
              key={index}
              data-aos="fade-down-right" // Add AOS animation here
              className="bg-sky-50 shadow-lg rounded-xl p-8 max-w-xs w-full hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-center items-center mb-4">
                {point.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{point.title}</h3>
              <p className="text-gray-600 text-base">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
