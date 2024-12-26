import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Don't forget to import the AOS CSS

const RecentListing = () => {
  const [allCars, setAllCars] = useState([]);

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const { data } = await axios.get(
          "https://car-rental-server-rosy.vercel.app/cars"
        );
        // Sort cars by date (latest first) and limit to 8 items
        const recentCars = data
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 6);
        setAllCars(recentCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchAllCars();
    AOS.init(); // Initialize AOS
  }, []);

  return (
    <section className="p-6 md:w-[80%] mx-auto">
      <div className="text-center space-y-3 mb-8">
      <h2 className="text-2xl font-semibold  mb-4">
        Browse Our Latest Car Listings{" "}
      </h2>
      <p>
        Discover the latest cars available for rent, featuring a wide range of
        options <br /> to match your travel needs and style and Find Your
        Perfect Ride for Every Adventure!
      </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {allCars.map((car) => (
          
          <div
            key={car._id}
            data-aos="zoom-in"  // Add AOS animation here
            className="bg-white  rounded-lg p-4 shadow  hover:shadow-2xl transition hover:scale-105  "
          >
            <img
              src={car.photo}
              alt={car.carModel}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="pt-4 pb-4 space-y-2">
              <div className="flex justify-between">
                <h3 className="text-lg font-bold">{car.carModel}</h3>
                <p
                  className={`inline-block px-3 py-1 text-sm font-medium rounded ${
                    car.availability
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {car.availability ? "Available" : "Unavailable"}
                </p>
              </div>
              <p className="text-base text-gray-600">
                Daily Price:{" "}
                <span className="font-semibold">${car.price}/day</span>
              </p>
              <p className="text-base text-gray-500 mt-2">
                Added :{" "}
                {Math.round(
                  (new Date() - new Date(car.date)) / (1000 * 60 * 60 * 24)
                )}{" "}
                days ago
              </p>
              <p className="text-base text-gray-600">
                Total Booking :{" "}
                <span className="font-semibold">{car.count}</span>
              </p>
              <p className="text-base text-gray-600">
                Location : <span className="font-semibold">{car.location}</span>
              </p>
            </div>
            <Link to={`/cardetails/${car._id}`}>
              <button className="btn w-full bg-gradient-to-r from-orange-700 to-orange-500 hover:from-orange-500 hover:to-orange-700 text-white text-lg">Rent Now</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentListing;
