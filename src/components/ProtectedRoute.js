/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { UserState } from "../context";

const ProtectedRoute = (props) => {
  const { isLoggedIn } = UserState();
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
