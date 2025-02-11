import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../LayOut/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddCar from "../pages/AddCar";
import AvailableCars from "../pages/AvailableCars";
import CarDetails from "../pages/carDetails";
import MyCars from "../pages/MyCars";
import MyBooking from "../pages/myBooking";
import PrivateRouter from "./PrivateRouter";
import ErrorPage from "../pages/ErrorPage";
import RentalPolicy from "../pages/RentalPolicy";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addCar",
        element: (
          <PrivateRouter>
            <AddCar></AddCar>
          </PrivateRouter>
        ),
      },
      {
        path: "/availableCar",
        element: <AvailableCars></AvailableCars>,
      },
      {
        path: "/cardetails/:id",
        element: <CarDetails></CarDetails>,
      },
      {
        path: "/myCar",
        element: (
          <PrivateRouter>
            <MyCars></MyCars>
          </PrivateRouter>
        ),
      },
      {
        path: "/myBooking",
        element: (
          <PrivateRouter>
            <MyBooking></MyBooking>
          </PrivateRouter>
        ),
      },
      // {
      //   path: "/updateCar/:id",
      //   element: <UpdateCar></UpdateCar>,
      // },
      {
        path: "/rental-policy",
        element: <RentalPolicy></RentalPolicy>,
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
