import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import register from "../Lottie/login-animation.json";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
const {setUser,updateUserProfile,creatUser} = useContext(AuthContext)
const navigate = useNavigate()
const [showPasswoed, setShowPassword] = useState(false);

const handelRegister = e =>{
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const photo = form.photo.value
    const newUser = {name,email,password,photo}
    console.log('user creat',newUser)
    // password validation
    if (password.length < 6) {
        Swal.fire({
          title: "Error!",
          text: "Password should be at least 6 characters long",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      if (!passwordRegex.test(password)) {
        Swal.fire({
          title: "Error!",
          text: ' "password should be at least one upperCase, one lowerCase, one number, one special charecter"',
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }

    creatUser(email, password)
    .then((result)=>{
        toast.success('Successfully registered')
        navigate('/login')
        const user = result.user
        setUser(user)
        
        updateUserProfile({displayName:name, photoURL:photo})
        console.log('user created at firebase',user)
    })
    .catch((error)=>{
        toast.error('Failed to register')
    })
  
}


  return (
    <div className="flex justify-around gap-16 w-[70%] mx-auto my-12">
      <div className="w-full max-w-md rounded-lg bg-white px-10 pb-10 pt-8 shadow-md dark:bg-zinc-900">
        <div className="mb-6">
          <h2 className="text-center text-3xl font-semibold tracking-tight">
            Register Now
          </h2>
          <p className="text-center">
            Please fill in the form to create an account.
          </p>
        </div>
        <form onSubmit={handelRegister} className="w-full space-y-6">
          <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
            <label className="block font-medium" htmlFor="name">
              Name
            </label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
              id="name"
              placeholder="Your Name"
              name="name"
              type="text"
              required
            />
          </div>
          <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
            <label className="block font-medium" htmlFor="_email">
              Email
            </label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
              id="_email"
              placeholder="Your Email"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="space-y-2 text-sm relative">
            <label
              className="text-base font-medium leading-none text-zinc-700 dark:text-zinc-300"
              htmlFor="password_"
            >
              Password
            </label>
            <input
              className="flex text-base h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
              type={showPasswoed ? "text" : "password"}
              placeholder="password"
              name="password"
            />

            <div
              onClick={() => setShowPassword(!showPasswoed)}
              className="btn btn-xs absolute right-3 top-7"
            >
              {showPasswoed ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </div>
          </div>
          <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
            <label className="block font-medium" htmlFor="_email">
              Photo
            </label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
              placeholder="Your photo"
              name="photo"
              type="url"
              required
            />
          </div>

          <button className="rounded-md w-full bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700">
            Register
          </button>
        </form>
        <p className="text-center pt-4 text-sm text-zinc-700 dark:text-zinc-300">
         Already have an account?
          <Link to="/login" className="font-semibold underline">
         Login
          </Link>
        </p>
      </div>
      <div>
        <Lottie
          animationData={register}
          loop={true}
          className="w-4/3 mx-auto items-center"
        ></Lottie>
      </div>
    </div>
  );
};

export default Register;
