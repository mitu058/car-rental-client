import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/0x0.webp";

const Navbar = () => {
  const { user, userLogOut } = useContext(AuthContext);
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/availableCar">Available Cars</NavLink>
      </li>
      {user && user?.email ? (
        <li>
          <NavLink to="/addCar">Add Car</NavLink>
        </li>
      ) : (
        ""
      )}
      {user && user?.email ? (
        <li>
          <NavLink to="/myCar">My Cars</NavLink>
        </li>
      ) : (
        ""
      )}
      {user && user?.email ? (
        <li>
          <NavLink to="/myBooking">My Bookings</NavLink>
        </li>
      ) : (
        ""
      )}
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
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
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <Link to="/" className="btn btn-ghost text-2xl">
              Car Rental
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-4 px-1">{links}</ul>
        </div>
        <div className="navbar-end space-x-4">
          {user && user.email ? (
            <div className="relative group">
              <img
                className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-md"
                src={user?.photoURL}
                alt="User Avatar"
              />
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm px-4 py-2 rounded-md opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out shadow-lg">
                {user?.displayName}
                <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45 bg-gradient-to-r from-blue-500 to-purple-600"></span>
              </div>
            </div>
          ) : (
            ""
          )}

          {user && user?.email ? (
            <button
              onClick={userLogOut}
              className="rounded-full bg-[#e91e63] hover:bg-[#d81b60] px-4 py-2 text-white transition-all duration-300 hover:scale-90"
            >
              LogOut
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-[#e91e63] hover:bg-[#d81b60] px-5 py-2 text-white transition-all duration-300 hover:scale-90"
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
