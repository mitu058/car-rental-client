import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const AvailableCars = () => {
  const allCars = useLoaderData();

  // Filter cars with availability set to true
  const availableCars = allCars.filter((car) => car.availability === true);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-14 w-[80%] mx-auto">
      {availableCars.map((car) => (
        <div
          key={car._id}
          className="max-w-[350px] space-y-4 rounded-lg bg-white p-6 shadow-lg md:w-[350px] dark:bg-[#18181B]"
        >
          <img
            width={400}
            height={400}
            className="h-[200px] w-[350px] rounded-lg object-cover"
            src={car.photo}
            alt="card navigate ui"
          />
          <div className="grid gap-2">
            <h1 className="text-lg font-semibold ">Model : {car.carModel}</h1>
            <p className="text-lg font-semibold ">
              Features : {car.features}
            </p>
            <div className="text-lg font-semibold">Price : ${car.price}</div>
          </div>
          <div className="">
           <Link to={`/cardetails/${car._id}`}> 
           <button className="rounded-lg w-full bg-slate-800 px-6 py-2 text-[12px] font-semibold text-white duration-300 hover:bg-slate-950 sm:text-sm md:text-base ">
              Book Now
            </button>
           </Link>
         
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailableCars;
