import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { format } from "date-fns";
import { GoTrash } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const MyBooking = () => {
  const [bookCar, setBookCar] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newDate, setNewDate] = useState(new Date());
  const [loading, setLoading] = useState(true);  // State to handle loading
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const fetchCarData = async () => {
    try {
      const { data } = await axiosSecure.get(`/booked-car/${user?.email}`);
      setBookCar(data);
      setLoading(false);  // Stop loading once data is fetched
    } catch (error) {
      console.error("Error fetching car data:", error);
      setLoading(false);  // Stop loading on error
    }
  };

  useEffect(() => {
    fetchCarData();
  }, [user?.email]);

  const handleCancelBooking = async (id, status) => {
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
      try {
        const { data } = await axios.patch(
          `https://car-rental-server-rosy.vercel.app/update-status/${id}`,
          { status }
        );
        if (data.modifiedCount) {
          Swal.fire("Canceled!", "Your booking has been canceled.", "success");
          fetchCarData();
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to cancel booking.", "error");
      }
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
        `https://car-rental-server-rosy.vercel.app/update-date/${selectedBooking._id}`,
        { date: newDate, status: "Confirmed" }
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

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink','#23BE0A','#59C6D2','#9538E2','#FF8042','pink','#9538E2'];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div>
      <div className="my-16">
        {loading ? (
         <div className='flex h-screen justify-center items-center'>
         <span className="loading loading-bars loading-lg"></span>
       </div>
        ) : bookCar.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="lg:w-[80%] mx-auto shadow-xl border border-gray-100">
              <thead>
                <tr className="bg-fuchsia-900 text-white ">
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
                      <span
                        className={`font-semibold ${
                          item.status === "Confirmed"
                            ? "text-green-500"
                            : item.status === "Canceled"
                            ? "text-red-500"
                            : "text-black"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-center border-b">
                      <div className="flex space-x-4 text-lg">
                        <button
                          className="flex disabled:cursor-not-allowed items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                          onClick={() =>
                            handleCancelBooking(item._id, "Canceled")
                          }
                          disabled={!(item.status === "Confirmed" || item.status === "pending")}
                        >
                          <GoTrash />
                          <span>Cancel</span>
                        </button>

                        <button
                          className="flex disabled:cursor-not-allowed items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          onClick={() => handleModifyDate(item)}
                          disabled={item.status === "Canceled"}
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
      <p className="pb-3 text-2xl text-center font-bold">Your booking Status</p>

      {/* Statistics (Chart) - Car Daily Rental Prices */}
      {bookCar.length > 0 && (
        <div className="my-10 p-10 bg-gray-100 rounded-lg justify-items-center">
          <ResponsiveContainer width="90%" height={400}>
            <BarChart
              data={bookCar.sort((a, b) => b.price - a.price)}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="carModel" />
              <YAxis />
              <Bar dataKey="price" fill="#23BE0A" shape={<TriangleBar />} label={{ position: 'top' }}>
                {bookCar.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

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
                className="px-4 py-2 rounded-md bg-gradient-to-r from-orange-700 to-orange-500 hover:from-orange-500 hover:to-orange-700 text-white"
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
