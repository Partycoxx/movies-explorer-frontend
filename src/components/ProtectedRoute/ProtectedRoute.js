import React from "react";
import { Route, useHistory } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn, ...props }) => {
  const history = useHistory();

  return <Route>{() => (isLoggedIn ? children : history.push("/"))}</Route>;
};

export default ProtectedRoute;
