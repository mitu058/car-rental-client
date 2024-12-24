import React, { useState, useEffect } from "react";
import axios from "axios";

const RecentListing = () => {
  const [allCars, setAllCars] = useState([]);

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/cars");
        // Sort cars by date (latest first) and limit to 8 items
        const recentCars = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        ).slice(0, 6);
        setAllCars(recentCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchAllCars();
  }, []);

  return (
    <section className="p-6 w-[80%] mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Recent Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {allCars.map((car) => (
          <div
            key={car._id}
            className="bg-white rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition duration-200"
          >
            <img
              src={car.photo}
              alt={car.carModel}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4 space-y-3">
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
                Daily Price: <span className="font-semibold">${car.price}/day</span>
              </p>
            
              <p className="text-base text-gray-500 mt-2">
                Added : {Math.round((new Date() - new Date(car.date)) / (1000 * 60 * 60 * 24))} days ago
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentListing;
