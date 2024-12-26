import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import googlelogo from "../assets/gogle.png";

const Login = () => {
  const { signInUser, setUser } = useContext(AuthContext);
  const [showPasswoed, setShowPassword] = useState(false);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handelLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        toast.success("login successful");
        const user = result.user;
        navigate("/");
        const user1 = { email: email };
        axios
          .post("https://car-rental-server-rosy.vercel.app/jwt", user1, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
          });
        setUser(user);
      })
      .catch((error) => {
        toast.error("failed to login");
      });
  };

  const googleLogIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("login successful");
        navigate("/");
      })
      .cath((error) => {
        toast.error("failed to login with google");
        console.error(error);
      });
  };

  return (
    <div className="my-14 flex-col lg:flex justify-between w-[80%] mx-auto items-center">
      <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border  bg-white p-10 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
        <h1 className="text-3xl text-center font-semibold">Login</h1>
        <form onSubmit={handelLogin} action="#" className="space-y-6">
          <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            <label htmlFor="username_2" className="block font-medium">
              Email
            </label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
              placeholder="Enter email"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="space-y-2 text-sm relative">
            <label
              htmlFor="password"
              className="block text-base text-zinc-700 dark:text-zinc-300 font-medium"
            >
              Password
            </label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2 text-base focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
              id="password"
              placeholder="Enter password"
              name="password"
              type={showPasswoed ? "text" : "password"}
              required
            />

            <div
              onClick={() => setShowPassword(!showPasswoed)}
              className="btn btn-xs absolute right-3 top-8"
            >
              {showPasswoed ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </div>

            <div className="flex justify-end text-xs">
              <a
                href="#"
                className="text-zinc-700 hover:underline text-base dark:text-zinc-300"
              >
                Forgot Password?
              </a>
            </div>
          </div>
          <button className="w-full rounded-md py-3 bg-gradient-to-r from-orange-700 to-orange-500 hover:from-orange-500 hover:to-orange-700 text-white">
            Login
          </button>
        </form>
        <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
          Don&apos;t have an account?
          <Link to="/register" className="font-semibold underline">
            Register
          </Link>
        </p>
        <div className="my-8 flex items-center">
          <hr className="flex-1 border-gray-400" />
          <div className="mx-4 text-gray-400">OR</div>
          <hr className="flex-1 border-gray-400" />
        </div>
        {/* Social icons */}
        <button
          onClick={googleLogIn}
          aria-label="Log in with Google"
          className="flex items-center space-x-3 w-full btn px-4 py-2"
        >
          <img className="h-8 w-8" src={googlelogo} alt="Google Logo" />
          <span>login With Google</span>
        </button>
      </div>
    
    </div>
  );
};

export default Login;
