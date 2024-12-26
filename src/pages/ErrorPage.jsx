import React from 'react';

const ErrorPage = () => {
    return (
        <div className="text-center py-48 space-y-2">
        <div className="flex justify-center items-center flex-col space-y-4">
           <img className="w-96" src={pageNotFound} alt="" />
           
  
     <Link to='/'><button className="btn p-2 m-2 bg-blue-500 text-white">Back To Home</button></Link>
       </div>
       </div>
    );
};

export default ErrorPage;