import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/0x0.webp";

const Navbar = () => {
  const { user, userLogOut } = useContext(AuthContext);
  const links = (
    <div className='lg:space-x-7 lg:space-y-0 space-y-2 flex flex-col lg:flex-row'>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `font-bold text-sm ${
            isActive ? "lg:text-black text-fuchsia-800  border-b" : ""
          }`
        }
      >
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/availableCar"
        className={({ isActive }) =>
          `font-bold text-sm ${
            isActive ? "lg:text-black text-fuchsia-800  border-b" : ""
          }`
        }
      >
        <span>Available Car</span>
      </NavLink>
      {user && user?.email ? (
        <NavLink
          to="/addCar"
          className={({ isActive }) =>
            `font-bold text-sm ${
              isActive ? "lg:text-black text-fuchsia-800  border-b" : ""
            }`
          }
        >
          <span>Add Car</span>
        </NavLink>
      ) : (
        ""
      )}
      {user && user?.email ? (
        <NavLink
          to="/myCar"
          className={({ isActive }) =>
            `font-bold text-sm ${
              isActive ? "lg:text-black text-fuchsia-800  border-b" : ""
            }`
          }
        >
          <span>My Cars</span>
        </NavLink>
      ) : (
        ""
      )}
      {user && user?.email ? (
        <NavLink
          to="/myBooking"
          className={({ isActive }) =>
            `font-bold text-sm ${
              isActive ? "lg:text-black text-fuchsia-800  border-b" : ""
            }`
          }
        >
          <span>My Bookings</span>
        </NavLink>
      ) : (
        ""
      )}
      <NavLink
        to="/rental-policy"
        className={({ isActive }) =>
          `font-bold text-sm ${
            isActive ? "lg:text-black text-fuchsia-800  border-b" : ""
          }`
        }
      >
        <span>Rental Policy</span>
      </NavLink>
    </div>
  );

  return (
    <div className="sticky top-0 z-50 bg-">
      <div className="navbar lg:px-10 bg-gradient-to-r from-orange-800 to-orange-600 hover:from-orange-600 hover:to-orange-800 lg:text-white">
        <div className="navbar-start ">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              aria-expanded="false"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <Link to="/" className="btn btn-sm btn-ghost text-2xl lg:block hidden">
              FlexiRide
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex flex-col ">
          <ul className="menu menu-horizontal space-x-4 px-1">{links}</ul>
        </div>
        <div className="navbar-end space-x-4">
          {user && user.email ? (
            <div className="">
              <img
                className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-md"
                src={user?.photoURL}
                alt="User Avatar"
              />
            </div>
          ) : (
            ""
          )}

          {user && user?.email ? (
            <button
              onClick={userLogOut}
              className="rounded-full bg-fuchsia-800 hover:bg-[#d81b60] px-4 py-2 text-white transition-all duration-300 hover:scale-90"
            >
              LogOut
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-fuchsia-800 hover:bg-[#d81b60] px-5 py-2 text-white transition-all duration-300 hover:scale-90"
            >
              Login
            </Link>
          )}

          {/* {user && user?.email ? (
            ""
          ) : (
            <Link
              to="/register"
              className=" rounded-full bg-[#e91e63] hover:bg-[#d81b60] px-4 py-2 text-white transition-all duration-300 hover:scale-90"
            >
              Register
            </Link>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
