import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const PrivateRoute = ({  children}) => {
    const isAdmin = useSelector(state => state.user.isAdmin);
  if (!isAdmin) {

    toast.error("You're not an admin!");
    return <Navigate to="/" />;
  }


  return children;
};

export default PrivateRoute;
