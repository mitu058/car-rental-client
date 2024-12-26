import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AvailableCars = () => {
  const [search, setSearch] = useState("");
  const [allCars, setAllCars] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortOrder, setSortOrder] = useState(""); // "grid" or "list"

  useEffect(() => {
    const fetchAllCars = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/cars?searchParams=${search}&sort=${sortOrder}`
      );
      setAllCars(data);
    };

    fetchAllCars();
  }, [search, sortOrder]);

  // Filter cars with availability set to true
  const availableCars = allCars.filter((car) => car.availability === true);

  return (
    <div className="w-[80%] mx-auto my-14">
      <div className="flex  gap-4  mb-6">
        <div>
          <select
            className="border px-4 py-2"
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
          >
            <option value="">Sort By Price</option>
            <option value="asc">Ascending</option>
            <option value="desc">Desecending</option>
          </select>
        </div>
        {/* Search Input */}
        <div className=" p-1 lg:w-[30%] mx-auto overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300 mb-4">
          <input
            className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
            type="text"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search car by Car Model"
            aria-label="Search for cars"
          />
        </div>
        {/* Toggle Button */}
        <div className="">
          <button
            className="rounded-md  px-4 py-2 text-white bg-blue-500 hover:bg-blue-600"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            Switch to {viewMode === "grid" ? "List" : "Grid"} View
          </button>
        </div>
      </div>

      {/* Cars Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCars.map((car) => (
            <div
              key={car._id}
              className="max-w-[350px]  rounded-lg bg-white p-6 shadow-lg dark:bg-[#18181B]"
            >
              <img
                src={car.photo}
                alt={car.carModel}
                className="h-[200px] w-full mb-5 rounded-lg object-cover"
              />
              <div className="space-y-1">
                <h1 className="text-lg font-semibold ">
                  Model : {car.carModel}
                </h1>
                <p className="text-lg font-semibold ">
                  Features : {car.features}
                </p>
                <p className="text-lg font-semibold ">
                  Location : {car.location}
                </p>
              </div>
              <p className="text-lg font-semibold">Price : ${car.price}</p>
              <div>
                <Link to={`/cardetails/${car._id}`}>
                  <button className="rounded-lg w-full mt-3 bg-slate-800 px-6 py-2 text-[12px] font-semibold text-white duration-300 hover:bg-slate-950 sm:text-sm md:text-base ">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6 lg:w-[60%] mx-auto ">
          {availableCars.map((car) => (
            <div
              key={car._id}
              className="flex  space-x-10 rounded-lg bg-white p-6 shadow-lg dark:bg-[#18181B]"
            >
              {/* Car Image */}
              <img
                src={car.photo}
                alt={car.carModel}
                className="h-[150px] w-[250px] rounded-lg object-cover"
              />
              {/* Car Details */}
              <div className="flex flex-col justify-center space-y-1">
                <h1 className="text-lg font-semibold">{car.carModel}</h1>
                <p className="text-base text-gray-600">
                  Features : {car.features}
                </p>
                <p className="text-base text-gray-600">
                  Location : {car.location}
                </p>
                <p className="text-base text-gray-600">Price : ${car.price}</p>
                <div className="">
                  <Link to={`/cardetails/${car._id}`}>
                    <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
              {/* Book Now Button */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
