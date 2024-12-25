import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const creatUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userLogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  useEffect(() => {
    const unsubsCribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("state captured", currentUser?.email);

      if (currentUser?.email) {
        const user = { email: currentUser.email };
        axios
          .post("http://localhost:5000/jwt", user, { withCredentials: true })
          .then((res) => {
            console.log("login token", res.data);
            setLoading(false);
          });
      } else {
        axios
          .post("http://localhost:5000/logout", {}, { withCredentials: true })
          .then((res) => {
            console.log("logout user token", res.data)
            setLoading(false);
          });
      }
    });
    return () => {
      unsubsCribe(); // Clean up subscription when component unmounts
    };
  }, []);

  const userInfo = {
    user,
    setUser,
    creatUser,
    loading,
    setLoading,
    signInUser,
    userLogOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
