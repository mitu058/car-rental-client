import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateCar = () => {
  const [car, setCar] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const { id } = useParams();

  // Fetch car data by ID
  const fetchCarData = async () => {
    try {
      const { data } = await axios.get(`https://car-rental-server-rosy.vercel.app/car/${id}`);
      setCar(data);
      setStartDate(new Date(data.date));
    
    } catch (error) {
      console.error("Error fetching car data:", error);
      
    }
  };

  useEffect(() => {
    fetchCarData();
  }, [id]);

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const carModel = form.carModel.value;
    const price = parseFloat(form.rentalPrice.value);
    const description = form.description.value;
    const date = startDate;
    const photo = form.photo.value;
    const location = form.location.value;
    const features = form.features.value;
    const RgNumber = form.registrationNumber.value;

    const updatedCar = {
      carModel,
      price,
      date,
      availability,
      RgNumber,
      features,
      location,
      description,
      photo,
    };

    try {
      await axios.put(`https://car-rental-server-rosy.vercel.app/updateCar/${id}`, updatedCar);
     
      document.getElementById("my_modal_1").close();
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

 

  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Open Modal
      </button>
     
    </div>
  );
};

export default UpdateCar;
