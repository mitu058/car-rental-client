import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { format } from "date-fns";
import axios from "axios";
import { GoTrash } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyCars = () => {
  const [myCar, setMyCar] = useState([]);
  const { user } = useContext(AuthContext);
  const [sortOption, setSortOption] = useState("");

  // sort car
  const sortedCar = [...myCar].sort((a, b) => {
    if (sortOption === "date-newest") {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortOption === "price-highest") {
      return b.price - a.price;
    }
    return 0;
  });

  const fetchCarData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/cars/${user?.email}`
      );
      setMyCar(data);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  useEffect(() => {
    fetchCarData();
  }, [user?.email]);

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
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          // Refresh the car list after deletion
          fetchCarData();
        }
      } catch (error) {
        toast.error("Error deleting car:", error);
      }
    }
  };

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
                      <button className="hover:text-blue-600"><FaRegEdit /></button>
                      <button className="hover:text-red-500" onClick={() => handleDeleteCar(item._id)}>
                        <GoTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 px-6 text-center">
                  <h2>No Data Found</h2>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCars;
