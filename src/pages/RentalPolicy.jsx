import React from 'react';
import { FaUser, FaIdCard, FaShieldAlt, FaGasPump, FaCreditCard, FaMapMarkerAlt, FaTimesCircle, FaClock } from 'react-icons/fa';

const RentalPolicy = () => {
  return (
    <div className="py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        
        {/* Title and Description */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Rental Policies</h2>
          <p className="text-lg text-gray-600">
            Please review our rental policies to ensure a smooth and hassle-free experience. <br /> These guidelines help us maintain the quality and safety of our services.
          </p>
        </div>

        {/* Rental Policies Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
          {/* Age Restrictions Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <FaUser className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="font-semibold text-lg text-gray-800">Age Restrictions</h3>
            </div>
            <p className="text-gray-600">
              Drivers must be at least 21 years old. A valid driver's license and credit card are required to book.
            </p>
          </div>

          {/* Driver's License Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <FaIdCard className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="font-semibold text-lg text-gray-800">Driver's License</h3>
            </div>
            <p className="text-gray-600">
              A valid driver’s license must be presented at the time of car pick-up. International drivers need an international driving permit.
            </p>
          </div>

          {/* Insurance & Liability Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <FaShieldAlt className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="font-semibold text-lg text-gray-800">Insurance & Liability</h3>
            </div>
            <p className="text-gray-600">
              All rentals come with basic insurance. Additional coverage options are available for extra security.
            </p>
          </div>

          {/* Fuel Policy Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <FaGasPump className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="font-semibold text-lg text-gray-800">Fuel Policy</h3>
            </div>
            <p className="text-gray-600">
              Cars are provided with a full tank of gas and should be returned with a full tank. Fuel charges will apply for cars returned with less than a full tank.
            </p>
          </div>

          {/* Booking & Payment Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <FaCreditCard className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="font-semibold text-lg text-gray-800">Booking & Payment</h3>
            </div>
            <p className="text-gray-600">
              A valid payment method is required at the time of booking. Full payment is required upon pick-up.
            </p>
          </div>

          {/* Pick-up & Drop-off Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="font-semibold text-lg text-gray-800">Pick-up & Drop-off</h3>
            </div>
            <p className="text-gray-600">
              Cars must be picked up and returned at the specified locations. Please inform us if you need any changes in location.
            </p>
          </div>

          {/* Cancellation & Refunds Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <FaTimesCircle className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="font-semibold text-lg text-gray-800">Cancellation & Refunds</h3>
            </div>
            <p className="text-gray-600">
              Cancellations made within 24 hours of booking will receive a full refund. After that, cancellations are non-refundable.
            </p>
          </div>

          {/* Late Returns Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <FaClock className="h-6 w-6 text-blue-500 mr-3" />
              <h3 className="font-semibold text-lg text-gray-800">Late Returns</h3>
            </div>
            <p className="text-gray-600">
              Late returns are charged based on an hourly rate. Please return the vehicle on time to avoid additional charges.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RentalPolicy;
