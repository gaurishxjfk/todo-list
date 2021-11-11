import React, {  createContext, useContext, useEffect, useState } from 'react'

const userContext = createContext();

const Context = ({children}) => {

    const getUser = () => {
        return JSON.parse(localStorage.getItem('users'));    
    }

    
    const [userList,setUserList] = useState(getUser());
    const [isLoggedIn, setIsLoggedIn] = useState(userList !== null ? userList.isLoggedIn : false);
    const [userID, setUserId] = useState(userList !== null ? userList.id : '');
    const [isAdmin,setIsAdmin] = useState(false);

    useEffect(() => {
        if(userList !== null){
            localStorage.setItem('users',JSON.stringify(userList));   
        }        
    }, [userList]); 
    

    return (
        <userContext.Provider value={{isLoggedIn, setIsLoggedIn,userID, setUserId,userList,setUserList,isAdmin,setIsAdmin}}>
            {children}
        </userContext.Provider>
    )
}

export default Context;

export const UserState = () => {
    return useContext(userContext);
}
