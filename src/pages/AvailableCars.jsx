import React from "react";
import { useLoaderData } from "react-router-dom";

const AvailableCars = () => {
  const allCars = useLoaderData();
  return (
    <div>
      {allCars.map((car) => (
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure>
            <img
              src={car.photo}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
             {car.carModel}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailableCars;
