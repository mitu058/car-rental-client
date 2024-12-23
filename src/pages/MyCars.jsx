import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { format } from "date-fns";
import axios from "axios";
import { GoTrash } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";

const MyCars = () => {
  const [myCar, setMyCar] = useState([]);
  const { user } = useContext(AuthContext);
  const [sortOption, setSortOption] = useState("");
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [availability, setAvailability] = useState(false);

  // Fetch all cars of the user
  const fetchCarData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/cars/${user?.email}`);
      setMyCar(data);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  useEffect(() => {
    fetchCarData();
  }, [user?.email]);

  // Handle car deletion
  const handleDeleteCar = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const { data } = await axios.delete(`http://localhost:5000/car/${id}`);
        if (data.deletedCount) {
          Swal.fire("Deleted!", "Your car has been deleted.", "success");
          fetchCarData();
        }
      } catch (error) {
        toast.error("Error deleting car");
      }
    }
  };

  // Open modal with car data for updating
  const handleEditCar = (carData) => {
    setCar(carData);
    setStartDate(new Date(carData.date));
    setAvailability(carData.availability);
    document.getElementById("update_modal").showModal();
  };

  // Handle car update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedCar = {
      carModel: form.carModel.value,
      price: parseFloat(form.rentalPrice.value),
      description: form.description.value,
      date: startDate,
      availability,
      photo: form.photo.value,
      location: form.location.value,
      features: form.features.value,
      registrationNumber: form.registrationNumber.value,
    };

    try {
      await axios.put(`http://localhost:5000/updateCar/${car._id}`, updatedCar);
      toast.success("Car updated successfully!");
      document.getElementById("update_modal").close();
      fetchCarData();
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error("Failed to update car");
    }
  };

  // Sort cars based on selected option
  const sortedCar = [...myCar].sort((a, b) => {
    if (sortOption === "date-newest") return new Date(b.date) - new Date(a.date);
    if (sortOption === "price-highest") return b.price - a.price;
    return 0;
  });

  return (
    <div>
      <div className="dropdown flex justify-center items-center relative mt-5">
        <div tabIndex={0} role="button" className="btn m-1">
          Sort Cars By
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow absolute top-full mt-2"
        >
          <li>
            <button onClick={() => setSortOption("date-newest")}>
              Date (Newest)
            </button>
          </li>
          <li>
            <button onClick={() => setSortOption("price-highest")}>
              Price (Highest)
            </button>
          </li>
        </ul>
      </div>

      <div className="my-20 overflow-x-auto">
        <table className="lg:w-[80%] mx-auto shadow-xl border border-gray-100">
          <thead>
            <tr className="bg-red-900 text-white">
              <th className="py-3 px-6 text-center border-b">Image</th>
              <th className="py-3 px-6 text-start border-b">Model</th>
              <th className="py-3 px-6 text-start border-b">Daily Price</th>
              <th className="py-3 px-6 text-center border-b">Availability</th>
              <th className="py-3 px-6 text-center border-b">Date</th>
              <th className="py-3 px-6 text-center border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedCar.length > 0 ? (
              sortedCar.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="py-4 px-6 text-center border-b">
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-12 h-12 rounded-full mx-auto"
                    />
                  </td>
                  <td className="py-4 px-6 text-start border-b">
                    {item.carModel}
                  </td>
                  <td className="py-4 px-6 text-start border-b">
                    {item.price}
                  </td>
                  <td className="py-4 px-6 text-center border-b">
                    {item.availability ? (
                      <span className="text-green-600 font-semibold">
                        Available
                      </span>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center border-b">
                    {format(new Date(item.date), "P")}
                  </td>
                  <td className="py-4 px-6 text-center border-b">
                    <div className="flex space-x-4 text-lg">
                      <button
                        onClick={() => handleEditCar(item)}
                        className="hover:text-blue-600"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        className="hover:text-red-500"
                        onClick={() => handleDeleteCar(item._id)}
                      >
                        <GoTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-6 text-center">
                  <h2>No Data Found</h2>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      <dialog id="update_modal" className="modal">
  <div className="modal-box">
    <form onSubmit={handleUpdate}>
      <h3 className="text-2xl font-bold mb-5">Update Car Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="carModel" className="block mb-2">
            Car Model
          </label>
          <input
            type="text"
            id="carModel"
            name="carModel"
            defaultValue={car?.carModel}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label htmlFor="rentalPrice" className="block mb-2">
            Rental Price
          </label>
          <input
            type="number"
            id="rentalPrice"
            name="rentalPrice"
            defaultValue={car?.price}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label htmlFor="location" className="block mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={car?.location}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label htmlFor="features" className="block mb-2">
            Features
          </label>
          <input
            type="text"
            id="features"
            name="features"
            defaultValue={car?.features}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label htmlFor="registrationNumber" className="block mb-2">
            Registration Number
          </label>
          <input
            type="text"
            id="registrationNumber"
            name="registrationNumber"
            defaultValue={car?.RgNumber}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label htmlFor="availability" className="block mb-2">
            Availability
          </label>
          <input
            type="checkbox"
            id="availability"
            name="availability"
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
            className="toggle toggle-primary"
          />
        </div>
      </div>

      <div>
          <label htmlFor="photo" className="block mb-2">
            Photo URL
          </label>
          <input
            type="text"
            id="photo"
            name="photo"
            defaultValue={car?.photo}
            className="input input-bordered w-full"
          />
        </div>
     
        <div>
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={car?.description}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>
        
      
      <div className="modal-action mt-5">
        <button type="submit" className="btn btn-primary">
          Update
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => document.getElementById("update_modal").close()}
        >
          Close
        </button>
      </div>
    </form>
  </div>
</dialog>

    </div>
  );
};

export default MyCars;
