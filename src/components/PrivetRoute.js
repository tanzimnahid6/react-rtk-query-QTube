import React from "react";
import { useSelector } from "react-redux";

import Loading from "./ui/loaders/Loading";
import { Navigate, useLocation } from "react-router-dom";

const PrivetRoute = ({ children }) => {
    const location = useLocation()
  const { email } = useSelector((state) => state.auth);
  const { loadingUi } = useSelector((state) => state.loaderUi);

  if (email) {
    return children;
  } else if (loadingUi){
    return <Loading></Loading>
  }else {
    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>
  }
};

export default PrivetRoute;
