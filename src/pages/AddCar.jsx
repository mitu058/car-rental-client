import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddCar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const handleAddCar = async (e) => {
    e.preventDefault();
    const form = e.target;
    const carModel = form.carModel.value;
    const price = parseFloat(form.rentalPrice.value);
    const description = form.description.value;
    const date = startDate;
    const photo = form.photo.value;
    const count = parseFloat(form.bookingCount.value);
    const location = form.location.value;
    const features = form.features.value;
    const availability = form.availability.checked;
    const RgNumber = form.registrationNumber.value;

    const newCar = {
      carModel,
      price,
      date,
      ownerName: user?.displayName,
      ownerEmail: user?.email,
      ownerPhotoURL: user?.photoURL,
      availability,
      RgNumber,
      features,
      location,
      description,
      photo,
      count,
      status: "pending",
    };

    // save to Database
    try {
      const { data } = await axiosSecure.post("/add-car", newCar);
      console.log(data);
      toast.success("Car added successfully");
    } catch (err) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="w-[50%] mx-auto space-y-6 rounded-lg border bg-white p-10 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex flex-col space-y-2 text-center">
          <h3 className="text-3xl font-bold tracking-tight">Add Car</h3>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Please fill in the form to add a car.
          </p>
        </div>
        <div>
          <form onSubmit={handleAddCar} className="space-y-6">
            {/* Car Model & Daily Rental Price */}
            <div className="grid grid-cols-2 gap-7">
              <div className="space-y-2 text-sm">
                <label
                  className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300"
                  htmlFor="carModel"
                >
                  Car Model
                </label>
                <input
                  className=" flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700 "
                  id="carModel"
                  placeholder="Enter car model"
                  name="carModel"
                  type="text"
                  required
                />
              </div>
              <div className="space-y-2 text-sm">
                <label
                  className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300"
                  htmlFor="rentalPrice"
                >
                  Daily Rental Price
                </label>
                <input
                  className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                  id="rentalPrice"
                  placeholder="Enter rental price"
                  name="rentalPrice"
                  type="number"
                  required
                />
              </div>
            </div>

            {/* Features & Location */}
            <div className="grid grid-cols-2 gap-7">
              <div className="space-y-2 text-sm">
                <label
                  className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300"
                  htmlFor="features"
                >
                  Features
                </label>
                <select
                  id="features"
                  className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                  name="features"
                  required
                >
                  <option value="">Select Features</option>
                  <option value="GPS">GPS</option>
                  <option value="AC">AC</option>
                  <option value="Bluetooth">Bluetooth</option>
                  <option value="Sunroof">Sunroof</option>
                  <option value="Backup Camera">Backup Camera</option>
                  <option value="Leather Seats">Leather Seats</option>
                  <option value="Heated Seats">Heated Seats</option>
                </select>
              </div>
              <div className="space-y-2 ">
                <label className=" text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  className=" flex h-10  w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700 "
                  placeholder="Enter location"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-7 justify-center items-center">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300">
                  Deadline
                </label>
                <DatePicker
                  className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              {/* Vehicle Registration Number Field */}
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="registrationNumber"
                >
                  Registration Number
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                  placeholder="Enter vehicle registration number"
                  required
                />
              </div>
            </div>

            {/* Booking Count & Date */}
            <div className="grid grid-cols-2  gap-7">
              {/* Photo Upload Field */}
              <div className="space-y-2 text-sm">
                <label
                  className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300"
                  htmlFor="photo"
                >
                  Photo
                </label>
                <input
                  className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                  id="photo"
                  placeholder="place car photo"
                  name="photo"
                  type="url"
                  required
                />
              </div>
              <div className="space-y-2 text-sm">
                <label
                  className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300"
                  htmlFor="bookingCount"
                >
                  Booking Count
                </label>
                <input
                  type="number"
                  id="bookingCount"
                  name="bookingCount"
                  value="0"
                  className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                  disabled
                />
              </div>
            </div>

            {/* Availability Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="availability"
                name="availability"
                className="rounded checkbox checkbox-info border-gray-300 text-sky-600 focus:ring-sky-500"
              />
              <label
                className="text-lg font-medium text-gray-700"
                htmlFor="availability"
              >
                Availablity
              </label>
            </div>

            {/* Description Field */}
            <div className="space-y-2 text-sm">
              <label
                className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                className="flex w-full rounded-md border px-3 py-6 focus-visible:outline-none dark:border-zinc-700"
                placeholder="Enter car description"
                name="description"
                required
              ></textarea>
            </div>

            <button className="rounded-md w-full bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700">
              Add Car
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
