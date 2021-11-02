import React, {  createContext, useContext, useState } from 'react'

const userContext = createContext();

const Context = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userID, setUserId] = useState();
    

    return (
        <userContext.Provider value={{isLoggedIn, setIsLoggedIn,userID, setUserId}}>
            {children}
        </userContext.Provider>
    )
}

export default Context;

export const UserState = () => {
    return useContext(userContext);
}
