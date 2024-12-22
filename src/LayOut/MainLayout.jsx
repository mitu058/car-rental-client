
import Navbar from "../Components/Navbar";
import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/Footer";

import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  const navigaton = useNavigation();
  const isNavigation = navigaton.state === "loading";
  return (
    <div className="">
        <Toaster></Toaster>
      {isNavigation ? (
       <div className="flex justify-center items-center h-screen">
         <span className="loading loading-spinner loading-lg"></span>
       </div>
      ) : (
        <div>
          <Navbar></Navbar>
          <div className="">
            <Outlet></Outlet>
          </div>
          <Footer></Footer>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
