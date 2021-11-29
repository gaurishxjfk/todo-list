/* eslint-disable react/function-component-definition */
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { UserState } from "../context";

const ProtectedAdmin = (props) => {
  const { isAdmin } = UserState();
  if (!isAdmin) {
    return <Redirect to="/" />;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...props} />;
};

export default ProtectedAdmin;
