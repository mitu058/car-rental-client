import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://car-rental-server-rosy.vercel.app",
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { userLogOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
       
        if (error.status === 401 || error.status === 403) {
         
          userLogOut()
          .then(()=>{
            navigate("/login");
          }).catch((error)=> console.log(error))
        }
        return Promise.reject(error);
      }
    );
  }, []);
  return axiosInstance;
};

export default useAxiosSecure;
