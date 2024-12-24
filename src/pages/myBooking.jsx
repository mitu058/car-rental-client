import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { format } from "date-fns";
import { GoTrash } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker"; // Add react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Add styles for react-datepicker

const MyBooking = () => {
  const [bookCar, setBookCar] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newDate, setNewDate] = useState(new Date());
  const { user } = useContext(AuthContext);

  const fetchCarData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/booked-car/${user?.email}`
      );
      setBookCar(data);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  useEffect(() => {
    fetchCarData();
  }, [user?.email]);

  // Handle car Booking
  const handleCancelBooking = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
  
    if (result.isConfirmed) {
      // Update status locally
      const updatedBookings = bookCar.map((booking) =>
        booking._id === item._id ? { ...booking, status: "Canceled" } : booking
      );
      setBookCar(updatedBookings);
  
      Swal.fire("Canceled!", "Your booking has been canceled.", "success");
    }
  };
  

  const handleModifyDate = (item) => {
    setSelectedBooking(item);
    setIsModalOpen(true);
    setNewDate(new Date(item.date));
  };

  const handleConfirmDateChange = async () => {
    if (!selectedBooking) {
      Swal.fire("Error!", "No booking selected.", "error");
      return;
    }
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/update-date/${selectedBooking._id}`,
        { date: newDate }
      );
      if (data.modifiedCount) {
        Swal.fire("Updated!", "Booking date has been updated.", "success");
        setIsModalOpen(false);
        fetchCarData();
      } else {
        Swal.fire("No Changes!", "The booking date was not updated.", "info");
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to update booking date.", "error");
    }
  };
  

  return (
    <div>
      <div className="my-20">
        {bookCar.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="lg:w-[80%] mx-auto shadow-xl border border-gray-100">
              <thead>
                <tr className="bg-red-900 text-white">
                  <th className="py-3 px-6 text-center border-b">Image</th>
                  <th className="py-3 px-6 text-start border-b">Model</th>
                  <th className="py-3 px-6 text-center border-b">Date</th>
                  <th className="py-3 px-6 text-start border-b">Price</th>
                  <th className="py-3 px-6 text-start border-b">Status</th>
                  <th className="py-3 px-6 text-center border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookCar.map((item) => (
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
                    <td className="py-4 px-6 text-center border-b">
                      {format(new Date(item.date), "dd-MM-yyyy HH:mm")}
                    </td>
                    <td className="py-4 px-6 text-start border-b">
                      {item.price}
                    </td>
                    <td className="py-4 px-6 text-start border-b">
                      {item.status}
                    </td>
                    <td className="py-4 px-6 text-center border-b">
                      <div className="flex space-x-4 text-lg">
                      <button
  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
  onClick={() => handleCancelBooking(item)}
>
  <GoTrash />
  <span>Cancel</span>
</button>

                        <button
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          onClick={() => handleModifyDate(item)}
                        >
                          <SlCalender />
                          <span>Modify Date</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center mt-10">
            <p className="text-xl font-semibold">
              You haven't booked any cars yet. 
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-1/3">
            <h2 className="text-xl font-semibold mb-4">Modify Booking Date</h2>
            <DatePicker
              selected={newDate}
              onChange={(date) => setNewDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="border border-gray-300 rounded p-2 w-full"
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleConfirmDateChange}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
