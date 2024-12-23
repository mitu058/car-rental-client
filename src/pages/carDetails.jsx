import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const CarDetails = () => {
  const [car, setCar] = useState({});
  const { id } = useParams();
  const {user} = useContext(AuthContext)
  

  const {
    photo,
    carModel,
    owner,
    features,
    availability,
    description,
    price,
    date,
    status
  } = car;

  const fetchCarData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/car/${id}`);
      setCar(data);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  useEffect(() => {
    fetchCarData();
  }, [id]);

  const handelBookCar = async(e) => {
    e.preventDefault();
    const bookData = {
      UserEmail:user?.email,
      photo,
      carModel,
      date,
      price,
      status 
    };
console.log(bookData)

try{
  const { data } = await axios.post('http://localhost:5000/book-car', bookData);
  console.log(data);
}catch{
  console.error("Error booking the car");
}

    // Add Booking logic here using the car ID
    // You can use an API like BookMyShow's or Airbnb's Booking API for this purpose
    // Make sure to handle the booking flow and update the car's availability status accordingly
  };

  return (
    <div className="max-w-6xl mx-auto my-16  space-y-6">
      {/* Flex Layout for Image and Car Details */}
      <div className="flex gap-12">
        {/* Car Image */}
        <div className="w-1/2">
          <img
            src={photo}
            alt={`Car Model: ${carModel}`}
            className="object-cover w-full h-full rounded-lg shadow-md"
          />
        </div>

        {/* Car Details and Reviews */}
        <div className="w-1/2 space-y-4">
          {/* Car Details */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">Model: {carModel}</h1>
            <p className="text-lg text-gray-700">{description}</p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-lg font-semibold text-gray-800">
                Price Per Day : <span className="text-sky-600"> ${price}</span>
              </div>
              {availability && (
                <div className="text-lg font-semibold text-gray-800">
                  Availability :{" "}
                  <span className="font-bold text-green-600">Available</span>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Features : {features}</h3>
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
          </div>

          {/* Book Now Button */}
          <div className="flex justify-center">
            <button
              onClick={handelBookCar}
              className="btn btn-primary px-6 py-3"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
