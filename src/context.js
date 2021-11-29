/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();

// eslint-disable-next-line react/prop-types
const Context = ({ children }) => {
  const getUser = () => {
    return JSON.parse(localStorage.getItem("users"));
  };

  const getUserList = () => {
    return JSON.parse(localStorage.getItem("userList"));
  };

  const [userList, setUserList] = useState(getUser());
  const [users, setUsers] = useState(getUserList());
  const [isLoggedIn, setIsLoggedIn] = useState(
    userList !== null ? userList.isLoggedIn : false
  );
  const [userID, setUserId] = useState(userList !== null ? userList.id : "");
  const [isAdmin, setIsAdmin] = useState(
    userList !== null ? userList.isAdmin : ""
  );
  const [isDoneFilter, setIsDoneFilter] = useState(false);

  useEffect(() => {
    if (userList !== null) {
      localStorage.setItem("users", JSON.stringify(userList));
      setIsAdmin(userList.isAdmin);
    }
  }, [userList, setIsAdmin]);

  return (
    <userContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userID,
        setUserId,
        userList,
        setUserList,
        isAdmin,
        setIsAdmin,
        isDoneFilter,
        setIsDoneFilter,
        users,
        setUsers,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default Context;

export const UserState = () => {
  return useContext(userContext);
};
