import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../LayOut/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddCar from "../pages/AddCar";
import AvailableCars from "../pages/AvailableCars";
import CarDetails from "../pages/carDetails";
import MyCars from "../pages/MyCars";
import UpdateCar from "../pages/UpdateCar";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h2>page not found</h2>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addCar",
        element: <AddCar></AddCar>,
      },
      {
        path: "/availableCar",
        element: <AvailableCars></AvailableCars>,
        loader: () => fetch("http://localhost:5000/cars"),
      },
      {
        path: "/cardetails/:id",
        element: <CarDetails></CarDetails>,
      },
      {
        path: "/myCar",
        element: <MyCars></MyCars>,
      },
      {
        path: "/updateCar/:id",
        element: <UpdateCar></UpdateCar>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default Router;
