import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const PrivateRouter = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation()
   
    if(loading){
        return (
            <div className='flex h-screen justify-center items-center'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
        )
    }
    if(user && user?.email){
    return children
    }
    // if (!user) {
    //     toast.error("Please Login To See Details");
    //   }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRouter;