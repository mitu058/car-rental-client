import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2"; // Import SweetAlert
import toast from "react-hot-toast";

const CarDetails = () => {
  const [car, setCar] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const {
    photo,
    carModel,
    features,
    description,
    price,
    count,
    _id,
    ownerEmail,
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

  const handleBookCar = async () => {
    const carId = _id;
    const email = user?.email;

    if(user?.email === ownerEmail) {
      Swal.fire({
        title: "Error!",
        text: 'You can not book your own car',
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const bookData = {
      email,
      ownerEmail,
      photo,
      carModel,
      date: new Date(), // Default booking date
      price,
      status: "pending",
      carId,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/book-car",
        bookData
      );
      if (data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Car booked successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setIsModalOpen(false); // Close modal after booking
      }
    } catch (err) {
      // toast.error(err?.response?.data);
      const errorMessage = err?.response?.data || "Failed to book the car. Please try again.";
      console.error("Error booking the car:", errorMessage);
  
      // Display the error message using SweetAlert
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });

    }
  };

  return (
    <div className="max-w-6xl mx-auto my-16 space-y-6">
      <div className="flex gap-12">
        <div className="w-1/2">
          <img
            src={photo}
            alt={`Car Model: ${carModel}`}
            className="object-cover w-full h-full rounded-lg shadow-md"
          />
        </div>
        <div className="w-1/2 space-y-4">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">Model: {carModel}</h1>
            <p className="text-lg text-gray-700">{description}</p>
            <p className="text-lg font-semibold">Features: {features}</p>
            <p className="text-lg font-semibold">
              Price Per Day: <span className="text-sky-600">${price}</span>
            </p>
            <p className="text-lg font-semibold">
              Total Booking : <span className="text-sky-600">{count}</span>
            </p>
          </div>
          <div className="flex justify-center">
  <button
    onClick={() => {
      if (!user) {
        // Show SweetAlert for non-logged-in users
        Swal.fire({
          title: 'Error!',
          text: 'Please Login to Booked This Car.',
          icon: 'error',
          confirmButtonText: 'Okay',
        });
      } else {
        setIsModalOpen(true); // Open the modal if the user is logged in
      }
    }}
    className="btn btn-primary px-6 py-3"
  >
    Book Now
  </button>
</div>

        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-1/3">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            <div className="space-y-1">
              <p>
                <strong>Model:</strong> {carModel}
              </p>
              <p>
                <strong>Price Per Day:</strong> ${price}
              </p>
              <p>
                <strong>Features:</strong> {features}
              </p>
            </div>

            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleBookCar}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
